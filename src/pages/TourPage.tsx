import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import VirtualTour from '../components/tours/VirtualTour';

const TourPage = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = `${t('tour.title')} - Hôtel Horizon`;
    window.scrollTo(0, 0);
  }, [t]);
  
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-primary-800 mb-4">
            {t('tour.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('tour.subtitle')}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VirtualTour imageUrl="/pexels-boonkong-boonpeng-442952-1134176.jpg" />
        </motion.div>
      </div>
    </div>
  );
};

export default TourPage;