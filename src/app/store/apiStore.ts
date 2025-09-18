import { create } from "zustand";

interface StoreState {
  products: any[];
  categories: any[];
  singleProduct: any | null;
  loading: boolean;
  error: string | null;

  fetchProducts: (params?: Record<string, any>) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSingleProduct: (id: number) => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  categories: [],
  singleProduct: null,
  loading: false,
  error: null,

  // 🔹 Fetch Products with filters
  fetchProducts: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      // Convert params object -> query string
      const query = new URLSearchParams(params).toString();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getProducts?${query}`
      );

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      set({ products: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🔹 Fetch Categories
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getCategories`
      );
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message);

      set({ categories: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🔹 Fetch Single Product
  fetchSingleProduct: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getSingleProduct/${id}`
      );
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message);

      set({ singleProduct: data.product, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
