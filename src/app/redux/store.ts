import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from "./cartSlice";

const CART_KEY = "redux_cart_v1";

const loadCartState = (): { cart: CartState } | undefined => {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as CartState;
    return { cart: parsed };
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadCartState(),
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState().cart;
    localStorage.setItem(CART_KEY, JSON.stringify(state));
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
