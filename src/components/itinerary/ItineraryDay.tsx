
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useUnsplashImage } from '@/hooks/useUnsplashImage';
import StaticMapThumbnail from './StaticMapThumbnail';

interface ActivityDetail {
  name: string;
  duration_hr?: number;
  difficulty?: string;
  best_time?: string;
  cost_pp?: string;
  map_hint?: string;
  rating?: number;
  price_level?: string;
  photo_url?: string;
}

interface Block {
  id: string;
  time: string;
  main: ActivityDetail;
  parallel?: ActivityDetail;
  rendezvous?: { time: string; place: string };
}

interface DayData {
  day: number;
  theme: string | string[];
  location: string;
  seasonal_notes?: string;
  blocks: Block[];
  local_tips: string[];
  pace: string;
  daily_budget_band: string;
}

interface ItineraryDayProps {
  dayData: DayData;
  destination: string;
  itineraryId?: string;
}

const ActivityBadges: React.FC<{ activity: ActivityDetail }> = ({ activity }) => {
  const isUnverified = activity.name.includes('(suggested)');
  
  return (
    <div className="flex items-center gap-2 mt-1">
      {activity.rating && (
        <Badge variant="secondary" className="text-xs">
          ★{activity.rating.toFixed(1)}
        </Badge>
      )}
      {activity.price_level && (
        <Badge variant="outline" className="text-xs">
          {activity.price_level}
        </Badge>
      )}
      {isUnverified && (
        <Badge variant="outline" className="text-xs text-muted-foreground border-dashed">
          Unverified
        </Badge>
      )}
    </div>
  );
};

const ActivityImage: React.FC<{ 
  activity: ActivityDetail; 
  destination: string; 
  itineraryId?: string;
}> = ({ activity, destination, itineraryId }) => {
  const query = `${activity.name} ${destination}`;
  const { imageUrl, loading } = useUnsplashImage(query, itineraryId, 'small');
  
  // Priority: Google Places photo_url first, then Unsplash fallback
  const displayImage = activity.photo_url || imageUrl;
  
  if (!displayImage && !loading) return null;
  
  return (
    <div className="w-16 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
      {loading ? (
        <div className="w-full h-full bg-muted animate-pulse" />
      ) : displayImage ? (
        <img 
          src={displayImage} 
          alt={activity.name}
          className="w-full h-full object-cover"
        />
      ) : null}
    </div>
  );
};

const ItineraryDay: React.FC<ItineraryDayProps> = ({ dayData, destination, itineraryId }) => {
  // Safely handle theme as either string or array
  const themeArray = Array.isArray(dayData.theme) ? dayData.theme : [dayData.theme].filter(Boolean);
  const dayBannerQuery = `${dayData.location} ${themeArray[0] || destination}`;
  const { imageUrl: bannerImage, loading: bannerLoading } = useUnsplashImage(
    dayBannerQuery, 
    itineraryId, 
    'regular'
  );

  return (
    <div className="space-y-4">
      {/* Day Banner */}
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-primary/80 to-primary/60 min-h-[200px]">
        {bannerImage && !bannerLoading && (
          <img 
            src={bannerImage} 
            alt={`Day ${dayData.day} - ${themeArray.join(' & ')}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Static Map Thumbnail */}
        {itineraryId && (
          <div className="absolute top-4 right-4">
            <StaticMapThumbnail
              tripId={itineraryId}
              dayNumber={dayData.day}
              locationName={dayData.location}
              className="w-24 h-16"
            />
          </div>
        )}
        
        <div className="relative p-6 text-white">
          <h3 className="font-satoshi font-bold text-2xl mb-2">
            Day {dayData.day} – {themeArray.join(' & ')}
          </h3>
          <p className="text-white/90 mb-1">{dayData.location}</p>
          {dayData.seasonal_notes && (
            <p className="text-sm text-white/80 italic">{dayData.seasonal_notes}</p>
          )}
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-4">
        {dayData.blocks.map((block) => (
          <div key={block.id} className="bg-card/50 rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs capitalize">
                {block.time}
              </Badge>
            </div>

            {/* Main Activity */}
            <div className="mb-3">
              <div className="flex items-start gap-3">
                <ActivityImage 
                  activity={block.main} 
                  destination={destination}
                  itineraryId={itineraryId}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{block.main.name}</h4>
                  <ActivityBadges activity={block.main} />
                  {block.main.duration_hr && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Duration: {block.main.duration_hr}h
                    </p>
                  )}
                  {block.main.best_time && (
                    <p className="text-sm text-muted-foreground">
                      Best time: {block.main.best_time}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Parallel Activity */}
            {block.parallel && (
              <div className="border-t pt-3 mb-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Alternative Option
                </p>
                <div className="flex items-start gap-3">
                  <ActivityImage 
                    activity={block.parallel} 
                    destination={destination}
                    itineraryId={itineraryId}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{block.parallel.name}</h4>
                    <ActivityBadges activity={block.parallel} />
                    {block.parallel.duration_hr && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Duration: {block.parallel.duration_hr}h
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Rendezvous */}
            {block.rendezvous && (
              <div className="text-sm text-primary/80 bg-primary/5 rounded p-2">
                <strong>Meet up:</strong> {block.rendezvous.time} at {block.rendezvous.place}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Local Tips */}
      {dayData.local_tips.length > 0 && (
        <div className="bg-accent/20 rounded-lg p-3">
          <h4 className="font-medium text-foreground text-sm mb-2">Local Tips</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {dayData.local_tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Budget Band */}
      <div className="text-xs text-muted-foreground">
        Daily Budget: <span className="capitalize font-medium">{dayData.daily_budget_band}</span> • 
        Pace: <span className="capitalize font-medium">{dayData.pace}</span>
      </div>
    </div>
  );
};

export default ItineraryDay;
