
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import SwipeSection from '../components/SwipeSection';
import AIPoweredSection from '../components/AIPoweredSection';
import HowItWorksSection from '../components/HowItWorksSection';
import RecentlyGeneratedSection from '../components/RecentlyGeneratedSection';
import WhyChooseNomadSection from '../components/WhyChooseNomadSection';
import DreamTripSection from '../components/DreamTripSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SwipeSection />
      <AIPoweredSection />
      <HowItWorksSection />
      <RecentlyGeneratedSection />
      <WhyChooseNomadSection />
      <DreamTripSection />
      <Footer />
    </div>
  );
};

export default Index;
