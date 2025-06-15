
import React from 'react';
import { MapPin, Bed, DollarSign } from 'lucide-react';

interface TripDetails {
  destination: string;
  stay: string;
  budget: string;
  imageUrl: string;
}

interface ItineraryHeaderProps {
  tripDetails: TripDetails;
}

const ItineraryHeader: React.FC<ItineraryHeaderProps> = ({ tripDetails }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
      <div className="relative h-64 sm:h-80">
        <img 
          src={tripDetails.imageUrl}
          alt={`${tripDetails.destination} landscape`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="font-satoshi font-medium text-gray-900">🌴 Destination:</p>
              <p className="text-gray-600">{tripDetails.destination}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
              <Bed className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="font-satoshi font-medium text-gray-900">🛏 Stay:</p>
              <p className="text-gray-600">{tripDetails.stay}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="font-satoshi font-medium text-gray-900">💰 Budget:</p>
              <p className="text-gray-600">{tripDetails.budget}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryHeader;
