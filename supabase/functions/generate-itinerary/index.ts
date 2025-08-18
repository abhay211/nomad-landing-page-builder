import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

console.log('🚀 Edge function starting up...');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('📞 Function called at:', new Date().toISOString());

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    console.log('🔍 Environment check:');
    console.log('- OpenAI key exists:', !!openAIApiKey);
    console.log('- OpenAI key length:', openAIApiKey?.length || 0);
    console.log('- Supabase URL exists:', !!supabaseUrl);
    console.log('- Service key exists:', !!supabaseServiceKey);

    if (!openAIApiKey) {
      console.error('❌ No OpenAI API key found');
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key missing',
          timestamp: new Date().toISOString(),
          available_env: Object.keys(Deno.env.toObject())
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body
    const formData = await req.json();
    console.log('📝 Request data:', formData);

    // Test OpenAI connection first
    console.log('🧪 Testing OpenAI connection...');
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
      console.error('❌ OpenAI test failed:', errorData);
      return new Response(
        JSON.stringify({ error: 'OpenAI API test failed', details: errorData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ OpenAI API test passed');

    // Generate itinerary
    const prompt = `Create a detailed ${formData.duration || '7'}-day travel itinerary for ${formData.destination}.
    
Trip Details:
- Destination: ${formData.destination}
- Group Size: ${formData.groupSize} people
- Budget: ${formData.budget} USD
- Style: ${formData.groupStyle}
- Activities: ${formData.activities?.join(', ') || 'None specified'}
- Special Requests: ${formData.specialRequests || 'None'}
- Accessibility: ${formData.accessibilityNeeds || 'None'}

Return ONLY a valid JSON object with this structure:
{
  "title": "Trip title",
  "summary": "Brief description",
  "days": [
    {
      "day": 1,
      "theme": "Day theme",
      "activities": [
        {
          "time": "morning",
          "title": "Activity title",
          "description": "Activity description",
          "duration": "2 hours",
          "location": "Location name"
        }
      ]
    }
  ]
}`;

    console.log('🤖 Calling OpenAI for itinerary generation...');
    const itineraryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: 'You are a travel planner. Return only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 3000
      }),
    });

    if (!itineraryResponse.ok) {
      const errorData = await itineraryResponse.json();
      console.error('❌ Itinerary generation failed:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to generate itinerary', details: errorData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const itineraryData = await itineraryResponse.json();
    console.log('✅ Itinerary generated successfully');

    // Parse the generated content
    let parsedItinerary;
    try {
      parsedItinerary = JSON.parse(itineraryData.choices[0].message.content);
    } catch (parseError) {
      console.error('❌ Failed to parse itinerary JSON:', parseError);
      return new Response(
        JSON.stringify({ error: 'Failed to parse generated itinerary' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save to database if we have database credentials
    if (supabaseUrl && supabaseServiceKey) {
      console.log('💾 Saving to database...');
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Create trip in database
      const { data: tripData, error: tripError } = await supabase
        .from('trips')
        .insert({
          destination: formData.destination,
          start_date: formData.startDate,
          end_date: formData.endDate,
          group_size: formData.groupSize,
          budget: formData.budget,
          activities: formData.activities || [],
          group_style: formData.groupStyle,
          special_requests: formData.specialRequests,
          accessibility_needs: formData.accessibilityNeeds?.split(',').map((s: string) => s.trim()).filter(Boolean) || [],
          itinerary_data: parsedItinerary,
          status: 'generated'
        })
        .select()
        .single();

      if (tripError) {
        console.error('❌ Database save error:', tripError);
        return new Response(
          JSON.stringify({ error: 'Failed to save trip to database', details: tripError }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('✅ Trip saved to database with ID:', tripData.id);

      return new Response(
        JSON.stringify({ 
          success: true, 
          tripId: tripData.id,
          itinerary: parsedItinerary 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return itinerary without saving to database
    return new Response(
      JSON.stringify({ 
        success: true, 
        itinerary: parsedItinerary 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message,
        timestamp: new Date().toISOString()
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});