import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Utensils, Space as Spa, CookingPot as SwimmingPool, Wifi, Car, User } from 'lucide-react';

const serviceItems = [
  {
    icon: <Utensils size={36} />,
    key: 'restaurant',
    description: 'Savourez une cuisine raffinée avec des ingrédients locaux et de saison.'
  },
  {
    icon: <Spa size={36} />,
    key: 'spa',
    description: 'Détendez-vous dans notre spa luxueux offrant une gamme complète de soins.'
  },
  {
    icon: <SwimmingPool size={36} />,
    key: 'pool',
    description: 'Profitez de notre piscine à débordement avec vue imprenable sur la ville.'
  },
  {
    icon: <Wifi size={36} />,
    key: 'wifi',
    description: 'Restez connecté avec notre Wi-Fi haute vitesse disponible dans tout l\'hôtel.'
  },
  {
    icon: <Car size={36} />,
    key: 'parking',
    description: 'Notre parking sécurisé est disponible gratuitement pour tous nos clients.'
  },
  {
    icon: <User size={36} />,
    key: 'concierge',
    description: 'Notre service de conciergerie est à votre disposition 24h/24 pour répondre à toutes vos demandes.'
  }
];

const Services = () => {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-semibold text-primary-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('home.services.title')}
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-secondary-600 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {serviceItems.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow group"
              variants={itemVariants}
            >
              <div className="text-secondary-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                {t(`home.services.${service.key}`)}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;