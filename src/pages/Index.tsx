
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import SwipeSection from '../components/SwipeSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SwipeSection />
    </div>
  );
};

export default Index;
