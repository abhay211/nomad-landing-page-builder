import React, { useState } from 'react';

const MockedItinerary = () => {
  const [showItinerary, setShowItinerary] = useState(false);

  const itinerary = `
🌴 Destination: Ubud, Bali
🛏 Stay: Boutique 2-bedroom villa with jungle view
💰 Budget: Medium ($$)

🗓 Itinerary:
Day 1 – Arrival & Unwind:
  - Check-in to villa
  - Sunset drinks at Folk Pool & Gardens
  - Dinner at Ibu Rai

Day 2 – Nature & Relaxation:
  - Yoga at The Yoga Barn
  - Spa at Karsa Spa
  - Campuhan Ridge Walk
  - Chill dinner by the pool

Day 3 – Culture & Leisure:
  - Visit Tirta Empul Temple
  - Ubud Market + Saraswati Temple
  - Traditional dance show at night

Day 4 – Farewell:
  - Brunch at Sayuri Cafe
  - Local shopping
  - Departure
  `;

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Mock Nomad Itinerary</h2>
      <button
        onClick={() => setShowItinerary(true)}
        className="bg-[#92B193] text-white px-6 py-3 rounded-full text-lg hover:bg-[#7fa783] transition"
      >
        Generate Itinerary
      </button>

      {showItinerary && (
        <pre className="text-left mt-8 p-6 bg-gray-50 border rounded-lg whitespace-pre-wrap">
          {itinerary}
        </pre>
      )}
    </div>
  );
};

export default MockedItinerary;
