-- Add version tracking to trips table
ALTER TABLE public.trips 
ADD COLUMN itinerary_version INTEGER DEFAULT 1;