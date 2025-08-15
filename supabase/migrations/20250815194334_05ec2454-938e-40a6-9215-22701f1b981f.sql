-- Make user_id nullable to allow unauthenticated trip creation
ALTER TABLE public.trips ALTER COLUMN user_id DROP NOT NULL;