import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Users, Bed, CalendarCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardStats from '../../components/admin/DashboardStats';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { useAuth } from '../../store/authStore';
import { useAdmin } from '../../store/adminStore';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { bookings, rooms, getStats } = useAdmin();
  
  useEffect(() => {
    document.title = `${t('admin.dashboard')} - Hôtel Horizon Admin`;
    window.scrollTo(0, 0);
  }, [t]);
  
  const stats = getStats();
  const recentBookings = bookings.slice(0, 4);
  
  return (
    <div className="py-10 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {t('admin.dashboard')}
            </h1>
            <p className="text-gray-600">
              {t('admin.welcome')}, {user?.name || 'Admin'}
            </p>
          </div>
          
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('admin.bookingsManagement.title')}</CardTitle>
                  <Link 
                    to="/admin/bookings" 
                    className="text-sm text-primary-800 hover:text-primary-700 flex items-center"
                  >
                    Voir tout
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('admin.bookingsManagement.bookingId')}
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('admin.bookingsManagement.guest')}
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('admin.bookingsManagement.room')}
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('admin.bookingsManagement.checkIn')}
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('admin.bookingsManagement.status')}
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('admin.bookingsManagement.totalPrice')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentBookings.map((booking) => (
                        <motion.tr 
                          key={booking.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.guest.firstName} {booking.guest.lastName}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {rooms.find(r => r.id === booking.roomId)?.name || 'N/A'}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(booking.checkIn).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : booking.status === 'cancelled'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            €{booking.totalPrice}
                          </td>
                        </motion.tr>
                      ))}
                      
                      {recentBookings.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
                            Aucune réservation récente
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('admin.roomsManagement.title')}</CardTitle>
                  <Link 
                    to="/admin/rooms" 
                    className="text-sm text-primary-800 hover:text-primary-700 flex items-center"
                  >
                    Voir tout
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-md mr-3">
                      <Bed size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Chambres disponibles</p>
                      <p className="text-xl font-semibold">
                        {rooms.filter(r => r.status === 'available').length} / {rooms.length}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-md mr-3">
                      <CalendarCheck size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Réservations aujourd'hui</p>
                      <p className="text-xl font-semibold">
                        {bookings.filter(b => 
                          new Date(b.checkIn).toDateString() === new Date().toDateString()
                        ).length}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-purple-100 rounded-md mr-3">
                      <Users size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Taux d'occupation</p>
                      <p className="text-xl font-semibold">{stats.occupancyRate.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t border-gray-100">
                <Link
                  to="/admin/rooms/add"
                  className="w-full text-center px-4 py-2 bg-primary-800 hover:bg-primary-700 text-white rounded-md transition-colors"
                >
                  {t('admin.roomsManagement.addRoom')}
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;