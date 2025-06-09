
import React from 'react';
import { ArrowRight } from 'lucide-react';

const WhyChooseNomadSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-50 mb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#92B193' }}>
              <img 
                src="/lovable-uploads/c3376b83-bfa4-4dbe-976d-e4d165596b48.png" 
                alt="Why Choose Nomad" 
                className="w-6 h-6"
              />
            </div>
            <span className="font-albert-sans text-gray-900 text-lg font-medium">Why Choose Nomad?</span>
          </div>
          
          <h2 className="font-albert-sans font-light text-[62px] leading-[70px] tracking-[-0.04em] text-gray-900">
            Everything you need for your{' '}
            <span style={{ color: '#92B193' }}>next adventure</span>
          </h2>
        </div>

        {/* Features Grid - Updated Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - AI-Powered Itineraries */}
          <div className="lg:row-span-2">
            <div className="mb-8">
              <h3 className="font-albert-sans font-semibold text-4xl text-gray-900 mb-4">
                AI-Powered Itineraries
              </h3>
              <p className="font-satoshi text-gray-600 text-lg leading-relaxed mb-8">
                Smart plans that save time and match your interests.
              </p>
              <button className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium transition-all duration-200 hover:shadow-lg" style={{ backgroundColor: '#92B193' }}>
                Plan a Trip Now
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" style={{ color: '#92B193' }} />
                </div>
              </button>
            </div>
            
            {/* AI-Powered Itineraries Image */}
            <div className="relative">
              <img 
                src="/lovable-uploads/5b863327-f856-4d3b-9fc4-c87ca1f21e48.png" 
                alt="AI-Powered Itineraries showing Thailand trip planning interface" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column - Top: Local Recommendations */}
          <div className="mb-12">
            <h3 className="font-albert-sans font-semibold text-4xl text-gray-900 mb-4">
              Local Recommendations
            </h3>
            <p className="font-satoshi text-gray-600 text-lg leading-relaxed mb-8">
              Discover hidden gems and authentic spots recommended by real locals.
            </p>
            
            {/* Local Recommendations Image */}
            <div className="relative">
              <img 
                src="/lovable-uploads/d7356d4e-7844-4a4e-a4b9-2bf272f8d003.png" 
                alt="Local Recommendations showing various activity cards" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column - Bottom: Group Planning Tools */}
          <div>
            <h3 className="font-albert-sans font-semibold text-4xl text-gray-900 mb-4">
              Group Planning Tools
            </h3>
            <p className="font-satoshi text-gray-600 text-lg leading-relaxed mb-8">
              Collaborate easily with friends and family—no more endless group chats.
            </p>
            
            {/* Group Planning Tools Image */}
            <div className="relative">
              <img 
                src="/lovable-uploads/368789cd-2e27-46e7-8d62-2988dd243c82.png" 
                alt="Group Planning Tools showing collaborative chat interface" 
                className="w-full h-auto max-w-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseNomadSection;
