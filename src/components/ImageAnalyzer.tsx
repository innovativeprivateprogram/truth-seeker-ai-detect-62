
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ImageIcon, UploadIcon, XIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import VerificationResult, { VerificationResultProps } from './VerificationResult';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageAnalyzerProps {
  className?: string;
}

const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({ className }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Omit<VerificationResultProps, 'className'> | null>(null);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.match('image.*')) {
        toast({
          title: "অবৈধ ফাইল টাইপ",
          description: "অনুগ্রহ করে একটি ছবি ফাইল নির্বাচন করুন (JPEG, PNG, ইত্যাদি)",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "ফাইল খুব বড়",
          description: "অনুগ্রহ করে 5MB এর চেয়ে ছোট একটি ছবি নির্বাচন করুন",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "ছবি প্রয়োজন",
        description: "বিশ্লেষণ করার জন্য একটি ছবি আপলোড করুন।",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // For demo purposes, we'll use a mock analysis that varies somewhat randomly
      // This would be replaced with a real API call in production
      const randomFactor = Math.random();
      
      let status: VerificationResultProps['status'];
      let confidenceScore: number;
      let explanation: string;
      let sources = [];
      
      if (randomFactor < 0.33) {
        status = 'reliable';
        confidenceScore = 80 + Math.floor(Math.random() * 15);
        explanation = "এই ছবিতে ডিজিটাল ম্যানিপুলেশনের কোন চিহ্ন সনাক্ত করা যায়নি। মেটাডাটা, পিক্সেল প্যাটার্ন এবং সাধারণ ম্যানিপুলেশন মার্কারগুলির বিশ্লেষণের ভিত্তিতে ছবিটি প্রামাণিক বলে মনে হচ্ছে।";
        sources = [
          { 
            name: "দৈনিক কালের কণ্ঠ", 
            url: "https://www.kalerkantho.com/image-forensics", 
            relevance: "high" 
          },
          { 
            name: "ফটোগ্রাফি এসোসিয়েশন অব বাংলাদেশ", 
            url: "https://example.com/photography-association", 
            relevance: "medium" 
          }
        ];
      } else if (randomFactor < 0.66) {
        status = 'potentially-misleading';
        confidenceScore = 60 + Math.floor(Math.random() * 15);
        explanation = "ম্যানিপুলেশনের ইঙ্গিত দিতে পারে এমন কিছু অসঙ্গতি সনাক্ত করা হয়েছে। আলো এবং ছায়ায় কিছু অসঙ্গতি দেখা যাচ্ছে, এবং ছবির কিছু অংশে সম্পাদনার সম্ভাব্য চিহ্ন রয়েছে।";
        sources = [
          { 
            name: "দৈনিক ইত্তেফাক", 
            url: "https://www.ittefaq.com.bd/visual-fact-checking", 
            relevance: "medium" 
          },
          { 
            name: "বাংলা ট্রিবিউন", 
            url: "https://www.banglatribune.com/inconsistency-analysis", 
            relevance: "medium" 
          },
          { 
            name: "বিবিসি বাংলা", 
            url: "https://www.bbc.com/bengali/image-verification", 
            relevance: "high" 
          }
        ];
      } else {
        status = 'misleading';
        confidenceScore = 70 + Math.floor(Math.random() * 15);
        explanation = "এই ছবিতে ডিজিটাল ম্যানিপুলেশনের শক্তিশালী সূচক সনাক্ত করা হয়েছে। সম্পাদনার স্পষ্ট চিহ্ন রয়েছে, যার মধ্যে অসঙ্গতিপূর্ণ আলো, অস্বাভাবিক পিক্সেল প্যাটার্ন, এবং বিষয়বস্তু যোগ বা অপসারণের প্রমাণ অন্তর্ভুক্ত।";
        sources = [
          { 
            name: "বাংলাদেশ সাংবাদিক সমিতি", 
            url: "https://example.com/journalist-association", 
            relevance: "high" 
          },
          { 
            name: "দৈনিক সমকাল", 
            url: "https://www.samakal.com/digital-forensics-report", 
            relevance: "high" 
          },
          { 
            name: "দৈনিক যায়যায়দিন", 
            url: "https://www.jaijaidinbd.com/pixel-pattern-analysis", 
            relevance: "medium" 
          },
          { 
            name: "দৈনিক নয়া দিগন্ত", 
            url: "https://www.dailynayadiganta.com/image-analysis", 
            relevance: "low" 
          }
        ];
      }
      
      setResult({
        type: 'image',
        status,
        confidenceScore,
        explanation,
        imageUrl: imagePreview as string,
        sources
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "বিশ্লেষণ ব্যর্থ হয়েছে",
        description: "আপনার ছবি বিশ্লেষণ করার সময় একটি ত্রুটি হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto space-y-4", className)}>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-truthseeker-blue mb-3">ছবি বিশ্লেষণ</h2>
        
        {!imagePreview ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-truthseeker-blue transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-10 w-10 text-gray-400 mb-3" />
            <p className="text-gray-600 mb-1">ছবি আপলোড করতে ক্লিক করুন বা টেনে আনুন</p>
            <p className="text-xs text-gray-500">সমর্থিত: JPG, PNG, GIF (সর্বোচ্চ 5MB)</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-64 object-contain" />
            </div>
            <button 
              className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full p-1 text-white hover:bg-opacity-80 transition-opacity"
              onClick={handleRemoveImage}
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        
        <div className="flex justify-end mt-3">
          <Button 
            onClick={handleAnalyze} 
            disabled={isLoading || !selectedImage}
            className="bg-truthseeker-blue hover:bg-truthseeker-lightblue"
          >
            {isLoading ? (
              <>
                <div className="spinner w-4 h-4 mr-2 border-2 border-white border-l-transparent"></div>
                <span>বিশ্লেষণ করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <UploadIcon className="mr-2 h-4 w-4" />
                <span>ছবি বিশ্লেষণ করুন</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {result && <VerificationResult {...result} />}
    </div>
  );
};

export default ImageAnalyzer;
