import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, LayoutDashboard, Wifi, CreditCard, Tv, Coffee, CheckCircle, Bath, Utensils, Phone } from 'lucide-react';
import { Room } from '../../types';

type RoomDetailProps = {
  room: Room;
  isAvailable?: boolean;
};

const amenityIcons: Record<string, { icon: JSX.Element, label: string }> = {
  wifi: { icon: <Wifi size={20} className="text-primary-800" />, label: 'Wi-Fi gratuit' },
  tv: { icon: <Tv size={20} className="text-primary-800" />, label: 'Télévision LED' },
  breakfast: { icon: <Coffee size={20} className="text-primary-800" />, label: 'Petit-déjeuner inclus' },
  bathroom: { icon: <Bath size={20} className="text-primary-800" />, label: 'Salle de bain privée' },
  roomService: { icon: <Utensils size={20} className="text-primary-800" />, label: 'Service en chambre' },
  minibar: { icon: <CreditCard size={20} className="text-primary-800" />, label: 'Minibar' },
  phone: { icon: <Phone size={20} className="text-primary-800" />, label: 'Téléphone direct' }
};

const RoomDetail = ({ room, isAvailable = true }: RoomDetailProps) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };
  
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image gallery */}
      <div className="relative h-96">
        {room.images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={image} 
              alt={`${room.name} - view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        
        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-70 rounded-full flex items-center justify-center focus:outline-none hover:bg-opacity-100 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="text-primary-800" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-70 rounded-full flex items-center justify-center focus:outline-none hover:bg-opacity-100 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={24} className="text-primary-800" />
        </button>
        
        {/* Image thumbnails */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {room.images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`w-3 h-3 rounded-full focus:outline-none ${
                currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-semibold text-primary-800 mb-2">
              {room.name}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-600 mb-4 gap-4">
              <div className="flex items-center">
                <Users size={18} className="mr-1" />
                <span>
                  {room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'}
                </span>
              </div>
              <div className="flex items-center">
                <LayoutDashboard size={18} className="mr-1" />
                <span>{room.size} m²</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:text-right">
            <div className="text-2xl font-bold text-primary-800">
              €{room.pricePerNight}
              <span className="text-sm font-normal text-gray-600 ml-1">/ {t('rooms.perNight')}</span>
            </div>
            
            {isAvailable ? (
              <div className="flex items-center text-green-600 mt-2 md:justify-end">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm font-medium">{t('rooms.availability')}</span>
              </div>
            ) : (
              <div className="text-sm text-red-500 font-medium mt-2">
                {t('rooms.notAvailable')}
              </div>
            )}
          </div>
        </div>
        
        {/* Room description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-primary-800 mb-3">
            {t('roomDetail.description')}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {room.description}
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            {room.longDescription || "Notre chambre allie confort moderne et élégance raffinée pour vous offrir un séjour exceptionnel. Profitez d'un espace conçu avec soin, d'une literie haut de gamme et d'équipements premium pour une expérience inoubliable."}
          </p>
        </div>
        
        {/* Amenities */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">
            {t('roomDetail.amenities')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {room.amenities.map(amenity => (
              amenityIcons[amenity] && (
                <div key={amenity} className="flex items-center">
                  {amenityIcons[amenity].icon}
                  <span className="ml-2 text-gray-700">{amenityIcons[amenity].label}</span>
                </div>
              )
            ))}
          </div>
        </div>
        
        {/* Booking action */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-gray-50 rounded-lg">
          <div className="mb-4 sm:mb-0">
            <p className="text-gray-700 mb-1">Une expérience inoubliable vous attend</p>
            <p className="text-sm text-gray-600">Réservez dès maintenant pour garantir votre séjour</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:space-x-3 w-full sm:w-auto">
            <Link 
              to="/tour"
              className="mb-3 sm:mb-0 px-6 py-3 bg-white border border-primary-800 text-primary-800 hover:bg-gray-50 font-medium rounded-md transition-colors text-center"
            >
              {t('roomDetail.virtualTour')}
            </Link>
            
            <Link 
              to={isAvailable ? `/booking?roomId=${room.id}` : '#'}
              className={`px-6 py-3 ${
                isAvailable 
                  ? 'bg-primary-800 hover:bg-primary-700 text-white' 
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              } font-medium rounded-md transition-colors text-center`}
              onClick={e => !isAvailable && e.preventDefault()}
            >
              {t('roomDetail.bookNow')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;