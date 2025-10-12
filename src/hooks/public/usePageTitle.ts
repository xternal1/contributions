import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = (customTitle?: string) => {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = 'GetSkill.id';

    const pathTitles: Record<string, string> = {
      '/': 'GetSkill.id - Get Your Skill',
      '/course': 'Kursus',
      '/event': 'Event',
      '/kelas-industri': 'Kelas Industri',
      '/berita': 'Berita',
      '/faq': 'FAQ',
      '/login': 'Login',
      '/register': 'Register',
      '/password/email': 'Forgot Password',
      '/update-password/email': 'Update Password',
    };


    const dynamicRoutes: { pattern: RegExp; title: string }[] = [
      { pattern: /^\/course\/[^/]+$/, title: 'Detail Kursus' },
      { pattern: /^\/event\/[^/]+$/, title: 'Detail Event' },
      { pattern: /^\/berita\/[^/]+$/, title: 'Detail Berita' },
    ];

    const currentPath = location.pathname.toLowerCase();
    const routeTitle = pathTitles[currentPath];

    if (customTitle) {
      document.title = `${customTitle} - ${baseTitle}`;
    } else if (routeTitle) {
      if (currentPath === '/') {
        document.title = routeTitle;
      } else {
        document.title = `${routeTitle} - ${baseTitle}`;
      }
    } else {
      const dynamicMatch = dynamicRoutes.find((route) =>
        route.pattern.test(currentPath)
      );
      if (dynamicMatch) {
        document.title = `${dynamicMatch.title} - ${baseTitle}`;
      } else {
        document.title = baseTitle;
      }
    }
  }, [location, customTitle]);
};

export default usePageTitle;
