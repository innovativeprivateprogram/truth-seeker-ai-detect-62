
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2 } from 'lucide-react';
import VerificationResult from './VerificationResult';
import { useLanguage } from '@/contexts/LanguageContext';

interface TextAnalyzerProps {
  className?: string;
}

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ className }) => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  
  const { t } = useLanguage();
  
  // Ensure we're treating the text placeholder as a string
  const placeholderText = t('textPlaceholder') as string;
  
  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError(t('contentRequired') as string);
      return;
    }
    
    setError(null);
    setIsAnalyzing(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result data
      setResult({
        content: content,
        score: 0.78,
        analysis: "This content appears to be generally reliable, though some claims would benefit from additional verification. The tone is measured, and the information presented aligns with known facts in most areas.",
        sources: [
          {
            url: "https://example.com/reliable-source-1",
            relevance: "high",
            reliability: "reliable"
          },
          {
            url: "https://example.com/source-2",
            relevance: "medium",
            reliability: "potentially-misleading"
          }
        ]
      });
    } catch (err) {
      setError(t('analysisFailed') as string);
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  if (result) {
    return (
      <div className={className}>
        <VerificationResult 
          result={result} 
          onReset={() => setResult(null)} 
        />
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div className="space-y-4">
        <Textarea
          placeholder={placeholderText}
          className="min-h-[200px] resize-y"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        {error && (
          <Alert variant="destructive">
            <AlertTitle>{t('contentRequired') as string}</AlertTitle>
            <AlertDescription>
              {t('contentRequiredDesc') as string}
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
              {t('analyzing') as string}
            </>
          ) : (
            t('analyzeContentBtn') as string
          )}
        </Button>
      </div>
    </div>
  );
};

export default TextAnalyzer;
