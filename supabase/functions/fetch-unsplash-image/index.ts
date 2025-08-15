import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const unsplashApiKey = Deno.env.get('UNSPLASH_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

interface UnsplashImageResponse {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
    download_location: string;
  };
}

async function fetchUnsplashImage(query: string): Promise<UnsplashImageResponse | null> {
  try {
    console.log('Fetching Unsplash image for query:', query);
    
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${unsplashApiKey}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Unsplash API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const image = data.results[0];
      
      // Trigger download tracking (required by Unsplash API guidelines)
      if (image.links?.download_location) {
        try {
          await fetch(image.links.download_location, {
            headers: {
              'Authorization': `Client-ID ${unsplashApiKey}`,
            },
          });
        } catch (error) {
          console.error('Error tracking download:', error);
        }
      }
      
      return image;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return null;
  }
}

async function getCachedImage(itineraryId: string, query: string): Promise<any> {
  const cacheKey = `${itineraryId}_${query.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  
  const { data: cached } = await supabase
    .from('image_cache')
    .select('*')
    .eq('cache_key', cacheKey)
    .gte('expires_at', new Date().toISOString())
    .single();

  return cached;
}

async function cacheImage(itineraryId: string, query: string, imageData: any): Promise<void> {
  const cacheKey = `${itineraryId}_${query.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  
  // Cache for 7 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  
  await supabase.from('image_cache').upsert({
    cache_key: cacheKey,
    itinerary_id: itineraryId,
    query,
    image_data: imageData,
    expires_at: expiresAt.toISOString()
  });
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, itineraryId } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check cache first
    if (itineraryId) {
      const cached = await getCachedImage(itineraryId, query);
      if (cached) {
        console.log('Using cached image for:', query);
        return new Response(
          JSON.stringify({ 
            success: true, 
            image: cached.image_data,
            cached: true 
          }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Fetch from Unsplash
    const imageData = await fetchUnsplashImage(query);
    
    if (!imageData) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No image found for query' 
        }), 
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Cache the result
    if (itineraryId) {
      await cacheImage(itineraryId, query, imageData);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        image: imageData,
        cached: false 
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in fetch-unsplash-image function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});