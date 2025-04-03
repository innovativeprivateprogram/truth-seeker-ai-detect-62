
import React from 'react';
import { ShieldCheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { t } = useLanguage();
  
  return (
    <header className={cn("py-4 px-6 bg-white shadow-sm", className)}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-8 w-8 text-truthseeker-blue" />
          <h1 className="text-xl md:text-2xl font-bold text-truthseeker-blue">{t('siteName')}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#about" className="text-sm md:text-base text-gray-600 hover:text-truthseeker-blue transition-colors">
            {t('about')}
          </a>
          <a href="#how-it-works" className="text-sm md:text-base text-gray-600 hover:text-truthseeker-blue transition-colors">
            {t('howItWorks')}
          </a>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
