import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
    userId?: string;
    setUserId: (id: string) => void;
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    loadUserCart: (id: string) => void; // ✅ new function
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            userId: undefined,

            setUserId: (id) => set({ userId: id }),

            // ✅ Load saved cart for specific user
            loadUserCart: (id) => {
                const data = localStorage.getItem(`cart-${id}`);
                if (data) {
                    const parsed = JSON.parse(data);
                    set({ cart: parsed.cart || [], userId: id });
                } else {
                    set({ cart: [], userId: id });
                }
            },

            addToCart: (item) =>
                set((state) => {
                    const existing = state.cart.find((c) => c.id === item.id);
                    let updatedCart: CartItem[];

                    if (existing) {
                        updatedCart = state.cart.map((c) =>
                            c.id === item.id
                                ? { ...c, quantity: (c.quantity ?? 1) + 1 }
                                : c
                        );
                    } else {
                        updatedCart = [
                            ...state.cart,
                            { ...item, price: Number(item.price ?? 0), quantity: 1 },
                        ];
                    }

                    // ✅ Save cart per user
                    if (state.userId) {
                        localStorage.setItem(
                            `cart-${state.userId}`,
                            JSON.stringify({ cart: updatedCart })
                        );
                    }

                    return { cart: updatedCart };
                }),

            removeFromCart: (id) =>
                set((state) => {
                    const updated = state.cart.filter((item) => item.id !== id);
                    if (state.userId) {
                        localStorage.setItem(
                            `cart-${state.userId}`,
                            JSON.stringify({ cart: updated })
                        );
                    }
                    return { cart: updated };
                }),

            clearCart: () => {
                const { userId } = get();
                if (userId) {
                    localStorage.removeItem(`cart-${userId}`);
                }
                set({ cart: [] });
            },

            increaseQuantity: (id) =>
                set((state) => {
                    const updated = state.cart.map((item) =>
                        item.id === id
                            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                            : item
                    );
                    if (state.userId) {
                        localStorage.setItem(
                            `cart-${state.userId}`,
                            JSON.stringify({ cart: updated })
                        );
                    }
                    return { cart: updated };
                }),

            decreaseQuantity: (id) =>
                set((state) => {
                    const updated = state.cart.map((item) =>
                        item.id === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                    if (state.userId) {
                        localStorage.setItem(
                            `cart-${state.userId}`,
                            JSON.stringify({ cart: updated })
                        );
                    }
                    return { cart: updated };
                }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
