
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangleIcon, CheckCircleIcon, HelpCircleIcon, XCircleIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export interface VerificationResultProps {
  className?: string;
  type: 'text' | 'image';
  status: 'reliable' | 'potentially-misleading' | 'misleading' | 'unknown';
  confidenceScore: number;
  explanation: string;
  contentPreview?: string;
  imageUrl?: string;
}

const VerificationResult: React.FC<VerificationResultProps> = ({
  className,
  type,
  status,
  confidenceScore,
  explanation,
  contentPreview,
  imageUrl
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'reliable':
        return 'bg-truthseeker-green text-white';
      case 'potentially-misleading':
        return 'bg-truthseeker-orange text-white';
      case 'misleading':
        return 'bg-truthseeker-red text-white';
      case 'unknown':
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'reliable':
        return <CheckCircleIcon className="h-5 w-5" />;
      case 'potentially-misleading':
        return <AlertTriangleIcon className="h-5 w-5" />;
      case 'misleading':
        return <XCircleIcon className="h-5 w-5" />;
      case 'unknown':
      default:
        return <HelpCircleIcon className="h-5 w-5" />;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'reliable':
        return 'Likely Reliable';
      case 'potentially-misleading':
        return 'Potentially Misleading';
      case 'misleading':
        return 'Likely Misleading';
      case 'unknown':
      default:
        return 'Unknown';
    }
  };

  const getProgressColor = () => {
    if (status === 'reliable') return 'bg-truthseeker-green';
    if (status === 'potentially-misleading') return 'bg-truthseeker-orange';
    if (status === 'misleading') return 'bg-truthseeker-red';
    return 'bg-gray-400';
  };

  return (
    <Card className={cn("w-full max-w-3xl mx-auto fade-in", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-truthseeker-blue">Verification Result</CardTitle>
          <Badge className={cn("flex items-center gap-1", getStatusColor())}>
            {getStatusIcon()}
            <span>{getStatusLabel()}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {type === 'image' && imageUrl && (
            <div className="mt-2 rounded-md overflow-hidden border border-gray-200">
              <img src={imageUrl} alt="Verified content" className="w-full h-auto max-h-64 object-contain" />
            </div>
          )}
          
          {type === 'text' && contentPreview && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-700">
              <p className="italic">{contentPreview}</p>
            </div>
          )}
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Confidence Score</span>
              <span className="text-sm font-medium text-gray-700">{confidenceScore}%</span>
            </div>
            <Progress value={confidenceScore} className={getProgressColor()} />
          </div>
          
          <div>
            <h4 className="font-medium text-truthseeker-blue mb-2">Analysis:</h4>
            <p className="text-gray-700">{explanation}</p>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
            <p className="font-medium text-truthseeker-lightblue mb-1">Disclaimer:</p>
            <p>This is an AI-powered analysis and should be used for informational purposes only. Always verify information through multiple trusted sources.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationResult;
