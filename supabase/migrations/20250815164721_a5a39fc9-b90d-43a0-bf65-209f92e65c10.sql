-- Create trips table for storing user itineraries
CREATE TABLE public.trips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  group_size INTEGER NOT NULL DEFAULT 1,
  budget INTEGER NOT NULL DEFAULT 1000,
  activities TEXT[] DEFAULT '{}',
  group_style TEXT DEFAULT 'balanced',
  special_requests TEXT,
  accessibility_needs TEXT,
  origin_city TEXT,
  itinerary_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no auth yet)
CREATE POLICY "Anyone can view trips" 
ON public.trips 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create trips" 
ON public.trips 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_trips_updated_at
BEFORE UPDATE ON public.trips
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();