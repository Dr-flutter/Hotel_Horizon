import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Filter,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Sample booking type
type Booking = {
  id: string;
  guestName: string;
  guestEmail: string;
  roomName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  guests: number;
  createdAt: string;
};

// Sample bookings data
const sampleBookings: Booking[] = [
  {
    id: 'BK-9834',
    guestName: 'Marie Dupont',
    guestEmail: 'marie.dupont@example.com',
    roomName: 'Suite Deluxe',
    roomType: 'suite',
    checkIn: '2023-04-20',
    checkOut: '2023-04-23',
    status: 'confirmed',
    totalPrice: 890,
    guests: 2,
    createdAt: '2023-04-10'
  },
  {
    id: 'BK-9833',
    guestName: 'Pierre Martin',
    guestEmail: 'pierre.martin@example.com',
    roomName: 'Chambre Standard',
    roomType: 'standard',
    checkIn: '2023-04-18',
    checkOut: '2023-04-20',
    status: 'completed',
    totalPrice: 340,
    guests: 1,
    createdAt: '2023-04-05'
  },
  {
    id: 'BK-9832',
    guestName: 'Sophie Lefevre',
    guestEmail: 'sophie.lefevre@example.com',
    roomName: 'Suite Familiale',
    roomType: 'family',
    checkIn: '2023-04-22',
    checkOut: '2023-04-25',
    status: 'pending',
    totalPrice: 1250,
    guests: 4,
    createdAt: '2023-04-08'
  },
  {
    id: 'BK-9831',
    guestName: 'Thomas Blanc',
    guestEmail: 'thomas.blanc@example.com',
    roomName: 'Chambre Deluxe',
    roomType: 'deluxe',
    checkIn: '2023-04-19',
    checkOut: '2023-04-21',
    status: 'cancelled',
    totalPrice: 520,
    guests: 2,
    createdAt: '2023-04-01'
  },
  {
    id: 'BK-9830',
    guestName: 'Julie Moreau',
    guestEmail: 'julie.moreau@example.com',
    roomName: 'Suite Deluxe',
    roomType: 'suite',
    checkIn: '2023-04-25',
    checkOut: '2023-04-28',
    status: 'confirmed',
    totalPrice: 890,
    guests: 2,
    createdAt: '2023-04-12'
  },
  {
    id: 'BK-9829',
    guestName: 'David Petit',
    guestEmail: 'david.petit@example.com',
    roomName: 'Chambre Standard',
    roomType: 'standard',
    checkIn: '2023-04-24',
    checkOut: '2023-04-26',
    status: 'pending',
    totalPrice: 340,
    guests: 1,
    createdAt: '2023-04-11'
  }
];

const statusIcons = {
  pending: <Clock size={16} className="text-yellow-500 mr-1" />,
  confirmed: <CheckCircle size={16} className="text-green-500 mr-1" />,
  cancelled: <XCircle size={16} className="text-red-500 mr-1" />,
  completed: <CheckCircle size={16} className="text-blue-500 mr-1" />
};

const statusLabels = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
  completed: 'Terminée'
};

const statusClasses = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800'
};

