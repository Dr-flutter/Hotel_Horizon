import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Bookmark } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_0to0bj7", // Remplacez par votre SERVICE_ID
        "template_havcfca", // Remplacez par votre TEMPLATE_ID
        {
          message: email, // Remplacez par le champ attendu par votre template EmailJS
        },
        "et07V2zZ-j7z8Vpk-" // Remplacez par votre PUBLIC_KEY
      );

      toast.success(t('newsletter.success'));
      setEmail(''); // Réinitialise le champ email
    } catch (error) {
      toast.error(t('common.error'));
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Bookmark className="mr-2 text-secondary-600" size={24} />
              <span className="font-serif text-xl font-semibold">Hôtel Horizon</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-600 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary-600 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-300 hover:text-secondary-600 transition-colors">
                  {t('nav.rooms')}
                </Link>
              </li>
              <li>
                <Link to="/tour" className="text-gray-300 hover:text-secondary-600 transition-colors">
                  {t('nav.tour')}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-secondary-600 transition-colors">
                  {t('nav.booking')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-secondary-600 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-secondary-600 flex-shrink-0" />
                <span className="text-gray-300">{t('footer.address')}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-secondary-600 flex-shrink-0" />
                <span className="text-gray-300">{t('footer.phone')}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-secondary-600 flex-shrink-0" />
                <span className="text-gray-300">{t('footer.email')}</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Inscrivez-vous à notre newsletter pour recevoir nos offres spéciales.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 bg-primary-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-600 placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-secondary-600 hover:bg-secondary-700'
                } text-white rounded-md transition-colors`}
              >
                {isSubmitting ? 'Envoi en cours...' : "S'inscrire"}
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-primary-700 text-center text-gray-400 text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;