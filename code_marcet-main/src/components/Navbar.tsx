import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Globe, Menu, X, LogOut, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, profile, logout, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation for same-page links
  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    
    if (href.startsWith('/#')) {
      const hash = href.substring(1); // Remove leading /
      if (location.pathname === '/') {
        // Already on home page, just scroll
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home page with hash
        navigate(href);
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  const navLinks = [
    { href: '/', label: t('nav_home'), isHash: false },
  
    { href: '/services', label: t('nav_services'), isHash: false },
    { href: '/achievements', label: t('nav_portfolio'), isHash: false },
    { href: '/#contact', label: t('nav_contact'), isHash: true },
    { href: '/#about', label: t('nav_about'), isHash: true },
  ];

  const logo = theme === 'dark' ? logoDark : logoLight;

  const handleLogout = async () => {
    await logout();
  };

  // Get display name and avatar
  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  return (
    <>
      <nav className={`fixed top-0 w-full py-4 px-[5%] z-[1000] transition-all duration-400 backdrop-blur-xl border-b border-border ${scrolled ? 'py-3 bg-background/95 shadow-lg' : 'bg-background/85'}`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <img src={logo} alt="CodeMarket" className="w-10 h-10 object-contain transition-transform group-hover:scale-110" />
            <span className="text-2xl font-extrabold gradient-text animate-glow">CodeMarket</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex gap-10 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.isHash ? (
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`text-muted-foreground font-medium transition-colors hover:text-foreground relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all hover:after:w-full bg-transparent border-none cursor-pointer`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-muted-foreground font-medium transition-colors hover:text-foreground relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all hover:after:w-full ${location.pathname === link.href ? 'text-foreground after:w-full' : ''}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              <button onClick={toggleTheme} className="control-btn" title="Toggle theme">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} className="control-btn" title="Change language">
                <Globe size={18} />
                <span className="absolute -bottom-0.5 -right-0.5 text-[0.65rem] font-bold bg-gradient-to-r from-primary to-accent text-white w-4 h-4 rounded-full flex items-center justify-center">
                  {language.toUpperCase()}
                </span>
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex gap-3 items-center">
              {!loading && isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border">
                    {avatarUrl ? (
                      <img 
                        src={avatarUrl} 
                        alt={displayName}
                        className="w-8 h-8 rounded-full object-cover border-2 border-primary/50"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                    <span className="font-semibold max-w-[120px] truncate">{displayName}</span>
                  </div>
                  <button onClick={handleLogout} className="auth-btn flex items-center gap-2">
                    <LogOut size={16} />
                    {t('logout')}
                  </button>
                </div>
              ) : !loading ? (
                <>
                  <button onClick={() => setAuthModal('signin')} className="auth-btn">
                    {t('sign_in')}
                  </button>
                  <button onClick={() => setAuthModal('signup')} className="auth-btn auth-btn-primary">
                    {t('sign_up')}
                  </button>
                </>
              ) : null}
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-foreground text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border py-6 px-[5%] animate-fade-in">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.isHash ? (
                    <button 
                      onClick={() => handleNavClick(link.href)}
                      className="text-muted-foreground font-medium hover:text-foreground block py-2 w-full text-left bg-transparent border-none cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link 
                      to={link.href} 
                      className="text-muted-foreground font-medium hover:text-foreground block py-2" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-6">
              <button onClick={toggleTheme} className="control-btn">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} className="control-btn">
                <Globe size={18} />
              </button>
            </div>
            {!loading && (
              <div className="flex gap-3 mt-6">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border flex-1">
                      {avatarUrl ? (
                        <img 
                          src={avatarUrl} 
                          alt={displayName}
                          className="w-8 h-8 rounded-full object-cover border-2 border-primary/50"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                      )}
                      <span className="font-semibold truncate">{displayName}</span>
                    </div>
                    <button onClick={handleLogout} className="auth-btn flex items-center gap-2">
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => { setAuthModal('signin'); setMobileMenuOpen(false); }} className="auth-btn flex-1">
                      {t('sign_in')}
                    </button>
                    <button onClick={() => { setAuthModal('signup'); setMobileMenuOpen(false); }} className="auth-btn auth-btn-primary flex-1">
                      {t('sign_up')}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

      <AuthModal isOpen={authModal !== null} onClose={() => setAuthModal(null)} mode={authModal || 'signin'} onSwitchMode={(mode) => setAuthModal(mode)} />
    </>
  );
};

export default Navbar;
