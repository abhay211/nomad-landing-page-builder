
import React, { useState, useEffect } from 'react';

const RecentlyGeneratedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const itineraries = [
    {
      id: 1,
      image: "/lovable-uploads/858df27c-78e5-452f-912d-33df4ff25a76.png",
      destination: "Tokyo, Japan",
      duration: "7 Days",
      highlights: ["Cherry Blossoms", "Traditional Temples", "Modern Culture"],
      budget: "$$"
    },
    {
      id: 2,
      image: "/lovable-uploads/a329ae4a-a4be-4c07-8cd4-e2edf96c65b8.png",
      destination: "Santorini, Greece",
      duration: "5 Days",
      highlights: ["Sunset Views", "White Architecture", "Blue Aegean Sea"],
      budget: "$$$"
    },
    {
      id: 3,
      image: "/lovable-uploads/a5b83ce8-3642-4c95-a80d-f3272ebe444c.png",
      destination: "Bali, Indonesia",
      duration: "6 Days",
      highlights: ["Rice Terraces", "Beach Resorts", "Cultural Temples"],
      budget: "$$"
    },
    {
      id: 4,
      image: "/lovable-uploads/339ebabf-34ed-43ed-932c-9bd7f26011ec.png",
      destination: "Paris, France",
      duration: "4 Days",
      highlights: ["Eiffel Tower", "Art Museums", "Romantic Streets"],
      budget: "$$$"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itineraries.length);
    }, 4000);

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

        {/* Enhanced Card Display */}
        <div className="flex justify-center items-center">
          <div className="flex flex-col lg:flex-row items-center gap-8 max-w-5xl">
            {/* Image Container */}
            <div className="relative w-[400px] h-[400px] flex-shrink-0">
              <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <img 
                  src={itineraries[currentIndex].image} 
                  alt={`${itineraries[currentIndex].destination} travel destination`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
            
            {/* Information Panel */}
            <div className="flex-1 max-w-md">
              <div className="text-center lg:text-left">
                <h3 className="font-albert-sans text-3xl font-medium text-gray-900 mb-2">
                  {itineraries[currentIndex].destination}
                </h3>
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <span className="text-[#92B193] font-medium">{itineraries[currentIndex].duration}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{itineraries[currentIndex].budget}</span>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-albert-sans text-lg font-medium text-gray-800 mb-3">
                    Trip Highlights
                  </h4>
                  <ul className="space-y-2">
                    {itineraries[currentIndex].highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center justify-center lg:justify-start">
                        <div className="w-2 h-2 bg-[#92B193] rounded-full mr-3 flex-shrink-0" />
                        <span className="text-gray-600 font-albert-sans">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="mt-6 px-6 py-3 bg-[#92B193] text-white rounded-lg hover:bg-[#7a9b7b] transition-colors duration-300 font-medium">
                  View Full Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {itineraries.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                index === currentIndex ? 'bg-[#92B193] scale-110' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`View itinerary ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyGeneratedSection;
