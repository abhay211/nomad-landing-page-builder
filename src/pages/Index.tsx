
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import SwipeSection from '../components/SwipeSection';
import AIPoweredSection from '../components/AIPoweredSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SwipeSection />
      <AIPoweredSection />
    </div>
  );
};

export default Index;
