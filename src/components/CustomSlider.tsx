
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
      <div className="custom-slider">
        <Slider
          value={value}
          onValueChange={onValueChange}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-slider .slider-track {
            background-color: #E5E7EB;
          }
          .custom-slider .slider-range {
            background-color: #92B193;
          }
          .custom-slider .slider-thumb {
            background-color: #92B193;
            border-color: #92B193;
          }
          .custom-slider [data-radix-collection-item] {
            background-color: #92B193;
            border-color: #92B193;
          }
        `
      }} />
    </div>
  );
};

export default CustomSlider;
