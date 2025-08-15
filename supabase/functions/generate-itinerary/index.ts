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

async function generateItinerary(formData: TripFormData): Promise<any> {
  console.log('Generating itinerary for:', formData);
  
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

Please create a detailed itinerary in JSON format with this structure:
{
  "tripData": {
    "destination": "${formData.destination}",
    "startDate": "${formData.startDate}",
    "endDate": "${formData.endDate}",
    "groupSize": ${formData.groupSize},
    "budget": ${formData.budget},
    "duration": ${duration},
    "originCity": "${formData.originCity || 'Not specified'}",
    "interests": ${JSON.stringify(formData.activities)}
  },
  "itinerary": [
    {
      "day": 1,
      "theme": "Arrival & First Impressions",
      "color": "from-blue-500 to-purple-600",
      "heroImage": "/placeholder-day-image.jpg",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity Name",
          "description": "Detailed description of the activity",
          "duration": "2 hours",
          "location": "Specific location name",
          "type": "arrival|sightseeing|dining|activity|rest"
        }
      ]
    }
  ]
}

Guidelines:
- Create realistic timing with travel time between locations
- Include a mix of must-have activities and local recommendations
- Consider the group style (relaxed = fewer activities, packed = more activities)
- Include meal recommendations
- Add rest periods for relaxed style
- Keep within the specified budget
- Make each day themed and balanced
- Use actual place names from the provided list when possible
- Include specific locations, not just generic activities`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert travel planner. Create detailed, realistic itineraries in valid JSON format. Always respond with properly formatted JSON only.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 4000,
        temperature: 0.7
      }),
    });

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid OpenAI response');
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

    return itineraryData;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
    const itineraryData = await generateItinerary(formData);

    // Store the trip in the database
    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .insert({
        destination: formData.destination,
        start_date: formData.startDate,
        end_date: formData.endDate,
        group_size: formData.groupSize,
        budget: formData.budget,
        activities: formData.activities,
        group_style: formData.groupStyle,
        special_requests: formData.specialRequests,
        accessibility_needs: formData.accessibilityNeeds,
        origin_city: formData.originCity,
        itinerary_data: itineraryData
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
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});