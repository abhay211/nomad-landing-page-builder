
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Features = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Background Image */}
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
            ✨ Features That Make Travel Planning <span style={{ color: '#92B193' }}>Effortless</span>
          </h1>
          <p className="font-albert-sans text-white text-xl leading-relaxed">
            Nomad is designed to make travel planning as exciting as the journey itself. Whether you're a solo traveler or planning with a group, our intuitive tools and personalized intelligence make sure you focus less on logistics and more on experiences.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section 
        className="py-20 px-6 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/lovable-uploads/e0a9d7be-7d2b-40f4-933f-5900dae17047.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Feature 1 */}
            <div className="space-y-4">
              <h3 className="font-albert-sans font-medium text-2xl text-gray-900">
                🧠 Personalized Travel Recommendations
              </h3>
              <p className="font-albert-sans text-gray-600 leading-relaxed">
                Tell us your vibe — Relax, Explore, Local Eats — and we'll suggest the perfect destinations tailored to your preferences, group size, budget, and trip duration. It's not just a list — it's your ideal getaway curated by machine learning.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <h3 className="font-albert-sans font-medium text-2xl text-gray-900">
                🌍 Smart Destination Discovery
              </h3>
              <p className="font-albert-sans text-gray-600 leading-relaxed">
                Swipe through a curated collection of places designed to match your mood. Whether you're craving hikes, hidden cafes, or beachside naps, Nomad helps you find places you didn't even know you needed.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <h3 className="font-albert-sans font-medium text-2xl text-gray-900">
                🗺️ Intelligent Itinerary Builder
              </h3>
              <p className="font-albert-sans text-gray-600 leading-relaxed">
                No more spreadsheets or scattered links. Nomad builds smart, flexible itineraries based on your interests and travel flow. Plan your trip like a local, not like a tourist checking boxes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="space-y-4">
              <h3 className="font-albert-sans font-medium text-2xl text-gray-900">
                🤝 Group Planning Made Simple
              </h3>
              <p className="font-albert-sans text-gray-600 leading-relaxed">
                Tired of messy WhatsApp threads and indecisive friends? Our Group Chat & Polls feature lets everyone vote, collaborate, and align on the perfect plan — without the chaos.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="space-y-4">
              <h3 className="font-albert-sans font-medium text-2xl text-gray-900">
                🧭 Real-Time Local Insights
              </h3>
              <p className="font-albert-sans text-gray-600 leading-relaxed">
                From the best food spots to SIM card info and transport tips, Nomad arms you with the practical info you need when you land. Think of it as your on-the-ground travel companion.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="space-y-4">
              <h3 className="font-albert-sans font-medium text-2xl text-gray-900">
                💬 AI Travel Assistant
              </h3>
              <p className="font-albert-sans text-gray-600 leading-relaxed">
                Ask anything — "Where can I hike for 3 days in October?" or "Find me a chill town with coffee shops and waterfalls." Our AI assistant understands your intent and recommends like a local.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="space-y-4">
              <h3 className="font-albert-sans font-medium text-2xl text-gray-900">
                🧳 Travel Vibes, Not Just Trips
              </h3>
              <p className="font-albert-sans text-gray-600 leading-relaxed">
                Nomad isn't just about destinations. It's about how you want to feel. Whether you're recharging solo, reconnecting with friends, or going on an adventure, we plan for the vibe, not the checklist.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="space-y-4">
              <h3 className="font-albert-sans font-medium text-2xl text-gray-900">
                💡 Save & Share Your Trips
              </h3>
              <p className="font-albert-sans text-gray-600 leading-relaxed">
                Keep your trip ideas in one place and share them with others. Bookmark spots, build itineraries collaboratively, and revisit or remix them anytime.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
