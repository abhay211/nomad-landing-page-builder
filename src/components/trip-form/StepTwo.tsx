import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { 
  Leaf, Mountain, Heart, Building, Trees, Palette, Star, Camera,
  Users, User
} from 'lucide-react';

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
  const [sameInterests, setSameInterests] = useState(true);
  const [selectedTraveler, setSelectedTraveler] = useState(0);

  const interests = [
    { value: 'relax', label: 'Relax', icon: Leaf, emoji: '🏖️', description: 'Chill vibes' },
    { value: 'explore', label: 'Explore', icon: Camera, emoji: '🔍', description: 'Discovery' },
    { value: 'adventure', label: 'Adventure', icon: Mountain, emoji: '🏔️', description: 'Thrills' },
    { value: 'wellness', label: 'Wellness', icon: Heart, emoji: '🧘', description: 'Self-care' },
    { value: 'city-life', label: 'City Life', icon: Building, emoji: '🏙️', description: 'Urban buzz' },
    { value: 'nature', label: 'Nature', icon: Trees, emoji: '🌿', description: 'Outdoors' },
    { value: 'culture', label: 'Culture', icon: Palette, emoji: '🎨', description: 'Local life' },
    { value: 'hidden-gems', label: 'Hidden Gems', icon: Star, emoji: '💎', description: 'Off-path' }
  ];

  const travelerCount = groupSize === 'solo' ? 1 : 
                       groupSize === '2-3' ? 3 : 
                       groupSize === '4-6' ? 5 : 7;

  const toggleInterest = (interest: string) => {
    setSelectedInterests(
      selectedInterests.includes(interest)
        ? selectedInterests.filter(i => i !== interest)
        : [...selectedInterests, interest]
    );
  };

  const getInterestMessage = () => {
    if (selectedInterests.length === 0) return "Tap some interests to get started! 👆";
    if (selectedInterests.length === 1) {
      const interest = interests.find(i => i.value === selectedInterests[0]);
      return `${interest?.emoji} ${interest?.label} mode activated!`;
    }
    return `${selectedInterests.length} amazing vibes selected! ✨`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">What's your group's vibe?</h2>
        <p className="text-gray-600">Pick the interests that spark joy</p>
      </div>

      {/* Same Interests Toggle - only show for groups */}
      {groupSize !== 'solo' && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-medium">Everyone has the same interests?</span>
          </div>
          <Switch
            checked={sameInterests}
            onCheckedChange={setSameInterests}
          />
        </div>
      )}

      {/* Traveler Avatars - only show when different interests */}
      {groupSize !== 'solo' && !sameInterests && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: Math.min(travelerCount, 5) }, (_, i) => (
            <button
              key={i}
              onClick={() => setSelectedTraveler(i)}
              className={cn(
                "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all",
                selectedTraveler === i
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-white hover:border-primary"
              )}
            >
              <User className="w-5 h-5" />
            </button>
          ))}
          {travelerCount > 5 && (
            <div className="w-12 h-12 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-sm">
              +{travelerCount - 5}
            </div>
          )}
        </div>
      )}

      {/* Interests Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {interests.map((interest) => {
          const isSelected = selectedInterests.includes(interest.value);
          return (
            <button
              key={interest.value}
              onClick={() => toggleInterest(interest.value)}
              className={cn(
                "group relative p-4 rounded-xl border-2 transition-all duration-300",
                "flex flex-col items-center justify-center min-h-[110px] text-center",
                "hover:scale-105 hover:shadow-lg",
                isSelected
                  ? "border-primary bg-primary/10 shadow-lg transform scale-105"
                  : "border-gray-200 hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              {/* Animated Background */}
              <div className={cn(
                "absolute inset-0 rounded-xl transition-all duration-300",
                isSelected 
                  ? "bg-gradient-to-br from-primary/10 to-primary/5" 
                  : "group-hover:bg-gradient-to-br group-hover:from-primary/5 group-hover:to-transparent"
              )} />
              
              <div className="relative z-10 space-y-2">
                <div className={cn(
                  "text-3xl transition-transform duration-300",
                  isSelected && "animate-bounce"
                )}>
                  {interest.emoji}
                </div>
                <interest.icon className={cn(
                  "w-6 h-6 mx-auto transition-colors",
                  isSelected ? "text-primary" : "text-gray-400"
                )} />
                <div>
                  <span className="font-semibold text-gray-900 block">{interest.label}</span>
                  <span className="text-xs text-gray-500">{interest.description}</span>
                </div>
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Fun Message */}
      <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p className="text-primary font-medium animate-fade-in">
          {getInterestMessage()}
        </p>
      </div>

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
          disabled={selectedInterests.length === 0}
          className="flex-1 h-12 text-lg font-semibold rounded-xl"
        >
          Continue to Budget
          <span className="ml-2">💰</span>
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;