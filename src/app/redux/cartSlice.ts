import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../types/cart";
import type { RootState } from "./store";

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const makeUid = (product: Product) => {
  const variantKey = product.variant
    ? Object.entries(product.variant)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}:${v}`)
        .join("|")
    : "";
  return `${product.id}${variantKey ? `__${variantKey}` : ""}`;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const uid = makeUid(product);
      const existing = state.items.find((i) => i.uid === uid);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, uid, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ uid: string }>) => {
      state.items = state.items.filter((i) => i.uid !== action.payload.uid);
    },
    increment: (state, action: PayloadAction<{ uid: string }>) => {
      const item = state.items.find((i) => i.uid === action.payload.uid);
      if (item) item.quantity += 1;
    },
    decrement: (state, action: PayloadAction<{ uid: string }>) => {
      const item = state.items.find((i) => i.uid === action.payload.uid);
      if (item) item.quantity = Math.max(1, item.quantity - 1);
    },
    setQuantity: (
      state,
      action: PayloadAction<{ uid: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.uid === action.payload.uid);
      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },
    clearCart: (state) => {
      state.items = [];
    },
    // Optional: for localStorage hydration
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increment,
  decrement,
  setQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;

/* ------------ Selectors ------------ */
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.quantity, 0)
);

export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);
