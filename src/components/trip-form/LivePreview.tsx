import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CalendarIcon, Users, MapPin, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface LivePreviewProps {
  groupSize: string;
  dates: { from?: Date; to?: Date };
  tripLength: string;
  selectedInterests: string[];
  budget: number[];
  isVisible: boolean;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  groupSize,
  dates,
  tripLength,
  selectedInterests,
  budget,
  isVisible
}) => {
  const getBudgetLabel = (value: number) => {
    switch (value) {
      case 1: return { label: 'Budget', emoji: '💵' };
      case 2: return { label: 'Mid-range', emoji: '💰' };
      case 3: return { label: 'Luxury', emoji: '💎' };
      default: return { label: 'Mid-range', emoji: '💰' };
    }
  };

  const getGroupSizeLabel = (size: string) => {
    switch (size) {
      case 'solo': return 'Solo Adventure';
      case '2-3': return '2-3 People';
      case '4-6': return '4-6 People';
      case '7+': return '7+ People';
      default: return '';
    }
  };

  const getTripDuration = () => {
    if (dates.from && dates.to) {
      return `${format(dates.from, 'MMM dd')} - ${format(dates.to, 'MMM dd')}`;
    }
    if (dates.from) {
      return format(dates.from, 'MMM dd, yyyy');
    }
    if (tripLength) {
      switch (tripLength) {
        case 'weekend': return 'Weekend Trip';
        case '1-week': return '1 Week';
        case '2-weeks': return '2+ Weeks';
        default: return tripLength;
      }
    }
    return '';
  };

  const interestLabels = {
    'relax': '🏖️ Relax',
    'explore': '🔍 Explore',
    'adventure': '🏔️ Adventure',
    'wellness': '🧘 Wellness',
    'city-life': '🏙️ City Life',
    'nature': '🌿 Nature',
    'culture': '🎨 Culture',
    'hidden-gems': '💎 Hidden Gems'
  };

  const budgetInfo = getBudgetLabel(budget[0]);
  const hasContent = groupSize || dates.from || tripLength || selectedInterests.length > 0;

  if (!isVisible || !hasContent) return null;

  return (
    <Card className={cn(
      "sticky top-8 p-6 bg-gradient-to-br from-white to-gray-50 border-2",
      "shadow-lg transition-all duration-300 animate-fade-in"
    )}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Trip Preview</span>
        </div>

        {/* Destination Placeholder */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Destination: <span className="italic">To be discovered ✨</span></span>
        </div>

        {/* Group Size */}
        {groupSize && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">{getGroupSizeLabel(groupSize)}</span>
          </div>
        )}

        {/* Duration */}
        {(dates.from || tripLength) && (
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">{getTripDuration()}</span>
          </div>
        )}

        {/* Interests */}
        {selectedInterests.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Vibes:</span>
            <div className="flex flex-wrap gap-1">
              {selectedInterests.slice(0, 3).map((interest) => (
                <Badge
                  key={interest}
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary border-primary/20"
                >
                  {interestLabels[interest as keyof typeof interestLabels]}
                </Badge>
              ))}
              {selectedInterests.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{selectedInterests.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Budget */}
        {budget[0] && (
          <div className="flex items-center gap-2">
            <span className="text-lg">{budgetInfo.emoji}</span>
            <span className="text-sm font-medium">{budgetInfo.label} Style</span>
          </div>
        )}

        {/* Fun Message */}
        <div className="text-center pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500 italic">
            AI is getting excited about your trip! 🤖✨
          </p>
        </div>
      </div>
    </Card>
  );
};

export default LivePreview;