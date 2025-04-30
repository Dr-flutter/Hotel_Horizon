import { create } from 'zustand';
import { Room } from '../types';
import { fetchRooms as fetchRoomsApi, deleteRoom as deleteRoomApi } from '../services/roomService';

type RoomsState = {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;
};

export const useRooms = create<RoomsState>((set, get) => ({
  rooms: [],
  loading: false,
  error: null,
  
  fetchRooms: async () => {
    // Don't fetch if we already have rooms
    if (get().rooms.length > 0) return;
    
    set({ loading: true, error: null });
    
    try {
      const rooms = await fetchRoomsApi();
      set({ rooms, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        loading: false 
      });
    }
  },
  
  deleteRoom: async (id: string) => {
    try {
      await deleteRoomApi(id);
      // Update local state
      set({ rooms: get().rooms.filter(room => room.id !== id) });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
      throw error;
    }
  }
}));