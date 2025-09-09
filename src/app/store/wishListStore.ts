import { create } from "zustand";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
}

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  addToWishlist: (item) =>
    set((state) => {
      if (state.items.find((p) => p.id === item.id)) {
        return state;
      }
      return { items: [...state.items, item] };
    }),

  removeFromWishlist: (id) =>
    set((state) => ({
      items: state.items.filter((p) => p.id !== id),
    })),

  isInWishlist: (id) => {
    return get().items.some((p) => p.id === id);
  },
}));
