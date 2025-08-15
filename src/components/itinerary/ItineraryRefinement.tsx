import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Coffee, Utensils, MapPin, Heart, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ItineraryRefinementProps {
  tripId: string;
  currentVersion?: number;
  onRefinementComplete: (updatedTrip: any) => void;
}

const ItineraryRefinement: React.FC<ItineraryRefinementProps> = ({ 
  tripId, 
  currentVersion = 1, 
  onRefinementComplete 
}) => {
  const [customInput, setCustomInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const quickActions = [
    {
      label: 'Make mornings chill',
      icon: <Coffee className="w-4 h-4" />,
      action: 'Make all morning activities more relaxed and leisurely. Start days later and add more rest time.'
    },
    {
      label: 'Add 2 local food experiences',
      icon: <Utensils className="w-4 h-4" />,
      action: 'Add 2 authentic local food experiences to the itinerary - could be street food tours, cooking classes, or local market visits.'
    },
    {
      label: 'Reduce walking overall',
      icon: <MapPin className="w-4 h-4" />,
      action: 'Reduce the amount of walking required throughout the trip. Group nearby activities together and suggest transportation options.'
    },
    {
      label: 'Make Day 1 more relaxing',
      icon: <Heart className="w-4 h-4" />,
      action: 'Make Day 1 more relaxing with fewer activities, more rest time, and gentler introduction to the destination.'
    }
  ];

  const handleRefinement = async (directionText: string) => {
    if (!directionText.trim()) {
      toast({
        title: "Input required",
        description: "Please provide refinement instructions.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('refine-itinerary', {
        body: { 
          tripId, 
          directionText: directionText.trim() 
        }
      });

      if (error) {
        console.error('Error refining itinerary:', error);
        toast({
          title: "Refinement failed",
          description: "We couldn't refine your itinerary. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data?.success) {
        onRefinementComplete(data.trip);
        setCustomInput('');
        toast({
          title: `Itinerary refined! (Version ${data.version})`,
          description: data.message,
        });
      } else {
        throw new Error(data?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error refining itinerary:', error);
      toast({
        title: "Refinement failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    handleRefinement(action);
  };

  const handleCustomRefinement = () => {
    if (customInput.trim()) {
      handleRefinement(customInput);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>Refine with AI</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Version {currentVersion}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Actions */}
        <div>
          <h4 className="font-medium text-sm mb-3">Quick Actions</h4>
          <div className="grid grid-cols-1 gap-2">
            {quickActions.map((quickAction, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start h-auto p-3 text-left"
                onClick={() => handleQuickAction(quickAction.action)}
                disabled={loading}
              >
                <div className="flex items-center gap-3">
                  {quickAction.icon}
                  <span className="text-sm">{quickAction.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div>
          <h4 className="font-medium text-sm mb-3">Custom Refinement</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Describe how you'd like to modify your itinerary..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleCustomRefinement();
                }
              }}
            />
            <Button 
              onClick={handleCustomRefinement}
              disabled={loading || !customInput.trim()}
              size="sm"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Try: "Add more museum visits", "Make Day 2 budget-friendly", "Focus on outdoor activities"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItineraryRefinement;