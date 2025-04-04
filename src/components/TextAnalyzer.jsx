
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
      
      // Simulate a Python backend response
      // In a real app, this would be an API call to a Python backend
      const simulatedPythonAnalysis = {
        reliability: Math.random() > 0.5 ? 'reliable' : 'potentially-misleading',
        score: 0.78,
        analysisText: "This content appears to be generally reliable, though some claims would benefit from additional verification. The tone is measured, and the information presented aligns with known facts in most areas."
      };
      
      setResult({
        content: content,
        score: simulatedPythonAnalysis.score,
        codeType: 'text',
        analysis: simulatedPythonAnalysis.analysisText,
        sources: [
          {
            url: "https://example.com/reliable-source-1",
            relevance: "high",
            reliability: simulatedPythonAnalysis.reliability
          },
          {
            url: "https://example.com/source-2",
            relevance: "medium",
            reliability: "potentially-misleading"
          }
        ]
      });
    } catch (err) {
      setError(t('analysisFailed'));
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  if (result) {
    return (
      <div className={className}>
        <VerificationResult 
          type="text"
          status={result.sources.some(s => s.reliability === "potentially-misleading") ? "potentially-misleading" : "reliable"}
          confidenceScore={result.score * 100}
          explanation={result.analysis}
          contentPreview={result.content.substring(0, 200) + (result.content.length > 200 ? '...' : '')}
          sources={result.sources.map(s => ({
            name: new URL(s.url).hostname.replace('www.', ''),
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
