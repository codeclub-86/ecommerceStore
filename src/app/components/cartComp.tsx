"use client";
import React from "react";
import { useCartStore } from "@/app/store/cartStore";
import CartItem from "./cart/CartItem/CartItem";

const CartDropdown = () => {
  const { cart, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => {
    const variationExtra =
      item.variation?.reduce((acc, v) => acc + Number(v.price ?? 0), 0) ?? 0;
    const basePrice = Number(item.price ?? 0);
    return sum + (basePrice + variationExtra) * (item.quantity ?? 1);
  }, 0);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4">
      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-3">
              <button
                onClick={clearCart}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Clear Cart
              </button>
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
