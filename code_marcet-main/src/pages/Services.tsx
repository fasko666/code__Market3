import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Palette, Laptop, Database, FileText, Smartphone, Image, ArrowRight, Check, Star, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import instagramQr from '@/assets/instagram-qr.jpeg';

const Services = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    { 
      id: 'logo', 
      icon: Palette, 
      title: language === 'fr' ? 'Création de Logo' : 'Logo Creation', 
      price: language === 'fr' ? 'À partir de 500 DH' : 'Starting from 500 DH', 
      delay: '3-5 jours', 
      desc: t('service_logo_desc'), 
      features: ['Design moderne et professionnel', 'Fichiers vectoriels HD (SVG, AI)', 'Guide de marque inclus', 'Révisions illimitées', 'Livraison rapide'],
      popular: false
    },
    { 
      id: 'web', 
      icon: Laptop, 
      title: language === 'fr' ? 'Interface Web' : 'Web Interface', 
      price: language === 'fr' ? 'À partir de 2000 DH' : 'Starting from 2000 DH', 
      delay: '1-2 semaines', 
      desc: t('service_web_desc'), 
      features: ['Design responsive moderne', 'Code propre et optimisé', 'SEO intégré', 'Performance maximale', 'Support technique'],
      popular: true
    },
    { 
      id: 'database', 
      icon: Database, 
      title: language === 'fr' ? 'Gestion de Bases de Données' : 'Database Management', 
      price: language === 'fr' ? 'À partir de 1500 DH' : 'Starting from 1500 DH', 
      delay: '3-7 jours', 
      desc: t('service_db_desc'), 
      features: ['Architecture robuste', 'Sécurité renforcée', 'Performance optimale', 'Documentation complète', 'Support continu'],
      popular: false
    },
    { 
      id: 'presentation', 
      icon: FileText, 
      title: language === 'fr' ? 'Présentations & Rapports' : 'Presentations & Reports', 
      price: language === 'fr' ? 'À partir de 300 DH' : 'Starting from 300 DH', 
      delay: '24-48h', 
      desc: t('service_reports_desc'), 
      features: ['Design professionnel', 'Graphiques personnalisés', 'Mise en page soignée', 'Formats multiples (PDF, PPT)', 'Révisions incluses'],
      popular: false
    },
    { 
      id: 'mobile', 
      icon: Smartphone, 
      title: language === 'fr' ? 'Design Application Mobile' : 'Mobile App Design', 
      price: language === 'fr' ? 'À partir de 1800 DH' : 'Starting from 1800 DH', 
      delay: '1-2 semaines', 
      desc: t('portfolio_mobile_desc'), 
      features: ['UI/UX moderne', 'Prototypes interactifs (Figma)', 'Design iOS & Android', 'Animations fluides', 'Kit de composants'],
      popular: false
    },
    { 
      id: 'mockup', 
      icon: Image, 
      title: language === 'fr' ? 'Maquettes Produits' : 'Product Mockups', 
      price: language === 'fr' ? 'À partir de 400 DH' : 'Starting from 400 DH', 
      delay: '2-3 jours', 
      desc: t('portfolio_mockup_desc'), 
      features: ['Rendu photoréaliste', 'Plusieurs angles de vue', 'Haute résolution (4K)', 'Formats variés', 'Modifications rapides'],
      popular: false
    },
  ];

  const handleOrderClick = (service: any) => {
    setSelectedService(service);
  };

  const handleGoToContact = () => {
    if (selectedService) {
      navigate(`/?service=${selectedService.id}#contact`);
    }
    setSelectedService(null);
  };

  return (
    <div className="relative z-10">
      <Navbar />
      
      <section className="page-header pt-32">
        <h1 className="gradient-text animate-fadeInUp">{t('services_page_title')}</h1>
        <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>{t('services_page_subtitle')}</p>
      </section>

      <section className="py-16 px-[5%] pb-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div 
              key={i} 
              className={`service-card relative ${service.popular ? 'ring-2 ring-primary' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star size={14} /> Populaire
                </div>
              )}
              <div className="service-icon gradient-text">
                <service.icon size={56} />
              </div>
              <h3 className="text-xl font-semibold mb-2 relative z-10">{service.title}</h3>
              <p className="text-muted-foreground relative z-10 mb-4 min-h-[60px]">{service.desc}</p>
              <div className="gradient-text font-bold text-2xl mb-2 relative z-10">{service.price}</div>
              <p className="text-sm text-muted-foreground mb-6 relative z-10">⏱️ {service.delay}</p>
              <ul className="text-left space-y-3 mb-6 relative z-10">
                {service.features.slice(0, 4).map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Check size={16} className="text-green-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleOrderClick(service)} 
                className="cta-button w-full flex items-center justify-center gap-2 relative z-10"
              >
                {language === 'fr' ? 'Commander' : 'Order Now'} <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Order Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="bg-background border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl">
              {language === 'fr' ? 'Commander' : 'Order'} - {selectedService?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-muted-foreground">
              {language === 'fr' 
                ? 'Pour commander ce service, suivez ces étapes:' 
                : 'To order this service, follow these steps:'}
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 glass-card rounded-xl">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-semibold">{language === 'fr' ? 'Scannez le QR Code' : 'Scan QR Code'}</h4>
                  <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Suivez-nous sur Instagram' : 'Follow us on Instagram'}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 glass-card rounded-xl">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-semibold">{language === 'fr' ? 'Envoyez un DM' : 'Send a DM'}</h4>
                  <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Décrivez votre projet' : 'Describe your project'}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 glass-card rounded-xl">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-semibold">{language === 'fr' ? 'Recevez votre devis' : 'Get your quote'}</h4>
                  <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Nous vous répondons rapidement' : 'We respond quickly'}</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <img src={instagramQr} alt="Instagram QR" className="w-32 h-32 mx-auto rounded-xl mb-2" />
              <p className="text-sm text-muted-foreground">@codemarket_studio</p>
            </div>

            <div className="flex flex-col gap-3">
              <a 
                href="https://www.instagram.com/codemarket_studio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button w-full flex items-center justify-center gap-2"
              >
                {language === 'fr' ? 'Ouvrir Instagram' : 'Open Instagram'} <ArrowRight size={18} />
              </a>
              <button 
                onClick={handleGoToContact}
                className="auth-btn w-full flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                {language === 'fr' ? 'Ou remplir le formulaire' : 'Or fill out the form'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Services;
