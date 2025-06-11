
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mountain, Leaf, Heart, Building, Trees, Palette, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface TripFormData {
  groupSize: string;
  tripLength: string;
  travelVibe: string;
  budget: number[];
  preferences: string;
}

const CreateTrip = () => {
  const [budget, setBudget] = useState([2]);
  
  const form = useForm<TripFormData>({
    defaultValues: {
      groupSize: '',
      tripLength: '',
      travelVibe: '',
      budget: [2],
      preferences: ''
    }
  });

  const onSubmit = (data: TripFormData) => {
    console.log('Trip data:', { ...data, budget });
    // Handle form submission
  };

  const getBudgetLabel = (value: number) => {
    switch (value) {
      case 1: return 'Low ($)';
      case 2: return 'Medium ($$)';
      case 3: return 'High ($$$)';
      default: return 'Medium ($$)';
    }
  };

  const vibeOptions = [
    { value: 'relax', label: 'Relax', icon: Leaf, color: '#92B193' },
    { value: 'explore', label: 'Explore', icon: Mountain, color: '#92B193' },
    { value: 'adventure', label: 'Adventure', icon: Mountain, color: '#92B193' },
    { value: 'wellness', label: 'Wellness', icon: Heart, color: '#92B193' },
    { value: 'city-life', label: 'City Life', icon: Building, color: '#92B193' },
    { value: 'nature', label: 'Nature', icon: Trees, color: '#92B193' },
    { value: 'culture', label: 'Culture', icon: Palette, color: '#92B193' },
    { value: 'hidden-gems', label: 'Hidden Gems', icon: Star, color: '#92B193' }
  ];

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
        
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-albert-sans font-light text-[48px] sm:text-[62px] leading-[56px] sm:leading-[70px] tracking-[-0.04em] text-gray-900 mb-6">
              Tell us about your <span style={{ color: '#92B193' }}>trip</span>
            </h1>
            <p className="font-albert-sans text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
              Share a few details and we'll create the perfect itinerary for your group
            </p>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8 sm:p-12 backdrop-blur-sm bg-opacity-95">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Group Size */}
                <FormField
                  control={form.control}
                  name="groupSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-satoshi font-medium text-gray-900">
                        Group Size
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-sage-400 transition-colors">
                            <SelectValue placeholder="How many people?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Just me</SelectItem>
                          <SelectItem value="2">2 people</SelectItem>
                          <SelectItem value="2-4">2-4 people</SelectItem>
                          <SelectItem value="4-6">4-6 people</SelectItem>
                          <SelectItem value="6-10">6-10 people</SelectItem>
                          <SelectItem value="10+">10+ people</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Trip Length */}
                <FormField
                  control={form.control}
                  name="tripLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-satoshi font-medium text-gray-900">
                        Trip Length
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-sage-400 transition-colors">
                            <SelectValue placeholder="How long is your trip?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 days</SelectItem>
                          <SelectItem value="2-4">2-4 days</SelectItem>
                          <SelectItem value="4-7">4-7 days</SelectItem>
                          <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                          <SelectItem value="2weeks+">2+ weeks</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Travel Vibe */}
                <FormField
                  control={form.control}
                  name="travelVibe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-satoshi font-medium text-gray-900 mb-4 block">
                        Travel Vibe
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                        >
                          {vibeOptions.map((option) => (
                            <div key={option.value} className="relative">
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                                className="peer sr-only"
                              />
                              <label
                                htmlFor={option.value}
                                className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-200 hover:border-sage-300 hover:bg-sage-50 peer-checked:border-sage-400 peer-checked:bg-sage-50 peer-checked:shadow-md min-h-[80px]"
                              >
                                <option.icon className="w-6 h-6 mb-2 text-sage-500" />
                                <span className="font-satoshi font-medium text-gray-900 text-sm text-center">
                                  {option.label}
                                </span>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Budget */}
                <div className="space-y-4">
                  <label className="text-lg font-satoshi font-medium text-gray-900 block">
                    Budget Range
                  </label>
                  <div className="space-y-4">
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      max={3}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="inline-flex items-center px-4 py-2 bg-sage-100 text-sage-800 rounded-full font-satoshi font-medium">
                        {getBudgetLabel(budget[0])}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-satoshi font-medium text-gray-900">
                        Any specific preferences? (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., beaches, hiking trails, local markets, spa treatments..."
                          className="min-h-[100px] border-2 border-gray-200 focus:border-sage-400 transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 text-white font-plus-jakarta font-medium text-xl rounded-full transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: '#92B193' }}
                >
                  Get My Itinerary
                  <div className="ml-4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/bfe7e292-b113-429a-9a8e-a3bc4130d317.png" 
                      alt="arrow" 
                      className="w-5 h-5"
                    />
                  </div>
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreateTrip;
