-- Create a cache table for Google Places data
CREATE TABLE public.place_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_key TEXT NOT NULL UNIQUE,
  place_data JSONB NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.place_cache ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is cached data)
CREATE POLICY "Anyone can read place cache" 
ON public.place_cache 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert place cache" 
ON public.place_cache 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update place cache" 
ON public.place_cache 
FOR UPDATE 
USING (true);

-- Create index for efficient cache lookups
CREATE INDEX idx_place_cache_key ON public.place_cache(cache_key);
CREATE INDEX idx_place_cache_expires ON public.place_cache(expires_at);