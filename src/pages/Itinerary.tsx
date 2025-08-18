import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, DollarSign, Share2, Download, Save, 
  Filter, Sliders, Sparkles, Plus, ChevronDown, Clock, Coffee, 
  Sun, Moon, Navigation as NavigationIcon, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUnsplashImage } from '@/hooks/useUnsplashImage';
import ItineraryRefinement from '../components/itinerary/ItineraryRefinement';
import GroupPreferenceSummary from '../components/itinerary/GroupPreferenceSummary';
import FairnessTooltip from '../components/itinerary/FairnessTooltip';
import ItineraryDay from '../components/itinerary/ItineraryDay';
import VersionDropdown from '../components/itinerary/VersionDropdown';
import Navigation from '../components/Navigation';
import HeroImage from '../components/HeroImage';

interface TripData {
  id: string;
  user_id: string | null;
  destination: string;
  travel_month: string;
  travel_year: number;
  origin_city: string;
  group_size: number;
  duration_days: number;
  budget_tier: string;
  decision_mode: string;
  group_preferences: any;
  special_requests: string;
  group_style: string;
  accessibility_needs: string[];
  form_payload: any;
  itinerary_data: any;
  itinerary_version?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ActivityBlock {
  time: 'morning' | 'afternoon' | 'evening';
  title: string;
  description: string;
  duration: string;
  location: string;
  parallel_activity?: {
    title: string;
    description: string;
  };
  rendezvous?: string;
}

interface DayItinerary {
  day: number;
  theme: string;
  color: string;
  hero_image?: string;
  activities: ActivityBlock[];
}

const Itinerary = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  
  // Filter states
  const [vibeFilters, setVibeFilters] = useState({
    relaxed: true,
    adventure: true,
    cultural: true,
    foodie: true
  });
  const [pace, setPace] = useState([2]);
  const [budgetBand, setBudgetBand] = useState([2]);
  const [showFilters, setShowFilters] = useState(false);
  const [attributions, setAttributions] = useState<Array<{
    photographer: string;
    photographerUrl: string;
    imageUrl: string;
  }>>([]);

  const calculateDays = () => {
    if (!tripData?.travel_month || !tripData?.travel_year || !tripData?.duration_days) return 0;
    return tripData.duration_days;
  };

  useEffect(() => {
    if (tripId) {
      fetchTripData();
    } else {
      setError('No trip ID provided');
      setLoading(false);
    }
  }, [tripId]);

  // Track view analytics on first mount
  useEffect(() => {
    if (tripData && !hasTrackedView) {
      trackViewAnalytics();
      setHasTrackedView(true);
    }
  }, [tripData, hasTrackedView]);

  const trackViewAnalytics = async () => {
    if (!tripData) return;
    
    try {
      await supabase.from('analytics_events').insert({
        trip_id: tripData.id,
        user_id: null,
        event: 'view_itinerary',
        meta: {
          destination: tripData.destination,
          duration_days: tripData.duration_days,
          version: tripData.itinerary_version || 1
        }
      });
    } catch (error) {
      console.error('Error tracking view analytics:', error);
    }
  };

  const fetchTripData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .single();

      if (error) {
        console.error('Error fetching trip:', error);
        setError('Failed to load trip data');
        return;
      }

