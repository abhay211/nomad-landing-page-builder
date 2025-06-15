
import React from 'react';
import { MapPin, Bed, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface TripDetails {
  destination: string;
  stay: string;
  budget: string;
  imageUrl: string;
}

interface ItineraryItem {
  description: string;
}

interface DayPlan {
  day: number;
  title: string;
  activities: ItineraryItem[];
}

interface ItineraryData {
  id: string;
  title: string;
  tripDetails: TripDetails;
  days: DayPlan[];
}

interface ItineraryCardProps {
  itinerary: ItineraryData;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ itinerary }) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={itinerary.tripDetails.imageUrl}
          alt={`${itinerary.tripDetails.destination} landscape`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-sage-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {itinerary.title}
          </span>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-satoshi font-bold text-gray-900">
          {itinerary.tripDetails.destination}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-sage-600 flex-shrink-0" />
            <span className="text-gray-600">{itinerary.tripDetails.destination}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Bed className="w-4 h-4 text-sage-600 flex-shrink-0" />
            <span className="text-gray-600 text-xs">{itinerary.tripDetails.stay}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-sage-600 flex-shrink-0" />
            <span className="text-gray-600">{itinerary.tripDetails.budget}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-sage-600 flex-shrink-0" />
            <span className="text-gray-600">{itinerary.days.length} days</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-satoshi font-semibold text-gray-900 text-sm">Highlights:</h4>
          <ul className="space-y-1">
            {itinerary.days.slice(0, 2).map((day) => (
              <li key={day.day} className="text-xs text-gray-600">
                <span className="font-medium">Day {day.day}:</span> {day.title}
              </li>
            ))}
            {itinerary.days.length > 2 && (
              <li className="text-xs text-sage-600 font-medium">
                +{itinerary.days.length - 2} more days...
              </li>
            )}
          </ul>
        </div>

        <Button 
          className="w-full mt-4 bg-sage-500 hover:bg-sage-600 text-white"
          onClick={() => console.log(`Selected itinerary: ${itinerary.id}`)}
        >
          Choose This Itinerary
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItineraryCard;
