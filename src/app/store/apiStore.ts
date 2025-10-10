import { create } from "zustand";

interface StoreState {
  products: any[];
  categories: any[];
  singleProduct: any | null;
  loading: boolean;
  error: string | null;
  trendingProducts: any[]; // 👈 new
  stores: any[]; // 👈 new

  fetchProducts: (params?: Record<string, any>) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSingleProduct: (id: number) => Promise<void>;
  fetchTrendingProducts: () => Promise<void>; // 👈 new
  fetchStores: () => Promise<void>; // 👈 new
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  categories: [],
  singleProduct: null,
  stores: [], // 👈 new
  loading: false,
  error: null,
  trendingProducts: [], // 👈 new

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCategories`);
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message);

      // Structure data like: [{ parent: "Men", categories: [{id, category_name}, ...] }]
      const formatted = data.data.map((group: any) => ({
        parent: group.parent_category,
        categories: group.categories,
      }));

      set({ categories: formatted, loading: false });
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
  fetchTrendingProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/trending`
      );
      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `API did not return JSON: ${text.substring(0, 200)}...`
        );
      }

      if (!res.ok || !data.success)
        throw new Error(data.message || "Unknown API error");

      set({ trendingProducts: data.data, loading: false });
    } catch (err: any) {
      console.error(err);
      set({ error: err.message, loading: false });
    }
  },
  // 🔹 Fetch Active Stores
  fetchStores: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      set({ stores: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
