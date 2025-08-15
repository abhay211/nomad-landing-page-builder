-- Create a default profile for unauthenticated users
INSERT INTO public.profiles (id, email, full_name)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'anonymous@example.com',
  'Anonymous User'
) ON CONFLICT (id) DO NOTHING;