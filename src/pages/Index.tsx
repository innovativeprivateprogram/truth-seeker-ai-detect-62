
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import TabContent from '@/components/TabContent';
import HowItWorks from '@/components/HowItWorks';
import About from '@/components/About';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        <section id="content-analyzer" className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-truthseeker-blue mb-8">
              {t('analyzeContent')}
            </h2>
            <TabContent />
          </div>
        </section>
        
        <HowItWorks />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
