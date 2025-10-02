import Cookies from "js-cookie";
import { create } from "zustand";

interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean; // 👈 track loading state
  error: string | null; // 👈 optional error state
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  hydrate: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  loading: false,
  error: null,

  setAuth: (token, user) => {
    Cookies.set("token", token, { expires: 7 }); 
    set({ token, user, error: null });
  },

  clearAuth: () => {
    Cookies.remove("token");
    set({ token: null, user: null, error: null });
  },

  hydrate: async () => {
    const token = Cookies.get("token");
    if (!token) return;

    set({ loading: true, error: null });

    try {
      const res = await fetch(`https://jottymebackend-production.up.railway.app/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const resData = await res.json();
      const user: User = {
        _id: resData.data._id,
        email: resData.data.email,
        firstname: resData.data.firstname,
        lastname: resData.data.lastname,
      };

      set({ token, user, loading: false });
    } catch (err: any) {
      console.error("Hydrate failed:", err);
      Cookies.remove("token");
      set({ token: null, user: null, loading: false, error: err.message || "Failed to hydrate" });
    }
  },

  logout: () => {
    Cookies.remove("token");
    set({ token: null, user: null, error: null });
  },
}));
