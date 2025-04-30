import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, LayoutDashboard, Wifi, Tv, Coffee, CheckCircle } from 'lucide-react';
import { Room } from '../../types';

type RoomCardProps = {
  room: Room;
  isAvailable?: boolean;
};

const RoomCard = ({ room, isAvailable = true }: RoomCardProps) => {
  const { t } = useTranslation();
  
  // Map amenities to icons
  const amenityIcons: Record<string, JSX.Element> = {
    wifi: <Wifi size={16} className="text-gray-600" />,
    tv: <Tv size={16} className="text-gray-600" />,
    breakfast: <Coffee size={16} className="text-gray-600" />
  };
  
  return (
    <motion.div 
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${!isAvailable ? 'opacity-75' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
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
        <div className="flex flex-wrap items-center text-gray-600 mb-4 gap-x-4 gap-y-2">
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span className="text-sm">
              {room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'}
            </span>
          </div>
          <div className="flex items-center">
            <LayoutDashboard size={16} className="mr-1" />
            <span className="text-sm">{room.size} m²</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center space-x-4 mb-4">
          {room.amenities.map(amenity => (
            amenityIcons[amenity] && (
              <div key={amenity} className="flex items-center">
                {amenityIcons[amenity]}
              </div>
            )
          ))}
        </div>
        
        <p className="text-gray-600 line-clamp-2 mb-6">{room.description}</p>
        
        <div className="flex justify-between items-center">
          {isAvailable ? (
            <div className="flex items-center text-green-600">
              <CheckCircle size={16} className="mr-1" />
              <span className="text-sm font-medium">{t('rooms.availability')}</span>
            </div>
          ) : (
            <span className="text-sm text-red-500 font-medium">{t('rooms.notAvailable')}</span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4 space-x-3">
          <Link 
            to={`/rooms/${room.id}`}
            className="flex-1 py-2 text-center border border-primary-800 text-primary-800 hover:bg-primary-50 font-medium rounded-md transition-colors"
          >
            {t('rooms.details')}
          </Link>
          
          <Link 
            to={isAvailable ? `/booking?roomId=${room.id}` : '#'}
            className={`flex-1 py-2 text-center ${
              isAvailable 
                ? 'bg-primary-800 hover:bg-primary-700 text-white' 
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            } font-medium rounded-md transition-colors`}
            onClick={e => !isAvailable && e.preventDefault()}
          >
            {t('rooms.book')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;