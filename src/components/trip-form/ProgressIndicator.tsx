import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels
}) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Step Progress */}
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                    isActive && "ring-4 ring-primary/20 scale-110",
                    isCompleted
                      ? "bg-primary text-white"
                      : isActive
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <span className="text-sm">✓</span>
                  ) : (
                    <span className="text-sm">{stepNumber}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium transition-colors",
                    isActive ? "text-primary" : "text-gray-500"
                  )}
                >
                  {stepLabels[i]}
                </span>
              </div>
              
              {/* Connector Line */}
              {i < totalSteps - 1 && (
                <div className="flex-1 mx-2">
                  <div
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      isCompleted
                        ? "bg-primary"
                        : "bg-gray-200"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step Text */}
      <div className="text-center mt-2">
        <span className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;