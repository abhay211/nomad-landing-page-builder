-- Create table for caching geocoded locations and static map URLs
CREATE TABLE public.location_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_key TEXT NOT NULL UNIQUE,
  trip_id UUID,
  day_number INTEGER,
  location_name TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  static_map_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.location_cache ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can read location cache" 
ON public.location_cache 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert location cache" 
ON public.location_cache 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update location cache" 
ON public.location_cache 
FOR UPDATE 
USING (true);

-- Create indexes for efficient lookups
CREATE INDEX idx_location_cache_key ON public.location_cache(cache_key);
CREATE INDEX idx_location_cache_trip_day ON public.location_cache(trip_id, day_number);
CREATE INDEX idx_location_cache_expires ON public.location_cache(expires_at);