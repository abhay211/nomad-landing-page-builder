
import React from 'react';
import { Calendar } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ItineraryCard from '../components/itinerary/ItineraryCard';

// Type definitions
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

const mockItineraries: ItineraryData[] = [
  {
    id: '1',
    title: 'Adventure Seeker',
    tripDetails: {
      destination: 'Ubud, Bali',
      stay: 'Luxury jungle resort with infinity pool',
      budget: 'High ($$$)',
      imageUrl: '/lovable-uploads/9b68c3ac-69b4-433b-9fad-88608e8ed270.png'
    },
    days: [
      {
        day: 1,
        title: 'Arrival & River Adventure',
        activities: [
          { description: 'Check-in to jungle resort' },
          { description: 'White water rafting on Ayung River' },
          { description: 'Sunset dinner at resort terrace' }
        ]
      },
      {
        day: 2,
        title: 'Volcano & Hot Springs',
        activities: [
          { description: 'Pre-dawn Mount Batur hike' },
          { description: 'Sunrise breakfast at summit' },
          { description: 'Natural hot springs relaxation' }
        ]
      },
      {
        day: 3,
        title: 'Jungle Exploration',
        activities: [
          { description: 'Monkey Forest Sanctuary visit' },
          { description: 'ATV ride through rice terraces' },
          { description: 'Traditional fire dance performance' }
        ]
      },
      {
        day: 4,
        title: 'Cultural Discovery',
        activities: [
          { description: 'Sacred temple tour' },
          { description: 'Local market exploration' },
          { description: 'Farewell dinner at Locavore' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Quick Getaway',
    tripDetails: {
      destination: 'Canggu, Bali',
      stay: 'Beachfront boutique hotel',
      budget: 'Medium ($$)',
      imageUrl: '/lovable-uploads/9b68c3ac-69b4-433b-9fad-88608e8ed270.png'
    },
    days: [
      {
        day: 1,
        title: 'Beach & Surf',
        activities: [
          { description: 'Check-in to beachfront hotel' },
          { description: 'Surfing lessons at Echo Beach' },
          { description: 'Beachside dinner and sunset' }
        ]
      },
      {
        day: 2,
        title: 'Culture & Departure',
        activities: [
          { description: 'Morning yoga session' },
          { description: 'Visit Tanah Lot Temple' },
          { description: 'Shopping at local markets' },
          { description: 'Airport transfer' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Wellness Retreat',
    tripDetails: {
      destination: 'Seminyak, Bali',
      stay: 'Spa resort with private villa',
      budget: 'High ($$$)',
      imageUrl: '/lovable-uploads/9b68c3ac-69b4-433b-9fad-88608e8ed270.png'
    },
    days: [
      {
        day: 1,
        title: 'Arrival & Relaxation',
        activities: [
          { description: 'Private villa check-in' },
          { description: 'Welcome massage therapy' },
          { description: 'Healthy cuisine dinner' }
        ]
      },
      {
        day: 2,
        title: 'Mind & Body',
        activities: [
          { description: 'Sunrise meditation session' },
          { description: 'Balinese healing ritual' },
          { description: 'Organic cooking class' }
        ]
      },
      {
        day: 3,
        title: 'Spa & Serenity',
        activities: [
          { description: 'Full day at Karsa Spa' },
          { description: 'Beach walk and reflection' },
          { description: 'Farewell dinner at beach club' }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Budget Explorer',
    tripDetails: {
      destination: 'Sanur, Bali',
      stay: 'Cozy guesthouse near beach',
      budget: 'Low ($)',
      imageUrl: '/lovable-uploads/9b68c3ac-69b4-433b-9fad-88608e8ed270.png'
    },
    days: [
      {
        day: 1,
        title: 'Local Discovery',
        activities: [
          { description: 'Check-in to local guesthouse' },
          { description: 'Bike tour of Sanur village' },
          { description: 'Street food dinner adventure' }
        ]
      },
      {
        day: 2,
        title: 'Temple & Tradition',
        activities: [
          { description: 'Early morning temple visit' },
          { description: 'Traditional craft workshop' },
          { description: 'Local warung lunch experience' }
        ]
      },
      {
        day: 3,
        title: 'Beach & Culture',
        activities: [
          { description: 'Sanur Beach morning walk' },
          { description: 'Visit Blanco Renaissance Museum' },
          { description: 'Sunset at Sanur pier' }
        ]
      },
      {
        day: 4,
        title: 'Market & Memories',
        activities: [
          { description: 'Traditional market shopping' },
          { description: 'Coffee plantation tour' },
          { description: 'Group dinner with locals' }
        ]
      },
      {
        day: 5,
        title: 'Final Adventures',
        activities: [
          { description: 'Snorkeling at Blue Lagoon' },
          { description: 'Souvenir shopping' },
          { description: 'Airport transfer' }
        ]
      }
    ]
  }
];

const Itinerary = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-sage-100"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-sage-300 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-albert-sans font-light text-[48px] sm:text-[62px] leading-[56px] sm:leading-[70px] tracking-[-0.04em] text-gray-900 mb-6">
              Your Perfect <span style={{ color: '#92B193' }}>Itineraries</span>
            </h1>
            <p className="font-albert-sans text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Choose from these personalized travel experiences crafted just for you
            </p>
            
            <div className="flex items-center justify-center space-x-3 mb-12">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-sage-600" />
              </div>
              <h2 className="font-albert-sans font-medium text-2xl text-gray-900">Select Your Adventure</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {mockItineraries.map((itinerary) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Itinerary;
