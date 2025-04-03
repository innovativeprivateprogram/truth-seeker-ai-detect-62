
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FileTextIcon, ImageIcon } from 'lucide-react';
import TextAnalyzer from './TextAnalyzer';
import ImageAnalyzer from './ImageAnalyzer';

interface TabContentProps {
  className?: string;
}

const TabContent: React.FC<TabContentProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');

  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={cn(
            "px-4 py-2 flex items-center text-sm font-medium border-b-2 transition-colors",
            activeTab === 'text'
              ? "text-truthseeker-blue border-truthseeker-blue"
              : "text-gray-500 border-transparent hover:text-truthseeker-lightblue hover:border-gray-300"
          )}
          onClick={() => setActiveTab('text')}
        >
          <FileTextIcon className="mr-2 h-4 w-4" />
          Text Verification
        </button>
        <button
          className={cn(
            "px-4 py-2 flex items-center text-sm font-medium border-b-2 transition-colors",
            activeTab === 'image'
              ? "text-truthseeker-blue border-truthseeker-blue"
              : "text-gray-500 border-transparent hover:text-truthseeker-lightblue hover:border-gray-300"
          )}
          onClick={() => setActiveTab('image')}
        >
          <ImageIcon className="mr-2 h-4 w-4" />
          Image Verification
        </button>
      </div>

      <div className="fade-in">
        {activeTab === 'text' ? <TextAnalyzer /> : <ImageAnalyzer />}
      </div>
    </div>
  );
};

export default TabContent;
