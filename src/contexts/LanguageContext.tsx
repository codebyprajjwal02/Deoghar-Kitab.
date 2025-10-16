import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

interface Translations {
  navbar: {
    browseBooks: string;
    sellBook: string;
    whyUs: string;
    reviews: string;
    signIn: string;
  };
  hero: {
    headline: string;
    subtext: string;
    browseBooksBtn: string;
    sellBookBtn: string;
  };
  browse: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    genre: string;
    condition: string;
    priceRange: string;
    viewDetails: string;
    excellent: string;
    good: string;
    fair: string;
    fiction: string;
    nonfiction: string;
    mystery: string;
    romance: string;
    underPrice: string;
    midPrice: string;
    abovePrice: string;
  };
  sell: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    bookTitle: string;
    author: string;
    condition: string;
    price: string;
    description: string;
    uploadPhotos: string;
    uploadText: string;
    listBookBtn: string;
    titlePlaceholder: string;
    authorPlaceholder: string;
    descriptionPlaceholder: string;
    select: string;
  };
  whyChoose: {
    title: string;
    subtitle: string;
    saveMoney: string;
    saveMoneyDesc: string;
    declutter: string;
    declutterDesc: string;
    community: string;
    communityDesc: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    support: string;
    stayUpdated: string;
    newsletterText: string;
    emailPlaceholder: string;
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
    browseBooks: string;
    sellBook: string;
    howItWorks: string;
    aboutUs: string;
    faq: string;
    shipping: string;
    returns: string;
    contact: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      browseBooks: "Browse Books",
      sellBook: "Sell a Book",
      whyUs: "Why Us",
      reviews: "Reviews",
      signIn: "Sign In",
    },
    hero: {
      headline: "Buy. Sell. Repeat. Discover Stories That Deserve a Second Life.",
      subtext: "A marketplace for students and book lovers to buy and sell second-hand books easily.",
      browseBooksBtn: "Browse Books",
      sellBookBtn: "Sell Your Book",
    },
    browse: {
      title: "Browse Books",
      subtitle: "Discover your next favorite story from our curated collection of second-hand books",
      searchPlaceholder: "Search by title or author...",
      genre: "Genre",
      condition: "Condition",
      priceRange: "Price Range",
      viewDetails: "View Details",
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      fiction: "Fiction",
      nonfiction: "Non-Fiction",
      mystery: "Mystery",
      romance: "Romance",
      underPrice: "Under ₹200",
      midPrice: "₹200 - ₹400",
      abovePrice: "Above ₹400",
    },
    sell: {
      title: "Sell Your Book",
      subtitle: "Turn your unused books into cash. List your book in minutes and reach thousands of readers",
      step1Title: "Add Book Details",
      step1Desc: "Provide title, author, condition, and a fair price for your book",
      step2Title: "Upload Photos",
      step2Desc: "Take clear photos of your book's cover and condition",
      step3Title: "Start Selling",
      step3Desc: "Once approved, your book will be visible to thousands of buyers",
      bookTitle: "Book Title",
      author: "Author",
      condition: "Condition",
      price: "Price (₹)",
      description: "Description",
      uploadPhotos: "Upload Photos",
      uploadText: "Click to upload or drag and drop",
      listBookBtn: "List Your Book",
      titlePlaceholder: "Enter book title",
      authorPlaceholder: "Enter author name",
      descriptionPlaceholder: "Tell buyers about your book...",
      select: "Select",
    },
    whyChoose: {
      title: "Why Choose Deoghar Kitab",
      subtitle: "More than just a marketplace — a movement towards sustainable and accessible reading",
      saveMoney: "Save Money",
      saveMoneyDesc: "Buy quality books at a fraction of the original price and make your reading more affordable",
      declutter: "Declutter & Earn",
      declutterDesc: "Turn your unused books into cash while helping others discover great stories",
      community: "Community Driven",
      communityDesc: "Join a passionate community of book lovers committed to sustainable reading",
    },
    testimonials: {
      title: "What Our Readers Say",
      subtitle: "Join thousands of happy book lovers who've found their perfect reads",
    },
    footer: {
      description: "Your trusted marketplace for buying and selling second-hand books. Join our community of book lovers today.",
      quickLinks: "Quick Links",
      support: "Support",
      stayUpdated: "Stay Updated",
      newsletterText: "Subscribe to get special offers and updates on new arrivals",
      emailPlaceholder: "Your email",
      copyright: "© 2025 Deoghar Kitab. All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      browseBooks: "Browse Books",
      sellBook: "Sell a Book",
      howItWorks: "How It Works",
      aboutUs: "About Us",
      faq: "FAQ",
      shipping: "Shipping Info",
      returns: "Returns",
      contact: "Contact Us",
    },
  },
  hi: {
    navbar: {
      browseBooks: "किताबें देखें",
      sellBook: "किताब बेचें",
      whyUs: "हमारे बारे में",
      reviews: "समीक्षाएं",
      signIn: "साइन इन करें",
    },
    hero: {
      headline: "खरीदें। बेचें। दोहराएं। उन कहानियों की खोज करें जो दूसरा जीवन पाने के योग्य हैं।",
      subtext: "छात्रों और किताब प्रेमियों के लिए पुरानी किताबें खरीदने और बेचने का बाज़ार।",
      browseBooksBtn: "किताबें देखें",
      sellBookBtn: "अपनी किताब बेचें",
    },
    browse: {
      title: "किताबें देखें",
      subtitle: "पुरानी किताबों के हमारे संग्रह से अपनी अगली पसंदीदा कहानी खोजें",
      searchPlaceholder: "शीर्षक या लेखक से खोजें...",
      genre: "शैली",
      condition: "स्थिति",
      priceRange: "मूल्य सीमा",
      viewDetails: "विवरण देखें",
      excellent: "उत्कृष्ट",
      good: "अच्छा",
      fair: "ठीक",
      fiction: "कल्पना",
      nonfiction: "गैर-कल्पना",
      mystery: "रहस्य",
      romance: "रोमांस",
      underPrice: "₹200 से कम",
      midPrice: "₹200 - ₹400",
      abovePrice: "₹400 से ऊपर",
    },
    sell: {
      title: "अपनी किताब बेचें",
      subtitle: "अपनी अप्रयुक्त किताबों को नकद में बदलें। मिनटों में अपनी किताब सूचीबद्ध करें और हजारों पाठकों तक पहुंचें",
      step1Title: "पुस्तक विवरण जोड़ें",
      step1Desc: "अपनी किताब का शीर्षक, लेखक, स्थिति और उचित मूल्य प्रदान करें",
      step2Title: "फ़ोटो अपलोड करें",
      step2Desc: "अपनी किताब के कवर और स्थिति की स्पष्ट तस्वीरें लें",
      step3Title: "बिक्री शुरू करें",
      step3Desc: "स्वीकृत होने के बाद, आपकी किताब हजारों खरीदारों को दिखाई देगी",
      bookTitle: "पुस्तक शीर्षक",
      author: "लेखक",
      condition: "स्थिति",
      price: "मूल्य (₹)",
      description: "विवरण",
      uploadPhotos: "फ़ोटो अपलोड करें",
      uploadText: "अपलोड करने या खींचें और छोड़ें के लिए क्लिक करें",
      listBookBtn: "अपनी किताब सूचीबद्ध करें",
      titlePlaceholder: "पुस्तक शीर्षक दर्ज करें",
      authorPlaceholder: "लेखक का नाम दर्ज करें",
      descriptionPlaceholder: "खरीदारों को अपनी किताब के बारे में बताएं...",
      select: "चुनें",
    },
    whyChoose: {
      title: "देवघर किताब क्यों चुनें",
      subtitle: "सिर्फ एक बाज़ार से अधिक — टिकाऊ और सुलभ पढ़ने की दिशा में एक आंदोलन",
      saveMoney: "पैसे बचाएं",
      saveMoneyDesc: "मूल मूल्य के एक अंश पर गुणवत्ता वाली किताबें खरीदें और अपने पढ़ने को किफायती बनाएं",
      declutter: "साफ़ करें और कमाएं",
      declutterDesc: "अपनी अप्रयुक्त किताबों को नकद में बदलें और दूसरों को महान कहानियां खोजने में मदद करें",
      community: "समुदाय संचालित",
      communityDesc: "टिकाऊ पढ़ने के लिए प्रतिबद्ध पुस्तक प्रेमियों के एक भावुक समुदाय में शामिल हों",
    },
    testimonials: {
      title: "हमारे पाठक क्या कहते हैं",
      subtitle: "हजारों खुश किताब प्रेमियों में शामिल हों जिन्होंने अपनी पूर्ण पठन सामग्री पाई है",
    },
    footer: {
      description: "पुरानी किताबें खरीदने और बेचने के लिए आपका विश्वसनीय बाज़ार। आज ही किताब प्रेमियों के हमारे समुदाय में शामिल हों।",
      quickLinks: "त्वरित लिंक",
      support: "सहायता",
      stayUpdated: "अपडेट रहें",
      newsletterText: "विशेष ऑफ़र और नई आगमन पर अपडेट प्राप्त करने के लिए सदस्यता लें",
      emailPlaceholder: "आपका ईमेल",
      copyright: "© 2025 देवघर किताब। सर्वाधिकार सुरक्षित।",
      privacyPolicy: "गोपनीयता नीति",
      termsOfService: "सेवा की शर्तें",
      browseBooks: "किताबें देखें",
      sellBook: "किताब बेचें",
      howItWorks: "यह कैसे काम करता है",
      aboutUs: "हमारे बारे में",
      faq: "पूछे जाने वाले प्रश्न",
      shipping: "शिपिंग जानकारी",
      returns: "वापसी",
      contact: "हमसे संपर्क करें",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved === "hi" || saved === "en") ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
