import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    document.title = `${t('auth.login')} - Hôtel Horizon`;
    window.scrollTo(0, 0);
    
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate, t]);
  
  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-primary-800 mb-4">
            {t('auth.login')}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;