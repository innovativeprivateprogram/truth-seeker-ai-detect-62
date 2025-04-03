
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import TabContent from '@/components/TabContent';
import HowItWorks from '@/components/HowItWorks';
import About from '@/components/About';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        <section id="content-analyzer" className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-truthseeker-blue mb-8">
              Analyze Content for Misinformation
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
