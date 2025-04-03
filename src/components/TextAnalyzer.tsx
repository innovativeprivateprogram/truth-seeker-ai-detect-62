
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import VerificationResult, { VerificationResultProps } from './VerificationResult';

interface TextAnalyzerProps {
  className?: string;
}

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ className }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Omit<VerificationResultProps, 'className'> | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: "টেক্সট প্রয়োজন",
        description: "বিশ্লেষণ করার জন্য কিছু টেক্সট লিখুন।",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll use a mock analysis based on the text content
      // This would be replaced with a real API call in production
      const wordCount = text.split(/\s+/).length;
      const hasKeywords = /\b(shocking|unbelievable|conspiracy|exclusive|secret|they don't want you to know)\b/i.test(text);
      const hasExclamation = text.includes('!');
      const hasCapsLock = text.split(' ').some(word => word.length > 3 && word === word.toUpperCase());
      
      let status: VerificationResultProps['status'] = 'reliable';
      let confidenceScore = 85;
      let explanation = "কন্টেন্টটি তথ্যমূলক বলে মনে হচ্ছে এবং এতে সনসনীয় ভাষা ব্যবহার করা হয়নি।";
      let sources = [];
      
      if (hasKeywords && (hasExclamation || hasCapsLock)) {
        status = 'misleading';
        confidenceScore = 78;
        explanation = "টেক্সটটিতে বিভ্রান্তিকর কন্টেন্টে সাধারণ সনসনীয় ভাষার প্যাটার্ন রয়েছে, যার মধ্যে আবেগপ্রবণ শব্দ এবং অতিরিক্ত ফরম্যাটিং অন্তর্ভুক্ত।";
        sources = [
          { 
            name: "মিথ্যা তথ্য সনাক্তকরণ গবেষণা কেন্দ্র", 
            url: "https://example.com/misinformation-research",
            relevance: "high" 
          },
          { 
            name: "ফ্যাক্ট-চেকিং ডাটাবেস", 
            url: "https://example.com/fact-checking-database", 
            relevance: "medium" 
          }
        ];
      } else if (hasKeywords || hasExclamation || hasCapsLock) {
        status = 'potentially-misleading';
        confidenceScore = 65;
        explanation = "টেক্সটটিতে কিছু প্যাটার্ন রয়েছে যা অতিরঞ্জিত বা বিভ্রান্তিকর তথ্যের ইঙ্গিত দিতে পারে। অন্য উৎস থেকে যাচাই করুন।";
        sources = [
          { 
            name: "ভাষা বিশ্লেষণ ডাটাবেস", 
            url: "https://example.com/language-analysis", 
            relevance: "medium" 
          },
          { 
            name: "সাধারণ মিথ্যা বক্তব্য সংগ্রহ", 
            url: "https://example.com/common-false-claims", 
            relevance: "low" 
          }
        ];
      } else {
        sources = [
          { 
            name: "বিশ্বাসযোগ্য সূত্র ডাটাবেস", 
            url: "https://example.com/reliable-sources", 
            relevance: "high" 
          },
          { 
            name: "ফ্যাক্ট-চেকিং গাইডলাইন", 
            url: "https://example.com/fact-checking-guidelines", 
            relevance: "medium" 
          }
        ];
      }
      
      setResult({
        type: 'text',
        status,
        confidenceScore,
        explanation,
        contentPreview: text.length > 150 ? `${text.substring(0, 150)}...` : text,
        sources
      });
    } catch (error) {
      console.error('Error analyzing text:', error);
      toast({
        title: "বিশ্লেষণ ব্যর্থ হয়েছে",
        description: "আপনার টেক্সট বিশ্লেষণ করার সময় একটি ত্রুটি হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto space-y-4", className)}>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-truthseeker-blue mb-3">টেক্সট বিশ্লেষণ</h2>
        <Textarea
          placeholder="যে টেক্সট কন্টেন্ট যাচাই করতে চান তা পেস্ট করুন বা টাইপ করুন..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] text-gray-800"
        />
        <div className="flex justify-end mt-3">
          <Button 
            onClick={handleAnalyze} 
            disabled={isLoading}
            className="bg-truthseeker-blue hover:bg-truthseeker-lightblue"
          >
            {isLoading ? (
              <>
                <div className="spinner w-4 h-4 mr-2 border-2 border-white border-l-transparent"></div>
                <span>বিশ্লেষণ করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <SearchIcon className="mr-2 h-4 w-4" />
                <span>কন্টেন্ট বিশ্লেষণ করুন</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {result && <VerificationResult {...result} />}
    </div>
  );
};

export default TextAnalyzer;
