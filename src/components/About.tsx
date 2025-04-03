
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircleIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className={cn("py-16 bg-white", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-truthseeker-blue mb-4">{t('aboutTitle')}</h2>
            <p className="text-gray-700 mb-6">
              {t('aboutDesc')}
            </p>
            <p className="text-gray-700 mb-6">
              {t('aboutDesc2')}
            </p>
            
            <div className="space-y-3">
              {t('aboutChecks').map((check, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-truthseeker-green mt-0.5 mr-2" />
                  <p className="text-gray-700">{check}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-truthseeker-blue mb-4">{t('whyItMatters')}</h3>
            <p className="text-gray-700 mb-4">
              {t('whyItMattersDesc')}
            </p>
            
            <ul className="space-y-2 text-gray-700">
              {t('whyItMattersPoints').map((point, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-truthseeker-blue rounded-full mr-2"></span>
                  {point}
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
              <p className="text-truthseeker-blue text-sm">
                <strong>{t('noteTitle')}</strong> {t('noteText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
