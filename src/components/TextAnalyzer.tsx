
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import VerificationResult, { VerificationResultProps } from './VerificationResult';
import { useLanguage } from '@/contexts/LanguageContext';

interface TextAnalyzerProps {
  className?: string;
}

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ className }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Omit<VerificationResultProps, 'className'> | null>(null);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: t('contentRequired'),
        description: t('contentRequiredDesc'),
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
      let explanation = language === 'bn' 
        ? "কন্টেন্টটি তথ্যমূলক বলে মনে হচ্ছে এবং এতে সনসনীয় ভাষা ব্যবহার করা হয়নি।"
        : "The content appears informational and does not use sensationalist language.";
      let sources = [];
      
      if (hasKeywords && (hasExclamation || hasCapsLock)) {
        status = 'misleading';
        confidenceScore = 78;
        explanation = language === 'bn'
          ? "টেক্সটটিতে বিভ্রান্তিকর কন্টেন্টে সাধারণ সনসনীয় ভাষার প্যাটার্ন রয়েছে, যার মধ্যে আবেগপ্রবণ শব্দ এবং অতিরিক্ত ফরম্যাটিং অন্তর্ভুক্ত।"
          : "The text contains patterns of sensationalist language common in misleading content, including emotional words and excessive formatting.";
        
        sources = [
          { 
            name: language === 'bn' ? "মিথ্যা তথ্য সনাক্তকরণ গবেষণা কেন্দ্র" : "Misinformation Research Center", 
            url: "https://example.com/misinformation-research",
            relevance: "high" 
          },
          { 
            name: language === 'bn' ? "ফ্যাক্ট-চেকিং ডাটাবেস" : "Fact-Checking Database", 
            url: "https://example.com/fact-checking-database", 
            relevance: "medium" 
          }
        ];
      } else if (hasKeywords || hasExclamation || hasCapsLock) {
        status = 'potentially-misleading';
        confidenceScore = 65;
        explanation = language === 'bn'
          ? "টেক্সটটিতে কিছু প্যাটার্ন রয়েছে যা অতিরঞ্জিত বা বিভ্রান্তিকর তথ্যের ইঙ্গিত দিতে পারে। অন্য উৎস থেকে যাচাই করুন।"
          : "The text contains some patterns that may indicate exaggerated or misleading information. Verify from other sources.";
        
        sources = [
          { 
            name: language === 'bn' ? "ভাষা বিশ্লেষণ ডাটাবেস" : "Language Analysis Database", 
            url: "https://example.com/language-analysis", 
            relevance: "medium" 
          },
          { 
            name: language === 'bn' ? "সাধারণ মিথ্যা বক্তব্য সংগ্রহ" : "Common False Claims Collection", 
            url: "https://example.com/common-false-claims", 
            relevance: "low" 
          }
        ];
      } else {
        sources = [
          { 
            name: language === 'bn' ? "বিশ্বাসযোগ্য সূত্র ডাটাবেস" : "Reliable Sources Database", 
            url: "https://example.com/reliable-sources", 
            relevance: "high" 
          },
          { 
            name: language === 'bn' ? "ফ্যাক্ট-চেকিং গাইডলাইন" : "Fact-Checking Guidelines", 
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
        title: t('analysisFailed'),
        description: t('analysisFailed_desc'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto space-y-4", className)}>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-truthseeker-blue mb-3">{t('textAnalysisTitle')}</h2>
        <Textarea
          placeholder={t('textPlaceholder')}
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
                <span>{t('analyzing')}</span>
              </>
            ) : (
              <>
                <SearchIcon className="mr-2 h-4 w-4" />
                <span>{t('analyzeContentBtn')}</span>
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
