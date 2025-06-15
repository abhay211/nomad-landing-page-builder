
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
      stay: 'Boutique 2-bedroom villa with jungle view',
      budget: 'Medium ($$)',
      imageUrl: '/lovable-uploads/9b68c3ac-69b4-433b-9fad-88608e8ed270.png'
    },
    days: [
      {
        day: 1,
        title: 'Arrival & Adventure',
        activities: [
          { description: 'Check-in to villa' },
          { description: 'White water rafting' },
          { description: 'Dinner at Locavore' }
        ]
      },
      {
        day: 2,
        title: 'Nature Exploration',
        activities: [
          { description: 'Sunrise at Mount Batur' },
          { description: 'Hot springs relaxation' },
          { description: 'ATV ride through rice terraces' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Wellness & Relaxation',
    tripDetails: {
      destination: 'Ubud, Bali',
      stay: 'Boutique 2-bedroom villa with jungle view',
      budget: 'Medium ($$)',
      imageUrl: '/lovable-uploads/9b68c3ac-69b4-433b-9fad-88608e8ed270.png'
    },
    days: [
      {
        day: 1,
        title: 'Arrival & Unwind',
        activities: [
          { description: 'Check-in to villa' },
          { description: 'Sunset yoga session' },
          { description: 'Healthy dinner at Clear Cafe' }
        ]
      },
      {
        day: 2,
        title: 'Spa & Meditation',
        activities: [
          { description: 'Morning meditation' },
          { description: 'Full day spa at Karsa Spa' },
          { description: 'Organic cooking class' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Cultural Immersion',
    tripDetails: {
      destination: 'Ubud, Bali',
      stay: 'Boutique 2-bedroom villa with jungle view',
      budget: 'Medium ($$)',
      imageUrl: '/lovable-uploads/9b68c3ac-69b4-433b-9fad-88608e8ed270.png'
    },
    days: [
      {
        day: 1,
        title: 'Temple & Tradition',
        activities: [
          { description: 'Check-in to villa' },
          { description: 'Visit Tirta Empul Temple' },
          { description: 'Traditional Balinese dinner' }
        ]
      },
      {
        day: 2,
        title: 'Arts & Crafts',
        activities: [
          { description: 'Silver jewelry making class' },
          { description: 'Visit local art galleries' },
          { description: 'Traditional dance performance' }
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
