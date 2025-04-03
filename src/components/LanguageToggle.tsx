
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="px-2 flex items-center text-gray-600 hover:text-truthseeker-blue transition-colors"
    >
      <Languages className="h-4 w-4 mr-1" />
      <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
    </Button>
  );
};

export default LanguageToggle;
