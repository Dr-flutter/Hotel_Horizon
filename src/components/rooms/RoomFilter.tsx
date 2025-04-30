import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import { Search, Users } from 'lucide-react';

type RoomFilterProps = {
  onFilter: (filters: {
    startDate: Date | null;
    endDate: Date | null;
    guests: number;
    roomType: string;
    priceRange: [number, number];
  }) => void;
};

const RoomFilter = ({ onFilter }: RoomFilterProps) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      startDate,
      endDate,
      guests,
      roomType,
      priceRange
    });
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-primary-800 mb-4">
        {t('rooms.filter.search')}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('rooms.filter.dates')}
            </label>
            <div className="flex space-x-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                placeholderText="Arrivée"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || new Date()}
                placeholderText="Départ"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          {/* Guests filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('rooms.filter.guests')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users size={16} className="text-gray-400" />
              </div>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Room type filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('rooms.filter.type')}
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tous les types</option>
              <option value="standard">Chambre Standard</option>
              <option value="deluxe">Chambre Deluxe</option>
              <option value="suite">Suite</option>
              <option value="family">Suite Familiale</option>
            </select>
          </div>
          
          {/* Price filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('rooms.filter.price')} ({priceRange[1]}€ max)
            </label>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 bg-primary-800 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
        >
          <Search size={18} className="mr-2" />
          {t('rooms.filter.search')}
        </button>
      </form>
    </div>
  );
};

export default RoomFilter;