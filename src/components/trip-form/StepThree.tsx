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
  Palette, Star, Users, Clock, Accessibility, Heart, Trees, Building
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
  onBack
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
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Budget & Final Touches</h2>
        <p className="text-gray-600">Let's make it perfect for your group</p>
      </div>

      {/* Budget Slider */}
      <div className="space-y-6">
        <label className="text-lg font-medium text-gray-900 block">
          What's your budget style?
        </label>
        
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
            "inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300",
            "bg-gradient-to-r shadow-lg",
            budget[0] === 1 && "from-green-100 to-green-200 text-green-700",
            budget[0] === 2 && "from-blue-100 to-blue-200 text-blue-700",
            budget[0] === 3 && "from-purple-100 to-purple-200 text-purple-700",
            budget[0] === 4 && "from-amber-100 to-amber-200 text-amber-700"
          )}>
            <span className="text-xl">{currentBudget?.emoji}</span>
            <span>{currentBudget?.label} Mode</span>
          </div>
        </div>
      </div>

      {/* Must-Have Activities */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900 block">
          Must-have activities? (Optional)
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {mustHaveOptions.map((activity) => {
            const isSelected = mustHaveActivities.includes(activity.value);
            return (
              <button
                key={activity.value}
                onClick={() => toggleMustHaveActivity(activity.value)}
                className={cn(
                  "group p-3 rounded-lg border-2 transition-all duration-200",
                  "flex flex-col items-center justify-center text-center",
                  "hover:scale-105",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-gray-200 hover:border-primary/50 hover:bg-primary/5"
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
          <div className="flex flex-wrap gap-2">
            {mustHaveActivities.map((activity) => {
              const activityInfo = mustHaveOptions.find(a => a.value === activity);
              return (
                <Badge
                  key={activity}
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {activityInfo?.emoji} {activityInfo?.label}
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      {/* Group Experience Style */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Group Experience Style
        </label>
        <RadioGroup value={experienceStyle} onValueChange={setExperienceStyle} className="space-y-3">
          {experienceStyles.map((style) => (
            <div key={style.value} className="flex items-start space-x-3">
              <RadioGroupItem value={style.value} id={style.value} className="mt-1" />
              <Label htmlFor={style.value} className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{style.emoji}</span>
                  <div>
                    <div className="font-medium text-gray-900">{style.label}</div>
                    <div className="text-sm text-gray-500">{style.description}</div>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
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
      <div className="flex gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 h-12 text-lg font-semibold rounded-xl"
        >
          Back
        </Button>
        <Button
          onClick={onSubmit}
          className="flex-1 h-12 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          Create My Itinerary
          <span className="ml-2">🚀</span>
        </Button>
      </div>
    </div>
  );
};

export default StepThree;