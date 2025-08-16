import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const googlePlacesApiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  budget: number;
  activities: string[];
  groupStyle: string;
  specialRequests?: string;
  accessibilityNeeds?: string;
  originCity?: string;
}

interface PlaceDetails {
  name: string;
  rating?: number;
  vicinity?: string;
  place_id: string;
  types: string[];
  opening_hours?: {
    open_now: boolean;
  };
}

async function searchPlaces(query: string, location: string): Promise<PlaceDetails[]> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + ' in ' + location)}&key=${googlePlacesApiKey}`
    );
    
    const data = await response.json();
    return data.results?.slice(0, 5) || [];
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
}

async function enrichActivityWithPlaces(activityName: string, destination: string): Promise<any> {
  // Check cache first
  const cacheKey = `${destination.toLowerCase()}_${activityName.toLowerCase()}`.replace(/[^a-z0-9_]/g, '_');
  const { data: cached } = await supabase
    .from('place_cache')
    .select('*')
    .eq('cache_key', cacheKey)
    .gte('expires_at', new Date().toISOString())
    .single();

  if (cached) {
    console.log('Using cached place data for:', activityName);
    return cached.place_data;
  }

  // Search Google Places
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(activityName + ' ' + destination)}&key=${googlePlacesApiKey}`
    );
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const place = data.results[0];
      
      // Get place details for photo
      let photoUrl = null;
      if (place.photos && place.photos[0]) {
        photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${googlePlacesApiKey}`;
      }

      const enrichment = {
        rating: place.rating || null,
        price_level: place.price_level ? '$'.repeat(place.price_level) : null,
        photo_url: photoUrl
      };

      // Cache the result for 48-72 hours
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 60); // 60 hours (between 48-72)
      
      await supabase.from('place_cache').upsert({
        cache_key: cacheKey,
        place_data: enrichment,
        expires_at: expiresAt.toISOString()
      });

      return enrichment;
    }
    
    return null;
  } catch (error) {
    console.error('Error enriching activity:', error);
    return null;
  }
}

async function enrichItineraryWithPlaces(itinerary: any, destination: string): Promise<any> {
  console.log('Enriching itinerary with Google Places data...');
  
  for (const day of itinerary.days) {
    for (const block of day.blocks) {
      // Enrich main activity
      if (block.main && block.main.name) {
        const enrichment = await enrichActivityWithPlaces(block.main.name, destination);
        if (enrichment) {
          block.main = { ...block.main, ...enrichment };
        } else {
          // Mark as suggested if no match found
          if (!block.main.name.includes('(suggested)')) {
            block.main.name = `${block.main.name} (suggested)`;
          }
        }
      }

      // Enrich parallel activity
      if (block.parallel && block.parallel.name) {
        const enrichment = await enrichActivityWithPlaces(block.parallel.name, destination);
        if (enrichment) {
          block.parallel = { ...block.parallel, ...enrichment };
        } else {
          // Mark as suggested if no match found
          if (!block.parallel.name.includes('(suggested)')) {
            block.parallel.name = `${block.parallel.name} (suggested)`;
          }
        }
      }
    }
  }

  return itinerary;
}

async function trackAnalyticsEvent(tripId: string, event: string, meta: any = {}) {
  try {
    await supabase.from('analytics_events').insert({
      trip_id: tripId,
      user_id: null, // No auth for now
      event,
      meta
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    // Non-fatal, don't throw
  }
}

async function generateItinerary(formData: TripFormData): Promise<any> {
  console.log('Generating itinerary for:', formData);
  console.log('OpenAI API Key present:', !!openAIApiKey);
  console.log('Google Places API Key present:', !!googlePlacesApiKey);
  
  if (!openAIApiKey) {
    throw new Error('OpenAI API key is not configured');
  }
  
  const startTime = Date.now();
  
  // Calculate trip duration
  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  // Search for relevant places based on selected activities
  const placesPromises = formData.activities.map(activity => 
    searchPlaces(activity, formData.destination)
  );
  
  const placesResults = await Promise.all(placesPromises);
  const allPlaces = placesResults.flat();

  // Create detailed prompt for OpenAI
  const prompt = `Create a detailed ${duration}-day travel itinerary for ${formData.destination} for ${formData.groupSize} people with a budget of $${formData.budget} per person.

Trip Details:
- Dates: ${formData.startDate} to ${formData.endDate}
- Group Style: ${formData.groupStyle}
- Must-have activities: ${formData.activities.join(', ')}
- Special requests: ${formData.specialRequests || 'None'}
- Accessibility needs: ${formData.accessibilityNeeds || 'None'}

Available Places (use these as reference):
${allPlaces.map(place => `- ${place.name} (Rating: ${place.rating || 'N/A'})`).join('\n')}

Please create a detailed itinerary in JSON format with this exact structure:
{
  "title": "string",
  "summary": "string", 
  "destination": "string",
  "date_range": "string",
  "tags": ["string"],
  "fairness_explainer": "string",
  "days": [
    {
      "day": 1,
      "theme": ["string"],
      "location": "string",
      "seasonal_notes": "string|null",
      "blocks": [
        {
          "id": "string",
          "time": "morning|afternoon|evening",
          "main": {
            "name": "string",
            "duration_hr": 0,
            "difficulty": "easy|moderate|strenuous|null",
            "best_time": "string|null",
            "cost_pp": "string|null",
            "map_hint": "string|null"
          },
          "parallel": {
            "name": "string",
            "duration_hr": 0,
            "cost_pp": "string|null",
            "map_hint": "string|null"
          },
          "rendezvous": { "time": "string", "place": "string" }
        }
      ],
      "local_tips": ["string"],
      "pace": "chill|balanced|packed",
      "daily_budget_band": "low|medium|high"
    }
  ]
}`;

  try {
    console.log('Making OpenAI API request...');
    const requestBody = {
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'You are Nomad, a group-travel planner. Goal: produce ONE inclusive, realistic itinerary. Rules: - Respect \'no_go\' (never schedule as MAIN; allow as PARALLEL if relevant). - Balance day themes; ensure every selected vibe has at least one highlight. - When preferences split, add a PARALLEL OPTION nearby with avg duration and a RENDEZVOUS time/place. - Be season-aware using month/destination context; avoid obviously bad fits. Add \'seasonal_notes\' when relevant. - Include: best time of day, short local tip, estimated per-person spend band. - Tone: concise, practical, inspiring. - Output MUST strictly match the JSON schema.' 
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 4000,
      temperature: 0.7
    };
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log('OpenAI API response status:', response.status);
    console.log('OpenAI API response data:', JSON.stringify(data, null, 2));
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(data)}`);
    }
    
    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid OpenAI response structure');
    }

    const content = data.choices[0].message.content;
    console.log('OpenAI response:', content);
    
    // Parse the JSON response
    let itineraryData;
    try {
      // Clean the response in case there are markdown code blocks
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      itineraryData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Error parsing OpenAI JSON response:', parseError);
      throw new Error('Failed to parse itinerary data');
    }

    // Enrich the itinerary with Google Places data
    console.log('Enriching itinerary with Google Places data...');
    const enrichedItinerary = await enrichItineraryWithPlaces(itineraryData, formData.destination);

    const duration_ms = Date.now() - startTime;
    
    return {
      itinerary: enrichedItinerary,
      analytics: {
        model: 'gpt-4o',
        duration_ms,
        tokens: data.usage?.total_tokens || null
      }
    };
  } catch (error) {
    console.error('Error generating itinerary:', error);
    const duration_ms = Date.now() - startTime;
    throw { ...error, analytics: { duration_ms } };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // First, test if OpenAI API key works with a simple request
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is not configured in Supabase secrets' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Quick test of OpenAI API
    const testResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Say "API working"' }],
        max_tokens: 10
      }),
    });

    if (!testResponse.ok) {
      const errorData = await testResponse.json();
      return new Response(
        JSON.stringify({ error: 'OpenAI API authentication failed', details: errorData }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const formData: TripFormData = await req.json();
    console.log('Received form data:', formData);

    // Validate required fields
    if (!formData.destination || !formData.startDate || !formData.endDate) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: destination, startDate, endDate' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate the itinerary
    const result = await generateItinerary(formData);
    const itineraryData = result.itinerary;

    // Store the trip in the database
    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .insert({
        user_id: null, // Public access
        destination: formData.destination,
        start_date: formData.startDate,
        end_date: formData.endDate,
        group_size: formData.groupSize,
        budget: formData.budget,
        activities: formData.activities,
        group_style: formData.groupStyle,
        special_requests: formData.specialRequests,
        accessibility_needs: formData.accessibilityNeeds ? [formData.accessibilityNeeds] : [],
        origin_city: formData.originCity,
        form_payload: formData,
        itinerary_data: itineraryData,
        itinerary_version: 1,
        status: 'completed'
      })
      .select()
      .single();

    if (tripError) {
      console.error('Error storing trip:', tripError);
      return new Response(
        JSON.stringify({ error: 'Failed to store trip data' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Store the first version in trips_versions
    const { error: versionError } = await supabase
      .from('trips_versions')
      .insert({
        trip_id: trip.id,
        version: 1,
        itinerary_json: itineraryData
      });

    if (versionError) {
      console.error('Error storing trip version:', versionError);
      // Non-fatal, continue
    }

    // Track success analytics
    await trackAnalyticsEvent(trip.id, 'generate_success', result.analytics);

    console.log('Trip stored successfully:', trip.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        tripId: trip.id,
        itinerary: itineraryData 
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-itinerary function:', error);
    
    // Track error analytics if we have a trip ID context
    if (error.analytics) {
      // We can't track without tripId in generate, but we log the error
      console.log('Generation failed with analytics:', error.analytics);
    }
    
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});