import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? (Cookies.get('token') ?? null) : null,
  setToken: (token: string) => {
    set({ token });
    Cookies.set('token', token);
  },
  clearToken: () => {
    set({ token: null });
    Cookies.remove('token');
  },
}));
