import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { User } from '../../types';
import { useAdmin } from '../../store/adminStore';

type UserFormProps = {
  user?: User;
  onClose: () => void;
};

type UserFormInputs = {
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  password?: string;
};

const UserForm = ({ user, onClose }: UserFormProps) => {
  const { addUser, updateUser } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormInputs>({
    defaultValues: user ? {
      name: user.name,
      email: user.email,
      role: user.role
    } : undefined
  });
  
  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      if (user) {
        updateUser(user.id, data);
        toast.success('Utilisateur mis à jour avec succès');
      } else {
        const newUser: User = {
          id: `USR-${Date.now()}`,
          active: true,
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          ...data
        };
        addUser(newUser);
        toast.success('Utilisateur ajouté avec succès');
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
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email', { 
            required: true,
            pattern: /^\S+@\S+\.\S+$/
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.email?.type === 'required' && <p className="mt-1 text-sm text-red-600">Ce champ est requis</p>}
        {errors.email?.type === 'pattern' && <p className="mt-1 text-sm text-red-600">Email invalide</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Rôle</label>
        <select
          {...register('role', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="staff">Personnel</option>
          <option value="manager">Manager</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>
      
      {!user && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            {...register('password', { required: !user })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">Ce champ est requis</p>}
        </div>
      )}
      
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
          {isSubmitting ? 'Enregistrement...' : user ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;