import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../store/authStore';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      await login(data.email, data.password);
      toast.success('Connexion réussie');
      navigate('/admin');
    } catch (error) {
      setLoginError(t('auth.loginError'));
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-serif font-semibold text-primary-800 mb-6 text-center">
          {t('auth.login')}
        </h2>
        
        {loginError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {loginError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.email')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-gray-400" />
              </div>
              <input
                type="email"
                {...register('email', { 
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/
                })}
                className={`w-full pl-10 px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
            </div>
            {errors.email?.type === 'required' && <p className="mt-1 text-sm text-red-500">{t('common.required')}</p>}
            {errors.email?.type === 'pattern' && <p className="mt-1 text-sm text-red-500">{t('common.invalidEmail')}</p>}
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                {t('auth.password')}
              </label>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-500">
                {t('auth.forgotPassword')}
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <input
                type="password"
                {...register('password', { required: true })}
                className={`w-full pl-10 px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{t('common.required')}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center px-4 py-2 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary-800 hover:bg-primary-700'
            } text-white font-medium rounded-md transition-colors`}
          >
            {isSubmitting ? 'Connexion...' : t('auth.loginButton')}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Utilisez les identifiants suivants pour la démo:</p>
          <p className="font-mono mt-1">
          Email: admin**********zon.com
            {/* Email: admin@hotel-horizon.fr */}
            </p>
          <p className="font-mono">Mot de passe: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;