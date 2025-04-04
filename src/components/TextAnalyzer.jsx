
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2 } from 'lucide-react';
import VerificationResult from './VerificationResult';
import { useLanguage } from '@/contexts/LanguageContext';

const TextAnalyzer = ({ className }) => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  const { t } = useLanguage();
  
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
      
      // Simulate a Python backend response with realistic sources
      // In a real app, this would be an API call to a Python backend
      const simulatedPythonAnalysis = {
        reliability: Math.random() > 0.5 ? 'reliable' : 'potentially-misleading',
        score: 0.78,
        analysisText: "এই তথ্যটি সাধারণভাবে নির্ভরযোগ্য বলে মনে হচ্ছে, যদিও কিছু দাবি অতিরিক্ত যাচাই-এর উপকার করতে পারে। টোন পরিমিত, এবং উপস্থাপিত তথ্য বেশিরভাগ ক্ষেত্রে পরিচিত সত্যের সাথে সামঞ্জস্যপূর্ণ।"
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
      
      if (Math.random() > 0.5) {
        sources.push({
          name: "উইকিপিডিয়া",
          url: "https://bn.wikipedia.org/wiki/source-4",
          relevance: "medium",
          reliability: Math.random() > 0.7 ? "reliable" : "potentially-misleading"
        });
      }
      
      setResult({
        content: content,
        score: simulatedPythonAnalysis.score,
        codeType: 'text',
        analysis: simulatedPythonAnalysis.analysisText,
        sources: sources
      });
    } catch (err) {
      setError(t('analysisFailed'));
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  if (result) {
    // Calculate overall status based on source reliability
    const overallStatus = result.sources.some(s => s.reliability === "misleading") 
      ? "misleading" 
      : (result.sources.some(s => s.reliability === "potentially-misleading") 
        ? "potentially-misleading" 
        : "reliable");
        
    return (
      <div className={className}>
        <VerificationResult 
          type="text"
          status={overallStatus}
          confidenceScore={result.score * 100}
          explanation={result.analysis}
          contentPreview={result.content.substring(0, 200) + (result.content.length > 200 ? '...' : '')}
          sources={result.sources.map(s => ({
            name: s.name, // Using the real source name
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
        <Textarea
          placeholder={t('textPlaceholder')}
          className="min-h-[200px] resize-y"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        {error && (
          <Alert variant="destructive">
            <AlertTitle>{t('contentRequired')}</AlertTitle>
            <AlertDescription>
              {t('contentRequiredDesc')}
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
