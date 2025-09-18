import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Variation {
    name: string;
    value: string;
    price?: number;
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string;
    quantity: number;
    variation?: Variation[];
}

interface CartState {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],

            addToCart: (item) =>
                set((state) => {
                    const existing = state.cart.find((c) => c.id === item.id);
                    if (existing) {
                        return {
                            cart: state.cart.map((c) =>
                                c.id === item.id
                                    ? { ...c, quantity: (c.quantity ?? 1) + 1 }
                                    : c
                            ),
                        };
                    }
                    return {
                        cart: [
                            ...state.cart,
                            {
                                ...item,
                                price: Number(item.price ?? 0),
                                quantity: 1,
                            },
                        ],
                    };
                }),

            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== id),
                })),

            clearCart: () => set({ cart: [] }),

            increaseQuantity: (id) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id
                            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                            : item
                    ),
                })),

            decreaseQuantity: (id) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                })),
        }),
        {
            name: "cart-storage",
        }
    )
);
