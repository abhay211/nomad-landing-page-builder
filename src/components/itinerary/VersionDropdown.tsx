import React, { useState, useEffect } from 'react';
import { ChevronDown, History, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VersionData {
  version: number;
  itinerary_json: any;
  created_at: string;
}

interface VersionDropdownProps {
  tripId: string;
  currentVersion: number;
  onVersionRestored: () => void;
}

const VersionDropdown: React.FC<VersionDropdownProps> = ({
  tripId,
  currentVersion,
  onVersionRestored,
}) => {
  const [versions, setVersions] = useState<VersionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewVersion, setPreviewVersion] = useState<VersionData | null>(null);
  const [restoring, setRestoring] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchVersions();
  }, [tripId]);

  const fetchVersions = async () => {
    try {
      const { data, error } = await supabase
        .from('trips_versions')
        .select('version, itinerary_json, created_at')
        .eq('trip_id', tripId)
        .order('version', { ascending: false });

      if (error) {
        console.error('Error fetching versions:', error);
        return;
      }

      setVersions(data || []);
    } catch (error) {
      console.error('Error fetching versions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVersionPreview = (version: VersionData) => {
    setPreviewVersion(version);
  };

  const handleRestore = async () => {
    if (!previewVersion) return;

    setRestoring(true);
    try {
      const newVersion = currentVersion + 1;

      // Store as new version
      const { error: versionError } = await supabase
        .from('trips_versions')
        .insert({
          trip_id: tripId,
          version: newVersion,
          itinerary_json: previewVersion.itinerary_json
        });

      if (versionError) throw versionError;

      // Update current trip
      const { error: updateError } = await supabase
        .from('trips')
        .update({
          itinerary_data: previewVersion.itinerary_json,
          itinerary_version: newVersion,
          updated_at: new Date().toISOString()
        })
        .eq('id', tripId);

      if (updateError) throw updateError;

      toast({
        title: "Version restored",
        description: `Restored to version ${previewVersion.version} as v${newVersion}`,
      });

      setPreviewVersion(null);
      onVersionRestored();
      fetchVersions();
    } catch (error) {
      console.error('Error restoring version:', error);
      toast({
        title: "Error",
        description: "Failed to restore version",
        variant: "destructive",
      });
    } finally {
      setRestoring(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || versions.length === 0) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <History className="w-4 h-4 mr-2" />
            View versions
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          {versions.map((version) => (
            <DropdownMenuItem
              key={version.version}
              onClick={() => handleVersionPreview(version)}
              className="flex items-center justify-between p-3 cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-medium">
                  Version {version.version}
                  {version.version === currentVersion && " (current)"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(version.created_at)}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={!!previewVersion} onOpenChange={() => setPreviewVersion(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Version {previewVersion?.version} Preview</span>
              <Button
                onClick={handleRestore}
                disabled={restoring}
                size="sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {restoring ? "Restoring..." : "Restore"}
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto flex-1">
            {previewVersion && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Created: {formatDate(previewVersion.created_at)}
                  </p>
                  <p className="text-sm">
                    This will restore this version as v{currentVersion + 1}, keeping history intact.
                  </p>
                </div>

                {/* Preview itinerary content */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">
                    {previewVersion.itinerary_json.title || "Itinerary Preview"}
                  </h3>
                  
                  {previewVersion.itinerary_json.summary && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {previewVersion.itinerary_json.summary}
                    </p>
                  )}

                  <div className="space-y-3">
                    {previewVersion.itinerary_json.days?.slice(0, 3).map((day: any) => (
                      <div key={day.day} className="border-l-2 border-primary/20 pl-3">
                        <div className="font-medium">Day {day.day}</div>
                        <div className="text-sm text-muted-foreground">
                          {day.theme?.join(", ") || "No theme"}
                        </div>
                      </div>
                    ))}
                    {(previewVersion.itinerary_json.days?.length || 0) > 3 && (
                      <div className="text-sm text-muted-foreground">
                        ... and {previewVersion.itinerary_json.days.length - 3} more days
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VersionDropdown;