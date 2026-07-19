import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
  Toaster,
  Tooltip,
  TooltipContent,
  Trigger as TooltipTrigger,
} from '@/components/ui';
import { Activity, CheckCircle, Info, Shield, Users, X } from 'lucide-react';
import clsx from 'clsx';

type ExplainabilityProps = {
  open: boolean;
  onClose: () => void;
  /** The data we want to explain – shape matches what the AI decision returns */
  decision: {
    id: string;
    description: string;
    evidence: Array<{ source: string; snippet: string }>;
    assumptions: string[];
    confidence: number; // 0‑1
    appliedPolicies: string[];
    knowledgeUsed: string[];
    finalDecision: string;
  };
};

export const ExplainabilityModal: React.FC<ExplainabilityProps> = ({
  open,
  onClose,
  decision,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-3 top-3"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>

        <Card className="mt-4">
          <CardHeader className="pb-2">
            <h2 className="text-xl font-semibold">Decision Explanation</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                ✅
              </div>
              <h3 className="text-lg font-medium">{decision.description}</h2>
            </div>

            <Separator className="my-2" />

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Evidence</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {decision.evidence.map((e, idx) => (
                  <li key={idx}>
                    <strong>{e.source}:</strong> "{e.snippet}"
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Assumptions</h3>
              <p className="text-sm italic">{decision.assumptions.join(', ') || 'None'}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Confidence</h3>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full" style={{ backgroundColor: `rgba(0,128,0,${decision.confidence * 0.2})` }}></div>
                <span className="ml-2 text-sm font-medium">{ (decision.confidence * 100).toFixed(0) }%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Applied Policies</h3>
              <p className="text-sm">{decision.appliedPolicies.join(', ') || 'None'}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Knowledge Used</h3>
              <p className="text-sm">{decision.knowledgeUsed.join(', ') || 'None'}</p>
            </div>

            <Separator className="my-4" />

            <div className="text-right">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};