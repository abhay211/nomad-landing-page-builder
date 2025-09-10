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
  const [isFlexible, setIsFlexible] = useState(true);
  const [customInterest, setCustomInterest] = useState('');
  const [memberPreferences, setMemberPreferences] = useState<MemberPreferences[]>([]);
  const [customInterests, setCustomInterests] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showSurpriseMe, setShowSurpriseMe] = useState(false);
  
  const INTERESTS_PER_PAGE = 4;

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

  const handleLikeInterest = (interestValue: string) => {
    if (selectedInterests.includes(interestValue)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interestValue));
    } else {
      setSelectedInterests([...selectedInterests, interestValue]);
    }
  };

  const handleSurpriseMe = () => {
    const randomInterests = interests
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(i => i.value);
    setSelectedInterests(randomInterests);
    setShowSurpriseMe(true);
  };

  const currentInterests = allInterests.slice(
    currentPage * INTERESTS_PER_PAGE,
    (currentPage + 1) * INTERESTS_PER_PAGE
  );

  const totalPages = Math.ceil(allInterests.length / INTERESTS_PER_PAGE);

  return (
    <TooltipProvider>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-gray-900">What do you love? 💝</h2>
          <p className="text-gray-600 text-lg">Just tap what sounds fun - we'll make it work!</p>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === currentPage ? "bg-primary" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* Surprise Me Option */}
        <div className="text-center">
          <Button
            onClick={handleSurpriseMe}
            variant="outline"
            className="mb-6 h-12 px-8 rounded-full border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary/10 transition-all duration-300"
          >
            ✨ Surprise me with great ideas
          </Button>
          {showSurpriseMe && (
            <p className="text-sm text-primary animate-fade-in">Perfect! We picked some amazing activities for you 🎉</p>
          )}
        </div>

        {/* Selected Interests Summary */}
        {selectedInterests.length > 0 && (
          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
            <p className="text-sm font-medium text-primary mb-2">You're excited about:</p>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => {
                const interestInfo = allInterests.find(i => i.value === interest);
                return (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 px-3 py-1"
                  >
                    {interestInfo?.emoji} {interestInfo?.label}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Current Interests Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentInterests.map((interest) => {
            const isSelected = selectedInterests.includes(interest.value);
            return (
              <Tooltip key={interest.value}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleLikeInterest(interest.value)}
                    className={cn(
                      "group p-6 rounded-2xl border-2 transition-all duration-300 text-left",
                      "hover:scale-105 hover:shadow-lg min-h-[140px]",
                      isSelected
                        ? "border-primary bg-primary/10 shadow-md transform scale-105"
                        : "border-gray-200 hover:border-primary/50 hover:bg-primary/5"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{interest.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={cn(
                            "font-semibold text-lg",
                            isSelected ? "text-primary" : "text-gray-900"
                          )}>
                            {interest.label}
                          </h3>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {interest.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{interest.description}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Navigation between interest pages */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              ← Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              Next →
            </Button>
          </div>
        )}

        {/* Add Custom Interest */}
        <div className="text-center">
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              placeholder="Add your own interest..."
              className="flex-1 h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
              onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
            />
            <Button 
              onClick={addCustomInterest}
              disabled={!customInterest.trim()}
              size="sm"
              className="h-12 px-4 rounded-xl"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>


        {/* Navigation */}
        <div className="flex gap-4 sticky bottom-6 pt-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 h-14 text-lg font-semibold rounded-2xl border-2"
          >
            ← Back
          </Button>
          <Button
            onClick={onNext}
            disabled={selectedInterests.length === 0}
            className="flex-1 h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
          >
            Looks great! Continue
            <span className="ml-2">💰</span>
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StepTwo;