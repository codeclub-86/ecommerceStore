// app/store/cartStore.ts
import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
  variation?: { name: string; value: string; price?: number };
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.variation?.value === item.variation?.value
      );

      if (existing) {
        // If same product + same variation → increase quantity
        return {
          cart: state.cart.map((cartItem) =>
            cartItem === existing
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      } else {
        // Add new product
        return {
          cart: [...state.cart, { ...item, quantity: 1 }],
        };
      }
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ cart: [] }),
}));
