
import React from 'react';
import { Users } from 'lucide-react';

const SwipeSection = () => {
  return (
    <section className="py-20 px-6 bg-white font-albert-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Travel Card */}
          <div className="relative">
            {/* Detail Card */}
            <div className="relative max-w-md mx-auto">
              <img 
                src="/lovable-uploads/c8bcb5e6-cf56-434e-9b46-7c5942461c67.png" 
                alt="Indonesia travel card with swipe options" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Swipe instruction */}
            <p className="text-center text-gray-400 font-albert-sans text-sm mt-4">
              Swipe left to skip or right to recommend to your group
            </p>
          </div>
          
          {/* Right side - Content */}
          <div className="flex flex-col items-start gap-8 w-full max-w-[695px] h-[526px]">
            {/* Header with icon */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#92B193' }}>
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="font-albert-sans text-gray-900 text-lg font-medium">Group Travel Planning</span>
            </div>
            
            {/* Main heading - now using image */}
            <div className="w-full">
              <img 
                src="/lovable-uploads/82ef55c3-af72-4095-a8cc-ea15226e5984.png" 
                alt="Swipe on YOUR Dream Vacation" 
                className="w-full max-w-md h-auto"
              />
            </div>
            
            {/* Description */}
            <div className="space-y-4">
              <p className="font-albert-sans text-gray-600 text-lg leading-relaxed">
                Swipe to vote on destinations, stays, and things to do.
              </p>
              <p className="font-albert-sans text-gray-600 text-lg leading-relaxed">
                We turn your group's picks into one smart, effortless itinerary.
              </p>
            </div>
            
            {/* Features list */}
            <div className="space-y-4 flex-grow">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center mt-1">
                  <img 
                    src="/lovable-uploads/1653725a-49c8-488a-9b8c-7f0895a49dd5.png" 
                    alt="bullet point" 
                    className="w-4 h-4"
                  />
                </div>
                <span className="font-satoshi text-gray-900 text-lg">Swipe to vote on places, stays, activities and all things fun!</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center mt-1">
                  <img 
                    src="/lovable-uploads/1653725a-49c8-488a-9b8c-7f0895a49dd5.png" 
                    alt="bullet point" 
                    className="w-4 h-4"
                  />
                </div>
                <span className="font-satoshi text-gray-900 text-lg">Instantly compare hotels, flights, cabs and other trip options</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center mt-1">
                  <img 
                    src="/lovable-uploads/1653725a-49c8-488a-9b8c-7f0895a49dd5.png" 
                    alt="bullet point" 
                    className="w-4 h-4"
                  />
                </div>
                <span className="font-satoshi text-gray-900 text-lg">See what your group's loving — in real time</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center mt-1">
                  <img 
                    src="/lovable-uploads/1653725a-49c8-488a-9b8c-7f0895a49dd5.png" 
                    alt="bullet point" 
                    className="w-4 h-4"
                  />
                </div>
                <span className="font-satoshi text-gray-900 text-lg">Get AI-powered itineraries built on what everyone's preferences.</span>
              </div>
            </div>
            
            {/* CTA Button - Updated design */}
            <button className="inline-flex items-center justify-center gap-4 text-white font-plus-jakarta font-medium text-xl px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg" style={{ backgroundColor: '#92B193' }}>
              <span>Create Groups</span>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img 
                  src="/lovable-uploads/bfe7e292-b113-429a-9a8e-a3bc4130d317.png" 
                  alt="arrow" 
                  className="w-6 h-6"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwipeSection;
