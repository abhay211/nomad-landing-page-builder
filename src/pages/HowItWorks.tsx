
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import StepOne from '../components/how-it-works/StepOne';
import StepTwo from '../components/how-it-works/StepTwo';
import StepThree from '../components/how-it-works/StepThree';
import StepFour from '../components/how-it-works/StepFour';
import StepFive from '../components/how-it-works/StepFive';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '../components/ui/carousel';

const HowItWorks = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
            <Carousel 
              className="w-full"
              setApi={setApi}
              opts={{
                align: "start",
                loop: false,
                slidesToScroll: 1
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                <CarouselItem className="pl-2 md:pl-4 basis-5/6 md:basis-4/5">
                  <div className="px-4">
                    <StepOne />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4 basis-5/6 md:basis-4/5">
                  <div className="px-4">
                    <StepTwo />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4 basis-5/6 md:basis-4/5">
                  <div className="px-4">
                    <StepThree />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4 basis-5/6 md:basis-4/5">
                  <div className="px-4">
                    <StepFour />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4 basis-5/6 md:basis-4/5">
                  <div className="px-4">
                    <StepFive />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            {/* Progress Bar */}
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-2">
                {Array.from({ length: count }, (_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index + 1 === current 
                        ? 'w-8 bg-sage-500' 
                        : 'w-2 bg-sage-200 hover:bg-sage-300'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
