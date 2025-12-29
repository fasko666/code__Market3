import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useScrollTo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const navigateAndScroll = useCallback((path: string, sectionId?: string) => {
    if (path.startsWith('/#')) {
      const section = path.replace('/#', '');
      if (location.pathname === '/') {
        scrollToSection(section);
      } else {
        navigate('/');
        setTimeout(() => scrollToSection(section), 100);
      }
    } else if (sectionId) {
      navigate(path);
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [navigate, location.pathname, scrollToSection]);

  return { scrollToSection, navigateAndScroll };
};
