
import React from 'react';
import { Badge } from '@/components/ui/badge';

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
  theme: string[];
  location: string;
  seasonal_notes?: string;
  blocks: Block[];
  local_tips: string[];
  pace: string;
  daily_budget_band: string;
}

interface ItineraryDayProps {
  dayData: DayData;
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

const ItineraryDay: React.FC<ItineraryDayProps> = ({ dayData }) => {
  return (
    <div className="border-l-4 border-primary/20 pl-6 space-y-4">
      <div>
        <h3 className="font-satoshi font-bold text-xl text-foreground mb-2">
          Day {dayData.day} – {dayData.theme.join(' & ')}
        </h3>
        <p className="text-sm text-muted-foreground mb-1">{dayData.location}</p>
        {dayData.seasonal_notes && (
          <p className="text-sm text-primary/80 italic">{dayData.seasonal_notes}</p>
        )}
      </div>

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

            {/* Parallel Activity */}
            {block.parallel && (
              <div className="border-t pt-3 mb-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Alternative Option
                </p>
                <h4 className="font-medium text-foreground">{block.parallel.name}</h4>
                <ActivityBadges activity={block.parallel} />
                {block.parallel.duration_hr && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Duration: {block.parallel.duration_hr}h
                  </p>
                )}
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
