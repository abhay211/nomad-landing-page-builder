
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AIPoweredSection from '../components/AIPoweredSection';
import HowItWorksSection from '../components/HowItWorksSection';
import RecentlyGeneratedSection from '../components/RecentlyGeneratedSection';
import WhyChooseNomadSection from '../components/WhyChooseNomadSection';
import SwipeSection from '../components/SwipeSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AIPoweredSection />
      <HowItWorksSection />
      <RecentlyGeneratedSection />
      <WhyChooseNomadSection />
      <SwipeSection />
    </div>
  );
};

export default Index;
