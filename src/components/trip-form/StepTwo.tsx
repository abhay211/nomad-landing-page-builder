import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { 
  Leaf, Mountain, Heart, Building, Trees, Palette, Star, Camera,
  Users, User, Plus, Info, Check, Smile, X
} from 'lucide-react';

type PreferenceLevel = 'must-have' | 'okay-with' | 'no-go' | null;

interface MemberPreferences {
  [interestValue: string]: PreferenceLevel;
}

interface StepTwoProps {
  selectedInterests: string[];
  setSelectedInterests: (interests: string[]) => void;
  groupSize: string;
  onNext: () => void;
  onBack: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  selectedInterests,
  setSelectedInterests,
  groupSize,
  onNext,
  onBack
}) => {
  const [currentMember, setCurrentMember] = useState(0);
  const [isFlexible, setIsFlexible] = useState(false);
  const [customInterest, setCustomInterest] = useState('');
  const [memberPreferences, setMemberPreferences] = useState<MemberPreferences[]>([]);
  const [customInterests, setCustomInterests] = useState<string[]>([]);

  const interests = [
    { value: 'relax', label: 'Relax', icon: Leaf, emoji: '🏖️', description: 'Beach days, spa treatments, and peaceful moments' },
    { value: 'explore', label: 'Explore', icon: Camera, emoji: '🔍', description: 'Sightseeing, local discoveries, and hidden spots' },
    { value: 'adventure', label: 'Adventure', icon: Mountain, emoji: '🏔️', description: 'Hiking, extreme sports, and adrenaline activities' },
    { value: 'wellness', label: 'Wellness', icon: Heart, emoji: '🧘', description: 'Yoga, meditation, and health-focused activities' },
    { value: 'city-life', label: 'City Life', icon: Building, emoji: '🏙️', description: 'Urban exploration, nightlife, and metropolitan vibes' },
    { value: 'nature', label: 'Nature', icon: Trees, emoji: '🌿', description: 'Parks, wildlife, and outdoor experiences' },
    { value: 'culture', label: 'Culture', icon: Palette, emoji: '🎨', description: 'Museums, art, history, and local traditions' },
    { value: 'hidden-gems', label: 'Hidden Gems', icon: Star, emoji: '💎', description: 'Off-the-beaten-path discoveries and local secrets' }
  ];

  const groupSizeNum = parseInt(groupSize) || 1;
  const allInterests = [...interests, ...customInterests.map(custom => ({
    value: custom,
    label: custom,
    icon: Star,
    emoji: '⭐',
    description: 'Custom interest added by group'
  }))];

  // Initialize member preferences if needed
  React.useEffect(() => {
    if (memberPreferences.length < groupSizeNum) {
      const newPreferences = Array.from({ length: groupSizeNum }, () => ({}));
      setMemberPreferences(newPreferences);
    }
  }, [groupSizeNum, memberPreferences.length]);

  const setMemberPreference = (interestValue: string, preference: PreferenceLevel) => {
    const newPreferences = [...memberPreferences];
    if (!newPreferences[currentMember]) {
      newPreferences[currentMember] = {};
    }
    newPreferences[currentMember][interestValue] = preference;
    setMemberPreferences(newPreferences);
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !customInterests.includes(customInterest.trim())) {
      setCustomInterests([...customInterests, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const getGroupSummary = (interestValue: string) => {
    const counts = { 'must-have': 0, 'okay-with': 0, 'no-go': 0 };
    memberPreferences.forEach(member => {
      const pref = member[interestValue];
      if (pref && counts.hasOwnProperty(pref)) {
        counts[pref]++;
      }
    });
    return counts;
  };

  const getPreferenceIcon = (preference: PreferenceLevel) => {
    switch (preference) {
      case 'must-have': return <Check className="w-4 h-4 text-green-600" />;
      case 'okay-with': return <Smile className="w-4 h-4 text-yellow-600" />;
      case 'no-go': return <X className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getPreferenceColor = (preference: PreferenceLevel) => {
    switch (preference) {
      case 'must-have': return 'border-green-500 bg-green-50';
      case 'okay-with': return 'border-yellow-500 bg-yellow-50';
      case 'no-go': return 'border-red-500 bg-red-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">What's your group's vibe?</h2>
          <p className="text-gray-600">Rate each interest for every member</p>
        </div>

        {/* Member Selection for Groups */}
        {groupSizeNum > 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-900">Setting preferences for:</label>
              <Select value={currentMember.toString()} onValueChange={(value) => setCurrentMember(parseInt(value))}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: groupSizeNum }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      Member {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Member Visual Indicators */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: Math.min(groupSizeNum, 6) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentMember(i)}
                  className={cn(
                    "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all",
                    currentMember === i
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white hover:border-primary"
                  )}
                >
                  <User className="w-5 h-5" />
                </button>
              ))}
              {groupSizeNum > 6 && (
                <div className="w-12 h-12 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-sm">
                  +{groupSizeNum - 6}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Flexible Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-primary" />
            <span className="font-medium">Flexible / Explore More Options</span>
          </div>
          <Switch checked={isFlexible} onCheckedChange={setIsFlexible} />
        </div>

        {/* Custom Interest Input */}
        <div className="space-y-3">
          <label className="font-medium text-gray-900">Add Custom Interest</label>
          <div className="flex gap-2">
            <Input
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              placeholder="e.g., Photography, Food tours..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
            />
            <Button 
              onClick={addCustomInterest}
              disabled={!customInterest.trim()}
              size="sm"
              variant="outline"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Interests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {allInterests.map((interest) => {
            const currentPreference = memberPreferences[currentMember]?.[interest.value];
            return (
              <div key={interest.value} className="space-y-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{interest.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{interest.label}</h3>
                        <p className="text-sm text-gray-600 truncate">{interest.description}</p>
                      </div>
                      <interest.icon className="w-5 h-5 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{interest.description}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Preference Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setMemberPreference(interest.value, 'must-have')}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1",
                      currentPreference === 'must-have'
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    )}
                  >
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-medium">Must-have</span>
                  </button>
                  <button
                    onClick={() => setMemberPreference(interest.value, 'okay-with')}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1",
                      currentPreference === 'okay-with'
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-yellow-300"
                    )}
                  >
                    <Smile className="w-5 h-5 text-yellow-600" />
                    <span className="text-xs font-medium">Okay with</span>
                  </button>
                  <button
                    onClick={() => setMemberPreference(interest.value, 'no-go')}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1",
                      currentPreference === 'no-go'
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-red-300"
                    )}
                  >
                    <X className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-medium">No-go</span>
                  </button>
                </div>

                {/* Group Summary for multi-member trips */}
                {groupSizeNum > 1 && (
                  <div className="flex gap-2 text-xs">
                    {(() => {
                      const summary = getGroupSummary(interest.value);
                      return (
                        <>
                          {summary['must-have'] > 0 && (
                            <Badge variant="outline" className="text-green-700 border-green-300">
                              {summary['must-have']} ✅
                            </Badge>
                          )}
                          {summary['okay-with'] > 0 && (
                            <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                              {summary['okay-with']} 🙂
                            </Badge>
                          )}
                          {summary['no-go'] > 0 && (
                            <Badge variant="outline" className="text-red-700 border-red-300">
                              {summary['no-go']} 🚫
                            </Badge>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Group Preference Summary Bar */}
        {groupSizeNum > 1 && (
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <h3 className="font-medium text-gray-900 mb-3">Group Preference Summary</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {allInterests.map((interest) => {
                const summary = getGroupSummary(interest.value);
                const hasAnyPreference = summary['must-have'] + summary['okay-with'] + summary['no-go'] > 0;
                if (!hasAnyPreference) return null;
                
                return (
                  <div key={interest.value} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{interest.emoji} {interest.label}</span>
                    <div className="flex gap-2">
                      {summary['must-have'] > 0 && (
                        <span className="text-green-700 font-medium">{summary['must-have']} must-have</span>
                      )}
                      {summary['okay-with'] > 0 && (
                        <span className="text-yellow-700 font-medium">{summary['okay-with']} okay</span>
                      )}
                      {summary['no-go'] > 0 && (
                        <span className="text-red-700 font-medium">{summary['no-go']} no-go</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 h-12 text-lg font-semibold rounded-xl"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            className="flex-1 h-12 text-lg font-semibold rounded-xl"
          >
            Continue to Budget
            <span className="ml-2">💰</span>
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StepTwo;