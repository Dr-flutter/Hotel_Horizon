import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { addDays, format, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Check, CreditCard, Calendar, Users } from 'lucide-react';
import { Room } from '../../types';
import { createBooking } from '../../services/bookingService';

type BookingFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  termsAccepted: boolean;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
};

type BookingFormProps = {
  room: Room;
  initialCheckIn?: Date;
  initialCheckOut?: Date;
};

const BookingForm = ({ room, initialCheckIn, initialCheckOut }: BookingFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState<Date | null>(initialCheckIn || null);
  const [checkOut, setCheckOut] = useState<Date | null>(initialCheckOut || null);
  const [guests, setGuests] = useState(1);
  const [bookingReference, setBookingReference] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<BookingFormInputs>();
  
  const watchTerms = watch('termsAccepted', false);
  
  const calculateTotalPrice = () => {
    if (checkIn && checkOut) {
      const nights = differenceInDays(checkOut, checkIn);
      return nights * room.pricePerNight;
    }
    return 0;
  };
  
  const nextStep = () => {
    if (step === 1 && (!checkIn || !checkOut)) {
      toast.error('Veuillez sélectionner des dates de séjour');
      return;
    }
    
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const onSubmit: SubmitHandler<BookingFormInputs> = async (data) => {
    if (!checkIn || !checkOut) {
      toast.error('Veuillez sélectionner des dates de séjour');
      return;
    }
    
    try {
      // In a real app, this would integrate with a payment processor
      // and handle the credit card validation and charging
      
      const bookingData = {
        roomId: room.id,
        checkIn: format(checkIn, 'yyyy-MM-dd'),
        checkOut: format(checkOut, 'yyyy-MM-dd'),
        guests,
        totalPrice: calculateTotalPrice(),
        guest: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone
        },
        specialRequests: data.specialRequests
      };
      
      const result = await createBooking(bookingData);
      setBookingReference(result.bookingId);
      reset();
      nextStep();
      
      // In a real app, this would send an email confirmation
      // using NodeMailer or a similar service
      
    } catch (error) {
      toast.error('Une erreur est survenue lors de la réservation');
      console.error(error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Progress steps */}
      <div className="bg-gray-50 p-4">
        <div className="flex justify-between items-center">
          {['step1', 'step2', 'step3', 'step4'].map((stepKey, index) => (
            <div 
              key={stepKey} 
              className="flex flex-col items-center"
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${
                  step > index + 1 
                    ? 'bg-green-500 text-white' 
                    : step === index + 1 
                      ? 'bg-primary-800 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > index + 1 ? <Check size={16} /> : index + 1}
              </div>
              <span className={`text-xs ${
                step === index + 1 ? 'text-primary-800 font-medium' : 'text-gray-500'
              }`}>
                {t(`booking.${stepKey}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        {/* Step 1: Room and dates selection */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-serif font-semibold text-primary-800 mb-6">
              {t('booking.selectRoom')}
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-shrink-0">
                <img 
                  src={room.images[0]} 
                  alt={room.name}
                  className="w-full md:w-64 h-48 object-cover rounded-lg"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2">{room.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <Users size={16} className="mr-1" />
                  <span className="text-sm">
                    {room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'} max
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{room.description}</p>
                <div className="text-lg font-semibold text-primary-800">
                  €{room.pricePerNight} / {t('rooms.perNight')}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('booking.dates')}
                </label>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <DatePicker
                      selected={checkIn}
                      onChange={(date) => setCheckIn(date)}
                      selectsStart
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={new Date()}
                      placeholderText="Arrivée"
                      locale={fr}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <DatePicker
                      selected={checkOut}
                      onChange={(date) => setCheckOut(date)}
                      selectsEnd
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={checkIn ? addDays(checkIn, 1) : new Date()}
                      placeholderText="Départ"
                      locale={fr}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('booking.guests')}
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
                    {Array.from({ length: room.capacity }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {checkIn && checkOut && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Récapitulatif</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Séjour:</span>
                  <span className="font-medium">
                    {format(checkIn, 'dd/MM/yyyy')} - {format(checkOut, 'dd/MM/yyyy')}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Nuits:</span>
                  <span className="font-medium">{differenceInDays(checkOut, checkIn)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Personnes:</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-primary-800 mt-2 pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span>€{calculateTotalPrice()}</span>
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-primary-800 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
              >
                Continuer
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Guest information */}
        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-serif font-semibold text-primary-800 mb-6">
              {t('booking.personalInfo')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.firstName')}
                </label>
                <input
                  type="text"
                  {...register('firstName', { required: true })}
                  className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{t('common.required')}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.lastName')}
                </label>
                <input
                  type="text"
                  {...register('lastName', { required: true })}
                  className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{t('common.required')}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.email')}
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: true,
                    pattern: /^\S+@\S+\.\S+$/
                  })}
                  className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
                {errors.email?.type === 'required' && <p className="mt-1 text-sm text-red-500">{t('common.required')}</p>}
                {errors.email?.type === 'pattern' && <p className="mt-1 text-sm text-red-500">{t('common.invalidEmail')}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.phone')}
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: true })}
                  className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{t('common.required')}</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('booking.specialRequests')}
              </label>
              <textarea
                {...register('specialRequests')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Retour
              </button>
              
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-primary-800 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
              >
                Continuer
              </button>
            </div>
          </form>
        )}
        
        {/* Step 3: Payment information */}
        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-serif font-semibold text-primary-800 mb-6">
              {t('booking.paymentDetails')}
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('booking.cardNumber')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('cardNumber', { 
                    required: true,
                    pattern: /^[0-9]{16}$/
                  })}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full pl-10 px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
              </div>
              {errors.cardNumber && <p className="mt-1 text-sm text-red-500">Numéro de carte invalide</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.expiryDate')}
                </label>
                <input
                  type="text"
                  {...register('cardExpiry', { 
                    required: true,
                    pattern: /^(0[1-9]|1[0-2])\/[0-9]{2}$/
                  })}
                  placeholder="MM/YY"
                  className={`w-full px-3 py-2 border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
                {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">Format invalide (MM/YY)</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.cvv')}
                </label>
                <input
                  type="text"
                  {...register('cardCvv', { 
                    required: true,
                    pattern: /^[0-9]{3,4}$/
                  })}
                  placeholder="123"
                  className={`w-full px-3 py-2 border ${errors.cardCvv ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
                {errors.cardCvv && <p className="mt-1 text-sm text-red-500">CVV invalide</p>}
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    {...register('termsAccepted', { required: true })}
                    id="terms"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  {t('booking.termsConditions')}
                </label>
              </div>
              {errors.termsAccepted && <p className="mt-1 text-sm text-red-500">Vous devez accepter les conditions</p>}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Récapitulatif de la réservation</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Chambre:</span>
                <span className="font-medium">{room.name}</span>
              </div>
              {checkIn && checkOut && (
                <>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Séjour:</span>
                    <span className="font-medium">
                      {format(checkIn, 'dd/MM/yyyy')} - {format(checkOut, 'dd/MM/yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Nuits:</span>
                    <span className="font-medium">{differenceInDays(checkOut, checkIn)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Personnes:</span>
                <span className="font-medium">{guests}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-primary-800 mt-2 pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span>€{calculateTotalPrice()}</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Retour
              </button>
              
              <button
                type="submit"
                disabled={!watchTerms}
                className={`px-6 py-2 ${
                  watchTerms 
                    ? 'bg-primary-800 hover:bg-primary-700 text-white' 
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                } font-medium rounded-md transition-colors`}
              >
                {t('booking.completeBooking')}
              </button>
            </div>
          </form>
        )}
        
        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            
            <h2 className="text-2xl font-serif font-semibold text-primary-800 mb-4">
              {t('booking.bookingConfirmed')}
            </h2>
            
            <p className="text-gray-600 mb-8">
              {t('booking.confirmationEmail')} <span className="font-medium">your-email@example.com</span>
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8 inline-block mx-auto text-left">
              <div className="mb-4">
                <h3 className="text-sm text-gray-500 mb-1">{t('booking.bookingReference')}</h3>
                <p className="text-lg font-mono font-semibold">{bookingReference || 'HORIZON-1234567'}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm text-gray-500 mb-1">Chambre</h3>
                <p className="font-medium">{room.name}</p>
              </div>
              
              {checkIn && checkOut && (
                <div className="mb-4">
                  <h3 className="text-sm text-gray-500 mb-1">Séjour</h3>
                  <p className="font-medium">
                    {format(checkIn, 'dd/MM/yyyy')} - {format(checkOut, 'dd/MM/yyyy')}
                  </p>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold text-primary-800">
                  <span>Total:</span>
                  <span>€{calculateTotalPrice()}</span>
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-primary-800 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
            >
              {t('booking.backToHome')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;