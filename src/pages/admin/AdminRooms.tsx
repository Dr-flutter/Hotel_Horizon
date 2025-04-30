import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash, 
  CheckCircle, 
  XCircle,
  ChevronDown,
  ChevronUp,
  Filter,
  LayoutDashboard
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import RoomForm from '../../components/admin/RoomForm';
import { useAdmin } from '../../store/adminStore';
import { Room } from '../../types';

const AdminRooms = () => {
  const { t } = useTranslation();
  const { rooms, deleteRoom, toggleRoomStatus } = useAdmin();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [sortField, setSortField] = useState<keyof Room>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    priceMin: '',
    priceMax: ''
  });
  
  useEffect(() => {
    document.title = `${t('admin.roomsManagement.title')} - Hôtel Horizon Admin`;
  }, [t]);
  
  useEffect(() => {
    filterAndSortRooms();
  }, [rooms, searchTerm, sortField, sortDirection, filters]);
  
  const filterAndSortRooms = () => {
    let filtered = [...rooms];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(term) ||
        room.description.toLowerCase().includes(term)
      );
    }
    
    // Apply filters
    if (filters.type !== 'all') {
      filtered = filtered.filter(room => room.type === filters.type);
    }
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(room => 
        filters.status === 'available' ? room.status === 'available' : room.status !== 'available'
      );
    }
    
    if (filters.priceMin) {
      filtered = filtered.filter(room => room.pricePerNight >= parseInt(filters.priceMin));
    }
    
    if (filters.priceMax) {
      filtered = filtered.filter(room => room.pricePerNight <= parseInt(filters.priceMax));
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let compareA: string | number = a[sortField] as string | number;
      let compareB: string | number = b[sortField] as string | number;
      
      if (typeof compareA === 'string' && typeof compareB === 'string') {
        return sortDirection === 'asc' 
          ? compareA.localeCompare(compareB) 
          : compareB.localeCompare(compareA);
      } else if (typeof compareA === 'number' && typeof compareB === 'number') {
        return sortDirection === 'asc' 
          ? compareA - compareB 
          : compareB - compareA;
      }
      
      return 0;
    });
    
    setFilteredRooms(filtered);
  };
  
  const handleSort = (field: keyof Room) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleDeleteRoom = async (roomId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) {
      try {
        deleteRoom(roomId);
        toast.success('Chambre supprimée avec succès');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
        console.error(error);
      }
    }
  };
  
  const handleToggleStatus = (roomId: string) => {
    try {
      toggleRoomStatus(roomId);
      toast.success('Statut de la chambre mis à jour');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut');
      console.error(error);
    }
  };
  
  const SortIndicator = ({ field }: { field: keyof Room }) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp size={16} className="ml-1" /> 
      : <ChevronDown size={16} className="ml-1" />;
  };
  
  return (
    <div className="py-10 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
            {t('admin.roomsManagement.title')}
          </h1>
          
          <Button 
            variant="primary"
            onClick={() => setShowAddForm(true)}
          >
            <Plus size={16} className="mr-2" />
            {t('admin.roomsManagement.addRoom')}
          </Button>
        </div>
        
        {(showAddForm || editingRoom) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {editingRoom ? 'Modifier la chambre' : 'Ajouter une chambre'}
              </h2>
              <RoomForm 
                room={editingRoom || undefined}
                onClose={() => {
                  setShowAddForm(false);
                  setEditingRoom(null);
                }}
              />
            </div>
          </div>
        )}
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Gestion des chambres</CardTitle>
              
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
                    Type de chambre
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">Tous les types</option>
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="family">Familiale</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="available">Disponible</option>
                    <option value="unavailable">Non disponible</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix min (€)
                  </label>
                  <input
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix max (€)
                  </label>
                  <input
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="1000"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => setFilters({
                    type: 'all',
                    status: 'all',
                    priceMin: '',
                    priceMax: ''
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
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        {t('admin.roomsManagement.roomNumber')}
                        <SortIndicator field="name" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('type')}
                    >
                      <div className="flex items-center">
                        {t('admin.roomsManagement.type')}
                        <SortIndicator field="type" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('pricePerNight')}
                    >
                      <div className="flex items-center">
                        {t('admin.roomsManagement.price')}
                        <SortIndicator field="pricePerNight" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('capacity')}
                    >
                      <div className="flex items-center">
                        {t('admin.roomsManagement.capacity')}
                        <SortIndicator field="capacity" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('admin.roomsManagement.status')}
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('admin.roomsManagement.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRooms.map((room) => (
                    <tr key={room.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            src={room.images[0]} 
                            alt={room.name}
                            className="h-10 w-10 rounded-md object-cover mr-3"
                          />
                          <div className="text-sm font-medium text-gray-900">{room.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{room.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">€{room.pricePerNight}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <LayoutDashboard size={16} className="mr-1" />
                          {room.size} m² • {room.capacity} pers.
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleStatus(room.id)}
                          className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                            room.status === 'available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {room.status === 'available' ? (
                            <CheckCircle size={14} className="mr-1" />
                          ) : (
                            <XCircle size={14} className="mr-1" />
                          )}
                          {room.status === 'available' ? 'Disponible' : 'Non disponible'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setEditingRoom(room)}
                          className="text-primary-800 hover:text-primary-700 mr-3"
                          title="Modifier"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Supprimer"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredRooms.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        Aucune chambre trouvée
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

export default AdminRooms;