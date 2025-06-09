
import React, { useState } from 'react';
import CustomSlider from './CustomSlider';

const RecentlyGeneratedSection = () => {
  const [sliderValue, setSliderValue] = useState([50]);
  
  const itineraries = [
    {
      id: 1,
      image: "/lovable-uploads/858df27c-78e5-452f-912d-33df4ff25a76.png",
    },
    {
      id: 2,
      image: "/lovable-uploads/a329ae4a-a4be-4c07-8cd4-e2edf96c65b8.png",
    },
    {
      id: 3,
      image: "/lovable-uploads/a5b83ce8-3642-4c95-a80d-f3272ebe444c.png",
    },
    {
      id: 4,
      image: "/lovable-uploads/339ebabf-34ed-43ed-932c-9bd7f26011ec.png",
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-albert-sans font-light text-[62px] leading-[70px] tracking-[-0.04em] text-gray-900 mb-4">
            Recently generated{' '}
            <span style={{ color: '#92B193' }}>itineraries</span>
          </h2>
        </div>

        {/* Slider */}
        <div className="mb-12 max-w-md mx-auto">
          <CustomSlider
            value={sliderValue}
            onValueChange={setSliderValue}
            min={0}
            max={100}
            step={1}
            className="mb-4"
          />
          <div className="text-center text-sm text-gray-600">
            Value: {sliderValue[0]}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col items-center p-0 gap-[60px] w-[1320px] h-[526px] mx-auto">
          <div className="grid grid-cols-4 gap-6 w-full">
            {itineraries.map((itinerary) => (
              <div key={itinerary.id} className="group cursor-pointer flex flex-col w-[318px] h-[396px]">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={itinerary.image} 
                      alt="Travel destination"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyGeneratedSection;
