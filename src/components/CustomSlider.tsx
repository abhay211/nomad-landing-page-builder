
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface CustomSliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const CustomSlider = ({ 
  value, 
  onValueChange, 
  min = 0, 
  max = 100, 
  step = 1,
  className = ""
}: CustomSliderProps) => {
  return (
    <div className={`w-full ${className}`}>
      <Slider
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
        style={{
          '--slider-track': '#E5E7EB',
          '--slider-range': '#92B193',
          '--slider-thumb': '#92B193',
        } as React.CSSProperties}
      />
      <style jsx>{`
        :global(.slider-track) {
          background-color: #E5E7EB;
        }
        :global(.slider-range) {
          background-color: #92B193;
        }
        :global(.slider-thumb) {
          background-color: #92B193;
          border-color: #92B193;
        }
      `}</style>
    </div>
  );
};

export default CustomSlider;
