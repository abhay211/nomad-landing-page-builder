
import React from 'react';

const WhyChooseNomadSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white mb-8">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#92B193' }}>
              <img 
                src="/lovable-uploads/e8cd8f41-ef37-4742-a14d-e79dde11051b.png" 
                alt="Why Choose Nomad" 
                className="w-8 h-8"
              />
            </div>
            <span className="font-albert-sans text-gray-900 text-lg font-medium">Why Choose Nomad?</span>
          </div>
          
          <h2 className="font-albert-sans font-light text-[62px] leading-[70px] tracking-[-0.04em] text-gray-900">
            Everything you need for your{' '}
            <span style={{ color: '#92B193' }}>next adventure</span>
          </h2>
        </div>

        {/* Features Layout with exact specifications */}
        <div 
          className="flex flex-col items-center"
          style={{
            width: '1320px',
            height: '1094.5px',
            gap: '20px',
            margin: '0 auto'
          }}
        >
          {/* AI-Powered Itineraries - Full Width */}
          <div 
            className="flex justify-between items-center"
            style={{
              width: '1320px',
              height: '564.5px',
              borderRadius: '32px',
              paddingTop: '32px',
              paddingRight: '40px',
              paddingBottom: '32px',
              paddingLeft: '40px'
            }}
          >
            <img 
              src="/lovable-uploads/5b863327-f856-4d3b-9fc4-c87ca1f21e48.png" 
              alt="AI-Powered Itineraries showing Thailand trip planning interface" 
              className="w-full h-full object-cover"
              style={{ borderRadius: '32px' }}
            />
          </div>

          {/* Bottom Row - Local Recommendations and Group Planning Tools */}
          <div className="flex" style={{ gap: '20px' }}>
            {/* Local Recommendations */}
            <div style={{ width: '650px', height: '510px' }}>
              <img 
                src="/lovable-uploads/d7356d4e-7844-4a4e-a4b9-2bf272f8d003.png" 
                alt="Local Recommendations showing various activity cards" 
                className="w-full h-full object-cover"
                style={{ borderRadius: '32px' }}
              />
            </div>

            {/* Group Planning Tools */}
            <div 
              style={{
                width: '650px',
                height: '510px',
                borderRadius: '32px',
                paddingTop: '32px',
                paddingRight: '40px',
                paddingBottom: '32px',
                paddingLeft: '40px'
              }}
            >
              <img 
                src="/lovable-uploads/368789cd-2e27-46e7-8d62-2988dd243c82.png" 
                alt="Group Planning Tools showing collaborative chat interface" 
                className="w-full h-full object-cover"
                style={{ borderRadius: '32px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseNomadSection;
