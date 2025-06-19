
import React from 'react';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const StepThree = () => {
  const itineraries = [
    {
      id: 1,
      title: "Bali Bliss",
      image: "/lovable-uploads/9b68c3ac-69b4-433b-9fad-88608e8ed270.png",
      tags: ["Relax", "Beach", "Local Food"],
      budget: "₹80,000",
      duration: "5 days",
      rating: 4.8,
      highlights: "Spa retreats, sunset beaches, authentic cuisine"
    },
    {
      id: 2,
      title: "Adventure Escape",
      image: "/lovable-uploads/c79d0a0f-c625-49b7-95b5-5811214407e9.png",
      tags: ["Adventure", "Nature", "Hiking"],
      budget: "₹75,000",
      duration: "6 days",
      rating: 4.9,
      highlights: "Mountain treks, river rafting, wildlife"
    },
    {
      id: 3,
      title: "Cultural Journey",
      image: "/lovable-uploads/eb8e2e66-d086-47d7-b63b-b86ac60c9921.png",
      tags: ["Culture", "History", "Art"],
      budget: "₹65,000",
      duration: "4 days",
      rating: 4.7,
      highlights: "Ancient temples, local crafts, festivals"
    }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sage-100">
          <div className="w-8 h-8 rounded-full bg-sage-500 text-white flex items-center justify-center font-bold">
            3
          </div>
          <span className="font-albert-sans font-medium text-gray-900">Explore Curated Itineraries</span>
        </div>
        
        <h2 className="font-albert-sans font-light text-4xl text-gray-900 leading-tight">
          Choose from <span className="text-sage-600">2–3 curated options</span> personalized for you.
        </h2>
        
        <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
          Each itinerary is tailored to your preferences, featuring hand-picked activities, accommodations, and experiences that match your group's vibe and budget.
        </p>
      </div>

      <div className="relative">
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {itineraries.map((itinerary, index) => (
            <Card key={itinerary.id} className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${index === 0 ? 'ring-2 ring-sage-500' : ''}`}>
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={itinerary.image}
                  alt={itinerary.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                {index === 0 && (
                  <div className="absolute top-2 right-2 bg-sage-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-satoshi font-bold text-gray-900">
                    {itinerary.title}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">{itinerary.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {itinerary.tags.map((tag) => (
                    <span key={tag} className="bg-sage-100 text-sage-700 px-2 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-sage-600" />
                    <span className="text-gray-600">{itinerary.budget}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-sage-600" />
                    <span className="text-gray-600">{itinerary.duration}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500">{itinerary.highlights}</p>
                
                <Button 
                  className={`w-full mt-2 ${index === 0 ? 'bg-sage-500 hover:bg-sage-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                  variant={index === 0 ? "default" : "outline"}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepThree;
