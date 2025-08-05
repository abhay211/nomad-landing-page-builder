import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Waves, Mountain, UtensilsCrossed, Music } from 'lucide-react';

interface StepThreeProps {
  budget: number[];
  setBudget: (budget: number[]) => void;
  specialRequests: string[];
  setSpecialRequests: (requests: string[]) => void;
  customRequests: string;
  setCustomRequests: (requests: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  budget,
  setBudget,
  specialRequests,
  setSpecialRequests,
  customRequests,
  setCustomRequests,
  onSubmit,
  onBack
}) => {
  const [showCustomRequests, setShowCustomRequests] = useState(false);

  const budgetOptions = [
    { value: 1, label: 'Budget', emoji: '💵', description: 'Keep it affordable', color: 'text-green-600' },
    { value: 2, label: 'Mid-range', emoji: '💰', description: 'Comfortable spending', color: 'text-blue-600' },
    { value: 3, label: 'Luxury', emoji: '💎', description: 'Premium experience', color: 'text-purple-600' }
  ];

  const quickRequests = [
    { value: 'beaches', label: 'Beaches', icon: Waves, emoji: '🏖️' },
    { value: 'hiking', label: 'Hiking', icon: Mountain, emoji: '🥾' },
    { value: 'food', label: 'Food Tours', icon: UtensilsCrossed, emoji: '🍕' },
    { value: 'nightlife', label: 'Nightlife', icon: Music, emoji: '🎵' }
  ];

  const currentBudget = budgetOptions.find(option => option.value === budget[0]);

  const toggleSpecialRequest = (request: string) => {
    setSpecialRequests(
      specialRequests.includes(request)
        ? specialRequests.filter(r => r !== request)
        : [...specialRequests, request]
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
            max={3}
            min={1}
            step={1}
            className="w-full"
          />
          
          {/* Budget Labels */}
          <div className="flex justify-between mt-4">
            {budgetOptions.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex flex-col items-center space-y-1 transition-all duration-300",
                  budget[0] === option.value ? "scale-110" : "opacity-60"
                )}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className={cn("font-semibold", option.color)}>{option.label}</span>
                <span className="text-xs text-gray-500 text-center">{option.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Budget Display */}
        <div className="text-center">
          <div className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300",
            "bg-gradient-to-r shadow-lg animate-pulse",
            budget[0] === 1 && "from-green-100 to-green-200 text-green-700",
            budget[0] === 2 && "from-blue-100 to-blue-200 text-blue-700",
            budget[0] === 3 && "from-purple-100 to-purple-200 text-purple-700"
          )}>
            <span className="text-xl">{currentBudget?.emoji}</span>
            <span>{currentBudget?.label} Mode</span>
          </div>
        </div>
      </div>

      {/* Quick Special Requests */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900 block">
          Any must-haves? (Optional)
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickRequests.map((request) => {
            const isSelected = specialRequests.includes(request.value);
            return (
              <button
                key={request.value}
                onClick={() => toggleSpecialRequest(request.value)}
                className={cn(
                  "group p-3 rounded-lg border-2 transition-all duration-200",
                  "flex flex-col items-center justify-center text-center",
                  "hover:scale-105",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-gray-200 hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <span className="text-lg mb-1">{request.emoji}</span>
                <request.icon className={cn(
                  "w-4 h-4 mb-1",
                  isSelected ? "text-primary" : "text-gray-400"
                )} />
                <span className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-primary" : "text-gray-700"
                )}>
                  {request.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Requests */}
        {specialRequests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {specialRequests.map((request) => {
              const requestInfo = quickRequests.find(r => r.value === request);
              return (
                <Badge
                  key={request}
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {requestInfo?.emoji} {requestInfo?.label}
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom Requests Toggle */}
      <div className="space-y-4">
        <button
          onClick={() => setShowCustomRequests(!showCustomRequests)}
          className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
        >
          <span>+ Add special requests</span>
          {showCustomRequests ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showCustomRequests && (
          <div className="animate-fade-in">
            <Textarea
              placeholder="Tell us about any specific needs, accessibility requirements, dietary restrictions, or dream experiences..."
              value={customRequests}
              onChange={(e) => setCustomRequests(e.target.value)}
              className="min-h-[100px] border-2 border-gray-200 focus:border-primary transition-colors resize-none"
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