import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import StepOne from '../components/trip-form/StepOne';
import StepTwo from '../components/trip-form/StepTwo';
import StepThree from '../components/trip-form/StepThree';
import ProgressIndicator from '../components/trip-form/ProgressIndicator';
import LivePreview from '../components/trip-form/LivePreview';
import QuickStartInput from '../components/trip-form/QuickStartInput';

interface TripFormData {
  groupSize: string;
  dates: { from?: Date; to?: Date };
  tripLength: string;
  selectedInterests: string[];
  budget: number[];
  specialRequests: string[];
  customRequests: string;
}

const CreateTrip = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state
  const [groupSize, setGroupSize] = useState('');
  const [dates, setDates] = useState<{ from?: Date; to?: Date }>({});
  const [tripLength, setTripLength] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState([2]);
  const [specialRequests, setSpecialRequests] = useState<string[]>([]);
  const [customRequests, setCustomRequests] = useState('');

  const stepLabels = ['Basics', 'Interests', 'Budget'];

  const handleQuickStart = (input: string) => {
    // Simulate AI parsing - in real app, this would call an AI service
    const lowerInput = input.toLowerCase();
    
    // Parse group size
    if (lowerInput.includes('solo') || lowerInput.includes('just me')) {
      setGroupSize('solo');
    } else if (lowerInput.includes('2') || lowerInput.includes('couple')) {
      setGroupSize('2-3');
    } else if (lowerInput.includes('family') || lowerInput.includes('4') || lowerInput.includes('5')) {
      setGroupSize('4-6');
    } else if (lowerInput.includes('group') || lowerInput.includes('7')) {
      setGroupSize('7+');
    }

    // Parse trip length
    if (lowerInput.includes('weekend')) {
      setTripLength('weekend');
    } else if (lowerInput.includes('week') && !lowerInput.includes('2')) {
      setTripLength('1-week');
    } else if (lowerInput.includes('2 week') || lowerInput.includes('month')) {
      setTripLength('2-weeks');
    }

    // Parse interests based on keywords
    const interests = [];
    if (lowerInput.includes('beach') || lowerInput.includes('relax')) interests.push('relax');
    if (lowerInput.includes('adventure') || lowerInput.includes('hiking')) interests.push('adventure');
    if (lowerInput.includes('city') || lowerInput.includes('urban')) interests.push('city-life');
    if (lowerInput.includes('culture') || lowerInput.includes('museum')) interests.push('culture');
    if (lowerInput.includes('nature') || lowerInput.includes('forest')) interests.push('nature');
    if (lowerInput.includes('wellness') || lowerInput.includes('spa')) interests.push('wellness');
    
    setSelectedInterests(interests);
    setCurrentStep(2); // Jump to step 2 after quick start
  };

  const onSubmit = () => {
    const data: TripFormData = {
      groupSize,
      dates,
      tripLength,
      selectedInterests,
      budget,
      specialRequests,
      customRequests
    };
    
    console.log('Trip data:', data);
    navigate('/itinerary');
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Background */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-sage-100"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-sage-300 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <MapPin className="w-96 h-96 text-sage-400" />
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-albert-sans font-light text-[48px] sm:text-[62px] leading-[56px] sm:leading-[70px] tracking-[-0.04em] text-gray-900 mb-6">
              Tell us about your <span style={{ color: '#92B193' }}>trip</span>
            </h1>
            <p className="font-albert-sans text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
              Share a few details and we'll create the perfect itinerary for your group
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 backdrop-blur-sm bg-opacity-95">
                {/* Progress Indicator */}
                <ProgressIndicator
                  currentStep={currentStep}
                  totalSteps={3}
                  stepLabels={stepLabels}
                />

                {/* Quick Start */}
                {currentStep === 1 && (
                  <QuickStartInput onQuickStart={handleQuickStart} className="mb-8" />
                )}

                {/* Step Content */}
                {currentStep === 1 && (
                  <StepOne
                    groupSize={groupSize}
                    setGroupSize={setGroupSize}
                    dates={dates}
                    setDates={setDates}
                    tripLength={tripLength}
                    setTripLength={setTripLength}
                    onNext={nextStep}
                  />
                )}

                {currentStep === 2 && (
                  <StepTwo
                    selectedInterests={selectedInterests}
                    setSelectedInterests={setSelectedInterests}
                    groupSize={groupSize}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                )}

                {currentStep === 3 && (
                  <StepThree
                    budget={budget}
                    setBudget={setBudget}
                    specialRequests={specialRequests}
                    setSpecialRequests={setSpecialRequests}
                    customRequests={customRequests}
                    setCustomRequests={setCustomRequests}
                    onSubmit={onSubmit}
                    onBack={prevStep}
                  />
                )}
              </div>

              {/* Live Preview - Below form on mobile, inline on larger screens */}
              {(currentStep > 1 || groupSize !== '') && (
                <div className="mt-8">
                  <LivePreview
                    groupSize={groupSize}
                    dates={dates}
                    tripLength={tripLength}
                    selectedInterests={selectedInterests}
                    budget={budget}
                    isVisible={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreateTrip;
