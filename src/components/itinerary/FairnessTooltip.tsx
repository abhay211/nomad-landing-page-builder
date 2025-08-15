import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface FairnessTooltipProps {
  fairnessExplainer?: string;
}

const FairnessTooltip: React.FC<FairnessTooltipProps> = ({ fairnessExplainer }) => {
  if (!fairnessExplainer) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Info className="w-4 h-4 text-muted-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <div className="space-y-2">
            <p className="font-medium text-sm">Why this plan?</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {fairnessExplainer}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FairnessTooltip;