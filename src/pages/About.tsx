
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/56536861-27a8-4eb3-8391-7850b0e90b8f.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-albert-sans font-light text-[62px] leading-[70px] tracking-[-0.04em] text-white mb-6">
            ✨ About <span style={{ color: '#92B193' }}>Nomad</span>
          </h1>
          <p className="font-albert-sans text-white text-xl leading-relaxed">
            We believe travel should be inspiring, not overwhelming.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section 
        className="py-20 px-6 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('/lovable-uploads/e0a9d7be-7d2b-40f4-933f-5900dae17047.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="space-y-8">
            
            <div className="space-y-6">
              <p className="font-albert-sans text-gray-900 text-lg leading-relaxed">
                At Nomad, we believe travel should be inspiring, not overwhelming.
              </p>
              
              <p className="font-albert-sans text-gray-900 text-lg leading-relaxed">
                Planning a trip often feels like a full-time job—endless tabs, scattered opinions, and group chats that never lead anywhere. We're here to change that.
              </p>
              
              <p className="font-albert-sans text-gray-900 text-lg leading-relaxed">
                Nomad is an end-to-end travel platform designed to take the stress out of trip planning. Whether you're exploring solo or coordinating with a group, we help you discover, plan, and organize unforgettable journeys—without the chaos. From finding destinations that match your vibe to organizing intra-location travel, we're building a smarter, more intuitive way to go from idea to itinerary.
              </p>
              
              <p className="font-albert-sans text-gray-900 text-lg leading-relaxed">
                We bring the world to your fingertips—so you can focus less on logistics, and more on the memories.
              </p>
              
              <p className="font-albert-sans text-gray-900 text-xl font-medium leading-relaxed" style={{ color: '#92B193' }}>
                Let's make travel feel like travel again.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
