import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Laptop, Database, FileText, Smartphone, Box, CreditCard, Mail, Phone, Facebook, Instagram, Linkedin, Send, ArrowRight, CheckCircle, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { toast } from '@/hooks/use-toast';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';
import instagramQr from '@/assets/instagram-qr.jpeg';

const Index = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [formSuccess, setFormSuccess] = useState(false);
  
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hasVisited', 'true');
      }, 1500);
    } else {
      setLoading(false);
    }
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    // Build Instagram DM message
    const instagramUsername = 'codemarket_studio';
    const message = `
🔔 Nouvelle Demande CodeMarket

👤 Nom: ${formData.name}
📧 Email: ${formData.email}
📱 Téléphone: ${formData.phone || 'Non fourni'}
🛠️ Service: ${formData.service || 'Non spécifié'}

💬 Message:
${formData.message}
    `.trim();

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Open Instagram with the message (Instagram doesn't support pre-filled DMs via URL, so we'll guide user)
    const encodedMessage = encodeURIComponent(message);
    
    // Show success and open Instagram
    setFormSuccess(true);
    toast({ 
      title: language === 'fr' ? "✅ Message préparé !" : "✅ Message prepared!",
      description: language === 'fr' 
        ? "Vous allez être redirigé vers Instagram. Copiez le message et envoyez-le nous !" 
        : "You'll be redirected to Instagram. Copy the message and send it to us!",
    });
    
    // Copy message to clipboard
    try {
      await navigator.clipboard.writeText(message);
      toast({ 
        title: language === 'fr' ? "📋 Message copié !" : "📋 Message copied!",
        description: language === 'fr' 
          ? "Le message a été copié dans votre presse-papiers." 
          : "The message has been copied to your clipboard.",
      });
    } catch (err) {
      console.log('Clipboard not available');
    }
    
    // Open Instagram after a short delay
    setTimeout(() => {
      window.open(`https://www.instagram.com/${instagramUsername}/`, '_blank');
    }, 1500);
    
    setFormSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setFormSuccess(false);
    }, 3000);
  };

  const services = [
    { icon: Palette, title: t('service_logo_title'), desc: t('service_logo_desc'), price: '50€+', delay: 0 },
    { icon: Laptop, title: t('service_web_title'), desc: t('service_web_desc'), price: '200€+', delay: 0.1 },
    { icon: Database, title: t('service_db_title'), desc: t('service_db_desc'), price: '150€+', delay: 0.2 },
    { icon: FileText, title: t('service_reports_title'), desc: t('service_reports_desc'), price: '30€+', delay: 0.3 },
  ];

  const portfolio = [
    { icon: Palette, title: t('portfolio_logo_title'), desc: t('portfolio_logo_desc') },
    { icon: Laptop, title: t('portfolio_web_title'), desc: t('portfolio_web_desc') },
    { icon: Database, title: t('portfolio_db_title'), desc: t('portfolio_db_desc') },
    { icon: FileText, title: t('portfolio_reports_title'), desc: t('portfolio_reports_desc') },
    { icon: Smartphone, title: t('portfolio_mobile_title'), desc: t('portfolio_mobile_desc') },
    { icon: Box, title: t('portfolio_mockup_title'), desc: t('portfolio_mockup_desc') },
    { icon: CreditCard, title: t('portfolio_cv_title'), desc: t('portfolio_cv_desc') },
  ];

  const logo = theme === 'dark' ? logoDark : logoLight;

  if (loading) {
    return (
      <div className="loader">
        <div className="text-center">
          <div className="relative">
            <div className="spinner mx-auto mb-5" />
            <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
          </div>
          <p className="text-xl gradient-text font-semibold">{t('loading')}</p>
          <p className="text-muted-foreground mt-2 text-sm animate-pulse">CodeMarket Studio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <Navbar />

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden px-[5%] pt-20">
        {/* Animated Background Shapes */}
        <div className="floating-shape w-20 h-20 top-[20%] left-[10%]" style={{ animationDelay: '0s' }} />
        <div className="floating-shape w-16 h-16 top-[60%] right-[15%]" style={{ animationDelay: '2s' }} />
        <div className="floating-shape w-24 h-24 bottom-[20%] left-[20%]" style={{ animationDelay: '4s' }} />
        <div className="floating-shape w-12 h-12 top-[40%] right-[25%]" style={{ animationDelay: '1s' }} />
        <div className="floating-shape w-14 h-14 bottom-[40%] right-[10%]" style={{ animationDelay: '3s' }} />
        
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          {/* Logo Animation */}
          <div className="mb-8 animate-fadeInUp">
            <img 
              src={logo} 
              alt="CodeMarket" 
              className="w-24 h-24 mx-auto object-contain animate-glow hover:scale-110 transition-transform duration-500" 
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 gradient-text animate-fadeInUp leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {t('hero_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <a href="#contact" className="cta-button flex items-center justify-center gap-2 group">
              {t('about_btn')} 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/services" className="auth-btn flex items-center justify-center gap-2 group">
              {t('nav_services')} 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-primary rounded-full animate-scroll-indicator" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-32 px-[5%]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 flex justify-center fade-in">
            <div className="relative group">
              <img 
                src={logo} 
                alt="CodeMarket" 
                className="w-48 h-48 object-contain animate-glow group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl -z-10 group-hover:blur-[100px] transition-all duration-500" />
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex-1 fade-in" style={{ transitionDelay: '0.2s' }}>
            <h2 className="text-4xl font-bold gradient-text mb-4">{t('about_title')}</h2>
            <p className="text-lg text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {t('about_subtitle')}
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">{t('about_text1')}</p>
            <p className="text-muted-foreground mb-8 leading-relaxed">{t('about_text2')}</p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '50+', label: language === 'fr' ? 'Projets' : 'Projects' },
                { value: '100%', label: language === 'fr' ? 'Satisfaction' : 'Satisfaction' },
                { value: '24h', label: language === 'fr' ? 'Support' : 'Support' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 glass-card rounded-xl hover:scale-105 transition-transform">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <a href="#contact" className="cta-button inline-flex items-center gap-2 group">
              {t('about_btn')} 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-32 px-[5%] bg-card/30">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold gradient-text mb-4">{t('services_title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('services_subtitle')}</p>
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div 
              key={i} 
              className="service-card group fade-in"
              style={{ transitionDelay: `${service.delay}s` }}
            >
              <div className="service-icon gradient-text transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
                <service.icon size={56} />
              </div>
              <h3 className="text-xl font-semibold mb-2 relative z-10">{service.title}</h3>
              <p className="text-muted-foreground relative z-10 leading-relaxed mb-4">{service.desc}</p>
              <div className="gradient-text font-bold text-lg relative z-10">{service.price}</div>
              <Link 
                to="/services" 
                className="mt-4 text-primary hover:underline relative z-10 flex items-center gap-1 justify-center group/link"
              >
                {t('nav_services')} 
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 fade-in">
          <Link to="/services" className="cta-button inline-flex items-center gap-2 group">
            {language === 'fr' ? 'Voir tous les services' : 'View all services'} 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" ref={portfolioRef} className="py-32 px-[5%]">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold gradient-text mb-4">{t('portfolio_title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('portfolio_subtitle')}</p>
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((item, i) => (
            <div 
              key={i} 
              className="portfolio-item group fade-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 text-6xl text-foreground/30 transition-all duration-500 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-accent/20">
                <item.icon size={64} />
              </div>
              <div className="portfolio-overlay">
                <h3 className="text-2xl font-bold gradient-text mb-4 transform translate-y-5 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-center transform translate-y-5 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {item.desc}
                </p>
                <Link 
                  to="/achievements" 
                  className="mt-4 cta-button text-sm transform translate-y-5 group-hover:translate-y-0 transition-transform duration-300 delay-200 inline-flex items-center gap-2"
                >
                  {language === 'fr' ? 'Voir plus' : 'View more'}
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 fade-in">
          <Link to="/achievements" className="cta-button inline-flex items-center gap-2 group">
            {language === 'fr' ? 'Voir toutes les réalisations' : 'View all achievements'} 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-32 px-[5%] bg-card/30">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-4">{t('contact_header_title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('contact_header_desc')}</p>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="fade-in">
            <h2 className="text-3xl font-bold mb-4">{t('contact_title')}</h2>
            <p className="text-muted-foreground mb-8">{t('contact_desc')}</p>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 glass-card rounded-xl hover:scale-[1.02] transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t('contact_email_title')}</h3>
                  <a href="mailto:codemarket@gmail.com" className="text-muted-foreground hover:text-primary transition-colors block">
                    codemarket@gmail.com
                  </a>
                  <a href="mailto:supportcodemarket@gmail.com" className="text-muted-foreground hover:text-primary transition-colors block">
                    supportcodemarket@gmail.com
                  </a>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start gap-4 p-4 glass-card rounded-xl hover:scale-[1.02] transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t('contact_phone_title')}</h3>
                  <a href="tel:0778112836" className="text-muted-foreground hover:text-primary transition-colors block">
                    0 778112836
                  </a>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock size={14} /> {t('contact_phone_hours')}
                  </p>
                </div>
              </div>
              
              {/* Instagram QR Code */}
              <div className="p-6 glass-card rounded-xl text-center hover:scale-[1.02] transition-all hover:shadow-lg hover:shadow-primary/10">
                <h3 className="font-semibold mb-4">{t('contact_social_title')}</h3>
                <div className="relative inline-block">
                  <img 
                    src={instagramQr} 
                    alt="Instagram QR Code" 
                    className="w-40 h-40 mx-auto rounded-xl mb-4 hover:scale-105 transition-transform" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-muted-foreground text-sm mb-4">@codemarket_studio</p>
                <div className="flex gap-4 justify-center">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link hover:scale-110"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href="https://www.instagram.com/codemarket_studio" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link hover:scale-110"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link hover:scale-110"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in" style={{ transitionDelay: '0.2s' }}>
            {formSuccess ? (
              <div className="glass-card rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center animate-scale-in">
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  {language === 'fr' ? 'Message Préparé !' : 'Message Prepared!'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'fr' 
                    ? 'Votre message a été copié. Instagram va s\'ouvrir pour que vous puissiez nous l\'envoyer directement !'
                    : 'Your message has been copied. Instagram will open so you can send it directly to us!'
                  }
                </p>
                <a 
                  href="https://www.instagram.com/codemarket_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button inline-flex items-center gap-2"
                >
                  <Instagram size={20} />
                  {language === 'fr' ? 'Ouvrir Instagram' : 'Open Instagram'}
                </a>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="glass-card rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-muted-foreground font-medium mb-2">{t('form_name_label')}</label>
                    <input 
                      type="text" 
                      required 
                      placeholder={t('form_name_placeholder')} 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input" 
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground font-medium mb-2">{t('form_email_label')}</label>
                    <input 
                      type="email" 
                      required 
                      placeholder={t('form_email_placeholder')} 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-muted-foreground font-medium mb-2">{t('form_phone_label')}</label>
                    <input 
                      type="tel" 
                      placeholder={t('form_phone_placeholder')} 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input" 
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground font-medium mb-2">{t('form_service_label')}</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="form-input"
                    >
                      <option value="">{t('form_service_placeholder')}</option>
                      <option value="presentation">{t('form_service_presentation')}</option>
                      <option value="report">{t('form_service_report')}</option>
                      <option value="web">{t('form_service_web')}</option>
                      <option value="logo">{t('form_service_logo')}</option>
                      <option value="other">{t('form_service_other')}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-muted-foreground font-medium mb-2">{t('form_message_label')}</label>
                  <textarea 
                    required 
                    placeholder={t('form_message_placeholder')} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input min-h-[150px] resize-y" 
                  />
                </div>
  <button 
  type="submit"
  disabled={formSubmitting}
  className="cta-button w-full h-14 text-lg
             flex items-center justify-center gap-3"
>
  {formSubmitting ? (
    <span className="flex items-center justify-center gap-2">
      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      {language === 'fr' ? 'Envoi...' : 'Sending...'}
    </span>
  ) : (
    <span className="flex items-center justify-center gap-2">
      <Send size={20} />
      <span>Send</span>
    </span>
  )}
</button>


                <p className="text-center text-sm text-muted-foreground">
                  {language === 'fr' 
                    ? '📱 Votre message sera envoyé via Instagram DM'
                    : '📱 Your message will be sent via Instagram DM'
                  }
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
