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
  startDate?: string;
  endDate?: string;
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

async function generateSimpleItinerary(formData: TripFormData): Promise<any> {
  console.log('Starting simple itinerary generation...', formData);
  
  if (!formData.destination) {
    throw new Error('Missing destination');
  }

  // Calculate duration from dates if provided, otherwise use default
  let duration = 7; // Default duration
  if (formData.startDate && formData.endDate) {
    duration = Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24));
  }

  const prompt = `Create a ${duration}-day travel itinerary for ${formData.destination} for ${formData.groupSize} people with a budget of $${formData.budget} per person.

Trip Details:
- Dates: ${formData.startDate} to ${formData.endDate}  
- Activities: ${formData.activities.join(', ')}
- Style: ${formData.groupStyle}

Please create a simple JSON itinerary with this structure:
{
  "title": "Trip to ${formData.destination}",
  "destination": "${formData.destination}",
  "days": [
    {
      "day": 1,
      "activities": ["Activity 1", "Activity 2", "Activity 3"]
    }
  ]
}`;

  console.log('Making OpenAI request...');
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5-mini-2025-08-07',
      messages: [
        { role: 'system', content: 'You are a travel planner. Create a simple JSON itinerary.' },
        { role: 'user', content: prompt }
      ],
      max_completion_tokens: 2000
    }),
  });

  console.log('Response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.log('Error response:', errorText);
    throw new Error(`OpenAI API failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Success! Got response');
  
  if (!data.choices?.[0]?.message?.content) {
    throw new Error('No content in OpenAI response');
  }

  const content = data.choices[0].message.content;
  const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
  
  try {
    return JSON.parse(cleanContent);
  } catch (error) {
    console.log('Parse error, raw content:', content);
    throw new Error('Failed to parse itinerary JSON');
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
        model: 'gpt-5-mini-2025-08-07',
        messages: [{ role: 'user', content: 'Say "API working"' }],
        max_completion_tokens: 10
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
    if (!formData.destination) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: destination' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate the itinerary
    const itineraryData = await generateSimpleItinerary(formData);

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
    await trackAnalyticsEvent(trip.id, 'generate_success', { model: 'gpt-4o-mini', duration_ms: Date.now() - Date.now() });

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