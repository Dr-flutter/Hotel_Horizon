import { useTranslation } from 'react-i18next';
import { Users, Calendar, CreditCard, Clock } from 'lucide-react';
import { useAdmin } from '../../store/adminStore';

const StatCard = ({ 
  icon, 
  title, 
  value, 
  change, 
  changeType 
}: { 
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className="p-2 rounded-full bg-primary-50 text-primary-800">
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
        <div className={`flex items-center text-sm ${
          changeType === 'positive' 
            ? 'text-green-600' 
            : changeType === 'negative' 
              ? 'text-red-600' 
              : 'text-gray-500'
        }`}>
          <span className="mr-1">{change}</span>
          {changeType !== 'neutral' && (
            <svg 
              className={`w-3 h-3 ${changeType === 'negative' ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  const { t } = useTranslation();
  const { getStats } = useAdmin();
  const stats = getStats();
  
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={<Calendar size={20} />}
        title={t('admin.stats.totalBookings')}
        value={stats.totalBookings.toString()}
        change="+12% depuis le mois dernier"
        changeType="positive"
      />
      
      <StatCard
        icon={<Users size={20} />}
        title={t('admin.stats.occupancyRate')}
        value={`${stats.occupancyRate.toFixed(1)}%`}
        change="+5% depuis le mois dernier"
        changeType="positive"
      />
      
      <StatCard
        icon={<CreditCard size={20} />}
        title={t('admin.stats.revenue')}
        value={`€${stats.revenue.toLocaleString()}`}
        change="+18% depuis le mois dernier"
        changeType="positive"
      />
      
      <StatCard
        icon={<Clock size={20} />}
        title={t('admin.stats.pendingBookings')}
        value={stats.pendingBookings.toString()}
        change="-3 depuis hier"
        changeType="neutral"
      />
    </div>
  );
};

export default DashboardStats;