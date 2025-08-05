import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface StepOneProps {
  groupSize: string;
  setGroupSize: (size: string) => void;
  dates: { from?: Date; to?: Date };
  setDates: (dates: { from?: Date; to?: Date }) => void;
  tripLength: string;
  setTripLength: (length: string) => void;
  onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({
  groupSize,
  setGroupSize,
  dates,
  setDates,
  tripLength,
  setTripLength,
  onNext
}) => {
  const groupSizeOptions = [
    { value: 'solo', label: 'Solo', emoji: '🚶', description: 'Just me' },
    { value: '2-3', label: '2-3', emoji: '👫', description: 'Small group' },
    { value: '4-6', label: '4-6', emoji: '👥', description: 'Medium group' },
    { value: '7+', label: '7+', emoji: '🎉', description: 'Large group' }
  ];

  const tripLengthOptions = [
    { value: 'weekend', label: 'Weekend', emoji: '⚡', description: '2-3 days' },
    { value: '1-week', label: '1 Week', emoji: '📅', description: '4-7 days' },
    { value: '2-weeks', label: '2+ Weeks', emoji: '🌍', description: 'Extended trip' }
  ];

  const isValid = groupSize && (dates.from || tripLength);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Who's joining this adventure?</h2>
        <p className="text-gray-600">Let's start with the basics</p>
      </div>

      {/* Group Size Selection */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Group Size
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {groupSizeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setGroupSize(option.value)}
              className={cn(
                "relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105",
                "flex flex-col items-center justify-center min-h-[100px] text-center",
                groupSize === option.value
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-gray-200 hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              <span className="text-2xl mb-2">{option.emoji}</span>
              <span className="font-semibold text-gray-900">{option.label}</span>
              <span className="text-sm text-gray-500">{option.description}</span>
              {groupSize === option.value && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Trip Dates or Quick Length */}
      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          When & How Long?
        </label>
        
        {/* Quick Length Options */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {tripLengthOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setTripLength(option.value);
                setDates({ from: undefined, to: undefined });
              }}
              className={cn(
                "p-3 rounded-lg border-2 transition-all duration-200",
                "flex flex-col items-center justify-center text-center",
                tripLength === option.value
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

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 justify-start text-left font-normal",
                !dates.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dates.from ? (
                dates.to ? (
                  <>
                    {format(dates.from, "LLL dd, y")} - {format(dates.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dates.from, "LLL dd, y")
                )
              ) : (
                <span>Pick specific dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dates?.from}
              selected={dates.from && dates.to ? { from: dates.from, to: dates.to } : undefined}
              onSelect={(range) => {
                setDates(range || { from: undefined, to: undefined });
                setTripLength('');
              }}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
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