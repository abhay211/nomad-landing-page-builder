
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import StepOne from '../components/how-it-works/StepOne';
import StepTwo from '../components/how-it-works/StepTwo';
import StepThree from '../components/how-it-works/StepThree';
import StepFour from '../components/how-it-works/StepFour';
import StepFive from '../components/how-it-works/StepFive';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';

const HowItWorks = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-sage-100"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-sage-300 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-albert-sans font-light text-[48px] sm:text-[62px] leading-[56px] sm:leading-[70px] tracking-[-0.04em] text-gray-900 mb-6">
              How <span style={{ color: '#92B193' }}>Nomad</span> Works
            </h1>
            <p className="font-albert-sans text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
              From preferences to perfect itinerary in 5 simple steps
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="px-4">
                    <StepOne />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="px-4">
                    <StepTwo />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="px-4">
                    <StepThree />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="px-4">
                    <StepFour />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="px-4">
                    <StepFive />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
