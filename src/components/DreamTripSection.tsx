
import React from 'react';
import { Waves, Utensils, Palmtree, Trees, Hotel, Landmark } from 'lucide-react';

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

        {/* Interactive Visual Section */}
        <div className="relative flex justify-center items-center min-h-[600px]">
          {/* Central Image */}
          <div className="relative z-10">
            <img 
              src="/lovable-uploads/be8550a4-8b89-407b-96a4-685c28df934d.png" 
              alt="Scenic coastal view with interactive travel elements" 
              className="w-[400px] h-[300px] object-cover rounded-3xl shadow-lg"
            />
          </div>

          {/* Floating Activity Cards */}
          {/* Spa/Wellness - Top Left */}
          <div className="absolute top-8 left-8 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 animate-fade-in">
            <span className="font-albert-sans text-gray-900 font-medium">Spa / Wellness</span>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Waves className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Fine Dining - Top Right */}
          <div className="absolute top-8 right-8 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 animate-fade-in">
            <span className="font-albert-sans text-gray-900 font-medium">Fine Dining</span>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Hotels - Right */}
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 animate-fade-in">
            <span className="font-albert-sans text-gray-900 font-medium">Hotels</span>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Hotel className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Historical Tours - Bottom Right */}
          <div className="absolute bottom-8 right-8 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 animate-fade-in">
            <span className="font-albert-sans text-gray-900 font-medium">Historical Tours</span>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Beach - Bottom Center */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 animate-fade-in">
            <span className="font-albert-sans text-gray-900 font-medium">Beach</span>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Palmtree className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Park - Bottom Left */}
          <div className="absolute bottom-8 left-4 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 animate-fade-in">
            <span className="font-albert-sans text-gray-900 font-medium">Park</span>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Trees className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* User Avatar Cards */}
          {/* Elsa Wright - Left */}
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-white rounded-2xl p-4 shadow-lg flex items-center gap-3 animate-fade-in">
            <img 
              src="/lovable-uploads/e77752c8-3e96-40f2-b5dd-2ef45544cfc0.png" 
              alt="Elsa Wright" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-albert-sans text-gray-900 font-medium">Elsa Wright</p>
              <p className="font-albert-sans text-gray-500 text-sm">4:41 PM</p>
            </div>
          </div>

          {/* Tom - Top Center */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-3 shadow-lg flex items-center gap-3 animate-fade-in">
            <img 
              src="/lovable-uploads/e6801f11-0565-4bd4-930d-55b06360a49b.png" 
              alt="Tom" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-albert-sans text-gray-900 font-medium">Tom</p>
              <p className="font-albert-sans text-gray-500 text-xs">4:41 PM</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
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
