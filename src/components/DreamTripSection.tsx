
import React from 'react';

const DreamTripSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-albert-sans font-light text-[62px] leading-[70px] tracking-[-0.04em] text-gray-900 mb-4">
            Your Dream Trip, One <span style={{ color: '#92B193' }}>Swipe Closer</span>
          </h2>
          <p className="font-albert-sans text-gray-600 text-xl">
            Personalized. Collaborative. Effortless. Your perfect trip is just a few swipes away
          </p>
        </div>

        {/* Simple Component Section */}
        <div className="flex justify-center items-center mb-16">
          <img 
            src="/lovable-uploads/be8550a4-8b89-407b-96a4-685c28df934d.png" 
            alt="Dream trip component" 
            className="max-w-full h-auto"
          />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="inline-flex items-center justify-center gap-4 text-white font-plus-jakarta font-medium text-xl px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg" style={{ backgroundColor: '#92B193' }}>
            <span>Start Swiping</span>
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

export default DreamTripSection;
