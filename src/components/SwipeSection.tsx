
import React from 'react';
import { Users } from 'lucide-react';

const SwipeSection = () => {
  return (
    <section className="py-20 px-6 font-albert-sans" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header with icon */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white mb-8">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#92B193' }}>
              <Users className="w-8 h-8 text-white" />
            </div>
            <span className="font-albert-sans text-gray-900 text-lg font-medium">Group Travel Planning</span>
          </div>
          
          {/* Main heading */}
          <div className="mb-8">
            <h2 className="font-albert-sans font-light text-[62px] leading-[70px] tracking-[-0.04em] text-gray-900 mb-4">
              Your Dream Trip, One <span style={{ color: '#92B193' }}>Swipe Closer</span>
            </h2>
            <p className="font-albert-sans text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto">
              Personalized. Collaborative. Effortless. Your perfect trip is just a few swipes away
            </p>
          </div>
        </div>

        {/* Main content area with swipe interface */}
        <div className="relative max-w-6xl mx-auto">
          <img 
            src="/lovable-uploads/9a672453-93f1-4ddc-807a-ea1bdd05739e.png" 
            alt="Dream trip swipe interface with travel categories and user collaboration" 
            className="w-full h-auto"
          />
          
          {/* Swipe instruction */}
          <p className="text-center text-gray-400 font-albert-sans text-sm mt-6">
            Swipe left to skip or right to recommend to your group
          </p>
        </div>

        {/* Features list */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid md:grid-cols-2 gap-8">
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
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-12">
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
    </section>
  );
};

export default SwipeSection;
