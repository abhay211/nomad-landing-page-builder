
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-albert-sans font-light text-[62px] leading-[70px] tracking-[-0.04em] text-gray-900 mb-8">
            About <span style={{ color: '#92B193' }}>Nomad</span>
          </h1>
          <p className="font-satoshi text-gray-600 text-xl leading-relaxed mb-12">
            We're revolutionizing group travel by eliminating the chaos of endless group chats 
            and turning your collective preferences into unforgettable adventures.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-albert-sans font-light text-[48px] leading-[56px] tracking-[-0.02em] text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="font-satoshi text-gray-600 text-lg leading-relaxed mb-6">
                Group travel planning shouldn't be a nightmare of endless messages, conflicting preferences, 
                and decision paralysis. We believe that the best trips happen when everyone's voice is heard 
                and their preferences are intelligently woven together.
              </p>
              <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
                Nomad uses AI to transform the way groups plan travel - from chaotic group chats to 
                seamless, personalized itineraries that everyone will love.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#92B193' }}>
                  <span className="text-white text-2xl font-bold">✈️</span>
                </div>
                <h3 className="font-albert-sans text-2xl font-medium text-gray-900 mb-4">
                  Smart Travel Planning
                </h3>
                <p className="font-satoshi text-gray-600">
                  AI-powered recommendations based on your group's collective preferences
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
