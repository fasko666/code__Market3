import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';

const Footer = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const logo = theme === 'dark' ? logoDark : logoLight;

  return (
    <footer className="bg-gradient-to-b from-background/50 to-background/90 py-16 px-[5%] border-t border-border relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-6">
            <img src={logo} alt="CodeMarket" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold gradient-text">CodeMarket</span>
          </Link>
          <p className="text-muted-foreground leading-relaxed mb-6">{t('footer_brand_desc')}</p>
          <div className="flex gap-3">
            <a href="#" className="social-link" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://www.instagram.com/codemarket_studio" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" className="social-link" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-bold gradient-text mb-6">{t('footer_services_title')}</h3>
          <ul className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i}>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-all hover:translate-x-1 inline-block">
                  {t(`footer_service_${i}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-bold gradient-text mb-6">{t('footer_company_title')}</h3>
          <ul className="space-y-3">
            <li><Link to="/achievements" className="text-muted-foreground hover:text-foreground transition-all hover:translate-x-1 inline-block">{t('footer_link_portfolio')}</Link></li>
            <li><Link to="/#contact" className="text-muted-foreground hover:text-foreground transition-all hover:translate-x-1 inline-block">{t('footer_link_contact')}</Link></li>
            <li><Link to="/#about" className="text-muted-foreground hover:text-foreground transition-all hover:translate-x-1 inline-block">{t('footer_link_about')}</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-all hover:translate-x-1 inline-block">{t('nav_services')}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold gradient-text mb-6">{t('nav_contact')}</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-primary shrink-0 mt-0.5" />
              <div className="text-muted-foreground">
                <p>codemarket@gmail.com</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-primary shrink-0 mt-0.5" />
              <div className="text-muted-foreground">
                <p>0 778112836</p>
                <p className="text-sm">{t('contact_phone_hours')}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Instagram size={18} className="text-primary shrink-0 mt-0.5" />
              <a href="https://www.instagram.com/codemarket_studio" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                @codemarket_studio
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-sm">{t('footer_copyright')}</p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
