-- Create trips_versions table to store version history
CREATE TABLE public.trips_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  itinerary_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient querying
CREATE INDEX idx_trips_versions_trip_id_version ON public.trips_versions(trip_id, version DESC);

-- Enable RLS
ALTER TABLE public.trips_versions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view trip versions" 
ON public.trips_versions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert trip versions" 
ON public.trips_versions 
FOR INSERT 
WITH CHECK (true);

-- Add unique constraint to prevent duplicate versions
ALTER TABLE public.trips_versions ADD CONSTRAINT trips_versions_trip_version_unique UNIQUE (trip_id, version);