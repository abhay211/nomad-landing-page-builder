
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

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-16">
            {/* AI-Powered Itineraries */}
            <div className="relative">
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
              
              {/* Thailand Card Mockup */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/e2704476-ff95-4d20-ad66-56766af97308.png" 
                  alt="AI-Powered Itineraries showing Thailand trip planning interface" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Group Planning Tools */}
            <div>
              <h3 className="font-albert-sans font-semibold text-4xl text-gray-900 mb-4">
                Group Planning Tools
              </h3>
              <p className="font-satoshi text-gray-600 text-lg leading-relaxed mb-8">
                Collaborate easily with friends and family—no more endless group chats.
              </p>
              
              {/* Group Chat Mockup */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/e77752c8-3e96-40f2-b5dd-2ef45544cfc0.png" 
                  alt="Group Planning Tools showing collaborative chat interface" 
                  className="w-full h-auto max-w-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Local Recommendations */}
          <div className="lg:pl-8">
            <h3 className="font-albert-sans font-semibold text-4xl text-gray-900 mb-4">
              Local Recommendations
            </h3>
            <p className="font-satoshi text-gray-600 text-lg leading-relaxed mb-8">
              Discover hidden gems and authentic spots recommended by real locals.
            </p>
            
            {/* Recommendations Grid */}
            <div className="relative">
              <img 
                src="/lovable-uploads/d0e5663a-fb25-4516-9441-30d304859c94.png" 
                alt="Local Recommendations showing various activity cards" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseNomadSection;
