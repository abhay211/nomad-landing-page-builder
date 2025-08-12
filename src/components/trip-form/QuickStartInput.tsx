import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickStartInputProps {
  onQuickStart: (input: string, parsedData: any) => void;
  className?: string;
}

const QuickStartInput: React.FC<QuickStartInputProps> = ({ onQuickStart, className }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const examples = [
    "Bali trip for 5 people in January",
    "Weekend adventure for 2 in Tokyo",
    "Family vacation to Paris, 1 week",
    "Solo backpacking through Thailand"
  ];

  const parseNaturalLanguage = (text: string) => {
    const lower = text.toLowerCase();
    const parsed: any = {};

    // Extract destination
    const destinations = ['bali', 'paris', 'tokyo', 'thailand', 'new york', 'london', 'rome', 'barcelona', 'santorini', 'bangkok', 'dubai', 'sydney', 'amsterdam'];
    const foundDestination = destinations.find(dest => lower.includes(dest));
    if (foundDestination) {
      const destMap: Record<string, string> = {
        'bali': 'Bali, Indonesia',
        'paris': 'Paris, France',
        'tokyo': 'Tokyo, Japan',
        'thailand': 'Bangkok, Thailand',
        'new york': 'New York, USA',
        'london': 'London, UK',
        'rome': 'Rome, Italy',
        'barcelona': 'Barcelona, Spain',
        'santorini': 'Santorini, Greece',
        'bangkok': 'Bangkok, Thailand',
        'dubai': 'Dubai, UAE',
        'sydney': 'Sydney, Australia',
        'amsterdam': 'Amsterdam, Netherlands'
      };
      parsed.destination = destMap[foundDestination] || foundDestination;
    }

    // Extract months
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const foundMonth = months.find(month => lower.includes(month));
    if (foundMonth) {
      parsed.travelMonth = foundMonth.charAt(0).toUpperCase() + foundMonth.slice(1);
    }

    // Extract group size
    const groupMatch = text.match(/(\d+)\s*people?/i) || text.match(/for\s*(\d+)/i);
    if (groupMatch) {
      parsed.groupSize = parseInt(groupMatch[1]);
    }

    // Extract duration
    if (lower.includes('weekend')) {
      parsed.tripDuration = { type: 'predefined', value: 'weekend' };
    } else if (lower.includes('week') && !lower.includes('weekend')) {
      if (lower.includes('2') || lower.includes('two')) {
        parsed.tripDuration = { type: 'predefined', value: '2-weeks' };
      } else {
        parsed.tripDuration = { type: 'predefined', value: '1-week' };
      }
    } else {
      const dayMatch = text.match(/(\d+)\s*days?/i);
      if (dayMatch) {
        parsed.tripDuration = { type: 'custom', value: 'custom', customDays: parseInt(dayMatch[1]) };
      }
    }

    // Set default year to current year
    parsed.travelYear = new Date().getFullYear().toString();

    // Default budget tier
    parsed.budgetTier = 'mid-range';

    // Default decision mode
    parsed.decisionMode = 'fair';

    return parsed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const parsedData = parseNaturalLanguage(input);
    onQuickStart(input, parsedData);
    setIsProcessing(false);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Quick Start with AI</span>
        </div>
        <p className="text-sm text-gray-600">
          Describe your trip and we'll pre-fill everything for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Bali trip for 5 people in January"
            className="h-12 pr-12 text-base border-2 border-gray-200 focus:border-primary transition-colors"
            disabled={isProcessing}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isProcessing}
            className="absolute right-1 top-1 h-10 w-10 p-0"
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Example suggestions */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setInput(example)}
                className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600 hover:text-gray-800"
                disabled={isProcessing}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </form>

      {isProcessing && (
        <div className="text-center py-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 text-primary">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="ml-2 text-sm font-medium">AI is analyzing your request...</span>
          </div>
        </div>
      )}

      <div className="text-center">
        <div className="inline-block h-px w-12 bg-gray-300" />
        <span className="px-4 text-xs text-gray-500 bg-white">or fill manually</span>
        <div className="inline-block h-px w-12 bg-gray-300" />
      </div>
    </div>
  );
};

export default QuickStartInput;