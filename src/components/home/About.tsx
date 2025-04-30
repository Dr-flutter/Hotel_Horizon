import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-800 mb-6">
              {t('home.about.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              {t('home.about.description')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              Établi en 2020, notre hôtel est rapidement devenu une référence en matière d'hébergement de luxe. Notre équipe dévouée s'engage à rendre votre séjour exceptionnel, en vous offrant un service attentionné et personnalisé.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" alt="Staff" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="Staff" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="Staff" />
              </div>
              <span className="text-sm text-gray-600">Notre équipe passionnée à votre service</span>
            </div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <img 
                src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg" 
                alt="Hotel exterior" 
                className="rounded-lg h-48 w-full object-cover"
              />
              <img 
                src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg" 
                alt="Hotel swimming pool" 
                className="rounded-lg h-64 w-full object-cover"
              />
            </div>
            <div className="space-y-4 mt-6">
              <img 
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg" 
                alt="Hotel suite" 
                className="rounded-lg h-64 w-full object-cover"
              />
              <img 
                src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg" 
                alt="Hotel restaurant" 
                className="rounded-lg h-48 w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;