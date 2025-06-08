
import React from 'react';

const AIPoweredSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col items-start gap-8">
            {/* Header with icon - updated background to match section */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-50">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#92B193' }}>
                <img 
                  src="/lovable-uploads/8090b5f5-c535-4a9c-b059-84c12e0e6ee7.png" 
                  alt="AI-Powered Travel Planning" 
                  className="w-6 h-6"
                />
              </div>
              <span className="font-albert-sans text-gray-900 text-lg font-medium">AI-Powered Travel Planning</span>
            </div>
            
            {/* Main heading with exact specifications */}
            <div className="space-y-6">
              <div className="flex flex-col items-start gap-6 w-[696px] h-[330px]">
                <h2 className="font-albert-sans font-light leading-[70px] tracking-[-0.04em]" style={{ fontSize: '62px', color: '#1F1F1F' }}>
                  Effortless Travel Starts
                  <br />
                  with <span style={{ color: '#92B193' }}>Smart Itineraries</span>
                </h2>
                
                {/* Description */}
                <p className="font-satoshi text-gray-600 text-lg leading-relaxed max-w-lg">
                  Our advanced AI analyzes your preferences, travel style, and interests to create tailored travel experiences that perfectly match your unique personality.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right side - AI Recommendation Interface */}
          <div className="relative">
            <img 
              src="/lovable-uploads/f0773f67-0a53-4f19-9eff-d94a77482a61.png" 
              alt="AI Recommendation interface showing personalized travel suggestions" 
              className="w-full h-auto max-w-2xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPoweredSection;
