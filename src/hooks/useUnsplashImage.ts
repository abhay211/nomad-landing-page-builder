import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UnsplashImageData {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
  };
}

interface UseUnsplashImageResult {
  imageUrl: string | null;
  attribution: {
    photographer: string;
    photographerUrl: string;
    imageUrl: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export const useUnsplashImage = (
  query: string, 
  itineraryId?: string,
  size: 'thumb' | 'small' | 'regular' | 'full' = 'regular'
): UseUnsplashImageResult => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [attribution, setAttribution] = useState<{
    photographer: string;
    photographerUrl: string;
    imageUrl: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) return;

    const fetchImage = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: functionError } = await supabase.functions.invoke('fetch-unsplash-image', {
          body: { query, itineraryId }
        });

        if (functionError) {
          console.error('Error fetching Unsplash image:', functionError);
          setError('Failed to fetch image');
          return;
        }

        if (data?.success && data?.image) {
          const imageData: UnsplashImageData = data.image;
          setImageUrl(imageData.urls[size]);
          setAttribution({
            photographer: imageData.user.name,
            photographerUrl: imageData.user.links.html,
            imageUrl: imageData.links.html
          });
        } else {
          setError('No image found');
        }
      } catch (err) {
        console.error('Error fetching image:', err);
        setError('Failed to fetch image');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [query, itineraryId, size]);

  return { imageUrl, attribution, loading, error };
};