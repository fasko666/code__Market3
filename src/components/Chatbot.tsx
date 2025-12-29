import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface ChatMessage {
  text: string;
  type: 'bot' | 'user';
  time: string;
  links?: { label: string; href: string; external?: boolean }[];
}

const Chatbot = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([{ 
        text: t('chatbot_welcome'), 
        type: 'bot', 
        time: now,
        links: [
          { label: language === 'fr' ? 'Voir nos services' : 'View our services', href: '/services' },
          { label: language === 'fr' ? 'Nos réalisations' : 'Our achievements', href: '/achievements' },
        ]
      }]);
    }
  }, [isOpen, t, language]);

  const getSmartResponse = (userMsg: string): { text: string; links?: ChatMessage['links'] } => {
    const msg = userMsg.toLowerCase();
    const isFr = language === 'fr';
    
    // Detect language from message
    const isArabic = /[\u0600-\u06FF]/.test(userMsg);
    const isFrench = /^(salut|bonjour|bonsoir|coucou|merci|comment|quoi|qui|pourquoi|aide|prix|tarif|ça|où|oui|non)/.test(msg) || msg.includes('é') || msg.includes('è') || msg.includes('ê');

    // Arabic Greetings
    if (isArabic && (msg.includes('سلام') || msg.includes('مرحبا') || msg.includes('اهلا'))) {
      return {
        text: `مرحبا! 👋 أهلا بك في CodeMarket.\n\nكيف يمكنني مساعدتك اليوم؟\n\n🛠️ خدماتنا:\n• تصميم الشعارات\n• تطوير المواقع\n• قواعد البيانات\n• العروض التقديمية\n• تقارير التدريب`,
        links: [
          { label: 'خدماتنا', href: '/services' },
          { label: 'اتصل بنا', href: '/#contact' },
        ]
      };
    }

    // Arabic Services
    if (isArabic && (msg.includes('خدم') || msg.includes('سعر') || msg.includes('ثمن') || msg.includes('كم'))) {
      return {
        text: `💰 **أسعارنا:**\n\n• الشعارات: 500 - 1500 درهم\n• المواقع الإلكترونية: 2000 - 10000 درهم\n• قواعد البيانات: 1500 - 5000 درهم\n• العروض التقديمية: 300 - 800 درهم\n• التطبيقات: 3000+ درهم\n\nتواصل معنا للحصول على عرض أسعار مخصص!`,
        links: [
          { label: 'طلب عرض سعر', href: '/#contact' },
          { label: 'خدماتنا', href: '/services' },
        ]
      };
    }

    // Arabic Contact
    if (isArabic && (msg.includes('اتصال') || msg.includes('تواصل') || msg.includes('هاتف'))) {
      return {
        text: `📞 **تواصل معنا:**\n\n📧 البريد: codemarket@gmail.com\n📱 الهاتف: 0778112836\n📸 انستغرام: @codemarket_studio\n\n⏰ أوقات العمل: الإثنين-الجمعة 9ص-1م`,
        links: [
          { label: 'نموذج الاتصال', href: '/#contact' },
          { label: 'Instagram', href: 'https://www.instagram.com/codemarket_studio', external: true },
        ]
      };
    }

    // Arabic Default
    if (isArabic) {
      return {
        text: `شكرا لرسالتك! 😊\n\nيمكنني مساعدتك في:\n• **خدماتنا** والأسعار\n• كيفية **الاتصال** بنا\n• **إنجازاتنا**\n\nما الذي تريد معرفته؟`,
        links: [
          { label: 'خدماتنا', href: '/services' },
          { label: 'اتصل بنا', href: '/#contact' },
        ]
      };
    }

    // Greetings (English & French)
    if (msg.match(/^(hi|hello|hey|salut|bonjour|bonsoir|coucou)/)) {
      return {
        text: isFr 
          ? "Bonjour ! 👋 Bienvenue chez CodeMarket. Comment puis-je vous aider aujourd'hui ?" 
          : "Hello! 👋 Welcome to CodeMarket. How can I help you today?",
        links: [
          { label: isFr ? 'Nos services' : 'Our services', href: '/services' },
          { label: isFr ? 'Nous contacter' : 'Contact us', href: '/#contact' },
        ]
      };
    }

    // Services
    if (msg.includes('service') || msg.includes('خدم')) {
      return {
        text: isFr
          ? `🛠️ **Nos Services:**\n\n• **Logo** - À partir de 500 DH\n• **Site Web** - À partir de 2000 DH\n• **Base de données** - À partir de 1500 DH\n• **Présentations** - À partir de 300 DH\n• **Rapports de stage** - À partir de 400 DH\n• **Applications mobiles** - À partir de 3000 DH`
          : `🛠️ **Our Services:**\n\n• **Logo** - Starting from 500 DH\n• **Website** - Starting from 2000 DH\n• **Database** - Starting from 1500 DH\n• **Presentations** - Starting from 300 DH\n• **Internship Reports** - Starting from 400 DH\n• **Mobile Apps** - Starting from 3000 DH`,
        links: [
          { label: isFr ? 'Voir tous les services' : 'View all services', href: '/services' },
          { label: isFr ? 'Commander maintenant' : 'Order now', href: '/#contact' },
        ]
      };
    }

    // Pricing
    if (msg.includes('prix') || msg.includes('price') || msg.includes('tarif') || msg.includes('cout') || msg.includes('ثمن') || msg.includes('combien') || msg.includes('dh') || msg.includes('dirham')) {
      return {
        text: isFr
          ? `💰 **Nos Tarifs:**\n\n• Présentations: 300 - 800 DH\n• Logos: 500 - 1500 DH\n• Sites Web: 2000 - 10000+ DH\n• Bases de données: 1500 - 5000 DH\n• Applications: 3000+ DH\n\nContactez-nous pour un devis personnalisé !`
          : `💰 **Our Pricing:**\n\n• Presentations: 300 - 800 DH\n• Logos: 500 - 1500 DH\n• Websites: 2000 - 10000+ DH\n• Databases: 1500 - 5000 DH\n• Apps: 3000+ DH\n\nContact us for a custom quote!`,
        links: [
          { label: isFr ? 'Demander un devis' : 'Get a quote', href: '/#contact' },
          { label: isFr ? 'Voir les services' : 'View services', href: '/services' },
        ]
      };
    }

    // Contact
    if (msg.includes('contact') || msg.includes('email') || msg.includes('téléphone') || msg.includes('phone') || msg.includes('اتصال')) {
      return {
        text: isFr
          ? `📞 **Contactez-nous:**\n\n📧 Email: codemarket@gmail.com\n📧 Support: supportcodemarket@gmail.com\n📱 Tél: 0778112836\n📸 Instagram: @codemarket_studio\n\n⏰ Horaires: Lun-Ven 9h-13h`
          : `📞 **Contact Us:**\n\n📧 Email: codemarket@gmail.com\n📧 Support: supportcodemarket@gmail.com\n📱 Phone: 0778112836\n📸 Instagram: @codemarket_studio\n\n⏰ Hours: Mon-Fri 9am-1pm`,
        links: [
          { label: isFr ? 'Formulaire de contact' : 'Contact form', href: '/#contact' },
          { label: 'Instagram', href: 'https://www.instagram.com/codemarket_studio', external: true },
        ]
      };
    }

    // About/Who
    if (msg.includes('about') || msg.includes('propos') || msg.includes('qui') || msg.includes('who') || msg.includes('codemarket')) {
      return {
        text: isFr
          ? `🎯 **À propos de CodeMarket:**\n\nCodeMarket est un studio numérique spécialisé dans la création de contenus modernes et professionnels.\n\n✨ Innovation • Créativité • Professionnalisme\n\nNous transformons vos idées en projets visuels de haute qualité !`
          : `🎯 **About CodeMarket:**\n\nCodeMarket is a digital studio specialized in creating modern and professional content.\n\n✨ Innovation • Creativity • Professionalism\n\nWe transform your ideas into high-quality visual projects!`,
        links: [
          { label: isFr ? 'En savoir plus' : 'Learn more', href: '/#about' },
          { label: isFr ? 'Nos réalisations' : 'Our achievements', href: '/achievements' },
        ]
      };
    }

    // Portfolio/Achievements
    if (msg.includes('portfolio') || msg.includes('réalisation') || msg.includes('achievement') || msg.includes('projet') || msg.includes('project')) {
      return {
        text: isFr
          ? `🎨 **Nos Réalisations:**\n\n• Logos d'entreprises\n• Sites web modernes\n• Applications mobiles\n• Présentations professionnelles\n• Maquettes de produits\n• CV interactifs`
          : `🎨 **Our Achievements:**\n\n• Company logos\n• Modern websites\n• Mobile applications\n• Professional presentations\n• Product mockups\n• Interactive CVs`,
        links: [
          { label: isFr ? 'Voir nos réalisations' : 'View our achievements', href: '/achievements' },
          { label: isFr ? 'Commander un projet' : 'Order a project', href: '/#contact' },
        ]
      };
    }

    // Logo
    if (msg.includes('logo')) {
      return {
        text: isFr
          ? `🎨 **Création de Logo:**\n\n• Logo simple: 500 DH\n• Logo + variations: 800 DH\n• Pack complet branding: 1500 DH\n\n📅 Délai: 2-5 jours\n\nInclus: Fichiers PNG, SVG, PDF`
          : `🎨 **Logo Creation:**\n\n• Simple logo: 500 DH\n• Logo + variations: 800 DH\n• Full branding pack: 1500 DH\n\n📅 Delivery: 2-5 days\n\nIncludes: PNG, SVG, PDF files`,
        links: [
          { label: isFr ? 'Commander un logo' : 'Order a logo', href: '/#contact' },
        ]
      };
    }

    // Website/Web
    if (msg.includes('site') || msg.includes('web') || msg.includes('website')) {
      return {
        text: isFr
          ? `💻 **Développement Web:**\n\n• Landing page: 2000 DH\n• Site vitrine: 4000 DH\n• Site e-commerce: 8000 DH+\n• Application web: 10000 DH+\n\n📅 Délai: 5-15 jours\n\n✅ Responsive • SEO • Hébergement conseillé`
          : `💻 **Web Development:**\n\n• Landing page: 2000 DH\n• Business site: 4000 DH\n• E-commerce: 8000 DH+\n• Web app: 10000 DH+\n\n📅 Delivery: 5-15 days\n\n✅ Responsive • SEO • Hosting advice`,
        links: [
          { label: isFr ? 'Commander un site' : 'Order a website', href: '/#contact' },
          { label: isFr ? 'Voir nos sites' : 'View our websites', href: '/achievements' },
        ]
      };
    }

    // Presentation
    if (msg.includes('présentation') || msg.includes('presentation') || msg.includes('powerpoint') || msg.includes('ppt')) {
      return {
        text: isFr
          ? `📊 **Présentations Professionnelles:**\n\n• Présentation simple (10 slides): 300 DH\n• Présentation complète (20+ slides): 500 DH\n• Présentation premium: 800 DH\n\n📅 Délai: 1-3 jours\n\n✅ PowerPoint • PDF • Design moderne`
          : `📊 **Professional Presentations:**\n\n• Simple presentation (10 slides): 300 DH\n• Complete presentation (20+ slides): 500 DH\n• Premium presentation: 800 DH\n\n📅 Delivery: 1-3 days\n\n✅ PowerPoint • PDF • Modern design`,
        links: [
          { label: isFr ? 'Commander une présentation' : 'Order a presentation', href: '/#contact' },
        ]
      };
    }

    // Report/Stage
    if (msg.includes('rapport') || msg.includes('report') || msg.includes('stage') || msg.includes('internship')) {
      return {
        text: isFr
          ? `📄 **Rapports de Stage:**\n\n• Mise en forme basique: 400 DH\n• Mise en forme complète: 700 DH\n• Rédaction assistée: sur devis\n\n📅 Délai: 2-5 jours\n\n✅ Word • PDF • Normes académiques`
          : `📄 **Internship Reports:**\n\n• Basic formatting: 400 DH\n• Complete formatting: 700 DH\n• Assisted writing: on quote\n\n📅 Delivery: 2-5 days\n\n✅ Word • PDF • Academic standards`,
        links: [
          { label: isFr ? 'Commander un rapport' : 'Order a report', href: '/#contact' },
        ]
      };
    }

    // Database
    if (msg.includes('base') || msg.includes('database') || msg.includes('données') || msg.includes('data')) {
      return {
        text: isFr
          ? `🗄️ **Bases de Données:**\n\n• Conception BD simple: 1500 DH\n• BD complexe: 3000 DH+\n• Migration/Optimisation: 2000 DH+\n\n📅 Délai: 5-10 jours\n\n✅ MySQL • PostgreSQL • MongoDB`
          : `🗄️ **Database Management:**\n\n• Simple DB design: 1500 DH\n• Complex DB: 3000 DH+\n• Migration/Optimization: 2000 DH+\n\n📅 Delivery: 5-10 days\n\n✅ MySQL • PostgreSQL • MongoDB`,
        links: [
          { label: isFr ? 'Commander une base de données' : 'Order a database', href: '/#contact' },
        ]
      };
    }

    // Mobile
    if (msg.includes('mobile') || msg.includes('app') || msg.includes('android') || msg.includes('ios')) {
      return {
        text: isFr
          ? `📱 **Applications Mobiles:**\n\n• Design UI/UX: 1500 DH\n• App simple: 3000 DH\n• App complète: 6000 DH+\n\n📅 Délai: 10-30 jours\n\n✅ iOS • Android • React Native`
          : `📱 **Mobile Applications:**\n\n• UI/UX Design: 1500 DH\n• Simple app: 3000 DH\n• Complete app: 6000 DH+\n\n📅 Delivery: 10-30 days\n\n✅ iOS • Android • React Native`,
        links: [
          { label: isFr ? 'Commander une app' : 'Order an app', href: '/#contact' },
        ]
      };
    }

    // Thank you
    if (msg.includes('merci') || msg.includes('thank')) {
      return {
        text: isFr
          ? "Je vous en prie ! 🙏 N'hésitez pas si vous avez d'autres questions. Bonne journée ! ✨"
          : "You're welcome! 🙏 Feel free to ask if you have more questions. Have a great day! ✨"
      };
    }

    // Bye
    if (msg.includes('bye') || msg.includes('au revoir') || msg.includes('à bientôt')) {
      return {
        text: isFr
          ? "Au revoir ! 👋 À bientôt chez CodeMarket ! ✨"
          : "Goodbye! 👋 See you soon at CodeMarket! ✨"
      };
    }

    // Help
    if (msg.includes('aide') || msg.includes('help')) {
      return {
        text: isFr
          ? `🤖 **Comment puis-je vous aider ?**\n\nVous pouvez me demander:\n• Nos services et tarifs\n• Comment nous contacter\n• Nos réalisations\n• Informations sur les logos, sites web, présentations...\n\nTapez votre question !`
          : `🤖 **How can I help you?**\n\nYou can ask me about:\n• Our services and pricing\n• How to contact us\n• Our achievements\n• Info about logos, websites, presentations...\n\nType your question!`,
        links: [
          { label: isFr ? 'Voir les services' : 'View services', href: '/services' },
          { label: isFr ? 'Nous contacter' : 'Contact us', href: '/#contact' },
        ]
      };
    }

    // Instagram
    if (msg.includes('instagram') || msg.includes('insta') || msg.includes('social')) {
      return {
        text: isFr
          ? `📸 **Suivez-nous sur Instagram:**\n\n@codemarket_studio\n\nVous pouvez scanner notre QR code dans la section contact ou nous envoyer un DM directement !`
          : `📸 **Follow us on Instagram:**\n\n@codemarket_studio\n\nYou can scan our QR code in the contact section or send us a DM directly!`,
        links: [
          { label: 'Instagram', href: 'https://www.instagram.com/codemarket_studio', external: true },
          { label: isFr ? 'Section contact' : 'Contact section', href: '/#contact' },
        ]
      };
    }

    // Délai/Delivery
    if (msg.includes('délai') || msg.includes('delivery') || msg.includes('time') || msg.includes('combien de temps') || msg.includes('quand')) {
      return {
        text: isFr
          ? `⏰ **Délais de Livraison:**\n\n• Présentations: 1-3 jours\n• Logos: 2-5 jours\n• Sites web: 5-15 jours\n• Rapports: 2-5 jours\n• Apps: 10-30 jours\n\nLes délais peuvent varier selon la complexité.`
          : `⏰ **Delivery Times:**\n\n• Presentations: 1-3 days\n• Logos: 2-5 days\n• Websites: 5-15 days\n• Reports: 2-5 days\n• Apps: 10-30 days\n\nTimes may vary based on complexity.`,
        links: [
          { label: isFr ? 'Commander maintenant' : 'Order now', href: '/#contact' },
        ]
      };
    }

    // Payment
    if (msg.includes('paiement') || msg.includes('payment') || msg.includes('payer') || msg.includes('pay')) {
      return {
        text: isFr
          ? `💳 **Modes de Paiement:**\n\n• Virement bancaire\n• PayPal\n• Western Union\n• Cash (local)\n\n50% à la commande, 50% à la livraison pour les gros projets.`
          : `💳 **Payment Methods:**\n\n• Bank transfer\n• PayPal\n• Western Union\n• Cash (local)\n\n50% upfront, 50% on delivery for large projects.`,
        links: [
          { label: isFr ? 'Nous contacter' : 'Contact us', href: '/#contact' },
        ]
      };
    }

    // Default response
    return {
      text: isFr
        ? `Merci pour votre message ! 😊\n\nJe peux vous aider avec:\n• Nos **services** et tarifs\n• Comment nous **contacter**\n• Nos **réalisations**\n\nQue souhaitez-vous savoir ?`
        : `Thanks for your message! 😊\n\nI can help you with:\n• Our **services** and pricing\n• How to **contact** us\n• Our **achievements**\n\nWhat would you like to know?`,
      links: [
        { label: isFr ? 'Voir les services' : 'View services', href: '/services' },
        { label: isFr ? 'Nous contacter' : 'Contact us', href: '/#contact' },
        { label: isFr ? 'Nos réalisations' : 'Our achievements', href: '/achievements' },
      ]
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { text: input, type: 'user', time: now }]);
    const userMsg = input;
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getSmartResponse(userMsg);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: response.text, 
        type: 'bot', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        links: response.links
      }]);
    }, 800 + Math.random() * 500);
  };

  return (
    <div className="chatbot-container">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="chatbot-button group"
        aria-label="Toggle chatbot"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'active' : ''}`}>
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary to-accent flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Assistant CodeMarket</h3>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {t('chatbot_online')}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[300px] space-y-4 bg-background/95">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.type} animate-fade-in`}>
              <div className="message-avatar">
                {msg.type === 'bot' ? '🤖' : '👤'}
              </div>
              <div className="flex-1">
                <div className="message-bubble whitespace-pre-line">{msg.text}</div>
                {/* Quick Links */}
                {msg.links && msg.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.links.map((link, j) => (
                      link.external ? (
                        <a
                          key={j}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {link.label}
                          <ExternalLink size={10} />
                        </a>
                      ) : (
                        <Link
                          key={j}
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {link.label}
                        </Link>
                      )
                    ))}
                  </div>
                )}
                <div className="message-time">{msg.time}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot animate-fade-in">
              <div className="message-avatar">🤖</div>
              <div className="message-bubble flex gap-1">
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-card border-t border-border flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('chatbot_placeholder')}
            className="flex-1 px-4 py-3 bg-background border border-border rounded-full text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim()}
            className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
