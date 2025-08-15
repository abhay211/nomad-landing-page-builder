import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '../components/Navigation';

interface AnalyticsEvent {
  event: string;
  meta?: any;
  created_at: string;
}

interface EventSummary {
  event: string;
  count: number;
  avg_duration_ms?: number;
  success_rate?: number;
}

const AdminAnalytics = () => {
  const [analytics7d, setAnalytics7d] = useState<EventSummary[]>([]);
  const [analytics30d, setAnalytics30d] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Get 7-day analytics
      const { data: data7d, error: error7d } = await supabase
        .from('analytics_events')
        .select('event, meta, created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (error7d) throw error7d;

      // Get 30-day analytics
      const { data: data30d, error: error30d } = await supabase
        .from('analytics_events')
        .select('event, meta, created_at')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      if (error30d) throw error30d;

      // Process the data
      setAnalytics7d(processAnalyticsData(data7d || []));
      setAnalytics30d(processAnalyticsData(data30d || []));

    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (data: AnalyticsEvent[]): EventSummary[] => {
    const eventGroups = data.reduce((acc, event) => {
      if (!acc[event.event]) {
        acc[event.event] = [];
      }
      acc[event.event].push(event);
      return acc;
    }, {} as Record<string, AnalyticsEvent[]>);

    return Object.entries(eventGroups).map(([event, events]) => {
      const count = events.length;
      
      // Calculate average duration for AI operations
      const durationsMs = events
        .map(e => e.meta?.duration_ms)
        .filter(d => typeof d === 'number') as number[];
      
      const avg_duration_ms = durationsMs.length > 0 
        ? Math.round(durationsMs.reduce((a, b) => a + b, 0) / durationsMs.length)
        : undefined;

      // Calculate success rate for generate/refine operations
      let success_rate: number | undefined;
      if (event.includes('generate') || event.includes('refine')) {
        const allEvents = events.filter(e => e.event.includes('generate') || e.event.includes('refine'));
        const successEvents = allEvents.filter(e => e.event.includes('success')).length;
        const errorEvents = allEvents.filter(e => e.event.includes('error')).length;
        const total = successEvents + errorEvents;
        if (total > 0) {
          success_rate = Math.round((successEvents / total) * 100);
        }
      }

      return {
        event,
        count,
        avg_duration_ms,
        success_rate
      };
    }).sort((a, b) => b.count - a.count);
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getEventIcon = (event: string) => {
    if (event.includes('generate')) return <BarChart3 className="w-4 h-4" />;
    if (event.includes('refine')) return <TrendingUp className="w-4 h-4" />;
    if (event.includes('view')) return <Activity className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const getEventColor = (event: string) => {
    if (event.includes('success')) return 'bg-green-100 text-green-700';
    if (event.includes('error')) return 'bg-red-100 text-red-700';
    return 'bg-blue-100 text-blue-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Unavailable</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={fetchAnalytics}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Event tracking and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 7-Day Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Last 7 Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics7d.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events in the last 7 days</p>
                ) : (
                  analytics7d.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getEventIcon(item.event)}
                        <div>
                          <Badge className={`text-xs ${getEventColor(item.event)}`}>
                            {item.event.replace('_', ' ').toUpperCase()}
                          </Badge>
                          {item.avg_duration_ms && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Avg: {formatDuration(item.avg_duration_ms)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{item.count}</p>
                        {item.success_rate !== undefined && (
                          <p className="text-xs text-muted-foreground">
                            {item.success_rate}% success
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* 30-Day Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Last 30 Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics30d.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events in the last 30 days</p>
                ) : (
                  analytics30d.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getEventIcon(item.event)}
                        <div>
                          <Badge className={`text-xs ${getEventColor(item.event)}`}>
                            {item.event.replace('_', ' ').toUpperCase()}
                          </Badge>
                          {item.avg_duration_ms && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Avg: {formatDuration(item.avg_duration_ms)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{item.count}</p>
                        {item.success_rate !== undefined && (
                          <p className="text-xs text-muted-foreground">
                            {item.success_rate}% success
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Total Events (7d)</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {analytics7d.reduce((sum, item) => sum + item.count, 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Total Events (30d)</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {analytics30d.reduce((sum, item) => sum + item.count, 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">Event Types (7d)</span>
              </div>
              <p className="text-2xl font-bold mt-2">{analytics7d.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Avg Duration</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {(() => {
                  const durations = analytics7d
                    .map(item => item.avg_duration_ms)
                    .filter(d => d !== undefined) as number[];
                  if (durations.length === 0) return 'N/A';
                  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
                  return formatDuration(avg);
                })()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;