
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import MockedItinerary from '../components/MockedItinerary';

const Mock = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-sage-50 to-sage-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-albert-sans font-light text-[62px] leading-[70px] tracking-[-0.04em] text-gray-900 mb-6">
            Mock <span style={{ color: '#92B193' }}>Page</span>
          </h1>
          <p className="font-albert-sans text-gray-600 text-xl leading-relaxed">
            This is a mock page for testing purposes
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <MockedItinerary />
      </section>

      <Footer />
    </div>
  );
};

export default Mock;
