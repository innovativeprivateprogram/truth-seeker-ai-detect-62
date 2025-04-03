
export type Language = 'bn' | 'en';

type TranslationKeys = {
  siteName: string;
  about: string;
  howItWorks: string;
  analyzeContent: string;
  learnHowItWorks: string;
  textVerification: string;
  imageVerification: string;
  textAnalysisTitle: string;
  textPlaceholder: string;
  analyzing: string;
  analyzeContentBtn: string;
  contentRequired: string;
  contentRequiredDesc: string;
  analysisFailed: string;
  analysisFailed_desc: string;
  verificationResult: string;
  contentPreview: string;
  reliabilityScore: string;
  analysis: string;
  sources: string;
  specialNote: string;
  specialNoteText: string;
  highRelevance: string;
  mediumRelevance: string;
  lowRelevance: string;
  likelyReliable: string;
  potentiallyMisleading: string;
  likelyMisleading: string;
  unknown: string;
  howItWorksTitle: string;
  contentAnalysis: string;
  contentAnalysisDesc: string;
  imageVerificationTitle: string;
  imageVerificationDesc: string;
  aiAlgorithms: string;
  aiAlgorithmsDesc: string;
  confidenceScoring: string;
  confidenceScoringDesc: string;
  automatedNote: string;
  aboutTitle: string;
  aboutDesc: string;
  aboutDesc2: string;
  aboutChecks: string[];
  whyItMatters: string;
  whyItMattersDesc: string;
  whyItMattersPoints: string[];
  noteTitle: string;
  noteText: string;
  footerDesc: string;
  footerDesc2: string;
  copyright: string;
  detectMisinformation: string;
  appDesc: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    siteName: 'TruthSeeker',
    about: 'About',
    howItWorks: 'How it Works',
    analyzeContent: 'Analyze Content',
    learnHowItWorks: 'Learn How It Works',
    textVerification: 'Text Verification',
    imageVerification: 'Image Verification',
    textAnalysisTitle: 'Text Analysis',
    textPlaceholder: 'Paste or type the text content you want to verify...',
    analyzing: 'Analyzing...',
    analyzeContentBtn: 'Analyze Content',
    contentRequired: 'Text Required',
    contentRequiredDesc: 'Please enter some text to analyze.',
    analysisFailed: 'Analysis Failed',
    analysisFailed_desc: 'An error occurred while analyzing your text. Please try again.',
    verificationResult: 'Verification Result',
    contentPreview: 'Analyzed Content',
    reliabilityScore: 'Reliability Score',
    analysis: 'Analysis:',
    sources: 'Information Sources:',
    specialNote: 'Special Note:',
    specialNoteText: 'This is an AI-powered analysis and should be used for informational purposes only. Always verify information through multiple trusted sources.',
    highRelevance: 'High Relevance',
    mediumRelevance: 'Medium Relevance',
    lowRelevance: 'Low Relevance',
    likelyReliable: 'Likely Reliable',
    potentiallyMisleading: 'Potentially Misleading',
    likelyMisleading: 'Likely Misleading',
    unknown: 'Unknown',
    howItWorksTitle: 'How TruthSeeker Works',
    contentAnalysis: 'Content Analysis',
    contentAnalysisDesc: 'TruthSeeker examines text for sensationalist language, misleading claims, and factual inconsistencies.',
    imageVerificationTitle: 'Image Verification',
    imageVerificationDesc: 'Our system detects signs of manipulation in images by analyzing metadata, pixels, and visual inconsistencies.',
    aiAlgorithms: 'AI Algorithms',
    aiAlgorithmsDesc: 'Advanced machine learning models assess the reliability of content based on patterns found in verified and misleading information.',
    confidenceScoring: 'Confidence Scoring',
    confidenceScoringDesc: 'Each analysis includes a confidence score and detailed explanation to help you make informed judgments about the content.',
    automatedNote: 'While TruthSeeker provides powerful analysis, it\'s important to remember that no automated system is perfect. Always verify information through multiple trusted sources.',
    aboutTitle: 'About TruthSeeker',
    aboutDesc: 'In today\'s digital landscape, misinformation spreads rapidly. TruthSeeker was developed to help people distinguish fact from fiction by providing AI-powered analysis of content they encounter online.',
    aboutDesc2: 'Our technology examines both text and images, identifying patterns common in misleading content and offering you insights to make more informed decisions about what to trust.',
    aboutChecks: [
      'Analyze text content for sensationalist language and deceptive patterns',
      'Detect manipulated images through advanced digital forensics',
      'Get clear explanations and confidence scores to understand the analysis',
      'Use our insights alongside other verification methods for best results'
    ],
    whyItMatters: 'Why Misinformation Detection Matters',
    whyItMattersDesc: 'Misleading information can lead to harmful decisions, spread false beliefs, and erode trust in reliable sources. By helping users identify potential misinformation, we aim to:',
    whyItMattersPoints: [
      'Promote critical thinking about online content',
      'Reduce the spread of harmful misinformation',
      'Empower users with tools to make informed judgments',
      'Support a healthier information ecosystem'
    ],
    noteTitle: 'Note:',
    noteText: 'While we strive for accuracy, our AI system cannot guarantee perfect detection of all misleading content. Always verify important information through multiple trusted sources.',
    footerDesc: 'TruthSeeker uses AI to help identify potentially misleading content.',
    footerDesc2: 'Results should be used as guidance only and not as definitive truth.',
    copyright: '© 2025 TruthSeeker',
    detectMisinformation: 'Detect Misinformation with AI',
    appDesc: 'TruthSeeker helps you identify potentially misleading content in text and images using advanced AI analysis.'
  },
  bn: {
    siteName: 'সত্যান্বেষী',
    about: 'আমাদের সম্পর্কে',
    howItWorks: 'কিভাবে কাজ করে',
    analyzeContent: 'কন্টেন্ট বিশ্লেষণ করুন',
    learnHowItWorks: 'কিভাবে কাজ করে জানুন',
    textVerification: 'টেক্সট যাচাইকরণ',
    imageVerification: 'ছবি যাচাইকরণ',
    textAnalysisTitle: 'টেক্সট বিশ্লেষণ',
    textPlaceholder: 'যে টেক্সট কন্টেন্ট যাচাই করতে চান তা পেস্ট করুন বা টাইপ করুন...',
    analyzing: 'বিশ্লেষণ করা হচ্ছে...',
    analyzeContentBtn: 'কন্টেন্ট বিশ্লেষণ করুন',
    contentRequired: 'টেক্সট প্রয়োজন',
    contentRequiredDesc: 'বিশ্লেষণ করার জন্য কিছু টেক্সট লিখুন।',
    analysisFailed: 'বিশ্লেষণ ব্যর্থ হয়েছে',
    analysisFailed_desc: 'আপনার টেক্সট বিশ্লেষণ করার সময় একটি ত্রুটি হয়েছে। আবার চেষ্টা করুন।',
    verificationResult: 'যাচাইয়ের ফলাফল',
    contentPreview: 'বিশ্লেষিত কন্টেন্ট',
    reliabilityScore: 'বিশ্বাসযোগ্যতা স্কোর',
    analysis: 'বিশ্লেষণ:',
    sources: 'তথ্যের উৎস:',
    specialNote: 'বিশেষ দ্রষ্টব্য:',
    specialNoteText: 'এটি একটি AI-চালিত বিশ্লেষণ এবং শুধুমাত্র তথ্যমূলক উদ্দেশ্যে ব্যবহার করা উচিত। সর্বদা একাধিক বিশ্বস্ত উৎসের মাধ্যমে তথ্য যাচাই করুন।',
    highRelevance: 'উচ্চ প্রাসঙ্গিকতা',
    mediumRelevance: 'মাঝারি প্রাসঙ্গিকতা',
    lowRelevance: 'নিম্ন প্রাসঙ্গিকতা',
    likelyReliable: 'সম্ভবত বিশ্বাসযোগ্য',
    potentiallyMisleading: 'সম্ভাব্য বিভ্রান্তিকর',
    likelyMisleading: 'সম্ভবত বিভ্রান্তিকর',
    unknown: 'অজানা',
    howItWorksTitle: 'সত্যান্বেষী কিভাবে কাজ করে',
    contentAnalysis: 'কন্টেন্ট বিশ্লেষণ',
    contentAnalysisDesc: 'সত্যান্বেষী টেক্সটে সনসনীয় ভাষা, বিভ্রান্তিকর দাবি এবং তথ্যগত অসঙ্গতি যাচাই করে।',
    imageVerificationTitle: 'ছবি যাচাইকরণ',
    imageVerificationDesc: 'আমাদের সিস্টেম মেটাডেটা, পিক্সেল এবং ভিজ্যুয়াল অসঙ্গতি বিশ্লেষণ করে ছবিতে হেরফেরের চিহ্ন সনাক্ত করে।',
    aiAlgorithms: 'AI অ্যালগরিদম',
    aiAlgorithmsDesc: 'উন্নত মেশিন লার্নিং মডেলগুলি যাচাইকৃত এবং বিভ্রান্তিকর তথ্যে পাওয়া প্যাটার্নগুলির উপর ভিত্তি করে কন্টেন্টের বিশ্বাসযোগ্যতা মূল্যায়ন করে।',
    confidenceScoring: 'বিশ্বাসযোগ্যতা স্কোরিং',
    confidenceScoringDesc: 'প্রতিটি বিশ্লেষণে একটি বিশ্বাসযোগ্যতা স্কোর এবং বিস্তারিত ব্যাখ্যা অন্তর্ভুক্ত থাকে যা আপনাকে কন্টেন্ট সম্পর্কে সুচিন্তিত সিদ্ধান্ত নিতে সাহায্য করে।',
    automatedNote: 'যদিও সত্যান্বেষী শক্তিশালী বিশ্লেষণ প্রদান করে, এটি মনে রাখা গুরুত্বপূর্ণ যে কোনো স্বয়ংক্রিয় সিস্টেমই নিখুঁত নয়। সবসময় একাধিক বিশ্বস্ত উৎসের মাধ্যমে তথ্য যাচাই করুন।',
    aboutTitle: 'সত্যান্বেষী সম্পর্কে',
    aboutDesc: 'আজকের ডিজিটাল পরিমণ্ডলে, ভুল তথ্য দ্রুত ছড়িয়ে পড়ে। সত্যান্বেষী তৈরি করা হয়েছে মানুষকে অনলাইনে দেখা কন্টেন্টের AI-চালিত বিশ্লেষণ প্রদান করে তথ্য থেকে কল্পনা আলাদা করতে সাহায্য করার জন্য।',
    aboutDesc2: 'আমাদের প্রযুক্তি টেক্সট এবং ছবি উভয়ই পরীক্ষা করে, বিভ্রান্তিকর কন্টেন্টে সাধারণ প্যাটার্নগুলি চিহ্নিত করে এবং আপনাকে কোনটি বিশ্বাস করতে হবে সে সম্পর্কে আরও সুচিন্তিত সিদ্ধান্ত নেওয়ার জন্য অন্তর্দৃষ্টি প্রদান করে।',
    aboutChecks: [
      'সনসনীয় ভাষা এবং প্রতারণামূলক প্যাটার্নের জন্য টেক্সট কন্টেন্ট বিশ্লেষণ করুন',
      'উন্নত ডিজিটাল ফরেনসিকসের মাধ্যমে হেরফের করা ছবি সনাক্ত করুন',
      'বিশ্লেষণ বুঝতে স্পষ্ট ব্যাখ্যা এবং বিশ্বাসযোগ্যতা স্কোর পান',
      'সেরা ফলাফলের জন্য অন্যান্য যাচাইকরণ পদ্ধতির পাশাপাশি আমাদের অন্তর্দৃষ্টি ব্যবহার করুন'
    ],
    whyItMatters: 'কেন মিথ্যা তথ্য সনাক্তকরণ গুরুত্বপূর্ণ',
    whyItMattersDesc: 'বিভ্রান্তিকর তথ্য ক্ষতিকারক সিদ্ধান্তে নিয়ে যেতে পারে, ভুল বিশ্বাস ছড়িয়ে দিতে পারে এবং নির্ভরযোগ্য উৎসের উপর বিশ্বাস নষ্ট করতে পারে। ব্যবহারকারীদের সম্ভাব্য ভুল তথ্য চিহ্নিত করতে সাহায্য করে, আমরা লক্ষ্য করি:',
    whyItMattersPoints: [
      'অনলাইন কন্টেন্ট সম্পর্কে সমালোচনামূলক চিন্তাভাবনাকে উৎসাহিত করুন',
      'ক্ষতিকারক মিথ্যা তথ্যের প্রসার হ্রাস করুন',
      'সুচিন্তিত বিচার করার জন্য ব্যবহারকারীদের সরঞ্জাম দিয়ে ক্ষমতায়ন করুন',
      'একটি স্বাস্থ্যকর তথ্য বাস্তুতন্ত্র সমর্থন করুন'
    ],
    noteTitle: 'বিঃদ্রঃ:',
    noteText: 'যদিও আমরা নির্ভুলতার জন্য প্রচেষ্টা করি, আমাদের AI সিস্টেম সমস্ত বিভ্রান্তিকর কন্টেন্টের নিখুঁত সনাক্তকরণ নিশ্চিত করতে পারে না। সর্বদা একাধিক বিশ্বস্ত উৎসের মাধ্যমে গুরুত্বপূর্ণ তথ্য যাচাই করুন।',
    footerDesc: 'সত্যান্বেষী সম্ভাব্য বিভ্রান্তিকর কন্টেন্ট সনাক্ত করতে AI ব্যবহার করে।',
    footerDesc2: 'ফলাফলগুলি শুধুমাত্র নির্দেশিকা হিসাবে ব্যবহার করা উচিত এবং চূড়ান্ত সত্য হিসাবে নয়।',
    copyright: '© ২০২৫ সত্যান্বেষী',
    detectMisinformation: 'AI দিয়ে মিথ্যা তথ্য সনাক্ত করুন',
    appDesc: 'সত্যান্বেষী উন্নত AI বিশ্লেষণ ব্যবহার করে টেক্সট এবং ছবিতে সম্ভাব্য বিভ্রান্তিকর কন্টেন্ট সনাক্ত করতে সাহায্য করে।'
  }
};
