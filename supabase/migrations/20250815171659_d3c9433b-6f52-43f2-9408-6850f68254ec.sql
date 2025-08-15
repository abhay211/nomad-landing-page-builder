-- Create image cache table for Unsplash images
CREATE TABLE public.image_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_key TEXT NOT NULL UNIQUE,
  itinerary_id UUID,
  query TEXT NOT NULL,
  image_data JSONB NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.image_cache ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is cached data)
CREATE POLICY "Anyone can read image cache" 
ON public.image_cache 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert image cache" 
ON public.image_cache 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update image cache" 
ON public.image_cache 
FOR UPDATE 
USING (true);

-- Create indexes for efficient lookups
CREATE INDEX idx_image_cache_key ON public.image_cache(cache_key);
CREATE INDEX idx_image_cache_expires ON public.image_cache(expires_at);
CREATE INDEX idx_image_cache_itinerary ON public.image_cache(itinerary_id);