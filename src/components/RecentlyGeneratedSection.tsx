
import React from 'react';

const RecentlyGeneratedSection = () => {
  const itineraries = [
    {
      id: 1,
      image: "/lovable-uploads/858df27c-78e5-452f-912d-33df4ff25a76.png",
      date: "January 25, 2025"
    },
    {
      id: 2,
      image: "/lovable-uploads/a329ae4a-a4be-4c07-8cd4-e2edf96c65b8.png",
      date: "January 25, 2025"
    },
    {
      id: 3,
      image: "/lovable-uploads/a5b83ce8-3642-4c95-a80d-f3272ebe444c.png",
      date: "January 25, 2025"
    },
    {
      id: 4,
      image: "/lovable-uploads/339ebabf-34ed-43ed-932c-9bd7f26011ec.png",
      date: "January 25, 2025"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-albert-sans font-normal text-[48px] leading-[56px] tracking-[-0.02em] text-gray-900 mb-4">
            Recently generated{' '}
            <span style={{ color: '#92B193' }}>itineraries</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={itinerary.image} 
                    alt="Travel destination"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="font-satoshi text-gray-600 text-sm">
                    {itinerary.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyGeneratedSection;
