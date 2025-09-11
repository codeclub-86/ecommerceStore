import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
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

      isInWishlist: (id) => get().items.some((p) => p.id === id),
    }),
    {
      name: "wishlist-storage",
    }
  )
);
