import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import RoomFilter from '../components/rooms/RoomFilter';
import RoomCard from '../components/rooms/RoomCard';
import { useRooms } from '../store/roomsStore';
import { Room } from '../types';

const RoomsPage = () => {
  const { t } = useTranslation();
  const { rooms, fetchRooms, loading } = useRooms();
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [filters, setFilters] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    guests: 1,
    roomType: 'all',
    priceRange: [0, 500] as [number, number]
  });
  
  useEffect(() => {
    document.title = `${t('rooms.title')} - Hôtel Horizon`;
    window.scrollTo(0, 0);
    fetchRooms();
  }, [fetchRooms, t]);
  
  useEffect(() => {
    if (rooms.length > 0) {
      applyFilters(filters);
    }
  }, [rooms]);
  
  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    
    let filtered = [...rooms];
    
    // Filter by guests
    if (newFilters.guests > 1) {
      filtered = filtered.filter(room => room.capacity >= newFilters.guests);
    }
    
    // Filter by room type
    if (newFilters.roomType !== 'all') {
      filtered = filtered.filter(room => room.type === newFilters.roomType);
    }
    
    // Filter by price
    filtered = filtered.filter(room => 
      room.pricePerNight >= newFilters.priceRange[0] && 
      room.pricePerNight <= newFilters.priceRange[1]
    );
    
    // In a real app, availability would be checked against the database
    // Here we'll just simulate it with random availability
    if (newFilters.startDate && newFilters.endDate) {
      filtered = filtered.map(room => ({
        ...room,
        isAvailable: Math.random() > 0.3 // 70% chance of being available
      }));
    }
    
    setFilteredRooms(filtered);
  };
  
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
            {t('rooms.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('rooms.subtitle')}
          </p>
        </motion.div>
        
        <RoomFilter onFilter={applyFilters} />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('common.loading')}</p>
          </div>
        ) : filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                isAvailable={room.isAvailable !== false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">Aucune chambre ne correspond à vos critères.</p>
            <button
              onClick={() => applyFilters({
                startDate: null,
                endDate: null,
                guests: 1,
                roomType: 'all',
                priceRange: [0, 500]
              })}
              className="mt-4 px-4 py-2 bg-primary-800 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;