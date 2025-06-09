
import React from 'react';

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
  const percentage = ((value[0] - min) / (max - min)) * 100;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newValue = min + (clickPosition * (max - min));
    onValueChange([Math.round(newValue / step) * step]);
  };

  return (
    <div className={`w-full ${className}`}>
      <div 
        className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer"
        onClick={handleClick}
      >
        <div 
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-200 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: '#92B193'
          }}
        />
      </div>
    </div>
  );
};

export default CustomSlider;
