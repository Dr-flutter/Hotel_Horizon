import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      <p className="mt-4 text-gray-600">{t('common.loading')}</p>
    </div>
  );
};

export default Loader;