
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
        <div className="flex justify-center items-center">
          <img 
            src="/lovable-uploads/be8550a4-8b89-407b-96a4-685c28df934d.png" 
            alt="Dream trip component" 
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default DreamTripSection;
