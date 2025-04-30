import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Users, Wifi, Tv, Coffee } from 'lucide-react';
import { useRooms } from '../../store/roomsStore';
import { Room } from '../../types';

const FeaturedRooms = () => {
  const { t } = useTranslation();
  const { rooms, fetchRooms } = useRooms();
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  
  useEffect(() => {
    // Get 3 random rooms to feature
    if (rooms.length > 0) {
      const shuffled = [...rooms].sort(() => 0.5 - Math.random());
      setFeaturedRooms(shuffled.slice(0, 3));
    }
  }, [rooms]);
  
  if (featuredRooms.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-semibold text-primary-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('home.rooms.title')}
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('home.rooms.description')}
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-secondary-600 mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={room.images[0]} 
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-secondary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  €{room.pricePerNight} / {t('rooms.perNight')}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-800 mb-2">{room.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <Users size={16} className="mr-1" />
                  <span className="text-sm">
                    {room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">{room.size} m²</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-4 text-gray-600">
                  {room.amenities.includes('wifi') && <Wifi size={16} />}
                  {room.amenities.includes('tv') && <Tv size={16} />}
                  {room.amenities.includes('breakfast') && <Coffee size={16} />}
                </div>
                
                <p className="text-gray-600 line-clamp-2 mb-4">{room.description}</p>
                
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/rooms/${room.id}`}
                    className="inline-flex items-center text-primary-800 hover:text-primary-600 font-medium transition-colors"
                  >
                    {t('rooms.details')}
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                  
                  <Link 
                    to={`/booking?roomId=${room.id}`}
                    className="inline-flex items-center px-4 py-2 bg-primary-800 hover:bg-primary-700 text-white rounded-md transition-colors"
                  >
                    {t('rooms.book')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/rooms"
            className="inline-flex items-center px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-md transition-colors"
          >
            {t('home.rooms.viewAll')}
            <ChevronRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;