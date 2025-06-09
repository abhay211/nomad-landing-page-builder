
import React from 'react';

const WhyChooseNomadSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white mb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#92B193' }}>
              <img 
                src="/lovable-uploads/e8cd8f41-ef37-4742-a14d-e79dde11051b.png" 
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

        {/* Features Layout - AI-Powered spans full width, others below in 2 columns */}
        <div className="space-y-16">
          {/* AI-Powered Itineraries - Full Width */}
          <div className="w-full">
            {/* AI-Powered Itineraries Image */}
            <div className="relative">
              <img 
                src="/lovable-uploads/5b863327-f856-4d3b-9fc4-c87ca1f21e48.png" 
                alt="AI-Powered Itineraries showing Thailand trip planning interface" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Bottom Row - Local Recommendations and Group Planning Tools */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Local Recommendations */}
            <div>
              {/* Local Recommendations Image */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/d7356d4e-7844-4a4e-a4b9-2bf272f8d003.png" 
                  alt="Local Recommendations showing various activity cards" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Group Planning Tools */}
            <div>
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
      </div>
    </section>
  );
};

export default WhyChooseNomadSection;
