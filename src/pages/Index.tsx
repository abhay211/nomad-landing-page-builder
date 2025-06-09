
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import SwipeSection from '../components/SwipeSection';
import AIPoweredSection from '../components/AIPoweredSection';
import HowItWorksSection from '../components/HowItWorksSection';
import RecentlyGeneratedSection from '../components/RecentlyGeneratedSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SwipeSection />
      <AIPoweredSection />
      <HowItWorksSection />
      <RecentlyGeneratedSection />
    </div>
  );
};

export default Index;
