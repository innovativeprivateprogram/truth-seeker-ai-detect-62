
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, RefreshCw } from 'lucide-react';
import VerificationResult from './VerificationResult';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

// Simulated dataset based on Kaggle Fake News Dataset
const fakeNewsDataset = [
  {
    title: "সম্প্রতি বিশ্ব স্বাস্থ্য সংস্থার একটি গবেষণায় নতুন একটি ভাইরাসের আবির্ভাব হয়েছে",
    text: "গত সপ্তাহে বিশ্ব স্বাস্থ্য সংস্থা জানিয়েছে যে তারা একটি নতুন ভাইরাস আবিষ্কার করেছে যা মানুষের মধ্যে দ্রুত ছড়িয়ে পড়ছে। বিজ্ঞানীরা এই ভাইরাসের বিরুদ্ধে কোনও টিকা আবিষ্কার করতে পারেননি এবং বলছেন যে এটি অত্যন্ত মারাত্মক।",
    label: "fake",
    reliability: "misleading",
    score: 0.23,
    sources: [
      {
        name: "বিশ্ব স্বাস্থ্য সংস্থা",
        url: "https://www.who.int/bn",
        relevance: "high",
        reliability: "reliable" 
      },
      {
        name: "মিথ্যা স্বাস্থ্য পোর্টাল",
        url: "https://example.com/fake-news-1",
        relevance: "medium",
        reliability: "misleading"
      }
    ],
    analysis: "এই খবরটি পুরোপুরি মিথ্যা। বিশ্ব স্বাস্থ্য সংস্থা সম্প্রতি এমন কোনো ঘোষণা দেয়নি। এই দাবির পিছনে কোনো বৈজ্ঞানিক ভিত্তি নেই।"
  },
  {
    title: "নতুন গবেষণা: নিয়মিত আম খাওয়া স্মৃতিশক্তি বাড়ায়",
    text: "ঢাকা বিশ্ববিদ্যালয়ের গবেষকরা সম্প্রতি প্রকাশিত একটি গবেষণায় দেখিয়েছেন যে প্রতিদিন একটি আম খাওয়া স্মৃতিশক্তি ৪০% পর্যন্ত বাড়াতে পারে। ৫০০ জন অংশগ্রহণকারীর উপর ৬ মাসের এই গবেষণাটি করা হয়েছিল।",
    label: "potentially-misleading",
    reliability: "potentially-misleading",
    score: 0.45,
    sources: [
      {
        name: "স্বাস্থ্য বাতায়ন",
        url: "https://example.com/health-portal", 
        relevance: "medium",
        reliability: "potentially-misleading"
      }
    ],
    analysis: "এই তথ্যটি সম্পূর্ণ সঠিক নয়। আম ভিটামিন এবং খনিজ সমৃদ্ধ যা মস্তিষ্কের স্বাস্থ্যের জন্য উপকারী হতে পারে, কিন্তু '৪০% স্মৃতিশক্তি বৃদ্ধি' এমন দাবির পিছনে কোনো প্রমাণিত বৈজ্ঞানিক গবেষণা নেই।"
  },
  {
    title: "বাংলাদেশে ৫জি নেটওয়ার্ক চালু হচ্ছে আগামী মাসে",
    text: "আগামী মাসে বাংলাদেশের প্রধান টেলিকম অপারেটররা দেশব্যাপী ৫জি নেটওয়ার্ক চালু করবে। এই উদ্যোগের অধীনে ঢাকা, চট্টগ্রাম এবং সিলেটে প্রথমে ৫জি পরিষেবা চালু হবে, এবং পরবর্তীতে সারা দেশে সম্প্রসারিত হবে।",
    label: "true",
    reliability: "reliable",
    score: 0.85,
    sources: [
      {
        name: "বাংলাদেশ টেলিকমিউনিকেশন রেগুলেটরি কমিশন",
        url: "https://www.btrc.gov.bd/",
        relevance: "high",
        reliability: "reliable"
      },
      {
        name: "দৈনিক প্রথম আলো",
        url: "https://www.prothomalo.com/technology/", 
        relevance: "high",
        reliability: "reliable"
      }
    ],
    analysis: "এই তথ্যটি বিশ্বাসযোগ্য সূত্র থেকে প্রাপ্ত এবং সঠিক বলে মনে হচ্ছে। বাংলাদেশ টেলিকমিউনিকেশন রেগুলেটরি কমিশন এবং বেশ কয়েকটি টেলিকম সংস্থা ৫জি রোলআউট সম্পর্কে অনুরূপ তথ্য প্রকাশ করেছে।"
  }
];

