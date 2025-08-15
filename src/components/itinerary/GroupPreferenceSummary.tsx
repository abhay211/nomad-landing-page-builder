import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface GroupPreferenceSummaryProps {
  formPayload: any;
}

const GroupPreferenceSummary: React.FC<GroupPreferenceSummaryProps> = ({ formPayload }) => {
  if (!formPayload?.group_preferences) {
    return null;
  }

  const preferences = formPayload.group_preferences;
  
  // Extract preference counts for different activities
  const getPreferenceCounts = () => {
    const activities = ['hiking', 'beach', 'museums', 'nightlife', 'food', 'shopping', 'nature', 'culture', 'adventure', 'relaxation'];
    const summaries: string[] = [];

    activities.forEach(activity => {
      const mustHave = preferences.must_have?.filter((item: string) => 
        item.toLowerCase().includes(activity)
      )?.length || 0;
      
      const ok = preferences.ok?.filter((item: string) => 
        item.toLowerCase().includes(activity)
      )?.length || 0;
      
      const noGo = preferences.no_go?.filter((item: string) => 
        item.toLowerCase().includes(activity)
      )?.length || 0;

      if (mustHave > 0 || ok > 0 || noGo > 0) {
        const parts = [];
        if (mustHave > 0) parts.push(`${mustHave} must-have`);
        if (ok > 0) parts.push(`${ok} ok`);
        if (noGo > 0) parts.push(`${noGo} no-go`);
        
        summaries.push(`${activity.charAt(0).toUpperCase() + activity.slice(1)}: ${parts.join(', ')}`);
      }
    });

    return summaries;
  };

  // Fallback: show general preference counts if specific activities aren't found
  const getGeneralCounts = () => {
    const mustHave = preferences.must_have?.length || 0;
    const ok = preferences.ok?.length || 0;
    const noGo = preferences.no_go?.length || 0;

    if (mustHave === 0 && ok === 0 && noGo === 0) return [];

    const parts = [];
    if (mustHave > 0) parts.push(`${mustHave} must-have`);
    if (ok > 0) parts.push(`${ok} ok`);
    if (noGo > 0) parts.push(`${noGo} no-go`);

    return [`Preferences: ${parts.join(', ')}`];
  };

  const preferenceSummaries = getPreferenceCounts();
  const summaryText = preferenceSummaries.length > 0 
    ? preferenceSummaries.slice(0, 3).join(' • ') 
    : getGeneralCounts().join(' • ');

  if (!summaryText) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg text-xs text-muted-foreground">
      <Users className="w-3 h-3 flex-shrink-0" />
      <span className="truncate">{summaryText}</span>
      {preferenceSummaries.length > 3 && (
        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
          +{preferenceSummaries.length - 3} more
        </Badge>
      )}
    </div>
  );
};

export default GroupPreferenceSummary;