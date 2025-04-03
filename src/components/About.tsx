
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircleIcon } from 'lucide-react';

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
  return (
    <section id="about" className={cn("py-16 bg-white", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-truthseeker-blue mb-4">About TruthSeeker</h2>
            <p className="text-gray-700 mb-6">
              In today's digital landscape, misinformation spreads rapidly. TruthSeeker was developed to help people distinguish fact from fiction by providing AI-powered analysis of content they encounter online.
            </p>
            <p className="text-gray-700 mb-6">
              Our technology examines both text and images, identifying patterns common in misleading content and offering you insights to make more informed decisions about what to trust.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-truthseeker-green mt-0.5 mr-2" />
                <p className="text-gray-700">Analyze text content for sensationalist language and deceptive patterns</p>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-truthseeker-green mt-0.5 mr-2" />
                <p className="text-gray-700">Detect manipulated images through advanced digital forensics</p>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-truthseeker-green mt-0.5 mr-2" />
                <p className="text-gray-700">Get clear explanations and confidence scores to understand the analysis</p>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-truthseeker-green mt-0.5 mr-2" />
                <p className="text-gray-700">Use our insights alongside other verification methods for best results</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-truthseeker-blue mb-4">Why Misinformation Detection Matters</h3>
            <p className="text-gray-700 mb-4">
              Misleading information can lead to harmful decisions, spread false beliefs, and erode trust in reliable sources. By helping users identify potential misinformation, we aim to:
            </p>
            
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-truthseeker-blue rounded-full mr-2"></span>
                Promote critical thinking about online content
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-truthseeker-blue rounded-full mr-2"></span>
                Reduce the spread of harmful misinformation
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-truthseeker-blue rounded-full mr-2"></span>
                Empower users with tools to make informed judgments
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-truthseeker-blue rounded-full mr-2"></span>
                Support a healthier information ecosystem
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
              <p className="text-truthseeker-blue text-sm">
                <strong>Note:</strong> While we strive for accuracy, our AI system cannot guarantee perfect detection of all misleading content. Always verify important information through multiple trusted sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
