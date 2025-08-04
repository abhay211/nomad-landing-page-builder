
import React, { useState, useEffect } from 'react';

const RecentlyGeneratedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itineraries.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [itineraries.length]);

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

        {/* Cycling Card Display */}
        <div className="flex justify-center items-center">
          <div className="relative w-[480px] h-[480px]">
            <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="w-full h-full overflow-hidden">
                <img 
                  src={itineraries[currentIndex].image} 
                  alt="Travel destination"
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {itineraries.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#92B193] scale-110' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyGeneratedSection;
