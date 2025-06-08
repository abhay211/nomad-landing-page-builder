
import React from 'react';
import { Users } from 'lucide-react';

const SwipeSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
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
            <p className="text-center text-gray-400 font-satoshi text-sm mt-4">
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
              <span className="font-satoshi text-gray-900 text-lg font-medium">Group Travel Planning</span>
            </div>
            
            {/* Main heading */}
            <h2 className="font-satoshi font-bold text-5xl lg:text-6xl leading-tight">
              <span className="text-gray-900">Swipe on YOUR</span>
              <br />
              <span style={{ color: '#92B193' }}>Dream Vacation.</span>
            </h2>
            
            {/* Description */}
            <div className="space-y-4">
              <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
                Swipe to vote on destinations, stays, and things to do.
              </p>
              <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
                We turn your group's picks into one smart, effortless itinerary.
              </p>
            </div>
            
            {/* Features list */}
            <div className="space-y-4 flex-grow">
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
            <button className="inline-flex items-center gap-3 text-white font-satoshi font-medium text-lg px-8 py-4 rounded-full transition-colors" style={{ backgroundColor: '#92B193' }}>
              Create Groups
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-1 rounded-full" style={{ backgroundColor: '#92B193' }}></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwipeSection;
