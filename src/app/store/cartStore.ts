import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category?: string;
}


interface CartState {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (item) =>
                set((state) => {
                    const existing = state.items.find((p) => p.id === item.id);
                    if (existing) {
                        return {
                            items: state.items.map((p) =>
                                p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                            ),
                        };
                    }
                    return { items: [...state.items, { ...item, quantity: 1 }] };
                }),

            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter((p) => p.id !== id),
                })),

            increaseQuantity: (id) =>
                set((state) => ({
                    items: state.items.map((p) =>
                        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
                    ),
                })),

            decreaseQuantity: (id) =>
                set((state) => ({
                    items: state.items
                        .map((p) =>
                            p.id === id && p.quantity > 1
                                ? { ...p, quantity: p.quantity - 1 }
                                : p
                        )
                        .filter((p) => p.quantity > 0),
                })),

            clearCart: () => set({ items: [] }),

            totalItems: () => get().items.reduce((sum, p) => sum + p.quantity, 0),

            totalPrice: () =>
                get().items.reduce((sum, p) => sum + p.price * p.quantity, 0),
        }),
        {
            name: "cart-storage",
        }
    )
);
