-- Update RLS policies for trips table to allow public access temporarily
DROP POLICY IF EXISTS "Users can create their own trips" ON public.trips;
DROP POLICY IF EXISTS "Users can view their own trips" ON public.trips;
DROP POLICY IF EXISTS "Users can update their own trips" ON public.trips;
DROP POLICY IF EXISTS "Users can delete their own trips" ON public.trips;

-- Create public access policies
CREATE POLICY "Anyone can view trips" 
ON public.trips 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create trips" 
ON public.trips 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update trips" 
ON public.trips 
FOR UPDATE 
USING (true);

-- Add columns that might be missing for better compatibility
ALTER TABLE public.trips 
ADD COLUMN IF NOT EXISTS budget INTEGER DEFAULT 1000,
ADD COLUMN IF NOT EXISTS activities TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE;