"use client";
import React from "react";
import CartTable from "../components/cart/CartItem/CartItem";
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
        <CartTable />

        {/* Coupon + Summary */}
        {cart.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <CartSummary />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default CartPage;
