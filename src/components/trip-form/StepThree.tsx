import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  ChevronDown, ChevronUp, Waves, Mountain, UtensilsCrossed, Music, Camera, 
  Palette, Star, Users, Clock, Accessibility, Heart, Trees, Building, Check
} from 'lucide-react';

interface StepThreeProps {
  budget: number[];
  setBudget: (budget: number[]) => void;
  mustHaveActivities: string[];
  setMustHaveActivities: (activities: string[]) => void;
  specialRequests: string;
  setSpecialRequests: (requests: string) => void;
  experienceStyle: string;
  setExperienceStyle: (style: string) => void;
  accessibilityNeeds: string;
  setAccessibilityNeeds: (needs: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const StepThree: React.FC<StepThreeProps> = ({
  budget,
  setBudget,
  mustHaveActivities,
  setMustHaveActivities,
  specialRequests,
  setSpecialRequests,
  experienceStyle,
  setExperienceStyle,
  accessibilityNeeds,
  setAccessibilityNeeds,
  onSubmit,
  onBack,
  isSubmitting = false
}) => {
  const [showSpecialRequests, setShowSpecialRequests] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  const budgetOptions = [
    { value: 1, label: 'Budget', emoji: '💵', description: 'Affordable options', color: 'text-green-600' },
    { value: 2, label: 'Mid-range', emoji: '💰', description: 'Comfortable spending', color: 'text-blue-600' },
    { value: 3, label: 'High-end', emoji: '💎', description: 'Premium experiences', color: 'text-purple-600' },
    { value: 4, label: 'Luxury', emoji: '🏝️', description: 'Ultra-premium', color: 'text-amber-600' }
  ];

  const mustHaveOptions = [
    { value: 'beaches', label: 'Beaches', icon: Waves, emoji: '🏖️' },
    { value: 'hiking', label: 'Hiking', icon: Mountain, emoji: '🥾' },
    { value: 'food-tours', label: 'Food Tours', icon: UtensilsCrossed, emoji: '🍕' },
    { value: 'nightlife', label: 'Nightlife', icon: Music, emoji: '🎵' },
    { value: 'photography', label: 'Photography', icon: Camera, emoji: '📸' },
    { value: 'museums', label: 'Museums', icon: Palette, emoji: '🎨' },
    { value: 'hidden-gems', label: 'Hidden Gems', icon: Star, emoji: '💎' },
    { value: 'wellness', label: 'Wellness', icon: Heart, emoji: '🧘' },
    { value: 'nature', label: 'Nature', icon: Trees, emoji: '🌿' },
    { value: 'city-tours', label: 'City Tours', icon: Building, emoji: '🏙️' }
  ];

  const experienceStyles = [
    { 
      value: 'relaxed', 
      label: 'Relaxed', 
      emoji: '🛋️', 
      description: 'More free time, fewer activities per day' 
    },
    { 
      value: 'balanced', 
      label: 'Balanced', 
      emoji: '⚖️', 
      description: 'Moderate number of activities per day' 
    },
    { 
      value: 'packed', 
      label: 'Packed Days', 
      emoji: '⚡', 
      description: 'Full schedules with lots of activities' 
    }
  ];

  const currentBudget = budgetOptions.find(option => option.value === budget[0]);

  const toggleMustHaveActivity = (activity: string) => {
    setMustHaveActivities(
      mustHaveActivities.includes(activity)
        ? mustHaveActivities.filter(a => a !== activity)
        : [...mustHaveActivities, activity]
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">Almost there! 🎯</h2>
        <p className="text-gray-600 text-lg">Just a few final touches to make it perfect</p>
      </div>

      {/* Budget Slider */}
      <div className="p-6 rounded-2xl border-2 border-primary/20 bg-primary/5 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">What's your budget style? 💸</h3>
          <p className="text-gray-600">Don't worry - we'll find amazing options at any price point</p>
        </div>
        
        <div className="relative">
          <Slider
            value={budget}
            onValueChange={setBudget}
            max={4}
            min={1}
            step={1}
            className="w-full"
          />
          
          {/* Budget Labels */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {budgetOptions.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex flex-col items-center space-y-1 transition-all duration-300 p-2 rounded-lg",
                  budget[0] === option.value ? "scale-110 bg-primary/5" : "opacity-60"
                )}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className={cn("font-semibold text-center", option.color)}>{option.label}</span>
                <span className="text-xs text-gray-500 text-center">{option.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Budget Display */}
        <div className="text-center">
          <div className={cn(
            "inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-300 transform scale-110",
            "bg-gradient-to-r shadow-xl border-2",
            budget[0] === 1 && "from-green-100 to-green-200 text-green-700 border-green-300",
            budget[0] === 2 && "from-blue-100 to-blue-200 text-blue-700 border-blue-300",
            budget[0] === 3 && "from-purple-100 to-purple-200 text-purple-700 border-purple-300",
            budget[0] === 4 && "from-amber-100 to-amber-200 text-amber-700 border-amber-300"
          )}>
            <span className="text-2xl">{currentBudget?.emoji}</span>
            <span>{currentBudget?.label} Traveler</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{currentBudget?.description}</p>
        </div>
      </div>

      {/* Must-Have Activities */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Any must-do activities? 🎯</h3>
          <p className="text-gray-600">Pick up to 3 things you absolutely can't miss</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {mustHaveOptions.map((activity) => {
            const isSelected = mustHaveActivities.includes(activity.value);
            return (
              <button
                key={activity.value}
                onClick={() => {
                  if (!isSelected && mustHaveActivities.length >= 3) return;
                  toggleMustHaveActivity(activity.value);
                }}
                disabled={!isSelected && mustHaveActivities.length >= 3}
                className={cn(
                  "group p-4 rounded-xl border-2 transition-all duration-200",
                  "flex flex-col items-center justify-center text-center",
                  "hover:scale-105 min-h-[100px]",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-lg transform scale-105"
                    : "border-gray-200 hover:border-primary/50 hover:bg-primary/5",
                  mustHaveActivities.length >= 3 && !isSelected && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="text-lg mb-1">{activity.emoji}</span>
                <activity.icon className={cn(
                  "w-4 h-4 mb-1",
                  isSelected ? "text-primary" : "text-gray-400"
                )} />
                <span className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-primary" : "text-gray-700"
                )}>
                  {activity.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Activities */}
        {mustHaveActivities.length > 0 && (
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-sm font-medium text-primary mb-2">Your must-dos:</p>
            <div className="flex flex-wrap gap-2">
              {mustHaveActivities.map((activity) => {
                const activityInfo = mustHaveOptions.find(a => a.value === activity);
                return (
                  <Badge
                    key={activity}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 px-3 py-1"
                  >
                    {activityInfo?.emoji} {activityInfo?.label}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {mustHaveActivities.length >= 3 && (
          <p className="text-sm text-amber-600 text-center">
            Perfect! You've picked 3 must-dos. Remove one to add another.
          </p>
        )}
      </div>

      {/* Group Experience Style */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">What's your pace? ⚡</h3>
          <p className="text-gray-600">How do you like to experience a new place?</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {experienceStyles.map((style) => (
            <button
              key={style.value}
              onClick={() => setExperienceStyle(style.value)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                "hover:scale-[1.02] hover:shadow-md",
                experienceStyle === style.value
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-gray-200 hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{style.emoji}</span>
                <div className="flex-1">
                  <div className={cn(
                    "font-semibold text-lg mb-1",
                    experienceStyle === style.value ? "text-primary" : "text-gray-900"
                  )}>
                    {style.label}
                  </div>
                  <div className="text-sm text-gray-600">{style.description}</div>
                </div>
                {experienceStyle === style.value && (
                  <Check className="w-6 h-6 text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-4">
        <button
          onClick={() => setShowSpecialRequests(!showSpecialRequests)}
          className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
        >
          <span>+ Add special requests</span>
          {showSpecialRequests ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showSpecialRequests && (
          <div className="animate-fade-in">
            <Textarea
              placeholder="Tell us about specific requirements (e.g., 'Include a rooftop dinner', 'Pet-friendly stays', 'Vegetarian restaurants')..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="min-h-[100px] border-2 border-gray-200 focus:border-primary transition-colors resize-none"
            />
          </div>
        )}
      </div>

      {/* Accessibility Needs */}
      <div className="space-y-4">
        <button
          onClick={() => setShowAccessibility(!showAccessibility)}
          className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
        >
          <Accessibility className="w-4 h-4" />
          <span>+ Accessibility or mobility needs (Optional)</span>
          {showAccessibility ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAccessibility && (
          <div className="animate-fade-in">
            <Textarea
              placeholder="Please describe any accessibility requirements, mobility aids needed, or special accommodations..."
              value={accessibilityNeeds}
              onChange={(e) => setAccessibilityNeeds(e.target.value)}
              className="min-h-[80px] border-2 border-gray-200 focus:border-primary transition-colors resize-none"
            />
          </div>
        )}
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
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating magic...
            </>
          ) : (
            <>
              Create my perfect trip
              <span className="ml-2">🚀</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepThree;