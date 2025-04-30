import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative h-screen bg-hero-pattern bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('home.hero.title')}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('home.hero.subtitle')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/booking" 
              className="inline-flex items-center px-8 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-md transition-colors"
            >
              {t('home.hero.cta')}
              <ChevronRight size={18} className="ml-2" />
            </Link>
            
            <Link 
              to="/tour" 
              className="inline-flex items-center px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white font-medium rounded-md transition-colors"
            >
              {t('home.hero.tourCta')}
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-1 h-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-white h-1/2 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;