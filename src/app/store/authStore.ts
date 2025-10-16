import { create } from "zustand";
interface User { id: string; userName: string; email: string; }
interface AuthState {
  isLoggedIn: boolean; user: User | null;

  initializeAuth: () => void; login: (user: User, token: string) => void; logout: () => void;
} export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, user: null,

  initializeAuth: () => { if (typeof window !== "undefined") { const token = localStorage.getItem("token"); const user = localStorage.getItem("user"); set({ isLoggedIn: !!token, user: user ? JSON.parse(user) : null, }); } },


  login: (user, token) => { localStorage.setItem("token", token); localStorage.setItem("user", JSON.stringify(user)); set({ isLoggedIn: true, user }); },

  logout: () => { localStorage.removeItem("token"); localStorage.removeItem("user"); set({ isLoggedIn: false, user: null }); },
}));