import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

async function refineItineraryWithAI(itineraryData: any, formData: any, directionText: string): Promise<any> {
  const prompt = `You are an expert travel planner. Modify the following itinerary ONLY as requested: "${directionText}".

CRITICAL REQUIREMENTS:
- Preserve the EXACT JSON structure and schema
- Keep ALL existing 'id' fields unchanged
- Keep ALL existing 'day' numbers unchanged
- Only modify the specific aspects mentioned in the request
- Return the complete, valid JSON matching the original schema

Original itinerary data:
${JSON.stringify(itineraryData, null, 2)}

Original trip preferences:
${JSON.stringify(formData, null, 2)}

Instructions: ${directionText}

Return the complete modified itinerary as valid JSON only.`;

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
            content: 'You are a precise travel planner. Always return valid JSON matching the exact schema provided. Preserve all IDs and structure.' 
          },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 4000,
      }),
    });

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid OpenAI response');
    }

    const content = data.choices[0].message.content;
    console.log('OpenAI refinement response:', content);
    
    // Parse the JSON response
    let refinedItinerary;
    try {
      // Clean the response in case there are markdown code blocks
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      refinedItinerary = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Error parsing OpenAI JSON response:', parseError);
      
      // Single repair attempt
      const repairPrompt = `The following JSON is malformed: ${content}

Fix the JSON syntax errors and return valid JSON only:`;
      
      const repairResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            { role: 'system', content: 'Fix JSON syntax errors. Return valid JSON only.' },
            { role: 'user', content: repairPrompt }
          ],
          max_completion_tokens: 4000,
        }),
      });

      const repairData = await repairResponse.json();
      const repairedContent = repairData.choices[0].message.content.replace(/```json\n?|\n?```/g, '').trim();
      refinedItinerary = JSON.parse(repairedContent);
    }

    return refinedItinerary;
  } catch (error) {
    console.error('Error refining itinerary:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tripId, directionText } = await req.json();
    
    if (!tripId || !directionText) {
      return new Response(
        JSON.stringify({ error: 'tripId and directionText are required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Refining itinerary for trip:', tripId, 'with direction:', directionText);

    // Load the trip data
    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .select('*')
      .eq('id', tripId)
      .single();

    if (tripError || !trip) {
      console.error('Error loading trip:', tripError);
      return new Response(
        JSON.stringify({ error: 'Trip not found' }), 
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!trip.itinerary_data) {
      return new Response(
        JSON.stringify({ error: 'No itinerary data found for this trip' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Refine the itinerary with AI
    const refinedItinerary = await refineItineraryWithAI(
      trip.itinerary_data, 
      trip.form_payload, 
      directionText
    );

    // Update the trip with refined itinerary
    const newVersion = (trip.itinerary_version || 1) + 1;
    
    // Store the new version in trips_versions first
    const { error: versionError } = await supabase
      .from('trips_versions')
      .insert({
        trip_id: tripId,
        version: newVersion,
        itinerary_json: refinedItinerary
      });

    if (versionError) {
      console.error('Error storing trip version:', versionError);
      return new Response(
        JSON.stringify({ error: 'Failed to save itinerary version' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const { data: updatedTrip, error: updateError } = await supabase
      .from('trips')
      .update({
        itinerary_data: refinedItinerary,
        itinerary_version: newVersion,
        updated_at: new Date().toISOString()
      })
      .eq('id', tripId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating trip:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to save refined itinerary' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Itinerary refined successfully, new version:', newVersion);

    return new Response(
      JSON.stringify({ 
        success: true, 
        trip: updatedTrip,
        version: newVersion,
        message: 'Itinerary refined successfully'
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in refine-itinerary function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});