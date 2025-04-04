
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, Code } from 'lucide-react';
import VerificationResult from './VerificationResult';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface TextAnalyzerProps {
  className?: string;
}

type CodeType = 'text' | 'javascript' | 'python';

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ className }) => {
  const [content, setContent] = useState('');
  const [codeType, setCodeType] = useState<CodeType>('text');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  
  const { t } = useLanguage();
  
  // Get placeholder text based on code type
  const getPlaceholderText = () => {
    switch(codeType) {
      case 'javascript':
        return 'console.log("Hello world!");\n\n// এখানে জাভাস্ক্রিপ্ট কোড লিখুন';
      case 'python':
        return 'print("Hello world!")\n\n# এখানে পাইথন কোড লিখুন';
      default:
        return t('textPlaceholder') as string;
    }
  };

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
      
      // Generate different mock results based on code type
      let analysisText = '';
      let reliability = Math.random() > 0.5 ? 'reliable' : 'potentially-misleading';
      
      if (codeType === 'javascript') {
        analysisText = "এই জাভাস্ক্রিপ্ট কোড মানসম্মত বলে মনে হচ্ছে। কোডে কোন সুরক্ষা ঝুঁকি দেখা যায়নি, তবে প্রোডাকশন ব্যবহারের আগে পরীক্ষা করা উচিত।";
      } else if (codeType === 'python') {
        analysisText = "এই পাইথন কোড সাধারণভাবে ভাল লেখা হয়েছে। কিছু PEP8 মান লঙ্ঘন থাকতে পারে, তবে ফাংশনাল হিসাবে এটি কাজ করবে।";
      } else {
        analysisText = "This content appears to be generally reliable, though some claims would benefit from additional verification. The tone is measured, and the information presented aligns with known facts in most areas.";
      }
      
      setResult({
        content: content,
        score: codeType === 'text' ? 0.78 : 0.85,
        codeType: codeType,
        analysis: analysisText,
        sources: [
          {
            url: codeType === 'javascript' 
              ? "https://developer.mozilla.org/en-US/docs/Web/JavaScript" 
              : codeType === 'python'
                ? "https://docs.python.org/3/"
                : "https://example.com/reliable-source-1",
            relevance: "high",
            reliability: reliability
          },
          {
            url: codeType === 'javascript'
              ? "https://javascript.info/"
              : codeType === 'python'
                ? "https://www.python.org/dev/peps/pep-0008/"
                : "https://example.com/source-2",
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
          type={result.codeType === 'text' ? 'text' : 'text'}
          status={result.sources.some(s => s.reliability === "potentially-misleading") ? "potentially-misleading" : "reliable"}
          confidenceScore={result.score * 100}
          explanation={result.analysis}
          contentPreview={result.content.substring(0, 200) + (result.content.length > 200 ? '...' : '')}
          sources={result.sources.map(s => ({
            name: new URL(s.url).hostname.replace('www.', ''),
            url: s.url,
            relevance: s.relevance as 'high' | 'medium' | 'low'
          }))}
        />
        <div className="mt-4">
          <Button onClick={() => setResult(null)} variant="outline">
            {t('newAnalysis') || "নতুন বিশ্লেষণ"}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-2">
          <Code className="h-5 w-5 text-truthseeker-blue" />
          <Select 
            value={codeType} 
            onValueChange={(value) => setCodeType(value as CodeType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="কন্টেন্ট টাইপ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">সাধারণ টেক্সট</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Textarea
          placeholder={getPlaceholderText()}
          className={`min-h-[200px] resize-y ${codeType !== 'text' ? 'font-mono' : ''}`}
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
            codeType === 'text' ? 
              (t('analyzeContentBtn') as string) : 
              `${codeType === 'javascript' ? 'JavaScript' : 'Python'} কোড বিশ্লেষণ করুন`
          )}
        </Button>
      </div>
    </div>
  );
};

export default TextAnalyzer;
