import { create } from "zustand";

interface StoreState {
  products: any[];
  categories: any[];
  singleProduct: any | null;
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSingleProduct: (id: number) => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  categories: [],
  singleProduct: null,
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getProducts`);
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message);

      set({ products: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

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
