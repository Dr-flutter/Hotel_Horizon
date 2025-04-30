import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Map, Mail, Phone, Clock, Send } from 'lucide-react';
import { sendContactEmail } from '../../services/emailService';

type ContactFormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormInputs>();
  
  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsSubmitting(true);
    
    try {
      await sendContactEmail(data);
      toast.success(t('contact.success'));
      reset();
    } catch (error) {
      toast.error(t('common.error'));
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-serif font-semibold text-primary-800 mb-6">
          {t('contact.form.send')}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.name')}
            </label>
            <input
              type="text"
              {...register('name', { required: true })}
              className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{t('common.required')}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.email')}
            </label>
            <input
              type="email"
              {...register('email', { 
                required: true,
                pattern: /^\S+@\S+\.\S+$/
              })}
              className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {errors.email?.type === 'required' && <p className="mt-1 text-sm text-red-500">{t('common.required')}</p>}
            {errors.email?.type === 'pattern' && <p className="mt-1 text-sm text-red-500">{t('common.invalidEmail')}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.subject')}
            </label>
            <input
              type="text"
              {...register('subject', { required: true })}
              className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {errors.subject && <p className="mt-1 text-sm text-red-500">{t('common.required')}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.message')}
            </label>
            <textarea
              rows={5}
              {...register('message', { required: true })}
              className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-500">{t('common.required')}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center px-6 py-3 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary-800 hover:bg-primary-700'
            } text-white font-medium rounded-md transition-colors`}
          >
            {isSubmitting ? (
              <span>Envoi en cours...</span>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                {t('contact.form.send')}
              </>
            )}
          </button>
        </form>
      </div>
      
      <div>
        <h2 className="text-2xl font-serif font-semibold text-primary-800 mb-6">
          {t('contact.info.title')}
        </h2>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <Map className="w-5 h-5 text-secondary-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{t('contact.info.address')}</h3>
              <p className="text-gray-600">
                123 Avenue de l'Horizon<br />
                75001 Yaounde, Cameroun
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone className="w-5 h-5 text-secondary-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{t('contact.info.phone')}</h3>
              <p className="text-gray-600">+33 1 23 45 67 89</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Mail className="w-5 h-5 text-secondary-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{t('contact.info.email')}</h3>
              <p className="text-gray-600">Ibrahimyoussouf@gmail</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-secondary-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{t('contact.info.hours')}</h3>
              <p className="text-gray-600">
                Réception: 24h/24, 7j/7<br />
                Restaurant: 7h00 - 22h30
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden h-64 shadow-md">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1651245812050!5m2!1sfr!2sfr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Hotel location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;