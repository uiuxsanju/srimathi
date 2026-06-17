import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '@/lib/storage';

interface AuthState {
  isAuthed: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthed: false,
      login: (email, password) => {
        const admin = storage.getAdmin();
        if (email.trim().toLowerCase() === admin.email.toLowerCase() && password === admin.password) {
          set({ isAuthed: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthed: false }),
    }),
    { name: 'lf_auth' },
  ),
);
