import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const googleApiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

interface GeocodeResult {
  latitude: number;
  longitude: number;
  formatted_address: string;
}

async function geocodeLocation(locationName: string): Promise<GeocodeResult | null> {
  try {
    console.log('Geocoding location:', locationName);
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationName)}&key=${googleApiKey}`
    );

    if (!response.ok) {
      console.error('Geocoding API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const location = result.geometry.location;
      
      return {
        latitude: location.lat,
        longitude: location.lng,
        formatted_address: result.formatted_address
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error geocoding location:', error);
    return null;
  }
}

function generateStaticMapUrl(latitude: number, longitude: number, size: string = '300x200'): string {
  const params = new URLSearchParams({
    center: `${latitude},${longitude}`,
    zoom: '14',
    size,
    maptype: 'roadmap',
    markers: `color:red|${latitude},${longitude}`,
    style: 'feature:poi|visibility:simplified',
    key: googleApiKey!
  });

  return `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}`;
}

async function getCachedLocation(tripId: string, dayNumber: number, locationName: string) {
  const cacheKey = `${tripId}_${dayNumber}_${locationName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  
  const { data: cached } = await supabase
    .from('location_cache')
    .select('*')
    .eq('cache_key', cacheKey)
    .gte('expires_at', new Date().toISOString())
    .single();

  return cached;
}

async function cacheLocation(
  tripId: string, 
  dayNumber: number, 
  locationName: string, 
  geocodeResult: GeocodeResult,
  staticMapUrl: string
) {
  const cacheKey = `${tripId}_${dayNumber}_${locationName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  
  // Cache for 30 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  
  await supabase.from('location_cache').upsert({
    cache_key: cacheKey,
    trip_id: tripId,
    day_number: dayNumber,
    location_name: locationName,
    latitude: geocodeResult.latitude,
    longitude: geocodeResult.longitude,
    static_map_url: staticMapUrl,
    expires_at: expiresAt.toISOString()
  });
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tripId, dayNumber, locationName, size = '300x200' } = await req.json();
    
    if (!tripId || !dayNumber || !locationName) {
      return new Response(
        JSON.stringify({ error: 'tripId, dayNumber, and locationName are required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Generating static map for:', { tripId, dayNumber, locationName, size });

    // Check cache first
    const cached = await getCachedLocation(tripId, dayNumber, locationName);
    if (cached && cached.static_map_url) {
      console.log('Using cached map data for:', locationName);
      
      // Generate new static map URL with requested size if different
      const mapUrl = size !== '300x200' 
        ? generateStaticMapUrl(cached.latitude, cached.longitude, size)
        : cached.static_map_url;

      return new Response(
        JSON.stringify({ 
          success: true, 
          mapUrl,
          latitude: cached.latitude,
          longitude: cached.longitude,
          locationName: cached.location_name,
          cached: true 
        }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Geocode the location
    const geocodeResult = await geocodeLocation(locationName);
    
    if (!geocodeResult) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Could not geocode location' 
        }), 
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate static map URL
    const mapUrl = generateStaticMapUrl(geocodeResult.latitude, geocodeResult.longitude, size);

    // Cache the result
    await cacheLocation(tripId, dayNumber, locationName, geocodeResult, mapUrl);

    console.log('Generated and cached static map for:', locationName);

    return new Response(
      JSON.stringify({ 
        success: true, 
        mapUrl,
        latitude: geocodeResult.latitude,
        longitude: geocodeResult.longitude,
        locationName: geocodeResult.formatted_address,
        cached: false 
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-static-map function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});