import React, { useState } from 'react';
import { MapPin, Loader2, X, ExternalLink } from 'lucide-react';
import { useStaticMap } from '@/hooks/useStaticMap';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface StaticMapThumbnailProps {
  tripId: string;
  dayNumber: number;
  locationName: string;
  className?: string;
}

const StaticMapThumbnail: React.FC<StaticMapThumbnailProps> = ({ 
  tripId, 
  dayNumber, 
  locationName, 
  className = "" 
}) => {
  const [showModal, setShowModal] = useState(false);
  const { mapUrl, mapData, loading, error } = useStaticMap(tripId, dayNumber, locationName, '300x200');
  
  // For modal, use larger size
  const { mapUrl: largeMapUrl } = useStaticMap(
    tripId, 
    dayNumber, 
    locationName, 
    '600x400'
  );

  if (loading) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !mapUrl) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <MapPin className="w-4 h-4 text-muted-foreground" />
      </div>
    );
  }

  const openGoogleMaps = () => {
    if (mapData) {
      const url = `https://www.google.com/maps?q=${mapData.latitude},${mapData.longitude}`;
      window.open(url, '_blank');
    }
  };

  return (
    <>
      <div 
        className={`cursor-pointer rounded-lg overflow-hidden border hover:border-primary/50 transition-colors ${className}`}
        onClick={() => setShowModal(true)}
      >
        <img 
          src={mapUrl} 
          alt={`Map of ${locationName}`}
          className="w-full h-full object-cover"
        />
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {mapData?.locationName || locationName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border">
              <img 
                src={largeMapUrl || mapUrl} 
                alt={`Large map of ${locationName}`}
                className="w-full h-auto"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Click to view in Google Maps
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={openGoogleMaps}
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in Maps
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StaticMapThumbnail;