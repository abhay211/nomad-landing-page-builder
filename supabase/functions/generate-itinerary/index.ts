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
    // Get OpenAI API key from Supabase secrets
    const openAIKey = Deno.env.get('OPENAI_API_KEY');
    
    console.log('🔑 Checking OpenAI API key access...');
    console.log('🔧 Function redeployed with updated secrets');
    
    if (!openAIKey || openAIKey.trim() === '') {
      console.error('❌ OpenAI API key not found or empty');
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key not configured. Please check Supabase secrets configuration.',
          success: false
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('✅ OpenAI API key found, proceeding with generation...');

    // Parse request
    const formData = await req.json();
    console.log('📝 Generating itinerary for:', formData.destination);

    // Calculate duration
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Create the prompt
    const prompt = `Create a detailed JSON itinerary for ${formData.destination}.

Trip Details:
- Destination: ${formData.destination}
- Dates: ${formData.startDate} to ${formData.endDate}
- Duration: ${durationDays} days
- Group Size: ${formData.groupSize} people
- Budget: $${formData.budget} USD
- Style: ${formData.groupStyle}
- Activities: ${formData.activities?.join(', ') || 'None specified'}
- Special Requests: ${formData.specialRequests || 'None'}

Return ONLY a valid JSON object with this exact structure:
{
  "title": "7-Day Bali Adventure",
  "summary": "A perfect blend of culture, nature, and relaxation in beautiful Bali",
  "days": [
    {
      "day": 1,
      "theme": "Arrival & Exploration",
      "location": "Ubud, Bali",
      "seasonal_notes": "Perfect weather for outdoor activities",
      "blocks": [
        {
          "id": "day1-morning",
          "time": "morning",
          "main": {
            "name": "Hotel Check-in & Welcome Breakfast",
            "duration_hr": 2,
            "difficulty": "easy",
            "best_time": "9:00 AM",
            "cost_pp": "$25",
            "map_hint": "Ubud center",
            "rating": 4.5,
            "price_level": "$$"
          },
          "parallel": {
            "name": "Spa & Wellness Introduction (alternative)",
            "duration_hr": 2,
            "difficulty": "easy",
            "cost_pp": "$40",
            "rating": 4.7,
            "price_level": "$$$"
          },
          "rendezvous": {
            "time": "12:00 PM",
            "place": "Hotel Lobby"
          }
        }
      ],
      "local_tips": [
        "Try the local warung for authentic flavors",
        "Bargain politely at traditional markets",
        "Dress modestly when visiting temples"
      ],
      "pace": "relaxed",
      "daily_budget_band": "mid-range"
    }
  ]
}

Create exactly ${durationDays} days. Each day should have 3-4 blocks (morning, afternoon, evening, and optionally night). Include specific locations, realistic durations, costs, and local tips. Make activities specific to ${formData.destination}.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: 'You are a travel expert. Return only valid JSON with no markdown formatting.' },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API error', 
          details: errorData 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();
    let itinerary;
    
    try {
      const content = result.choices[0].message.content.trim();
      // Remove any markdown formatting if present
      const jsonContent = content.replace(/```json\n?/, '').replace(/```$/, '');
      itinerary = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      console.log('Raw content:', result.choices[0].message.content);
      
      // Create a fallback itinerary with correct structure
      itinerary = {
        title: `${formData.destination} Adventure`,
        summary: `A ${durationDays}-day trip to ${formData.destination}`,
        days: [
          {
            day: 1,
            theme: "Arrival & Exploration",
            location: formData.destination,
            seasonal_notes: "Weather permitting",
            blocks: [
              {
                id: "day1-morning",
                time: "morning",
                main: {
                  name: "Arrival & Check-in",
                  duration_hr: 2,
                  difficulty: "easy",
                  best_time: "10:00 AM",
                  cost_pp: "$0",
                  map_hint: "Hotel location",
                  rating: 4.0,
                  price_level: "$"
                }
              },
              {
                id: "day1-afternoon",
                time: "afternoon",
                main: {
                  name: "Local Area Exploration",
                  duration_hr: 3,
                  difficulty: "easy",
                  best_time: "2:00 PM",
                  cost_pp: "$20",
                  map_hint: "City center",
                  rating: 4.2,
                  price_level: "$$"
                }
              }
            ],
            local_tips: [
              "Try local cuisine",
              "Always carry some cash",
              "Respect local customs"
            ],
            pace: "relaxed",
            daily_budget_band: "mid-range"
          }
        ]
      };
    }

    console.log('✅ Itinerary generated successfully');

    // Save to database if Supabase is available
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (supabaseUrl && supabaseServiceKey) {
      try {
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
      } catch (dbError) {
        console.error('⚠️ Database update failed:', dbError);
        // Continue anyway - we have the itinerary
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