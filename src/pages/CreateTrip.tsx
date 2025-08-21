import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import StepOne from '../components/trip-form/StepOne';
import StepTwo from '../components/trip-form/StepTwo';
import StepThree from '../components/trip-form/StepThree';
import ProgressIndicator from '../components/trip-form/ProgressIndicator';
import LivePreview from '../components/trip-form/LivePreview';
import QuickStartInput from '../components/trip-form/QuickStartInput';

interface TripFormData {
  destination: string;
  travelMonth: string;
  travelYear: string;
  originCity: string;
  groupSize: number;
  tripDuration: { type: 'predefined' | 'custom'; value: string; customDays?: number };
  budgetTier: string;
  decisionMode: string;
  selectedInterests: string[];
  budget: number[];
  mustHaveActivities: string[];
  specialRequests: string;
  experienceStyle: string;
  accessibilityNeeds: string;
}

const CreateTrip = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [destination, setDestination] = useState('');
  const [travelMonth, setTravelMonth] = useState('');
  const [travelYear, setTravelYear] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [tripDuration, setTripDuration] = useState<{ type: 'predefined' | 'custom'; value: string; customDays?: number }>({ type: 'predefined', value: '' });
  const [budgetTier, setBudgetTier] = useState('');
  const [decisionMode, setDecisionMode] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState([2]);
  const [mustHaveActivities, setMustHaveActivities] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [experienceStyle, setExperienceStyle] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stepLabels = ['Basics', 'Interests', 'Budget'];

  const handleQuickStart = (input: string, parsedData: any) => {
    // Apply parsed data to form fields
    if (parsedData.destination) setDestination(parsedData.destination);
    if (parsedData.travelMonth) setTravelMonth(parsedData.travelMonth);
    if (parsedData.travelYear) setTravelYear(parsedData.travelYear);
    if (parsedData.groupSize) setGroupSize(parsedData.groupSize);
    if (parsedData.tripDuration) setTripDuration(parsedData.tripDuration);
    if (parsedData.budgetTier) setBudgetTier(parsedData.budgetTier);
    if (parsedData.decisionMode) setDecisionMode(parsedData.decisionMode);

    // Parse interests based on keywords
    const lowerInput = input.toLowerCase();
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

  const onSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Get current user (nullable if not authenticated)
      const { data: { user } } = await supabase.auth.getUser();
      
      // Calculate duration in days
      const durationDays = tripDuration.type === 'custom' && tripDuration.customDays 
        ? tripDuration.customDays 
        : parseInt(tripDuration.value) || 7;

      // Prepare trip data in the requested format
      const tripData = {
        user_id: user?.id || null,
        destination,
        travel_month: travelMonth,
        travel_year: parseInt(travelYear) || new Date().getFullYear(),
        duration_days: durationDays,
        budget_tier: budgetTier,
        origin_city: originCity,
        group_size: groupSize,
        decision_mode: decisionMode,
        explorer_mode_allowed: true, // Default value
        members: [
          {
            name: "Primary Traveler",
            must: mustHaveActivities,
            ok: selectedInterests,
            no_go: [],
            flexible: true
          }
        ],
        special_requests: specialRequests,
        group_style: experienceStyle,
        accessibility: accessibilityNeeds,
        status: "draft"
      };

      // Store in trips table
      const { data: trip, error } = await supabase
        .from('trips')
        .insert({
          user_id: user?.id || null,
          destination,
          travel_month: travelMonth,
          travel_year: parseInt(travelYear) || new Date().getFullYear(),
          origin_city: originCity,
          group_size: groupSize,
          duration_days: durationDays,
          budget_tier: budgetTier,
          decision_mode: decisionMode,
          group_preferences: {
            interests: selectedInterests,
            must_have: mustHaveActivities,
            experience_style: experienceStyle
          },
          special_requests: specialRequests,
          group_style: experienceStyle,
          accessibility_needs: accessibilityNeeds ? [accessibilityNeeds] : [],
          form_payload: tripData,
          status: 'draft'
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving trip:', error);
        toast({
          title: "Error saving trip",
          description: "There was a problem saving your trip. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log('Trip saved successfully:', trip);
      
      // Now generate the itinerary using the edge function
      toast({
        title: "Generating itinerary...",
        description: "Creating your personalized travel plan.",
      });

      try {
        // Prepare data for the edge function
        let startDate: Date;
        let endDate: Date;
        
        if (travelMonth && travelMonth.trim() !== '') {
          const monthIndex = new Date(`${travelMonth} 1, ${travelYear}`).getMonth();
          startDate = new Date(parseInt(travelYear), monthIndex, 1);
        } else {
          // Default to January if no month is specified
          startDate = new Date(parseInt(travelYear), 0, 1);
        }
        
        endDate = new Date(startDate.getTime() + (durationDays * 24 * 60 * 60 * 1000));
        
        const formData = {
          destination,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          groupSize,
          budget: budget[0] * 1000, // Convert to actual budget amount
          activities: mustHaveActivities,
          groupStyle: experienceStyle,
          specialRequests,
          accessibilityNeeds,
          originCity
        };

        console.log('Sending form data to generate-itinerary:', formData);
        
        const { data: itineraryData, error: itineraryError } = await supabase.functions.invoke('generate-itinerary', {
          body: formData
        });

        console.log('Response from generate-itinerary:', { itineraryData, itineraryError });

        if (itineraryError) {
          console.error('Error generating itinerary:', itineraryError);
          console.error('Full error details:', JSON.stringify(itineraryError, null, 2));
          toast({
            title: "Error generating itinerary",
            description: `Error: ${itineraryError.message || 'Unknown error'}`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Itinerary generated!",
            description: "Your personalized travel plan is ready.",
          });
        }
      } catch (itineraryError) {
        console.error('Error generating itinerary:', itineraryError);
        toast({
          title: "Error generating itinerary",
          description: "We saved your trip but couldn't generate the itinerary. You can generate it later.",
          variant: "destructive",
        });
      }

      // Navigate to itinerary with trip ID
      navigate(`/itinerary/${trip.id}`);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    destination={destination}
                    setDestination={setDestination}
                    travelMonth={travelMonth}
                    setTravelMonth={setTravelMonth}
                    travelYear={travelYear}
                    setTravelYear={setTravelYear}
                    originCity={originCity}
                    setOriginCity={setOriginCity}
                    groupSize={groupSize}
                    setGroupSize={setGroupSize}
                    tripDuration={tripDuration}
                    setTripDuration={setTripDuration}
                    budgetTier={budgetTier}
                    setBudgetTier={setBudgetTier}
                    decisionMode={decisionMode}
                    setDecisionMode={setDecisionMode}
                    onNext={nextStep}
                  />
                )}

                {currentStep === 2 && (
                  <StepTwo
                    selectedInterests={selectedInterests}
                    setSelectedInterests={setSelectedInterests}
                    groupSize={groupSize.toString()}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                )}

                {currentStep === 3 && (
                  <StepThree
                    budget={budget}
                    setBudget={setBudget}
                    mustHaveActivities={mustHaveActivities}
                    setMustHaveActivities={setMustHaveActivities}
                    specialRequests={specialRequests}
                    setSpecialRequests={setSpecialRequests}
                    experienceStyle={experienceStyle}
                    setExperienceStyle={setExperienceStyle}
                    accessibilityNeeds={accessibilityNeeds}
                    setAccessibilityNeeds={setAccessibilityNeeds}
                    onSubmit={onSubmit}
                    onBack={prevStep}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>

              {/* Live Preview - Below form on mobile, inline on larger screens */}
              {(currentStep > 1 || destination !== '') && (
                <div className="mt-8">
                  <LivePreview
                    groupSize={groupSize.toString()}
                    dates={{ from: undefined, to: undefined }}
                    tripLength={tripDuration.value}
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
