
import React from 'react';

const SwipeSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Travel Card */}
          <div className="relative">
            {/* Card */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-md mx-auto">
              {/* Header */}
              <div className="p-4 text-center">
                <p className="font-satoshi text-gray-600 text-sm">Suggested by Alex</p>
              </div>
              
              {/* Image with location tag */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/c8bcb5e6-cf56-434e-9b46-7c5942461c67.png" 
                  alt="Indonesia coastline" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="font-satoshi text-sm">Indonesia</span>
                </div>
              </div>
              
              {/* Trip duration */}
              <div className="p-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                    <span className="font-satoshi font-bold text-2xl">5 Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="font-satoshi font-bold text-2xl">6 Nights</span>
                  </div>
                </div>
                
                {/* Features list */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-sage-500 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="font-satoshi text-sm text-gray-700">Includes beachfront accommodation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-sage-500 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="font-satoshi text-sm text-gray-700">Local experiences</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-sage-500 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="font-satoshi text-sm text-gray-700">Free guided tour to must-see spots</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-sage-500 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="font-satoshi text-sm text-gray-700">Ideal for 4–6 people, flexible pace</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-sage-500 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="font-satoshi text-sm text-gray-700">Great for hikes and chill days</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-sage-500 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="font-satoshi text-sm text-gray-700">Several party places in 6mi radius</span>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex justify-center gap-6">
                  <button className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                    <img 
                      src="/lovable-uploads/0a08ccd5-fe89-4814-8086-97ac7e1a12fd.png" 
                      alt="Cross and Heart buttons" 
                      className="w-full h-full object-contain"
                    />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Swipe instruction */}
            <p className="text-center text-gray-400 font-satoshi text-sm mt-4">
              Swipe left to skip or right to recommend to your group
            </p>
          </div>
          
          {/* Right side - Content */}
          <div className="lg:pl-12">
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-sage-500 rounded-sm"></div>
                </div>
              </div>
              <span className="font-satoshi text-gray-600 text-lg">Group Travel Planning</span>
            </div>
            
            {/* Main heading */}
            <h2 className="font-satoshi font-bold text-5xl lg:text-6xl leading-tight mb-8">
              <span className="text-gray-900">Swipe on YOUR</span>
              <br />
              <span className="text-sage-500">Dream Vacation.</span>
            </h2>
            
            {/* Description */}
            <div className="mb-12 space-y-4">
              <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
                Swipe to vote on destinations, stays, and things to do.
              </p>
              <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
                We turn your group's picks into one smart, effortless itinerary.
              </p>
            </div>
            
            {/* Features list */}
            <div className="space-y-4 mb-12">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-satoshi text-gray-900 text-lg">Swipe to vote on places, stays, activities and all things fun!</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-satoshi text-gray-900 text-lg">Instantly compare hotels, flights, cabs and other trip options</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-satoshi text-gray-900 text-lg">See what your group's loving — in real time</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-satoshi text-gray-900 text-lg">Get AI-powered itineraries built on what everyone's preferences.</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <button className="inline-flex items-center gap-3 bg-sage-500 text-white font-satoshi font-medium text-lg px-8 py-4 rounded-full hover:bg-sage-600 transition-colors">
              Create Groups
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-1 bg-sage-500 rounded-full"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwipeSection;
