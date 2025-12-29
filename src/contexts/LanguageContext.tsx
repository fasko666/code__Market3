import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_services: "Services",
    nav_about: "About Us",
    nav_contact: "Contact",
    nav_portfolio: "Our Achievements",
    
    // Auth buttons
    sign_in: "Sign In",
    sign_up: "Sign Up",
    sign_in_link: "Sign In",
    sign_up_link: "Sign Up",
    logout: "Logout",
    
    // Loading
    loading: "Loading...",
    
    // Modals
    welcome_back: "Welcome Back",
    create_account: "Create Account",
    email_label: "Email",
    password_label: "Password",
    full_name_label: "Full Name",
    no_account: "Don't have an account?",
    have_account: "Already have an account?",
    
    // Hero Section
    hero_title: "Transform Your Vision into Reality",
    hero_description: "Premium digital services for presentations, courses, web design (web services), as well as internship reports. We realize your academic projects with excellence.",
    
    // About Section
    about_title: "About CodeMarket",
    about_subtitle: "Innovation • Creativity • Professionalism",
    about_text1: "CodeMarket is a digital studio specialized in creating modern and professional content: presentations, courses, internship reports, web interfaces, mockups and interactive CVs.",
    about_text2: "We transform your ideas into high-quality visual projects, adapted to your needs, with futuristic design and premium finishing.",
    about_btn: "Contact Us",
    
    // Services Section
    services_title: "Our Services",
    services_subtitle: "Complete and paid digital solutions tailored to your needs",
    services_page_title: "Our Services",
    services_page_subtitle: "Complete and professional digital solutions tailored to your needs",
    
    service_logo_title: "Logo Creation",
    service_logo_desc: "Design of unique and personalized logos to strengthen your professional visual identity.",
    
    service_web_title: "Web Interface",
    service_web_desc: "Design and development of modern and responsive web interfaces adapted to your needs.",
    
    service_db_title: "Database Management",
    service_db_desc: "Creation and management of secure databases to organize your contents and documents.",
    
    service_reports_title: "Presentations & Internship Reports",
    service_reports_desc: "Professional formatting and publication of your presentations and internship reports (paid services).",
    
    // Portfolio Section
    portfolio_title: "Our Achievements",
    portfolio_subtitle: "An overview of our recent paid projects",
    
    portfolio_logo_title: "Logo Creation",
    portfolio_logo_desc: "Unique and personalized logos to strengthen your company's visual identity.",
    
    portfolio_web_title: "Web Interface",
    portfolio_web_desc: "Modern and responsive websites with an optimized user experience.",
    
    portfolio_db_title: "Database Management",
    portfolio_db_desc: "Organization and securing of your data for optimal project management.",
    
    portfolio_reports_title: "Presentations & Reports",
    portfolio_reports_desc: "Professional formatting of your presentations and internship reports to impress your audience.",
    
    portfolio_mobile_title: "Mobile App Design",
    portfolio_mobile_desc: "Elegant and intuitive mobile interfaces for iOS and Android.",
    
    portfolio_mockup_title: "Product Mockups",
    portfolio_mockup_desc: "Realistic visualization of your products for presentation or marketing.",
    
    portfolio_cv_title: "CV / Portfolio Interface",
    portfolio_cv_desc: "Creation of elegant interfaces for CV or online portfolio, showcasing your skills and experiences.",
    
    // Contact Section
    contact_header_title: "Contact Us",
    contact_header_desc: "Have a project in mind? Let's discuss the best way to bring it to life.",
    
    contact_title: "Let's Talk About Your Project",
    contact_desc: "Whether you need a presentation, website, logo, report or any other digital service, we are here to support you. Contact us and let's create something exceptional.",
    
    contact_email_title: "Email",
    contact_phone_title: "Phone",
    contact_phone_hours: "Mon-Fri: 9am – 1pm",
    contact_social_title: "Follow Us",
    
    form_name_label: "Your Name *",
    form_name_placeholder: "Your Name",
    form_email_label: "Your Email *",
    form_email_placeholder: "YourName@example.com",
    form_phone_label: "Phone Number",
    form_phone_placeholder: "0 6XX-XXXXXX",
    form_service_label: "Desired Service *",
    form_service_placeholder: "Select a service",
    form_service_presentation: "Creating Presentations",
    form_service_report: "Report Design",
    form_service_web: "Web Development",
    form_service_logo: "Logo & Branding",
    form_service_other: "Other",
    form_message_label: "Your Message *",
    form_message_placeholder: "Tell us about your project...",
    form_submit: "Send",
    form_success: "Thank you! Your message has been sent. We will reply as soon as possible.",
    
    // Footer
    footer_brand_desc: "Transform your ideas into professional projects: presentations, courses, reports, websites, interfaces and custom mockups.",
    footer_services_title: "Services",
    footer_company_title: "CodeMarket Studio",
    footer_social_title: "Follow Us",
    
    footer_service_1: "Presentations & Courses",
    footer_service_2: "Internship Reports",
    footer_service_3: "Web Design & Development",
    footer_service_4: "Branding & Logos",
    footer_service_5: "Product Mockups / Interfaces",
    
    footer_link_portfolio: "Portfolio",
    footer_link_contact: "Contact",
    footer_link_about: "About",
    footer_link_team: "Our Team",
    
    footer_copyright: "© 2025 CodeMarket. All rights reserved.",

    // Achievements Page
    achievements_page_title: "Our Achievements",
    achievements_page_subtitle: "Discover our recent projects and achievements",
    
    filter_all: "All",
    filter_branding: "Branding",
    filter_web: "Web",
    filter_database: "Database",
    filter_presentation: "Presentation",
    filter_mobile: "Mobile",
    filter_mockup: "Mockup",

    // Chatbot
    chatbot_welcome: "Hello! I am your CodeMarket virtual assistant. I'm here to guide you through your visit and answer your questions.",
    chatbot_placeholder: "Type your message...",
    chatbot_online: "Online",
  },
  fr: {
    // Navigation
    nav_home: "Accueil",
    nav_services: "Services",
    nav_about: "À propos de nous",
    nav_contact: "Contact",
    nav_portfolio: "Nos Réalisations",
    
    // Auth buttons
    sign_in: "Connexion",
    sign_up: "Inscription",
    sign_in_link: "Connexion",
    sign_up_link: "Inscription",
    logout: "Déconnexion",
    
    // Loading
    loading: "Chargement...",
    
    // Modals
    welcome_back: "Bon Retour",
    create_account: "Créer un Compte",
    email_label: "Email",
    password_label: "Mot de passe",
    full_name_label: "Nom Complet",
    no_account: "Vous n'avez pas de compte ?",
    have_account: "Vous avez déjà un compte ?",
    
    // Hero Section
    hero_title: "Transformez votre vision en réalité",
    hero_description: "Services numériques haut de gamme pour les présentations, les cours, le design web (services web), ainsi que pour les rapports de stage. Nous réalisons vos projets académiques avec excellence.",
    
    // About Section
    about_title: "À propos de CodeMarket",
    about_subtitle: "Innovation • Créativité • Professionnalisme",
    about_text1: "CodeMarket est un studio numérique spécialisé dans la création de contenus modernes et professionnels : présentations, cours, rapports de stage, interfaces web, maquettes et CV interactifs.",
    about_text2: "Nous transformons vos idées en projets visuels de haute qualité, adaptés à vos besoins, avec un design futuriste et une finition premium.",
    about_btn: "Nous contacter",
    
    // Services Section
    services_title: "Nos Services",
    services_subtitle: "Des solutions numériques complètes et payantes adaptées à vos besoins",
    services_page_title: "Nos Services",
    services_page_subtitle: "Des solutions numériques complètes et professionnelles adaptées à vos besoins",
    
    service_logo_title: "Création de Logo",
    service_logo_desc: "Conception de logos uniques et personnalisés pour renforcer votre identité visuelle professionnelle.",
    
    service_web_title: "Interface Web",
    service_web_desc: "Design et développement d'interfaces web modernes et responsives adaptées à vos besoins.",
    
    service_db_title: "Gestion de Bases de Données",
    service_db_desc: "Création et gestion de bases de données sécurisées pour organiser vos contenus et documents.",
    
    service_reports_title: "Présentations & Rapports de Stage",
    service_reports_desc: "Mise en forme professionnelle et publication de vos présentations et rapports de stage (services payants).",
    
    // Portfolio Section
    portfolio_title: "Nos Réalisations",
    portfolio_subtitle: "Un aperçu de nos projets payants récents",
    
    portfolio_logo_title: "Création de Logo",
    portfolio_logo_desc: "Logos uniques et personnalisés pour renforcer l'identité visuelle de votre entreprise.",
    
    portfolio_web_title: "Interface Web",
    portfolio_web_desc: "Sites web modernes et responsives avec une expérience utilisateur optimisée.",
    
    portfolio_db_title: "Gestion de Bases de Données",
    portfolio_db_desc: "Organisation et sécurisation de vos données pour une gestion optimale de vos projets.",
    
    portfolio_reports_title: "Présentations & Rapports",
    portfolio_reports_desc: "Mise en forme professionnelle de vos présentations et rapports de stage pour impressionner votre audience.",
    
    portfolio_mobile_title: "Design d'Application Mobile",
    portfolio_mobile_desc: "Interfaces mobiles élégantes et intuitives pour iOS et Android.",
    
    portfolio_mockup_title: "Maquettes de Produits",
    portfolio_mockup_desc: "Visualisation réaliste de vos produits pour présentation ou marketing.",
    
    portfolio_cv_title: "Interface CV / Portfolio",
    portfolio_cv_desc: "Création d'interfaces élégantes pour CV ou portfolio en ligne, mettant en valeur vos compétences et expériences.",
    
    // Contact Section
    contact_header_title: "Contactez-Nous",
    contact_header_desc: "Vous avez un projet en tête ? Discutons ensemble de la meilleure façon de lui donner vie.",
    
    contact_title: "Parlons de Votre Projet",
    contact_desc: "Que vous ayez besoin d'une présentation, d'un site web, d'un logo, d'un rapport ou de tout autre service numérique, nous sommes là pour vous accompagner. Contactez-nous et créons quelque chose d'exceptionnel.",
    
    contact_email_title: "Email",
    contact_phone_title: "Téléphone",
    contact_phone_hours: "Lun-Ven : 9h – 13h",
    contact_social_title: "Suivez-Nous",
    
    form_name_label: "Votre Nom *",
    form_name_placeholder: "Votre Nom",
    form_email_label: "Votre Email *",
    form_email_placeholder: "VotreNom@example.com",
    form_phone_label: "Numéro de Téléphone",
    form_phone_placeholder: "0 6XX-XXXXXX",
    form_service_label: "Service Souhaité *",
    form_service_placeholder: "Sélectionnez un service",
    form_service_presentation: "Création de Présentations",
    form_service_report: "Conception de Rapports",
    form_service_web: "Développement Web",
    form_service_logo: "Logo & Branding",
    form_service_other: "Autre",
    form_message_label: "Votre Message *",
    form_message_placeholder: "Parlez-nous de votre projet...",
    form_submit: "Envoyer",
    form_success: "Merci ! Votre message a bien été envoyé. Nous vous répondrons dès que possible.",
    
    // Footer
    footer_brand_desc: "Transformez vos idées en projets professionnels : présentations, cours, rapports, sites web, interfaces et maquettes sur mesure.",
    footer_services_title: "Services",
    footer_company_title: "CodeMarket Studio",
    footer_social_title: "Nous Suivre",
    
    footer_service_1: "Présentations & Cours",
    footer_service_2: "Rapports de Stage",
    footer_service_3: "Web Design & Développement",
    footer_service_4: "Branding & Logos",
    footer_service_5: "Maquettes Produits / Interfaces",
    
    footer_link_portfolio: "Portfolio",
    footer_link_contact: "Contact",
    footer_link_about: "À propos",
    footer_link_team: "Notre Équipe",
    
    footer_copyright: "© 2025 CodeMarket. Tous droits réservés.",

    // Achievements Page
    achievements_page_title: "Nos Réalisations",
    achievements_page_subtitle: "Découvrez nos projets récents et nos réalisations",
    
    filter_all: "Tous",
    filter_branding: "Branding",
    filter_web: "Web",
    filter_database: "Base de données",
    filter_presentation: "Présentation",
    filter_mobile: "Mobile",
    filter_mockup: "Maquette",

    // Chatbot
    chatbot_welcome: "Bonjour ! Je suis votre assistant virtuel CodeMarket. Je suis là pour vous guider tout au long de votre visite et répondre à vos questions.",
    chatbot_placeholder: "Tapez votre message...",
    chatbot_online: "En ligne",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
