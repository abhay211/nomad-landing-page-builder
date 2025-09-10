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
  const [currentCard, setCurrentCard] = useState(0);

  // Initialize smart defaults
  React.useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (!travelYear) setTravelYear(currentYear.toString());
    if (!groupSize) setGroupSize(2);
    if (!budgetTier) setBudgetTier('mid-range');
    if (!decisionMode) setDecisionMode('fair');
    
  }, []);

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

  const cards = [
    { id: 'destination', title: 'Where to?', subtitle: 'Pick your dream destination' },
    { id: 'dates', title: 'When?', subtitle: 'Choose your travel dates' },
    { id: 'group', title: 'Who?', subtitle: 'Tell us about your group' },
    { id: 'style', title: 'How?', subtitle: 'What kind of trip do you want?' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">Let's plan something amazing ✨</h2>
        <p className="text-gray-600 text-lg">Just a few quick questions to get started</p>
        
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {cards.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index <= currentCard ? "bg-primary" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>

      {/* Card-based Progressive Disclosure */}
      <div className="space-y-6">
        {/* Destination Card */}
        <div className={cn(
          "p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer",
          currentCard >= 0 ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
        )} onClick={() => setCurrentCard(Math.max(currentCard, 0))}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Where to? 🌍</h3>
              <p className="text-gray-600">Pick your dream destination</p>
            </div>
          </div>
          
          <div className="relative">
            <Input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowDestinationSuggestions(true);
                setCurrentCard(Math.max(currentCard, 1));
              }}
              onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
              placeholder="Start typing a city or country..."
              className="h-14 text-lg border-2 border-gray-200 focus:border-primary rounded-xl"
            />
            {showDestinationSuggestions && destination && destination.trim() && filteredDestinations.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-10 mt-2 max-h-64 overflow-y-auto">
                {filteredDestinations.slice(0, 8).map((dest) => (
                  <button
                    key={dest}
                    onClick={() => {
                      setDestination(dest);
                      setShowDestinationSuggestions(false);
                      setCurrentCard(Math.max(currentCard, 1));
                    }}
                    className="w-full px-6 py-4 text-left hover:bg-primary/10 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-gray-900 font-medium">{dest}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Popular suggestions */}
          {!destination && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-3">Popular destinations:</p>
              <div className="flex flex-wrap gap-2">
                {popularDestinations.slice(0, 6).map((dest) => (
                  <button
                    key={dest}
                    onClick={() => {
                      setDestination(dest);
                      setCurrentCard(Math.max(currentCard, 1));
                    }}
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* When Card */}
        {destination && (
          <div className={cn(
            "p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer",
            currentCard >= 1 ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
          )} onClick={() => setCurrentCard(Math.max(currentCard, 1))}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">When? 📅</h3>
                <p className="text-gray-600">Choose your travel time</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select 
                  value={travelMonth} 
                  onValueChange={(value) => {
                    setTravelMonth(value);
                    setCurrentCard(Math.max(currentCard, 2));
                  }}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl">
                    <SelectValue placeholder="Month" />
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
              <div>
                <Select 
                  value={travelYear} 
                  onValueChange={(value) => {
                    setTravelYear(value);
                    setCurrentCard(Math.max(currentCard, 2));
                  }}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl">
                    <SelectValue placeholder="Year" />
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
          </div>
        )}

        {/* Group Card */}
        {travelMonth && travelYear && (
          <div className={cn(
            "p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer",
            currentCard >= 2 ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
          )} onClick={() => setCurrentCard(Math.max(currentCard, 2))}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Who's going? 👥</h3>
                <p className="text-gray-600">Tell us about your group</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Group Size Stepper */}
              <div className="flex items-center justify-center gap-6 p-4 bg-gray-50 rounded-xl">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setGroupSize(Math.max(1, groupSize - 1));
                    setCurrentCard(Math.max(currentCard, 3));
                  }}
                  disabled={groupSize <= 1}
                  className="h-12 w-12 rounded-full border-2"
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <div className="text-center min-w-[120px]">
                  <div className="text-3xl font-bold text-primary">{groupSize}</div>
                  <div className="text-sm text-gray-600">
                    {groupSize === 1 ? 'Solo traveler' : `${groupSize} people`}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setGroupSize(Math.min(20, groupSize + 1));
                    setCurrentCard(Math.max(currentCard, 3));
                  }}
                  disabled={groupSize >= 20}
                  className="h-12 w-12 rounded-full border-2"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Origin City */}
              <div>
                <Input
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  placeholder="Departure city (optional)"
                  className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* Trip Style Card */}
        {travelMonth && travelYear && groupSize && (
          <div className={cn(
            "p-6 rounded-2xl border-2 transition-all duration-300",
            currentCard >= 3 ? "border-primary bg-primary/5" : "border-gray-200"
          )}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">How long & what style? ⏰</h3>
                <p className="text-gray-600">Choose your trip duration and vibe</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Duration Options */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Trip length:</p>
                <div className="grid grid-cols-3 gap-3">
                  {tripDurationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTripDuration({ type: 'predefined', value: option.value })}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-200",
                        "flex flex-col items-center justify-center text-center hover:scale-105",
                        tripDuration.type === 'predefined' && tripDuration.value === option.value
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-gray-200 hover:border-primary/50"
                      )}
                    >
                      <span className="text-2xl mb-2">{option.emoji}</span>
                      <span className="font-semibold text-sm">{option.label}</span>
                      <span className="text-xs text-gray-500">{option.description}</span>
                    </button>
                  ))}
                </div>
                
                <div className="text-center text-gray-400 text-sm my-3">or custom</div>
                
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
                    placeholder="Custom days"
                    className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                  />
                  <span className="text-gray-600 font-medium">days</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Continue Button */}
      {destination && travelMonth && travelYear && groupSize && (tripDuration.value || tripDuration.customDays) && (
        <div className="sticky bottom-6 pt-6">
          <Button
            onClick={onNext}
            className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            size="lg"
          >
            Perfect! Let's talk interests
            <span className="ml-2">✨</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepOne;