
import React from 'react';
import { MapPin, Calendar, Bed, DollarSign } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Itinerary = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Background */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
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

          {/* Itinerary Content */}
          <div className="max-w-3xl mx-auto">
            {/* Header Card with Image */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-64 sm:h-80">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                  alt="Ubud, Bali landscape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              
              <div className="p-8">
                {/* Trip Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-sage-600" />
                    </div>
                    <div>
                      <p className="font-satoshi font-medium text-gray-900">🌴 Destination:</p>
                      <p className="text-gray-600">Ubud, Bali</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                      <Bed className="w-6 h-6 text-sage-600" />
                    </div>
                    <div>
                      <p className="font-satoshi font-medium text-gray-900">🛏 Stay:</p>
                      <p className="text-gray-600">Boutique 2-bedroom villa with jungle view</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-sage-600" />
                    </div>
                    <div>
                      <p className="font-satoshi font-medium text-gray-900">💰 Budget:</p>
                      <p className="text-gray-600">Medium ($$)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Itinerary Days */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-sage-600" />
                </div>
                <h2 className="font-albert-sans font-medium text-2xl text-gray-900">🗓 Itinerary:</h2>
              </div>
              
              <div className="space-y-8">
                {/* Day 1 */}
                <div className="border-l-4 border-sage-300 pl-6">
                  <h3 className="font-satoshi font-bold text-xl text-gray-900 mb-3">
                    Day 1 – Arrival & Unwind
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Check-in to villa</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Sunset drinks at Folk Pool & Gardens</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Dinner at Ibu Rai</span>
                    </li>
                  </ul>
                </div>

                {/* Day 2 */}
                <div className="border-l-4 border-sage-300 pl-6">
                  <h3 className="font-satoshi font-bold text-xl text-gray-900 mb-3">
                    Day 2 – Nature & Relaxation
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Yoga at The Yoga Barn</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Spa at Karsa Spa</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Campuhan Ridge Walk</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Chill dinner by the pool</span>
                    </li>
                  </ul>
                </div>

                {/* Day 3 */}
                <div className="border-l-4 border-sage-300 pl-6">
                  <h3 className="font-satoshi font-bold text-xl text-gray-900 mb-3">
                    Day 3 – Culture & Leisure
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Visit Tirta Empul Temple</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Ubud Market + Saraswati Temple</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Traditional dance show at night</span>
                    </li>
                  </ul>
                </div>

                {/* Day 4 */}
                <div className="border-l-4 border-sage-300 pl-6">
                  <h3 className="font-satoshi font-bold text-xl text-gray-900 mb-3">
                    Day 4 – Farewell
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Brunch at Sayuri Cafe</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Local shopping</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Departure</span>
                    </li>
                  </ul>
                </div>
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