const TextAnalyzer = ({ className }) => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [randomExample, setRandomExample] = useState(null);
  
  const { t, language } = useLanguage();
  
  // Set up a random example when component loads
  useEffect(() => {
    getRandomExample();
  }, []);
  
  const getRandomExample = () => {
    const randomIndex = Math.floor(Math.random() * fakeNewsDataset.length);
    setRandomExample(fakeNewsDataset[randomIndex]);
  };
  
  const handleUseExample = () => {
    if (randomExample) {
      setContent(randomExample.text);
      toast({
        title: t('exampleLoaded'),
        description: t('pressAnalyzeButton'),
      });
    }
  };
  
  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError(t('contentRequired'));
      return;
    }
    
    setError(null);
    setIsAnalyzing(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if the content matches any example from our dataset
      const matchedExample = fakeNewsDataset.find(item => 
        content.includes(item.text) || item.text.includes(content)
      );
      
      if (matchedExample) {
        // Return the pre-analyzed result
        setResult({
          content: content,
          score: matchedExample.score,
          codeType: 'text',
          analysis: matchedExample.analysis,
          sources: matchedExample.sources,
          reliability: matchedExample.reliability
        });
      } else {
        // Simulate a Python backend response with realistic sources
        // In a real app, this would be an API call to a Python backend with the Kaggle dataset
        const simulatedPythonAnalysis = {
          reliability: Math.random() > 0.5 ? 'reliable' : 'potentially-misleading',
          score: 0.78,
          analysisText: language === 'bn' ? 
            "এই তথ্যটি সাধারণভাবে নির্ভরযোগ্য বলে মনে হচ্ছে, যদিও কিছু দাবি অতিরিক্ত যাচাই-এর উপকার করতে পারে। টোন পরিমিত, এবং উপস্থাপিত তথ্য বেশিরভাগ ক্ষেত্রে পরিচিত সত্যের সাথে সামঞ্জস্যপূর্ণ।" :
            "This information appears to be generally reliable, though some claims would benefit from additional verification. The tone is measured, and the presented information is mostly consistent with known facts."
        };
        
        // Generate realistic news sources based on Bangladeshi publications
        const sources = [
          {
            name: "দৈনিক প্রথম আলো",
            url: "https://www.prothomalo.com/topic/reliable-source-1",
            relevance: "high",
            reliability: simulatedPythonAnalysis.reliability
          }
        ];
        
        // Randomly add more sources based on content
        if (content.length > 100) {
          sources.push({
            name: "দৈনিক যুগান্তর",
            url: "https://www.jugantor.com/topic/source-2",
            relevance: "medium",
            reliability: "potentially-misleading"
          });
        }
        
        if (content.includes("বাংলাদেশ") || content.includes("bangladesh")) {
          sources.push({
            name: "বাংলাদেশ সংবাদ সংস্থা (বাসস)",
            url: "https://www.bssnews.net/topic/source-3",
            relevance: "high",
            reliability: "reliable"
          });
        }
        
        setResult({
          content: content,
          score: simulatedPythonAnalysis.score,
          codeType: 'text',
          analysis: simulatedPythonAnalysis.analysisText,
          sources: sources
        });
      }
    } catch (err) {
      setError(t('analysisFailed'));
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  if (result) {
    // Calculate overall status based on source reliability
    const overallStatus = result.reliability || 
      (result.sources.some(s => s.reliability === "misleading") 
        ? "misleading" 
        : (result.sources.some(s => s.reliability === "potentially-misleading") 
          ? "potentially-misleading" 
          : "reliable"));
          
    return (
      <div className={className}>
        <VerificationResult 
          type="text"
          status={overallStatus}
          confidenceScore={result.score * 100}
          explanation={result.analysis}
          contentPreview={result.content.substring(0, 200) + (result.content.length > 200 ? '...' : '')}
          sources={result.sources.map(s => ({
            name: s.name,
            url: s.url,
            relevance: s.relevance
          }))}
        />
        <div className="mt-4">
          <Button onClick={() => setResult(null)} variant="outline">
            {t('newAnalysis')}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div className="space-y-4">
        {randomExample && (
          <div className="bg-blue-50 p-4 rounded-md mb-4 border border-blue-200">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-blue-800">{t('exampleNews')}</h3>
              <Button variant="ghost" size="sm" onClick={getRandomExample}>
                <RefreshCw className="h-4 w-4 mr-1" />
                {t('newExample')}
              </Button>
            </div>
            <p className="text-sm text-gray-700 mt-2">{randomExample.title}</p>
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={handleUseExample}>
                {t('useThisExample')}
              </Button>
            </div>
          </div>
        )}
      
        <Textarea
          placeholder={t('textPlaceholder')}
          className="min-h-[200px] resize-y"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        {error && (
          <Alert variant="destructive">
            <AlertTitle>{t('error')}</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        <Button 
          className="w-full"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('analyzing')}
            </>
          ) : (
            t('analyzeContentBtn')
          )}
        </Button>
      </div>
    </div>
  );
};

export default TextAnalyzer;
