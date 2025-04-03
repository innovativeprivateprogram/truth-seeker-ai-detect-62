
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ImageIcon, UploadIcon, XIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import VerificationResult, { VerificationResultProps } from './VerificationResult';

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.match('image.*')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
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
        title: "Image required",
        description: "Please upload an image to analyze.",
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
      
      if (randomFactor < 0.33) {
        status = 'reliable';
        confidenceScore = 80 + Math.floor(Math.random() * 15);
        explanation = "No signs of digital manipulation were detected in this image. The image appears to be authentic based on our analysis of metadata, pixel patterns, and common manipulation markers.";
      } else if (randomFactor < 0.66) {
        status = 'potentially-misleading';
        confidenceScore = 60 + Math.floor(Math.random() * 15);
        explanation = "Some inconsistencies were detected that may indicate manipulation. The lighting and shadows show some anomalies, and there are possible signs of editing around certain areas of the image.";
      } else {
        status = 'misleading';
        confidenceScore = 70 + Math.floor(Math.random() * 15);
        explanation = "Strong indicators of digital manipulation were detected in this image. There are clear signs of editing, including inconsistent lighting, unusual pixel patterns, and evidence of content being added or removed.";
      }
      
      setResult({
        type: 'image',
        status,
        confidenceScore,
        explanation,
        imageUrl: imagePreview as string,
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto space-y-4", className)}>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-truthseeker-blue mb-3">Image Analysis</h2>
        
        {!imagePreview ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-truthseeker-blue transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-10 w-10 text-gray-400 mb-3" />
            <p className="text-gray-600 mb-1">Click or drag and drop to upload an image</p>
            <p className="text-xs text-gray-500">Supports: JPG, PNG, GIF (max 5MB)</p>
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
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <UploadIcon className="mr-2 h-4 w-4" />
                <span>Analyze Image</span>
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
