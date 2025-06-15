import React from 'react';
import MockedItinerary from '@/components/MockedItinerary';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const MockPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="py-16">
        <MockedItinerary />
      </main>
      <Footer />
    </div>
  );
};

export default MockPage;
