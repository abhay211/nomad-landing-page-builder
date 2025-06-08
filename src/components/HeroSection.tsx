
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/c79d0a0f-c625-49b7-95b5-5811214407e9.png')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Headline */}
        <h1 className="font-satoshi font-bold text-white mb-8 leading-tight tracking-normal">
          <span className="block text-[80px] leading-[84px] md:text-[80px] md:leading-[84px] sm:text-[60px] sm:leading-[64px]">
            Group trips. Minus
          </span>
          <span className="block text-[80px] leading-[84px] md:text-[80px] md:leading-[84px] sm:text-[60px] sm:leading-[64px]">
            the group chat chaos.
          </span>
        </h1>
        
        {/* Subheader */}
        <div className="font-satoshi font-normal text-white text-[20px] leading-[32px] tracking-[0.5%] mb-12 max-w-3xl mx-auto">
          <p className="mb-4">
            Just swipe to pick what you love and Nomad builds AI-powered itineraries
            around your group's real preferences.
          </p>
          <p>
            No chaos. No wasted weekends. Just an unforgettable trip that finally gets out
            of the group chat.
          </p>
        </div>
        
        {/* CTA Button */}
        <button className="inline-flex items-center gap-3 bg-white text-gray-900 font-satoshi font-medium text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg">
          Plan Your Trip Now
          <div className="w-10 h-10 bg-sage-500 rounded-full flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
