"use client";
import React from "react";
import CartItem from "../components/cart/CartItem/CartItem";
import CartSummary from "../components/cart/CartSummary/CartSummary";
import CouponForm from "../components/cart/CouponForm/CouponForm";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ProtectedRoute from "../protected";
import { useCartStore } from "@/app/store/cartStore";

const CartPage: React.FC = () => {
  const { cart } = useCartStore();

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto p-6 space-y-6 mt-15 lg:px-25">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Cart", href: "/cart" },
            ]}
          />
        </div>

        {/* Cart Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 font-semibold border-b bg-gray-100 py-3 px-6 text-center">
            <span className="col-span-2 text-left">Product</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Action</span>
          </div>

          <div className="divide-y">
            {cart.length > 0 ? (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  variation={item.variation}
                />
              ))
            ) : (
              <p className="text-center py-6 text-gray-500">
                Your cart is empty
              </p>
            )}
          </div>
        </div>

        {/* Coupon + Summary */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-2/3">
            <CouponForm />
          </div>
          <CartSummary />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CartPage;
