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

Create exactly ${durationDays} days. Each day should have 3-4 activities (morning, afternoon, evening, and optionally night). Make it detailed and specific to the destination.`;

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
      
      // Create a fallback itinerary
      itinerary = {
        title: `${formData.destination} Adventure`,
        summary: `A ${durationDays}-day trip to ${formData.destination}`,
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
              },
              {
                time: "afternoon",
                title: "Local Exploration",
                description: "Explore the local area and get oriented",
                duration: "3 hours",
                location: formData.destination
              },
              {
                time: "evening",
                title: "Welcome Dinner",
                description: "Enjoy local cuisine at a recommended restaurant",
                duration: "2 hours",
                location: formData.destination
              }
            ]
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