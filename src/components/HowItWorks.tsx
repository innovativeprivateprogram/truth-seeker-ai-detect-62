
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileTextIcon, 
  ImageIcon, 
  BrainCircuitIcon, 
  AlertTriangleIcon 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HowItWorksProps {
  className?: string;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ className }) => {
  const { t } = useLanguage();
  
  return (
    <section id="how-it-works" className={cn("py-10 bg-gray-50", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-truthseeker-blue mb-8">{t('howItWorksTitle')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-truthseeker-blue mb-4">
                  <FileTextIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('contentAnalysis')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('contentAnalysisDesc')}
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
                <h3 className="text-lg font-semibold mb-2">{t('imageVerificationTitle')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('imageVerificationDesc')}
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
                <h3 className="text-lg font-semibold mb-2">{t('aiAlgorithms')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('aiAlgorithmsDesc')}
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
                <h3 className="text-lg font-semibold mb-2">{t('confidenceScoring')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('confidenceScoringDesc')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('automatedNote')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
