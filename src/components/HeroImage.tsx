import React from 'react';
import { useUnsplashImage } from '@/hooks/useUnsplashImage';

interface HeroImageProps {
  destination: string;
  itineraryId: string;
  className?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ destination, itineraryId, className = "" }) => {
  const query = `${destination} travel`;
  const { imageUrl, loading } = useUnsplashImage(query, itineraryId, 'full');

  if (loading) {
    return (
      <div className={`bg-gradient-to-r from-primary/80 to-primary/60 animate-pulse ${className}`} />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={`${destination} travel`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default HeroImage;