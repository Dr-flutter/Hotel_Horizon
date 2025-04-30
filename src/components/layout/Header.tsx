import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/authStore';
import { Menu, X, ChevronDown, Globe, Bookmark } from 'lucide-react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen || location.pathname !== '/' 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center"
        >
          <Bookmark 
            className={`mr-2 ${
              isScrolled || isMenuOpen || location.pathname !== '/' 
                ? 'text-primary-800' 
                : 'text-white'
            }`} 
            size={28} 
          />
          <span 
            className={`font-serif text-xl font-semibold ${
              isScrolled || isMenuOpen || location.pathname !== '/' 
                ? 'text-primary-800' 
                : 'text-white'
            }`}
          >
            Hôtel Horizon
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-secondary-600 transition-colors ${
                isScrolled || location.pathname !== '/' 
                  ? 'text-primary-800' 
                  : 'text-white'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/rooms" 
              className={`hover:text-secondary-600 transition-colors ${
                isScrolled || location.pathname !== '/' 
                  ? 'text-primary-800' 
                  : 'text-white'
              }`}
            >
              {t('nav.rooms')}
            </Link>
            <Link 
              to="/tour" 
              className={`hover:text-secondary-600 transition-colors ${
                isScrolled || location.pathname !== '/' 
                  ? 'text-primary-800' 
                  : 'text-white'
              }`}
            >
              {t('nav.tour')}
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-secondary-600 transition-colors ${
                isScrolled || location.pathname !== '/' 
                  ? 'text-primary-800' 
                  : 'text-white'
              }`}
            >
              {t('nav.contact')}
            </Link>
            
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={toggleLangMenu}
                className={`flex items-center hover:text-secondary-600 transition-colors ${
                  isScrolled || location.pathname !== '/' 
                    ? 'text-primary-800' 
                    : 'text-white'
                }`}
              >
                <Globe size={18} className="mr-1" />
                <span className="uppercase">{i18n.language}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-20">
                  <button
                    onClick={() => changeLanguage('fr')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Français
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className={`hover:text-secondary-600 transition-colors ${
                    isScrolled || location.pathname !== '/' 
                      ? 'text-primary-800' 
                      : 'text-white'
                  }`}
                >
                  {t('nav.admin')}
                </Link>
                <button
                  onClick={logout}
                  className={`hover:text-secondary-600 transition-colors ${
                    isScrolled || location.pathname !== '/' 
                      ? 'text-primary-800' 
                      : 'text-white'
                  }`}
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`hover:text-secondary-600 transition-colors ${
                  isScrolled || location.pathname !== '/' 
                    ? 'text-primary-800' 
                    : 'text-white'
                }`}
              >
                {t('nav.login')}
              </Link>
            )}
            <Link
              to="/booking"
              className="ml-4 px-6 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-md transition-colors"
            >
              {t('nav.booking')}
            </Link>
          </div>
        </nav>
        
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden"
        >
          {isMenuOpen ? (
            <X size={24} className={isScrolled || location.pathname !== '/' ? 'text-primary-800' : 'text-white'} />
          ) : (
            <Menu size={24} className={isScrolled || location.pathname !== '/' ? 'text-primary-800' : 'text-white'} />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-primary-800 hover:text-secondary-600 py-2 transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/rooms" className="text-primary-800 hover:text-secondary-600 py-2 transition-colors">
              {t('nav.rooms')}
            </Link>
            <Link to="/tour" className="text-primary-800 hover:text-secondary-600 py-2 transition-colors">
              {t('nav.tour')}
            </Link>
            <Link to="/contact" className="text-primary-800 hover:text-secondary-600 py-2 transition-colors">
              {t('nav.contact')}
            </Link>
            
            {/* Language selector for mobile */}
            <div className="py-2">
              <p className="text-primary-800 mb-2">{t('common.language')}:</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`py-1 px-3 rounded ${i18n.language === 'fr' ? 'bg-primary-800 text-white' : 'bg-gray-200 text-primary-800'}`}
                >
                  FR
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`py-1 px-3 rounded ${i18n.language === 'en' ? 'bg-primary-800 text-white' : 'bg-gray-200 text-primary-800'}`}
                >
                  EN
                </button>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <Link to="/admin" className="block py-2 text-primary-800 hover:text-secondary-600 transition-colors">
                    {t('nav.admin')}
                  </Link>
                  <button
                    onClick={logout}
                    className="block py-2 text-primary-800 hover:text-secondary-600 transition-colors"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <Link to="/login" className="block py-2 text-primary-800 hover:text-secondary-600 transition-colors">
                  {t('nav.login')}
                </Link>
              )}
              <Link
                to="/booking"
                className="block mt-4 text-center py-3 px-4 bg-secondary-600 hover:bg-secondary-700 text-white rounded-md transition-colors"
              >
                {t('nav.booking')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;