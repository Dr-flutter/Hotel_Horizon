import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = `${t('common.notFound')} - Hôtel Horizon`;
  }, [t]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-24 px-4">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-primary-800 mb-4">404</h1>
        <h2 className="text-3xl font-serif font-semibold text-gray-700 mb-6">
          {t('common.notFound')}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary-800 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
        >
          <Home size={18} className="mr-2" />
          {t('common.backToHome')}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;