
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
        title: "Text is required",
        description: "Please enter some text to analyze.",
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
      let explanation = "The content appears to be factual and doesn't contain sensationalist language.";
      
      if (hasKeywords && (hasExclamation || hasCapsLock)) {
        status = 'misleading';
        confidenceScore = 78;
        explanation = "The text contains sensationalist language patterns common in misleading content, including emotionally charged words and excessive formatting.";
      } else if (hasKeywords || hasExclamation || hasCapsLock) {
        status = 'potentially-misleading';
        confidenceScore = 65;
        explanation = "The text contains some patterns that may indicate exaggeration or misleading information. Consider checking with other sources.";
      }
      
      setResult({
        type: 'text',
        status,
        confidenceScore,
        explanation,
        contentPreview: text.length > 150 ? `${text.substring(0, 150)}...` : text,
      });
    } catch (error) {
      console.error('Error analyzing text:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto space-y-4", className)}>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-truthseeker-blue mb-3">Text Analysis</h2>
        <Textarea
          placeholder="Paste or type the text content you'd like to verify..."
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
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <SearchIcon className="mr-2 h-4 w-4" />
                <span>Analyze Content</span>
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
