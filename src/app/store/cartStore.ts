import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (item) =>
                set((state) => {
                    const normalizedItem = {
                        ...item,
                        price: Number(item.price) || 0,
                    };

                    const existing = state.cart.find(
                        (cartItem) =>
                            cartItem.id === normalizedItem.id &&
                            cartItem.variation?.value === normalizedItem.variation?.value
                    );

                    if (existing) {
                        return {
                            cart: state.cart.map((cartItem) =>
                                cartItem.id === normalizedItem.id &&
                                    cartItem.variation?.value === normalizedItem.variation?.value
                                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                    : cartItem
                            ),
                        };
                    } else {
                        return {
                            cart: [...state.cart, { ...normalizedItem, quantity: 1 }],
                        };
                    }
                }),

            removeFromCart: (id, variationValue) =>
                set((state) => ({
                    cart: state.cart.filter(
                        (item) =>
                            !(item.id === id && item.variation?.value === variationValue)
                    ),
                })),

            clearCart: () => set(() => ({ cart: [] })),
        }),
        {
            name: "cart-storage", // localStorage key
        }
    )
);