      setTripData(data);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateItinerary = async () => {
    console.log('🚀 Generate itinerary button clicked!');
    if (!tripData) {
      console.error('❌ No trip data available');
      return;
    }
    
    console.log('📊 Trip data:', tripData);
    
    setLoading(true);
    toast({
      title: "Generating itinerary...",
      description: "Creating your personalized travel plan.",
    });

    try {
      // Calculate start and end dates
      const monthIndex = new Date(`${tripData.travel_month} 1, ${tripData.travel_year}`).getMonth();
      const startDate = new Date(tripData.travel_year, monthIndex, 1);
      const endDate = new Date(startDate.getTime() + (tripData.duration_days * 24 * 60 * 60 * 1000));
      
      const formData = {
        destination: tripData.destination,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        groupSize: tripData.group_size,
        budget: 2000, // Default budget
        activities: tripData.group_preferences?.must_have || [],
        groupStyle: tripData.group_style || 'balanced',
        specialRequests: tripData.special_requests,
        accessibilityNeeds: tripData.accessibility_needs?.join(', '),
        originCity: tripData.origin_city
      };

      console.log('📝 Form data being sent:', formData);

      const { data: itineraryData, error: itineraryError } = await supabase.functions.invoke('generate-itinerary', {
        body: formData
      });

      console.log('📥 Response data:', itineraryData);
      console.log('❌ Response error:', itineraryError);

      if (itineraryError) {
        console.error('Error generating itinerary:', itineraryError);
        toast({
          title: "Error generating itinerary",
          description: "We couldn't generate the itinerary. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Reload trip data to get the updated itinerary
      await fetchTripData();
      
      toast({
        title: "Itinerary generated!",
        description: "Your personalized travel plan is ready.",
      });
    } catch (error) {
      console.error('❌ Unexpected error in handleGenerateItinerary:', error);
      toast({
        title: "Error generating itinerary",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    toast({
      title: "Itinerary saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tripData?.destination} Trip Itinerary`,
        text: `Check out my ${tripData?.duration_days}-day itinerary for ${tripData?.destination}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Itinerary link copied to clipboard!",
      });
    }
  };

  const handleExportPDF = () => {
    toast({
      title: "Exporting PDF...",
      description: "PDF export feature coming soon!",
    });
  };

  const getBudgetBadgeColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'budget': return 'bg-green-100 text-green-700';
      case 'mid-range': return 'bg-blue-100 text-blue-700';
      case 'luxury': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTimeIcon = (time: string) => {
    switch (time) {
      case 'morning': return <Coffee className="w-4 h-4" />;
      case 'afternoon': return <Sun className="w-4 h-4" />;
      case 'evening': return <Moon className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const mockItineraryData: DayItinerary[] = [
    {
      day: 1,
      theme: "Arrival & Exploration",
      color: "from-blue-400 to-blue-600",
      hero_image: "/lovable-uploads/9b68c3ac-69b4-433b-9fad-88608e8ed270.png",
      activities: [
        {
          time: 'morning',
          title: 'Airport Transfer & Check-in',
          description: 'Arrival at destination and hotel check-in',
          duration: '2 hours',
          location: 'Hotel District',
          rendezvous: 'Hotel Lobby at 10:00 AM'
        },
        {
          time: 'afternoon',
          title: 'City Walking Tour',
          description: 'Explore the historic city center and main landmarks',
          duration: '3 hours',
          location: 'Historic Center',
          parallel_activity: {
            title: 'Museum Visit',
            description: 'Option to visit local history museum instead'
          },
          rendezvous: 'City Square at 5:00 PM'
        },
        {
          time: 'evening',
          title: 'Welcome Dinner',
          description: 'Traditional local cuisine at recommended restaurant',
          duration: '2 hours',
          location: 'Restaurant District'
        }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  if (error || !tripData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested trip could not be found.'}</p>
          <Button onClick={() => navigate('/create-trip')}>Create New Trip</Button>
        </div>
      </div>
    );
  }

  const hasItinerary = tripData.itinerary_data && Object.keys(tripData.itinerary_data).length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{tripData.destination}</h1>
                <Badge className={`px-3 py-1 ${getBudgetBadgeColor(tripData.budget_tier)}`}>
                  {tripData.budget_tier || 'Budget'}
                </Badge>
                {hasItinerary && (
                  <Badge variant="outline" className="text-xs">
                    v{tripData.itinerary_version || 1}
                  </Badge>
                )}
                {hasItinerary && tripData.itinerary_data?.fairness_explainer && (
                  <FairnessTooltip fairnessExplainer={tripData.itinerary_data.fairness_explainer} />
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{tripData.travel_month} {tripData.travel_year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{tripData.group_size} people</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{tripData.duration_days} days</span>
                </div>
                {tripData.origin_city && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>from {tripData.origin_city}</span>
                  </div>
                )}
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {tripData.group_preferences?.interests?.map((interest: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>

              {/* Group Preference Summary */}
              {tripData.form_payload && (
                <div className="mt-3">
                  <GroupPreferenceSummary formPayload={tripData.form_payload} />
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              {hasItinerary && (
                <VersionDropdown
                  tripId={tripData.id}
                  currentVersion={tripData.itinerary_version || 1}
                  onVersionRestored={fetchTripData}
                />
              )}
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {!hasItinerary ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Generate Your Itinerary?</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We'll create a personalized day-by-day itinerary based on your preferences and group details.
                </p>
                <Button onClick={handleGenerateItinerary} size="lg" className="px-8">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Itinerary
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Check if we have the new enriched format */}
                {tripData.itinerary_data?.days ? (
                  // New enriched format
                  <div className="space-y-8">
                    {/* Header with Hero Image */}
                    <div className="text-center space-y-4">
                      <div className="relative rounded-lg overflow-hidden h-64 mb-6">
                        <HeroImage 
                          destination={tripData.destination}
                          itineraryId={tripData.id}
                          className="w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <h1 className="text-4xl font-bold mb-2">
                              {tripData.itinerary_data.title || `${tripData.destination} Itinerary`}
                            </h1>
                            <p className="text-white/90 text-lg max-w-2xl">
                              {tripData.itinerary_data.summary || `Your ${tripData.duration_days} day adventure in ${tripData.destination}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {tripData.itinerary_data.date_range && (
                        <p className="text-sm text-muted-foreground">{tripData.itinerary_data.date_range}</p>
                      )}
                      {tripData.itinerary_data.tags && (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {tripData.itinerary_data.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {tripData.itinerary_data.fairness_explainer && (
                        <div className="bg-accent/20 rounded-lg p-4 max-w-2xl mx-auto">
                          <p className="text-sm text-foreground">{tripData.itinerary_data.fairness_explainer}</p>
                        </div>
                      )}
                    </div>

                    {/* Days */}
                    <div className="space-y-8">
                      {tripData.itinerary_data.days.map((day: any) => (
                        <ItineraryDay 
                          key={day.day} 
                          dayData={day} 
                          destination={tripData.destination}
                          itineraryId={tripData.id}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  // Legacy format fallback
                  <div className="space-y-6">
                    {tripData.itinerary_data?.itinerary?.map((day: any) => (
                      <Card key={day.day} className="overflow-hidden">
                        <CardHeader className={`bg-gradient-to-r ${day.color} text-white p-6`}>
                          <CardTitle className="flex items-center justify-between">
                            <div>
                              <h3 className="text-2xl font-bold">Day {day.day}</h3>
                              <p className="text-blue-100 mt-1">{day.theme}</p>
                            </div>
                            {day.heroImage && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/20">
                                <img 
                                  src={day.heroImage} 
                                  alt={`Day ${day.day}`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="p-6">
                          <div className="space-y-6">
                            {day.activities?.map((activity: any, index: number) => (
                              <div key={index} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Clock className="w-4 h-4" />
                                  </div>
                                  {index < day.activities.length - 1 && (
                                    <div className="w-px h-16 bg-gray-200 mt-2"></div>
                                  )}
                                </div>
                                
                                <div className="flex-1 pb-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <p className="text-sm text-gray-500">{activity.time}</p>
                                      <h4 className="font-semibold text-gray-900">
                                        {activity.title}
                                      </h4>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {activity.duration}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-gray-600 mb-2">{activity.description}</p>
                                  
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <MapPin className="w-3 h-3" />
                                    <span>{activity.location}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

            {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            {/* Refinement Controls */}
            {hasItinerary && (
              <ItineraryRefinement
                tripId={tripData.id}
                currentVersion={tripData.itinerary_version || 1}
                onRefinementComplete={(updatedTrip) => {
                  setTripData(updatedTrip);
                }}
              />
            )}

            {/* Preferences Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trip Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Group Style</h4>
                  <p className="text-sm text-gray-600">{tripData.group_style || 'Balanced'}</p>
                </div>
                
                {tripData.special_requests && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Special Requests</h4>
                    <p className="text-sm text-gray-600">{tripData.special_requests}</p>
                  </div>
                )}
                
                {tripData.accessibility_needs?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Accessibility Needs</h4>
                    <p className="text-sm text-gray-600">
                      {tripData.accessibility_needs.join(', ')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">Filters & Preferences</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              
              {showFilters && (
                <CardContent className="space-y-6">
                  {/* Vibe Toggles */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Vibes</h4>
                    <div className="space-y-3">
                      {Object.entries(vibeFilters).map(([vibe, enabled]) => (
                        <div key={vibe} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{vibe}</span>
                          <Switch
                            checked={enabled}
                            onCheckedChange={(checked) =>
                              setVibeFilters(prev => ({ ...prev, [vibe]: checked }))
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Pace Slider */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Pace</h4>
                    <Slider
                      value={pace}
                      onValueChange={setPace}
                      max={4}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Relaxed</span>
                      <span>Packed</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Budget Band */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Budget Band</h4>
                    <Slider
                      value={budgetBand}
                      onValueChange={setBudgetBand}
                      max={4}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Budget</span>
                      <span>Luxury</span>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* AI Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Activity
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Adjust Pace
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Surprise Me
                </Button>
              </CardContent>
            </Card>

            {/* Suggestions Drawer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">Suggestions</span>
                  <ChevronDown className="w-4 h-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Add Food Tour</p>
                    <p className="text-xs text-blue-700">Day 2 afternoon slot available</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Museum Alternative</p>
                    <p className="text-xs text-green-700">Perfect for rainy day backup</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Unsplash Attribution Footer */}
      <footer className="bg-muted/30 border-t py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-xs text-muted-foreground">
            <p>
              Photos by{' '}
              <a 
                href="https://unsplash.com/?utm_source=nomad_travel&utm_medium=referral" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Unsplash
              </a>
              {' '}photographers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Itinerary;