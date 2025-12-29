import { useState, useEffect, useRef } from 'react';
import { Palette, Laptop, Database, FileText, Smartphone, Image, CreditCard, ShoppingCart, Calendar, Check, Eye, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

const Achievements = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const achievements = [
    { 
      id: 'logo', 
      icon: Palette, 
      category: 'branding', 
      title: t('portfolio_logo_title'), 
      desc: t('portfolio_logo_desc'), 
      date: language === 'fr' ? 'Décembre 2024' : 'December 2024', 
      details: ['Design moderne et professionnel', 'Fichiers vectoriels HD', 'Guide de marque inclus', 'Révisions illimitées'],
      color: 'from-violet-500 to-purple-600',
      client: 'Startup Tech'
    },
    { 
      id: 'web', 
      icon: Laptop, 
      category: 'web', 
      title: t('portfolio_web_title'), 
      desc: t('portfolio_web_desc'), 
      date: language === 'fr' ? 'Novembre 2024' : 'November 2024', 
      details: ['Design responsive moderne', 'Code propre et optimisé', 'SEO intégré', 'Performance maximale'],
      color: 'from-blue-500 to-cyan-500',
      client: 'E-commerce'
    },
    { 
      id: 'database', 
      icon: Database, 
      category: 'database', 
      title: t('portfolio_db_title'), 
      desc: t('portfolio_db_desc'), 
      date: language === 'fr' ? 'Octobre 2024' : 'October 2024', 
      details: ['Architecture robuste', 'Sécurité renforcée', 'Performance optimale', 'Documentation complète'],
      color: 'from-pink-500 to-rose-500',
      client: 'Entreprise'
    },
    { 
      id: 'presentation', 
      icon: FileText, 
      category: 'presentation', 
      title: t('portfolio_reports_title'), 
      desc: t('portfolio_reports_desc'), 
      date: language === 'fr' ? 'Septembre 2024' : 'September 2024', 
      details: ['Design professionnel', 'Graphiques personnalisés', 'Mise en page soignée', 'Formats multiples (PDF, PPT)'],
      color: 'from-amber-500 to-orange-500',
      client: 'Étudiant Master'
    },
    { 
      id: 'mobile', 
      icon: Smartphone, 
      category: 'mobile', 
      title: t('portfolio_mobile_title'), 
      desc: t('portfolio_mobile_desc'), 
      date: language === 'fr' ? 'Août 2024' : 'August 2024', 
      details: ['UI/UX moderne', 'Prototypes interactifs', 'Design iOS & Android', 'Animation fluide'],
      color: 'from-emerald-500 to-green-500',
      client: 'Startup Mobile'
    },
    { 
      id: 'mockup', 
      icon: Image, 
      category: 'mockup', 
      title: t('portfolio_mockup_title'), 
      desc: t('portfolio_mockup_desc'), 
      date: language === 'fr' ? 'Juillet 2024' : 'July 2024', 
      details: ['Rendu photoréaliste', 'Plusieurs angles de vue', 'Haute résolution', 'Formats variés'],
      color: 'from-purple-500 to-violet-600',
      client: 'Agence Marketing'
    },
    { 
      id: 'cv', 
      icon: CreditCard, 
      category: 'web', 
      title: t('portfolio_cv_title'), 
      desc: t('portfolio_cv_desc'), 
      date: language === 'fr' ? 'Juin 2024' : 'June 2024', 
      details: ['Design unique et moderne', 'Responsive mobile/desktop', 'Hébergement inclus', 'Facile à mettre à jour'],
      color: 'from-blue-500 to-indigo-600',
      client: 'Freelancer'
    },
    { 
      id: 'ecommerce', 
      icon: ShoppingCart, 
      category: 'web', 
      title: language === 'fr' ? 'Site E-commerce' : 'E-commerce Website', 
      desc: language === 'fr' ? 'Boutique en ligne complète avec système de paiement intégré.' : 'Complete online store with integrated payment system.', 
      date: language === 'fr' ? 'Mai 2024' : 'May 2024', 
      details: ['Système de paiement sécurisé', 'Gestion de stock', 'Dashboard admin', 'Multi-langues'],
      color: 'from-red-500 to-rose-600',
      client: 'Boutique Mode'
    },
  ];

  const filters = [
    { id: 'all', label: t('filter_all') },
    { id: 'branding', label: t('filter_branding') },
    { id: 'web', label: t('filter_web') },
    { id: 'database', label: t('filter_database') },
    { id: 'presentation', label: t('filter_presentation') },
    { id: 'mobile', label: t('filter_mobile') },
    { id: 'mockup', label: t('filter_mockup') },
  ];

  const filteredAchievements = filter === 'all' ? achievements : achievements.filter(a => a.category === filter);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredAchievements]);

  return (
    <div className="relative z-10">
      <Navbar />

      <section className="page-header pt-32">
        <h1 className="gradient-text animate-fadeInUp">{t('achievements_page_title')}</h1>
        <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>{t('achievements_page_subtitle')}</p>
      </section>

      {/* Filters */}
      <div className="max-w-[1400px] mx-auto px-[5%] mb-12 flex justify-center gap-3 flex-wrap">
        {filters.map((f) => (
          <button 
            key={f.id} 
            onClick={() => setFilter(f.id)} 
            className={`filter-btn ${filter === f.id ? 'active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="max-w-[1400px] mx-auto px-[5%] mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '50+', label: language === 'fr' ? 'Projets Réalisés' : 'Completed Projects' },
            { value: '40+', label: language === 'fr' ? 'Clients Satisfaits' : 'Happy Clients' },
            { value: '2+', label: language === 'fr' ? 'Années d\'Expérience' : 'Years Experience' },
            { value: '5/5', label: language === 'fr' ? 'Note Moyenne' : 'Average Rating' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <section className="py-8 px-[5%] pb-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((item, i) => (
            <div 
              key={item.id} 
              ref={(el) => (cardsRef.current[i] = el)}
              className={`achievement-card cursor-pointer transition-all duration-500 ${visibleCards.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setSelectedProject(item)}
            >
              <div className={`h-56 flex items-center justify-center bg-gradient-to-br ${item.color} relative overflow-hidden group`}>
                <item.icon size={64} className="text-white/80 transition-transform duration-500 group-hover:scale-125" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white flex items-center gap-2"><Eye size={20} /> {language === 'fr' ? 'Voir détails' : 'View details'}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar size={14} />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.details.slice(0, 2).map((d, j) => (
                    <span key={j} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-[5%] bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{language === 'fr' ? 'Prêt à Démarrer Votre Projet ?' : 'Ready to Start Your Project?'}</h2>
          <p className="text-muted-foreground mb-8">{language === 'fr' ? 'Contactez-nous dès aujourd\'hui pour discuter de vos besoins' : 'Contact us today to discuss your needs'}</p>
          <Link to="/#contact" className="cta-button inline-flex items-center gap-2">
            {language === 'fr' ? 'Nous Contacter' : 'Contact Us'} <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-background border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="gradient-text text-2xl flex items-center gap-3">
              {selectedProject && <selectedProject.icon size={28} />}
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className={`h-40 rounded-xl bg-gradient-to-br ${selectedProject?.color} flex items-center justify-center`}>
              {selectedProject && <selectedProject.icon size={64} className="text-white/80" />}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar size={14} /> {selectedProject?.date}</span>
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">{selectedProject?.client}</span>
            </div>

            <p className="text-muted-foreground">{selectedProject?.desc}</p>

            <div>
              <h4 className="font-semibold mb-3">{language === 'fr' ? 'Caractéristiques' : 'Features'}</h4>
              <ul className="space-y-2">
                {selectedProject?.details.map((d: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <Check size={16} className="text-green-500" /> {d}
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              to={`/services`} 
              className="cta-button w-full flex items-center justify-center gap-2"
            >
              {language === 'fr' ? 'Commander un projet similaire' : 'Order similar project'} <ArrowRight size={18} />
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Achievements;
