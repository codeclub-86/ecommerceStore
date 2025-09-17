// app/store/cartStore.ts
import { create } from "zustand";

interface CartItem {
    id: number;
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
    removeFromCart: (id: number, variationValue?: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],

    addToCart: (item) =>
        set((state) => {
            // check if same product + same variation exists
            const existingIndex = state.cart.findIndex(
                (cartItem) =>
                    cartItem.id === item.id &&
                    cartItem.variation?.value === item.variation?.value
            );

            if (existingIndex > -1) {
                // ✅ increase qty for same product + same variation
                const updatedCart = [...state.cart];
                updatedCart[existingIndex].quantity += 1;
                return { cart: updatedCart };
            } else {
                // ✅ different product OR different variation → new entry
                return { cart: [...state.cart, { ...item, quantity: 1 }] };
            }
        }),

    removeFromCart: (id, variationValue) =>
        set((state) => ({
            cart: state.cart.filter(
                (item) =>
                    !(item.id === id && item.variation?.value === variationValue)
            ),
        })),

    clearCart: () => set({ cart: [] }),
}));
