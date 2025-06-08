
import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#F5F5F3' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white mb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#92B193' }}>
              <img 
                src="/lovable-uploads/cbccc6e0-bcea-42b7-83d7-702f4daa7af6.png" 
                alt="How it works" 
                className="w-6 h-6"
              />
            </div>
            <span className="font-albert-sans text-gray-900 text-lg font-medium">How it works</span>
          </div>
          
          <div className="space-y-4">
            <h2 className="font-albert-sans font-extralight text-[62px] leading-[70px] tracking-[-0.04em]" style={{ color: '#1F1F1F' }}>
              Plan Your Trip in
            </h2>
            <div className="flex items-center justify-center gap-4">
              <span className="font-albert-sans font-extralight text-[62px] leading-[70px] tracking-[-0.04em]" style={{ color: '#92B193' }}>
                3 Easy Steps
              </span>
              <button className="inline-flex items-center justify-center gap-3 text-white font-plus-jakarta font-medium text-lg px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg" style={{ backgroundColor: '#92B193' }}>
                <span>Plan a Trip Now</span>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/bfe7e292-b113-429a-9a8e-a3bc4130d317.png" 
                    alt="arrow" 
                    className="w-5 h-5"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Steps */}
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5A7B7C' }}>
                <img 
                  src="/lovable-uploads/10b71e65-8a07-4080-8ea8-cf98fc02c0dd.png" 
                  alt="preferences" 
                  className="w-8 h-8"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-albert-sans font-semibold text-2xl text-gray-900">
                  Tell Us Your Preferences
                </h3>
                <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
                  Pick your destination, budget, and travel style.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5A7B7C' }}>
                <img 
                  src="/lovable-uploads/cbccc6e0-bcea-42b7-83d7-702f4daa7af6.png" 
                  alt="AI powered" 
                  className="w-8 h-8"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-albert-sans font-semibold text-2xl text-gray-900">
                  Get AI-Powered Itineraries
                </h3>
                <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
                  Instant, personalized plans that suit your needs.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5A7B7C' }}>
                <img 
                  src="/lovable-uploads/c65d2f0f-c25f-448c-b22b-c97df44f4a29.png" 
                  alt="travel together" 
                  className="w-8 h-8"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-albert-sans font-semibold text-2xl text-gray-900">
                  Travel Together, Smarter
                </h3>
                <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
                  Share with your group, vote on activities, and get real-time updates.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Visual Elements */}
          <div className="relative">
            {/* Spa/Wellness Card */}
            <div className="absolute top-0 left-8 bg-white rounded-2xl shadow-lg overflow-hidden w-64 h-48">
              <img 
                src="/lovable-uploads/f0773f67-0a53-4f19-9eff-d94a77482a61.png" 
                alt="Spa wellness" 
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🧘</span>
                  </div>
                  <span className="font-satoshi font-medium text-gray-900">Spa / Wellness</span>
                </div>
              </div>
            </div>

            {/* Beach Card */}
            <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-lg overflow-hidden w-56 h-40">
              <img 
                src="/lovable-uploads/f0773f67-0a53-4f19-9eff-d94a77482a61.png" 
                alt="Beach" 
                className="w-full h-24 object-cover"
              />
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🏖️</span>
                  </div>
                  <span className="font-satoshi font-medium text-gray-900 text-sm">Beach</span>
                </div>
              </div>
            </div>

            {/* Historical Tours Card */}
            <div className="absolute top-8 right-16 bg-white rounded-full px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🏛️</span>
                </div>
                <span className="font-satoshi font-medium text-gray-900 text-sm">Historical Tours</span>
              </div>
            </div>

            {/* Hotels Card */}
            <div className="absolute bottom-32 left-0 bg-white rounded-2xl shadow-lg overflow-hidden w-64 h-48">
              <img 
                src="/lovable-uploads/f0773f67-0a53-4f19-9eff-d94a77482a61.png" 
                alt="Hotels" 
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🏨</span>
                  </div>
                  <span className="font-satoshi font-medium text-gray-900">Hotels</span>
                </div>
              </div>
            </div>

            {/* Fine Dining Card */}
            <div className="absolute bottom-16 right-8 bg-white rounded-2xl shadow-lg overflow-hidden w-56 h-40">
              <img 
                src="/lovable-uploads/f0773f67-0a53-4f19-9eff-d94a77482a61.png" 
                alt="Fine dining" 
                className="w-full h-24 object-cover"
              />
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🍽️</span>
                  </div>
                  <span className="font-satoshi font-medium text-gray-900 text-sm">Fine Dining</span>
                </div>
              </div>
            </div>

            {/* Resorts Card */}
            <div className="absolute bottom-8 right-24 bg-white rounded-full px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🏖️</span>
                </div>
                <span className="font-satoshi font-medium text-gray-900 text-sm">Resorts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
