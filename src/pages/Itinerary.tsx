
import React from 'react';
import { Calendar } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ItineraryHeader from '../components/itinerary/ItineraryHeader';
import ItineraryDay from '../components/itinerary/ItineraryDay';

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
  tripDetails: TripDetails;
  days: DayPlan[];
}

const mockItinerary: ItineraryData = {
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
        { description: 'Sunset drinks at Folk Pool & Gardens' },
        { description: 'Dinner at Ibu Rai' }
      ]
    },
    {
      day: 2,
      title: 'Nature & Relaxation',
      activities: [
        { description: 'Yoga at The Yoga Barn' },
        { description: 'Spa at Karsa Spa' },
        { description: 'Campuhan Ridge Walk' },
        { description: 'Chill dinner by the pool' }
      ]
    },
    {
      day: 3,
      title: 'Culture & Leisure',
      activities: [
        { description: 'Visit Tirta Empul Temple' },
        { description: 'Ubud Market + Saraswati Temple' },
        { description: 'Traditional dance show at night' }
      ]
    },
    {
      day: 4,
      title: 'Farewell',
      activities: [
        { description: 'Brunch at Sayuri Cafe' },
        { description: 'Local shopping' },
        { description: 'Departure' }
      ]
    }
  ]
};

const Itinerary = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-sage-100"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-sage-300 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-albert-sans font-light text-[48px] sm:text-[62px] leading-[56px] sm:leading-[70px] tracking-[-0.04em] text-gray-900 mb-6">
              Your Perfect <span style={{ color: '#92B193' }}>Itinerary</span>
            </h1>
            <p className="font-albert-sans text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
              Here's your personalized travel experience crafted just for you
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ItineraryHeader tripDetails={mockItinerary.tripDetails} />

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-sage-600" />
                </div>
                <h2 className="font-albert-sans font-medium text-2xl text-gray-900">🗓 Itinerary:</h2>
              </div>
              
              <div className="space-y-8">
                {mockItinerary.days.map((day) => (
                  <ItineraryDay key={day.day} dayPlan={day} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Itinerary;
