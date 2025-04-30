import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import BookingForm from '../components/booking/BookingForm';
import { useRooms } from '../store/roomsStore';
import { Room } from '../types';

const BookingPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { rooms, fetchRooms, loading } = useRooms();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  const roomId = searchParams.get('roomId');
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  
  // Parse date parameters if present
  const checkInDate = checkInParam ? new Date(checkInParam) : null;
  const checkOutDate = checkOutParam ? new Date(checkOutParam) : null;
  
  useEffect(() => {
    document.title = `${t('booking.title')} - Hôtel Horizon`;
    window.scrollTo(0, 0);
    fetchRooms();
  }, [fetchRooms, t]);
  
  useEffect(() => {
    if (rooms.length > 0 && roomId) {
      const room = rooms.find(r => r.id === roomId);
      if (room) {
        setSelectedRoom(room);
      } else {
        // If room not found, default to first room
        setSelectedRoom(rooms[0]);
      }
    } else if (rooms.length > 0) {
      // No roomId specified, default to first room
      setSelectedRoom(rooms[0]);
    }
  }, [rooms, roomId]);
  
  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-800 mx-auto"></div>
        <p className="mt-4 text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }
  
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
            {t('booking.title')}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {selectedRoom ? (
            <BookingForm 
              room={selectedRoom} 
              initialCheckIn={checkInDate} 
              initialCheckOut={checkOutDate}
            />
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">Aucune chambre disponible pour la réservation.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;