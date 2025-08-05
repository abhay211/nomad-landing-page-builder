import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickStartInputProps {
  onQuickStart: (input: string) => void;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    onQuickStart(input);
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