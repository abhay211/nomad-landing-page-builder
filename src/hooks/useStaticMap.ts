import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StaticMapData {
  mapUrl: string;
  latitude: number;
  longitude: number;
  locationName: string;
}

interface UseStaticMapResult {
  mapUrl: string | null;
  mapData: StaticMapData | null;
  loading: boolean;
  error: string | null;
}

export const useStaticMap = (
  tripId: string,
  dayNumber: number,
  locationName: string | undefined,
  size: string = '300x200'
): UseStaticMapResult => {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [mapData, setMapData] = useState<StaticMapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId || !dayNumber || !locationName || !locationName.trim()) return;

    const fetchMap = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: functionError } = await supabase.functions.invoke('generate-static-map', {
          body: { 
            tripId, 
            dayNumber, 
            locationName: locationName?.trim() || '',
            size 
          }
        });

        if (functionError) {
          console.error('Error fetching static map:', functionError);
          setError('Failed to load map');
          return;
        }

        if (data?.success && data?.mapUrl) {
          setMapUrl(data.mapUrl);
          setMapData({
            mapUrl: data.mapUrl,
            latitude: data.latitude,
            longitude: data.longitude,
            locationName: data.locationName
          });
        } else {
          setError('No map data available');
        }
      } catch (err) {
        console.error('Error fetching map:', err);
        setError('Failed to load map');
      } finally {
        setLoading(false);
      }
    };

    fetchMap();
  }, [tripId, dayNumber, locationName, size]);

  return { mapUrl, mapData, loading, error };
};