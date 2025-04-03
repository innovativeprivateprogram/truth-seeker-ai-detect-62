
import React from 'react';
import { cn } from '@/lib/utils';
import { SearchIcon, ShieldCheckIcon } from 'lucide-react';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn("py-12 md:py-20 bg-gradient-to-b from-truthseeker-blue to-truthseeker-lightblue text-white", className)}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white rounded-full">
              <ShieldCheckIcon className="h-12 w-12 text-truthseeker-blue" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Detect Misinformation with AI
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            TruthSeeker helps you identify potentially misleading content in text and images using advanced AI analysis.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href="#content-analyzer" 
              className="px-6 py-3 bg-white text-truthseeker-blue rounded-full font-medium flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <SearchIcon className="mr-2 h-5 w-5" />
              Analyze Content
            </a>
            <a 
              href="#how-it-works" 
              className="px-6 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Learn How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
