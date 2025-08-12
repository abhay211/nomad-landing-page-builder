import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MapPin, Users, Clock, Plane, Calendar, Target, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepOneProps {
  destination: string;
  setDestination: (destination: string) => void;
  travelMonth: string;
  setTravelMonth: (month: string) => void;
  travelYear: string;
  setTravelYear: (year: string) => void;
  originCity: string;
  setOriginCity: (city: string) => void;
  groupSize: number;
  setGroupSize: (size: number) => void;
  tripDuration: { type: 'predefined' | 'custom'; value: string; customDays?: number };
  setTripDuration: (duration: { type: 'predefined' | 'custom'; value: string; customDays?: number }) => void;
  budgetTier: string;
  setBudgetTier: (tier: string) => void;
  decisionMode: string;
  setDecisionMode: (mode: string) => void;
  onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({
  destination,
  setDestination,
  travelMonth,
  setTravelMonth,
  travelYear,
  setTravelYear,
  originCity,
  setOriginCity,
  groupSize,
  setGroupSize,
  tripDuration,
  setTripDuration,
  budgetTier,
  setBudgetTier,
  decisionMode,
  setDecisionMode,
  onNext
}) => {
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const popularDestinations = [
    'Paris, France', 'Tokyo, Japan', 'Bali, Indonesia', 'New York, USA',
    'London, UK', 'Rome, Italy', 'Barcelona, Spain', 'Santorini, Greece',
    'Bangkok, Thailand', 'Dubai, UAE', 'Sydney, Australia', 'Amsterdam, Netherlands'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear + i);

  const tripDurationOptions = [
    { value: 'weekend', label: 'Weekend', emoji: '⚡', description: '2-3 days' },
    { value: '1-week', label: '1 Week', emoji: '📅', description: '4-7 days' },
    { value: '2-weeks', label: '2+ Weeks', emoji: '🌍', description: 'Extended trip' }
  ];

  const budgetTiers = [
    { value: 'budget', label: 'Budget', description: 'Under $100/day' },
    { value: 'mid-range', label: 'Mid-range', description: '$100-300/day' },
    { value: 'luxury', label: 'Luxury', description: '$300+/day' }
  ];

  const decisionModes = [
    { value: 'fair', label: 'Fair', description: 'Equal weight to all preferences' },
    { value: 'organizer-led', label: 'Organizer-led', description: 'Trip creator\'s preferences take priority' },
    { value: 'majority-based', label: 'Majority-based', description: 'Most common preferences take priority' }
  ];

  const filteredDestinations = popularDestinations.filter(dest =>
    dest && destination && dest.toLowerCase().includes(destination.toLowerCase())
  );

  const isValid = destination && travelMonth && travelYear && groupSize > 0 && 
                  (tripDuration.value || tripDuration.customDays) && budgetTier && decisionMode;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Plan Your Trip</h2>
        <p className="text-gray-600">Let's start with the basics</p>
      </div>

      {/* Destination Field */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Destination
        </label>
        <div className="relative">
          <Input
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowDestinationSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
            placeholder="Where do you want to go?"
            className="h-12 text-base"
          />
          {showDestinationSuggestions && destination && destination.trim() && filteredDestinations.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {filteredDestinations.slice(0, 6).map((dest) => (
                <button
                  key={dest}
                  onClick={() => {
                    setDestination(dest);
                    setShowDestinationSuggestions(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{dest}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Travel Month and Year */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Travel Month
          </label>
          <Select value={travelMonth} onValueChange={setTravelMonth}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <label className="text-lg font-medium text-gray-900">Year</label>
          <Select value={travelYear} onValueChange={setTravelYear}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Origin City (Optional) */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary" />
          Departure City <span className="text-sm text-gray-500 font-normal">(Optional)</span>
        </label>
        <Input
          value={originCity}
          onChange={(e) => setOriginCity(e.target.value)}
          placeholder="Where are you departing from?"
          className="h-12 text-base"
        />
      </div>

      {/* Group Size with Numeric Stepper */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Group Size
        </label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
            disabled={groupSize <= 1}
            className="h-12 w-12"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-gray-900">{groupSize}</div>
            <div className="text-sm text-gray-500">
              {groupSize === 1 ? 'person' : 'people'}
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setGroupSize(Math.min(20, groupSize + 1))}
            disabled={groupSize >= 20}
            className="h-12 w-12"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Trip Duration */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          When & How Long?
        </label>
        
        {/* Predefined Duration Options */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {tripDurationOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTripDuration({ type: 'predefined', value: option.value })}
              className={cn(
                "p-3 rounded-lg border-2 transition-all duration-200",
                "flex flex-col items-center justify-center text-center",
                tripDuration.type === 'predefined' && tripDuration.value === option.value
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50"
              )}
            >
              <span className="text-lg mb-1">{option.emoji}</span>
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-gray-500">{option.description}</span>
            </button>
          ))}
        </div>

        <div className="text-center text-gray-500 text-sm">or</div>

        {/* Custom Duration Input */}
        <div className="flex items-center gap-3">
          <Input
            type="number"
            min="1"
            max="365"
            value={tripDuration.customDays || ''}
            onChange={(e) => setTripDuration({ 
              type: 'custom', 
              value: 'custom', 
              customDays: parseInt(e.target.value) || 0 
            })}
            placeholder="Enter days"
            className="h-12 text-base"
          />
          <span className="text-gray-600 font-medium">days</span>
        </div>
      </div>

      {/* Budget Tier */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900">Budget Tier</label>
        <div className="grid grid-cols-3 gap-3">
          {budgetTiers.map((tier) => (
            <button
              key={tier.value}
              onClick={() => setBudgetTier(tier.value)}
              className={cn(
                "p-4 rounded-lg border-2 transition-all duration-200",
                "flex flex-col items-center justify-center text-center",
                budgetTier === tier.value
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50"
              )}
            >
              <span className="font-medium text-sm">{tier.label}</span>
              <span className="text-xs text-gray-500 mt-1">{tier.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Decision Mode */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Decision Mode
        </label>
        <RadioGroup value={decisionMode} onValueChange={setDecisionMode} className="space-y-3">
          {decisionModes.map((mode) => (
            <div key={mode.value} className="flex items-start space-x-3">
              <RadioGroupItem value={mode.value} id={mode.value} className="mt-1" />
              <Label htmlFor={mode.value} className="flex-1 cursor-pointer">
                <div className="font-medium text-gray-900">{mode.label}</div>
                <div className="text-sm text-gray-500">{mode.description}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Continue Button */}
      <Button
        onClick={onNext}
        disabled={!isValid}
        className="w-full h-12 text-lg font-semibold rounded-xl"
        size="lg"
      >
        Continue to Interests
        <span className="ml-2">✨</span>
      </Button>
    </div>
  );
};

export default StepOne;