import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  userId?: string;
  setUserId: (id: string) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  loadUserWishlist: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      userId: undefined,

      setUserId: (id) => set({ userId: id }),

      loadUserWishlist: (id) => {
        const data = localStorage.getItem(`wishlist-${id}`);
        if (data) {
          const parsed = JSON.parse(data);
          set({ items: parsed.items || [], userId: id });
        } else {
          set({ items: [], userId: id });
        }
      },

      addToWishlist: (item) =>
        set((state) => {
          if (state.items.find((p) => p.id === item.id)) return state;
          const updated = [...state.items, item];

          if (state.userId) {
            localStorage.setItem(
              `wishlist-${state.userId}`,
              JSON.stringify({ items: updated })
            );
          }

          return { items: updated };
        }),

      removeFromWishlist: (id) =>
        set((state) => {
          const updated = state.items.filter((p) => p.id !== id);
          if (state.userId) {
            localStorage.setItem(
              `wishlist-${state.userId}`,
              JSON.stringify({ items: updated })
            );
          }
          return { items: updated };
        }),

      clearWishlist: () => {
        const { userId } = get();
        if (userId) localStorage.removeItem(`wishlist-${userId}`);
        set({ items: [] });
      },

      isInWishlist: (id) => get().items.some((p) => p.id === id),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
