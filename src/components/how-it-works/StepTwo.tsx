
import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, MapPin } from 'lucide-react';

const StepTwo = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  
  const quotes = [
    "Scanning seasons, routes, and secret spots...",
    "Finding the perfect local experiences...",
    "Matching your vibe with destinations...",
    "Creating your personalized journey..."
  ];

  const backgroundImages = [
    '/lovable-uploads/photo-1605810230434-7631ac76ec81', // group of people with screens
    '/lovable-uploads/photo-1519389950473-47ba0277781c', // people with laptops
    '/lovable-uploads/photo-1581091226825-a6a2a5aee158', // woman with laptop
    '/lovable-uploads/photo-1721322800607-8c38375eef04'  // living room scene
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
      <div className="relative order-2 lg:order-1">
        <div 
          className="absolute inset-0 rounded-3xl opacity-20 transition-all duration-1000"
          style={{
            backgroundImage: `url('${backgroundImages[currentImage]}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 min-h-[400px] flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-sage-400 to-sage-600 rounded-full flex items-center justify-center animate-pulse">
              <Globe className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '1s' }}>
              <MapPin className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <h3 className="font-satoshi font-bold text-xl text-gray-900">AI Planning in Progress</h3>
            <p className="font-satoshi text-sage-700 text-lg min-h-[3rem] flex items-center justify-center animate-fade-in">
              {quotes[currentQuote]}
            </p>
            
            <div className="flex space-x-2 justify-center">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentQuote ? 'bg-sage-500 scale-125' : 'bg-sage-200'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-8 w-full bg-sage-100 rounded-full h-2">
            <div className="bg-sage-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      <div className="space-y-6 order-1 lg:order-2">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sage-100">
          <div className="w-8 h-8 rounded-full bg-sage-500 text-white flex items-center justify-center font-bold">
            2
          </div>
          <span className="font-albert-sans font-medium text-gray-900">Let Our AI Plan It</span>
        </div>
        
        <h2 className="font-albert-sans font-light text-4xl text-gray-900 leading-tight">
          <span className="text-sage-600">Nomad's AI</span> works behind the scenes to craft custom itineraries.
        </h2>
        
        <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
          Our intelligent system analyzes thousands of destinations, seasonal patterns, and local insights to create the perfect trip for your group. No more endless research or planning stress.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <Sparkles className="w-6 h-6 text-sage-600 mb-2" />
            <p className="font-satoshi font-medium text-sm text-gray-900">Smart Matching</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <Globe className="w-6 h-6 text-sage-600 mb-2" />
            <p className="font-satoshi font-medium text-sm text-gray-900">Global Database</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <MapPin className="w-6 h-6 text-sage-600 mb-2" />
            <p className="font-satoshi font-medium text-sm text-gray-900">Local Insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
