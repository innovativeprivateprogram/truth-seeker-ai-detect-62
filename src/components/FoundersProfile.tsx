
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Github, UserRound } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FounderData {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  links: {
    linkedin?: string;
    github?: string;
  }
}

const FoundersProfile: React.FC = () => {
  const { language } = useLanguage();
  
  const founders: FounderData[] = [
    {
      name: language === 'bn' ? 'আনিসুল হক' : 'Anisul Haque',
      role: language === 'bn' ? 'প্রধান প্রযুক্তি কর্মকর্তা' : 'Chief Technology Officer',
      bio: language === 'bn' 
        ? 'আনিসুল একজন অভিজ্ঞ সফটওয়্যার ইঞ্জিনিয়ার এবং AI বিশেষজ্ঞ যিনি সত্যান্বেষীর কোর প্রযুক্তি ডিজাইন করেছেন। তিনি ১০ বছরের বেশি সময় ধরে ডাটা সায়েন্স এবং মেশিন লার্নিং নিয়ে কাজ করেছেন।' 
        : 'Anisul is an experienced software engineer and AI specialist who designed the core technology behind TruthSeeker. He has over 10 years of experience in data science and machine learning.',
      avatar: '/placeholder.svg',
      links: {
        linkedin: 'https://linkedin.com/in/anisul',
        github: 'https://github.com/anisul'
      }
    },
    {
      name: language === 'bn' ? 'সানজিদা রহমান' : 'Sanjida Rahman',
      role: language === 'bn' ? 'প্রধান নির্বাহী কর্মকর্তা' : 'Chief Executive Officer',
      bio: language === 'bn' 
        ? 'সানজিদা একজন মিডিয়া এবং তথ্য বিশেষজ্ঞ যিনি মিথ্যা তথ্য সনাক্তকরণের গুরুত্ব বুঝতেন। সত্যান্বেষী প্রতিষ্ঠার আগে, তিনি একটি বড় সংবাদ সংস্থায় ১৫ বছর কাজ করেছেন।' 
        : 'Sanjida is a media and information specialist who understood the importance of misinformation detection. Before founding TruthSeeker, she worked for 15 years at a major news organization.',
      avatar: '/placeholder.svg',
      links: {
        linkedin: 'https://linkedin.com/in/sanjida',
      }
    }
  ];

  const title = language === 'bn' ? 'আমাদের প্রতিষ্ঠাতা' : 'Our Founders';
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-truthseeker-blue mb-12">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <Avatar className="h-24 w-24 border-2 border-truthseeker-blue">
                    <AvatarImage src={founder.avatar} alt={founder.name} />
                    <AvatarFallback>
                      <UserRound className="h-12 w-12 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-truthseeker-blue">{founder.name}</h3>
                    <p className="text-gray-600 mb-3">{founder.role}</p>
                    <p className="text-gray-700 mb-4">{founder.bio}</p>
                    
                    <div className="flex justify-center sm:justify-start gap-4">
                      {founder.links.linkedin && (
                        <a 
                          href={founder.links.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-truthseeker-blue transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {founder.links.github && (
                        <a 
                          href={founder.links.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-truthseeker-blue transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersProfile;
