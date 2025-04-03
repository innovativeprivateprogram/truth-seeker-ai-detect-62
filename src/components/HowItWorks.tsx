
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileTextIcon, 
  ImageIcon, 
  BrainCircuitIcon, 
  AlertTriangleIcon 
} from 'lucide-react';

interface HowItWorksProps {
  className?: string;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ className }) => {
  return (
    <section id="how-it-works" className={cn("py-10 bg-gray-50", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-truthseeker-blue mb-8">How TruthSeeker Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-truthseeker-blue mb-4">
                  <FileTextIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Content Analysis</h3>
                <p className="text-gray-600 text-sm">
                  TruthSeeker examines text for sensationalist language, misleading claims, and factual inconsistencies.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-truthseeker-blue mb-4">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Image Verification</h3>
                <p className="text-gray-600 text-sm">
                  Our system detects signs of manipulation in images by analyzing metadata, pixels, and visual inconsistencies.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-truthseeker-blue mb-4">
                  <BrainCircuitIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Algorithms</h3>
                <p className="text-gray-600 text-sm">
                  Advanced machine learning models assess the reliability of content based on patterns found in verified and misleading information.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-truthseeker-blue mb-4">
                  <AlertTriangleIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Confidence Scoring</h3>
                <p className="text-gray-600 text-sm">
                  Each analysis includes a confidence score and detailed explanation to help you make informed judgments about the content.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            While TruthSeeker provides powerful analysis, it's important to remember that no automated system is perfect. Always verify information through multiple trusted sources.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
