import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  UserPlus, 
  Pencil, 
  Trash, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Sample user type
type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'manager';
  lastLogin: string;
  createdAt: string;
  active: boolean;
};

// Sample users data
const sampleUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Admin Principal',
    email: 'admin@hotel-horizon.fr',
    role: 'admin',
    lastLogin: '2023-04-18T10:30:00',
    createdAt: '2022-01-10',
    active: true
  },
  {
    id: 'USR-002',
    name: 'Sophie Martin',
    email: 'sophie.martin@hotel-horizon.fr',
    role: 'manager',
    lastLogin: '2023-04-17T15:45:00',
    createdAt: '2022-02-15',
    active: true
  },
  {
    id: 'USR-003',
    name: 'Jean Dupont',
    email: 'jean.dupont@hotel-horizon.fr',
    role: 'staff',
    lastLogin: '2023-04-16T09:20:00',
    createdAt: '2022-03-05',
    active: true
  },
  {
    id: 'USR-004',
    name: 'Marie Lefevre',
    email: 'marie.lefevre@hotel-horizon.fr',
    role: 'staff',
    lastLogin: '2023-04-15T14:10:00',
    createdAt: '2022-04-20',
    active: true
  },
  {
    id: 'USR-005',
    name: 'Pierre Moreau',
    email: 'pierre.moreau@hotel-horizon.fr',
    role: 'manager',
    lastLogin: '2023-04-10T11:05:00',
    createdAt: '2022-06-12',
    active: false
  }
];

const roleLabels = {
  admin: 'Administrateur',
  manager: 'Manager',
  staff: 'Personnel'
};

const roleClasses = {
  admin: 'bg-purple-100 text-purple-800',
  manager: 'bg-blue-100 text-blue-800',
  staff: 'bg-green-100 text-green-800'
};

const AdminUsers = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  useEffect(() => {
    document.title = `${t('admin.usersManagement.title')} - Hôtel Horizon Admin`;
  }, [t]);
  
  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, sortField, sortDirection]);
  
  const filterAndSortUsers = () => {
    let filtered = [...users];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        roleLabels[user.role].toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      } else if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        return sortDirection === 'asc' 
          ? (valA ? 1 : 0) - (valB ? 1 : 0) 
          : (valB ? 1 : 0) - (valA ? 1 : 0);
      }
      
      return 0;
    });
    
    setFilteredUsers(filtered);
  };
  
  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== userId));
      toast.success('Utilisateur supprimé avec succès');
    }
  };
  
  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? {...user, active: !user.active} : user
    ));
    
    const user = users.find(u => u.id === userId);
    if (user) {
      toast.success(`Utilisateur ${user.active ? 'désactivé' : 'activé'} avec succès`);
    }
  };
  
  const SortIndicator = ({ field }: { field: keyof User }) => {
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
            {t('admin.usersManagement.title')}
          </h1>
          
          <Button variant="primary">
            <UserPlus size={16} className="mr-2" />
            {t('admin.usersManagement.addUser')}
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Gestion des utilisateurs</CardTitle>
              
              <div className="relative mt-2 sm:mt-0">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
                />
              </div>
            </div>
          </CardHeader>
          
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
                        {t('admin.usersManagement.name')}
                        <SortIndicator field="name" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center">
                        {t('admin.usersManagement.email')}
                        <SortIndicator field="email" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('role')}
                    >
                      <div className="flex items-center">
                        {t('admin.usersManagement.role')}
                        <SortIndicator field="role" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('lastLogin')}
                    >
                      <div className="flex items-center">
                        {t('admin.usersManagement.lastLogin')}
                        <SortIndicator field="lastLogin" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('active')}
                    >
                      <div className="flex items-center">
                        Statut
                        <SortIndicator field="active" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('admin.usersManagement.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className={!user.active ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${roleClasses[user.role]}`}>
                          {roleLabels[user.role]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(user.lastLogin)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.active ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-primary-800 hover:text-primary-700"
                            title={t('admin.usersManagement.editUser')}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={user.active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800"}
                            title={user.active ? "Désactiver" : "Activer"}
                          >
                            {user.active ? "Désactiver" : "Activer"}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-800"
                            title={t('admin.usersManagement.deleteUser')}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        Aucun utilisateur trouvé
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

export default AdminUsers;