const AdminBookings = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(sampleBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Booking>('checkIn');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: '',
    roomType: 'all'
  });
  
  useEffect(() => {
    document.title = `${t('admin.bookingsManagement.title')} - Hôtel Horizon Admin`;
  }, [t]);
  
  useEffect(() => {
    filterAndSortBookings();
  }, [bookings, searchTerm, sortField, sortDirection, filters]);
  
  const filterAndSortBookings = () => {
    let filtered = [...bookings];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.guestName.toLowerCase().includes(term) ||
        booking.guestEmail.toLowerCase().includes(term) ||
        booking.roomName.toLowerCase().includes(term) ||
        booking.id.toLowerCase().includes(term)
      );
    }
    
    // Apply filters
    if (filters.status !== 'all') {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }
    
    if (filters.dateFrom) {
      filtered = filtered.filter(booking => booking.checkIn >= filters.dateFrom);
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(booking => booking.checkOut <= filters.dateTo);
    }
    
    if (filters.roomType !== 'all') {
      filtered = filtered.filter(booking => booking.roomType === filters.roomType);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      
      return 0;
    });
    
    setFilteredBookings(filtered);
  };
  
  const handleSort = (field: keyof Booking) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };
  
  const SortIndicator = ({ field }: { field: keyof Booking }) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp size={16} className="ml-1" /> 
      : <ChevronDown size={16} className="ml-1" />;
  };
  
  const handleViewBooking = (bookingId: string) => {
    // In a real app, this would open a modal or navigate to booking details
    console.log(`View booking ${bookingId}`);
  };
  
  const handleUpdateStatus = (bookingId: string, newStatus: Booking['status']) => {
    // In a real app, this would call an API to update the booking status
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId ? {...booking, status: newStatus} : booking
      )
    );
  };
  
  return (
    <div className="py-10 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
            {t('admin.bookingsManagement.title')}
          </h1>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Gestion des réservations</CardTitle>
              
              <div className="flex items-center mt-2 sm:mt-0">
                <div className="relative mr-2">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Filter size={18} className="mr-1 text-gray-600" />
                  Filtres
                </button>
              </div>
            </div>
          </CardHeader>
          
          {showFilters && (
            <div className="px-6 py-4 border-t border-b border-gray-100 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmée</option>
                    <option value="cancelled">Annulée</option>
                    <option value="completed">Terminée</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'arrivée (à partir de)
                  </label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de départ (jusqu'à)
                  </label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de chambre
                  </label>
                  <select
                    value={filters.roomType}
                    onChange={(e) => setFilters({...filters, roomType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">Tous les types</option>
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="family">Familiale</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => setFilters({
                    status: 'all',
                    dateFrom: '',
                    dateTo: '',
                    roomType: 'all'
                  })}
                >
                  Réinitialiser
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => setShowFilters(false)}
                >
                  Appliquer
                </Button>
              </div>
            </div>
          )}
          
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center">
                        {t('admin.bookingsManagement.bookingId')}
                        <SortIndicator field="id" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('guestName')}
                    >
                      <div className="flex items-center">
                        {t('admin.bookingsManagement.guest')}
                        <SortIndicator field="guestName" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('roomName')}
                    >
                      <div className="flex items-center">
                        {t('admin.bookingsManagement.room')}
                        <SortIndicator field="roomName" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('checkIn')}
                    >
                      <div className="flex items-center">
                        {t('admin.bookingsManagement.checkIn')}
                        <SortIndicator field="checkIn" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('checkOut')}
                    >
                      <div className="flex items-center">
                        {t('admin.bookingsManagement.checkOut')}
                        <SortIndicator field="checkOut" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        {t('admin.bookingsManagement.status')}
                        <SortIndicator field="status" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('totalPrice')}
                    >
                      <div className="flex items-center">
                        {t('admin.bookingsManagement.totalPrice')}
                        <SortIndicator field="totalPrice" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('admin.bookingsManagement.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                        <div className="text-sm text-gray-500">{booking.guestEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.roomName}</div>
                        <div className="text-sm text-gray-500 capitalize">{booking.roomType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(booking.checkIn)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(booking.checkOut)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[booking.status]}`}>
                          <div className="flex items-center">
                            {statusIcons[booking.status]}
                            {statusLabels[booking.status]}
                          </div>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">€{booking.totalPrice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center space-x-2">
                          <button
                            onClick={() => handleViewBooking(booking.id)}
                            className="text-primary-800 hover:text-primary-700 p-1"
                            title={t('admin.bookingsManagement.viewDetails')}
                          >
                            <Eye size={16} />
                          </button>
                          
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Confirmer"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                          
                          {(booking.status === 'pending' || booking.status === 'confirmed') && (
                            <button
                              onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Annuler"
                            >
                              <XCircle size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                        Aucune réservation trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBookings;