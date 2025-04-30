import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import RoomDetail from '../components/rooms/RoomDetail';
import { useRooms } from '../store/roomsStore';
import { Room } from '../types';

const RoomDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { rooms, fetchRooms, loading } = useRooms();
  const [room, setRoom] = useState<Room | null>(null);
  const [similarRooms, setSimilarRooms] = useState<Room[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRooms();
  }, [fetchRooms]);
  
  useEffect(() => {
    if (rooms.length > 0 && id) {
      const foundRoom = rooms.find(r => r.id === id);
      if (foundRoom) {
        setRoom(foundRoom);
        document.title = `${foundRoom.name} - Hôtel Horizon`;
        
        // Find similar rooms (same type or similar price)
        const similar = rooms.filter(r => 
          r.id !== id && (
            r.type === foundRoom.type || 
            Math.abs(r.pricePerNight - foundRoom.pricePerNight) < 50
          )
        ).slice(0, 3);
        setSimilarRooms(similar);
      } else {
        navigate('/rooms', { replace: true });
      }
    }
  }, [rooms, id, navigate]);
  
  if (loading || !room) {
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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux chambres
        </button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RoomDetail room={room} />
        </motion.div>
        
        {similarRooms.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-semibold text-primary-800 mb-8">
              {t('roomDetail.similarRooms')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarRooms.map((similarRoom) => (
                <motion.div
                  key={similarRoom.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    navigate(`/rooms/${similarRoom.id}`);
                    window.scrollTo(0, 0);
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={similarRoom.images[0]} 
                      alt={similarRoom.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary-800 mb-2">{similarRoom.name}</h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{similarRoom.description}</p>
                    <p className="text-primary-800 font-bold">€{similarRoom.pricePerNight} / nuit</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailPage;