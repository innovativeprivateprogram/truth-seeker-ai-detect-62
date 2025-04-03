
import React from 'react';
import { MagnifyingGlassIcon, ShieldCheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("py-4 px-6 bg-white shadow-sm", className)}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-8 w-8 text-truthseeker-blue" />
          <h1 className="text-xl md:text-2xl font-bold text-truthseeker-blue">TruthSeeker</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#about" className="text-sm md:text-base text-gray-600 hover:text-truthseeker-blue transition-colors">
            About
          </a>
          <a href="#how-it-works" className="text-sm md:text-base text-gray-600 hover:text-truthseeker-blue transition-colors">
            How it Works
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
