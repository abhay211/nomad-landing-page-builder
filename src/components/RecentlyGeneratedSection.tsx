
import React, { useState, useEffect } from 'react';
import tokyoImage from '../assets/tokyo-itinerary.jpg';
import santoriniImage from '../assets/santorini-itinerary.jpg';
import baliImage from '../assets/bali-itinerary.jpg';
import parisImage from '../assets/paris-itinerary.jpg';
import australiaImage from '../assets/australia-itinerary.jpg';
import thailandImage from '../assets/thailand-itinerary.jpg';
import turkeyImage from '../assets/turkey-itinerary.jpg';

const RecentlyGeneratedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const itineraries = [
    {
      id: 1,
      image: tokyoImage,
      destination: "Tokyo, Japan",
      duration: "7 Days",
      highlights: ["Shibuya Crossing Experience", "Mount Fuji Day Trip", "Traditional Sushi Making"],
      budget: "$$"
    },
    {
      id: 2,
      image: santoriniImage,
      destination: "Santorini, Greece",
      duration: "5 Days",
      highlights: ["Oia Sunset Photography", "Wine Tasting in Fira", "Black Sand Beach Adventure"],
      budget: "$$$"
    },
    {
      id: 3,
      image: baliImage,
      destination: "Bali, Indonesia",
      duration: "6 Days",
      highlights: ["Tegallalang Rice Terraces", "Tanah Lot Temple Visit", "Ubud Monkey Forest"],
      budget: "$$"
    },
    {
      id: 4,
      image: parisImage,
      destination: "Paris, France",
      duration: "4 Days",
      highlights: ["Louvre Museum Tour", "Seine River Cruise", "Montmartre Artist District"],
      budget: "$$$"
    },
    {
      id: 5,
      image: australiaImage,
      destination: "Sydney, Australia",
      duration: "8 Days",
      highlights: ["Opera House & Harbour Bridge", "Great Barrier Reef Diving", "Uluru Sacred Rock"],
      budget: "$$$"
    },
    {
      id: 6,
      image: thailandImage,
      destination: "Bangkok, Thailand",
      duration: "6 Days",
      highlights: ["Grand Palace Complex", "Floating Market Adventure", "Phi Phi Islands Beach"],
      budget: "$$"
    },
    {
      id: 7,
      image: turkeyImage,
      destination: "Istanbul, Turkey",
      duration: "5 Days",
      highlights: ["Hagia Sophia History", "Cappadocia Hot Air Balloons", "Grand Bazaar Shopping"],
      budget: "$$"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itineraries.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [itineraries.length]);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-albert-sans font-light text-[62px] leading-[70px] tracking-[-0.04em] text-gray-900 mb-4">
            Recently generated{' '}
            <span style={{ color: '#92B193' }}>itineraries</span>
          </h2>
          <p className="font-albert-sans text-gray-600 text-lg max-w-2xl mx-auto">
            Real trips crafted by our AI for travelers just like you. Get inspired by these personalized adventures.
          </p>
        </div>

        {/* Enhanced Card Display */}
        <div className="flex justify-center items-center">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl">
            {/* Image Container */}
            <div className="relative w-[450px] h-[450px] flex-shrink-0">
              <div className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden transform transition-transform duration-500 hover:scale-105">
                <img 
                  src={itineraries[currentIndex].image} 
                  alt={`${itineraries[currentIndex].destination} travel destination`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            </div>
            
            {/* Information Panel */}
            <div className="flex-1 max-w-lg">
              <div className="text-center lg:text-left space-y-6">
                {/* Destination Info */}
                <div>
                  <div className="inline-block px-3 py-1 bg-[#92B193]/10 text-[#92B193] rounded-full text-sm font-medium mb-3">
                    Featured Destination
                  </div>
                  <h3 className="font-albert-sans text-4xl font-medium text-gray-900 mb-3">
                    {itineraries[currentIndex].destination}
                  </h3>
                  <p className="text-gray-600 text-lg mb-4">
                    Discover the magic of this incredible destination with our carefully curated itinerary
                  </p>
                </div>

                {/* Trip Details */}
                <div className="flex items-center justify-center lg:justify-start gap-6 py-4 border-l-4 border-[#92B193] pl-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#92B193]">{itineraries[currentIndex].duration}</div>
                    <div className="text-sm text-gray-500">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#92B193]">{itineraries[currentIndex].budget}</div>
                    <div className="text-sm text-gray-500">Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#92B193]">{itineraries[currentIndex].highlights.length}</div>
                    <div className="text-sm text-gray-500">Highlights</div>
                  </div>
                </div>
                
                {/* Highlights */}
                <div className="space-y-4">
                  <h4 className="font-albert-sans text-xl font-semibold text-gray-900 flex items-center">
                    <span className="text-2xl mr-2">🌟</span>
                    What makes this trip special
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {itineraries[currentIndex].highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-[#92B193]/5 transition-colors duration-300">
                        <div className="w-2 h-2 bg-[#92B193] rounded-full mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-albert-sans font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* CTA */}
                <div className="pt-4">
                  <button className="w-full lg:w-auto px-8 py-4 bg-[#92B193] text-white rounded-xl hover:bg-[#7a9b7b] transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    🚀 Start Planning Your Trip
                  </button>
                  <p className="text-sm text-gray-500 mt-2 text-center lg:text-left">
                    Join 10,000+ travelers who trusted our AI
                  </p>
                </div>
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
