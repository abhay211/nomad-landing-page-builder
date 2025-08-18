import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Debug environment variables more thoroughly
    const allEnvVars = Deno.env.toObject();
    const openAIKey = allEnvVars['OPENAI_API_KEY'];
    
    console.log('🔍 Debug environment access:');
    console.log('- All env keys:', Object.keys(allEnvVars));
    console.log('- OPENAI_API_KEY from allEnvVars:', openAIKey ? `exists (${openAIKey.length} chars)` : 'null');
    console.log('- OPENAI_API_KEY from Deno.env.get:', Deno.env.get('OPENAI_API_KEY') ? 'exists' : 'null');

    if (!openAIKey || openAIKey.trim() === '') {
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key is empty or invalid',
          debug: {
            hasKey: !!openAIKey,
            keyLength: openAIKey?.length || 0,
            keyPreview: openAIKey ? openAIKey.substring(0, 10) + '...' : 'null',
            allEnvKeys: Object.keys(allEnvVars)
          }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request
    const formData = await req.json();
    console.log('📝 Generating itinerary for:', formData.destination);

    // Test OpenAI API with the key we found
    const testResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [{ role: 'user', content: 'Reply with just "OK"' }],
        max_completion_tokens: 5
      }),
    });

    if (!testResponse.ok) {
      const errorData = await testResponse.json();
      console.error('❌ OpenAI API test failed:', errorData);
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API authentication failed', 
          details: errorData,
          keyInfo: `Key length: ${openAIKey.length}, starts with: ${openAIKey.substring(0, 7)}...`
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ OpenAI API test successful');

    // Generate the itinerary
    const prompt = `Create a detailed JSON itinerary for ${formData.destination}.

Trip Details:
- Destination: ${formData.destination}
- Dates: ${formData.startDate} to ${formData.endDate}
- Group Size: ${formData.groupSize} people
- Budget: ${formData.budget} USD
- Style: ${formData.groupStyle}
- Must-have Activities: ${formData.activities?.join(', ') || 'None'}
- Special Requests: ${formData.specialRequests || 'None'}

Return ONLY a valid JSON object with this exact structure:
{
  "title": "Bangkok Adventure",
  "summary": "A 7-day relaxing trip focusing on beaches and wellness",
  "days": [
    {
      "day": 1,
      "theme": "Arrival & Exploration",
      "activities": [
        {
          "time": "morning",
          "title": "Hotel Check-in",
          "description": "Arrive and settle into your accommodation",
          "duration": "2 hours",
          "location": "Bangkok City Center"
        },
        {
          "time": "afternoon", 
          "title": "Temple Visit",
          "description": "Visit Wat Pho temple for cultural immersion",
          "duration": "3 hours",
          "location": "Wat Pho Temple"
        },
        {
          "time": "evening",
          "title": "Welcome Dinner",
          "description": "Traditional Thai cuisine at a local restaurant",
          "duration": "2 hours", 
          "location": "Khao San Road"
        }
      ]
    }
  ]
}

Create ${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days total.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: 'You are a travel expert. Return only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 3000
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Itinerary generation failed:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to generate itinerary', details: errorData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();
    let itinerary;
    
    try {
      itinerary = JSON.parse(result.choices[0].message.content);
    } catch (parseError) {
      console.error('❌ Failed to parse JSON:', parseError);
      console.log('Raw response:', result.choices[0].message.content);
      
      // Create a fallback itinerary
      itinerary = {
        title: `${formData.destination} Adventure`,
        summary: `A ${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))}-day trip to ${formData.destination}`,
        days: [
          {
            day: 1,
            theme: "Arrival & Exploration",
            activities: [
              {
                time: "morning",
                title: "Arrival",
                description: "Arrive at destination and check into hotel",
                duration: "2 hours",
                location: formData.destination
              }
            ]
          }
        ]
      };
    }

    console.log('✅ Itinerary generated successfully');

    // Save to database
    const supabaseUrl = allEnvVars['SUPABASE_URL'];
    const supabaseServiceKey = allEnvVars['SUPABASE_SERVICE_ROLE_KEY'];
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Find existing trip and update it
      const { data: existingTrip } = await supabase
        .from('trips')
        .select('id')
        .eq('destination', formData.destination)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (existingTrip) {
        await supabase
          .from('trips')
          .update({ 
            itinerary_data: itinerary,
            status: 'generated'
          })
          .eq('id', existingTrip.id);
        
        console.log('✅ Updated existing trip:', existingTrip.id);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        itinerary: itinerary
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});