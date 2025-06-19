
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MapPin, Clock, Utensils, Camera } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const StepFour = () => {
  const dayPlans = [
    {
      day: 1,
      location: "Uluwatu",
      title: "Arrival & Cliffside Magic",
      activities: [
        { time: "10:00 AM", activity: "Airport pickup & check-in", icon: MapPin },
        { time: "2:00 PM", activity: "Spa session at resort", icon: Camera },
        { time: "5:00 PM", activity: "Beach exploration", icon: Camera },
        { time: "7:00 PM", activity: "Cliffside dinner with sunset views", icon: Utensils }
      ],
      tip: "Book sunset dinner in advance for best tables"
    },
    {
      day: 2,
      location: "Seminyak",
      title: "Beach & Surf Vibes",
      activities: [
        { time: "8:00 AM", activity: "Healthy brunch at Kynd Community", icon: Utensils },
        { time: "10:00 AM", activity: "Surf lesson at Double Six Beach", icon: Camera },
        { time: "3:00 PM", activity: "Beach club relaxation", icon: Camera },
        { time: "6:00 PM", activity: "Shopping at Seminyak Square", icon: MapPin }
      ],
      tip: "Rent a scooter to explore Seminyak easily"
    },
    {
      day: 3,
      location: "Ubud",
      title: "Culture & Nature",
      activities: [
        { time: "7:00 AM", activity: "Rice terrace sunrise tour", icon: Camera },
        { time: "11:00 AM", activity: "Traditional cooking class", icon: Utensils },
        { time: "3:00 PM", activity: "Monkey Forest Sanctuary", icon: MapPin },
        { time: "7:00 PM", activity: "Fire dance performance", icon: Camera }
      ],
      tip: "Bring insect repellent for outdoor activities"
    }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sage-100">
          <div className="w-8 h-8 rounded-full bg-sage-500 text-white flex items-center justify-center font-bold">
            4
          </div>
          <span className="font-albert-sans font-medium text-gray-900">See Your Daily Plan</span>
        </div>
        
        <h2 className="font-albert-sans font-light text-4xl text-gray-900 leading-tight">
          Get a <span className="text-sage-600">day-by-day breakdown</span> with things to do, see, and eat.
        </h2>
        
        <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
          Every itinerary comes with detailed daily schedules, including timing suggestions, local tips, and must-visit spots curated by travel experts.
        </p>
        
        <div className="bg-sage-50 p-4 rounded-xl">
          <h4 className="font-satoshi font-semibold text-gray-900 mb-2">What's Included:</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Detailed timing for each activity</li>
            <li>• Local restaurant recommendations</li>
            <li>• Transportation suggestions</li>
            <li>• Insider tips from locals</li>
          </ul>
        </div>
      </div>

      <div className="relative">
        <div 
          className="absolute inset-0 rounded-3xl opacity-5"
          style={{
            backgroundImage: `url('/lovable-uploads/9b68c3ac-69b4-433b-9fad-88608e8ed270.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-satoshi font-bold text-xl text-gray-900">Bali Bliss Itinerary</h3>
            <div className="bg-sage-100 px-3 py-1 rounded-full text-sm font-medium text-sage-700">
              5 Days
            </div>
          </div>
          
          <Accordion type="single" collapsible defaultValue="day-1" className="space-y-2">
            {dayPlans.map((day) => (
              <AccordionItem key={day.day} value={`day-${day.day}`} className="border border-gray-200 rounded-lg">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="text-left">
                      <div className="font-satoshi font-semibold text-gray-900">
                        Day {day.day}: {day.location}
                      </div>
                      <div className="text-sm text-gray-600">{day.title}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-sage-100 px-2 py-1 rounded text-xs font-medium text-sage-700">
                        {day.activities.length} activities
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-3">
                    {day.activities.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                          <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-sage-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs font-medium text-gray-500">{activity.time}</span>
                            </div>
                            <p className="text-sm text-gray-900">{activity.activity}</p>
                          </div>
                        </div>
                      );
                    })}
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full flex-shrink-0 mt-0.5"></div>
                        <div>
                          <p className="text-xs font-medium text-yellow-800 mb-1">Local Tip:</p>
                          <p className="text-xs text-yellow-700">{day.tip}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
