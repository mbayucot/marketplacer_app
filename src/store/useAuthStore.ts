import create from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      clearAuth: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
