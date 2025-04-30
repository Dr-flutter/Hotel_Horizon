import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Room } from '../../types';
import { useAdmin } from '../../store/adminStore';

type RoomFormProps = {
  room?: Room;
  onClose: () => void;
};

type RoomFormInputs = {
  name: string;
  type: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  size: number;
  amenities: string[];
  images: string[];
};

const RoomForm = ({ room, onClose }: RoomFormProps) => {
  const { addRoom, updateRoom } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<RoomFormInputs>({
    defaultValues: room ? {
      name: room.name,
      type: room.type,
      description: room.description,
      pricePerNight: room.pricePerNight,
      capacity: room.capacity,
      size: room.size,
      amenities: room.amenities,
      images: room.images
    } : undefined
  });
  
  const onSubmit: SubmitHandler<RoomFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      if (room) {
        updateRoom(room.id, data);
        toast.success('Chambre mise à jour avec succès');
      } else {
        const newRoom: Room = {
          id: `room-${Date.now()}`,
          status: 'available',
          ...data
        };
        addRoom(newRoom);
        toast.success('Chambre ajoutée avec succès');
      }
      onClose();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">Ce champ est requis</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          {...register('type', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="standard">Standard</option>
          <option value="deluxe">Deluxe</option>
          <option value="suite">Suite</option>
          <option value="family">Familiale</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: true })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Prix par nuit (€)</label>
          <input
            type="number"
            {...register('pricePerNight', { required: true, min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Capacité</label>
          <input
            type="number"
            {...register('capacity', { required: true, min: 1 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Taille (m²)</label>
        <input
          type="number"
          {...register('size', { required: true, min: 0 })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Équipements</label>
        <div className="mt-2 space-y-2">
          {['wifi', 'tv', 'bathroom', 'minibar', 'roomService', 'breakfast', 'phone'].map(amenity => (
            <label key={amenity} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                {...register('amenities')}
                value={amenity}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Images (URLs)</label>
        <textarea
          {...register('images', { required: true })}
          placeholder="Une URL par ligne"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        <p className="mt-1 text-sm text-gray-500">Entrez les URLs des images, une par ligne</p>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-800 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {isSubmitting ? 'Enregistrement...' : room ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;