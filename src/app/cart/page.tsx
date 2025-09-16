"use client";
import React, { useEffect } from "react";
import CartItem from "../components/cart/CartItem/CartItem";
import CartSummary from "../components/cart/CartSummary/CartSummary";
import CouponForm from "../components/cart/CouponForm/CouponForm";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ProtectedRoute from "../protected";
import { useRouter } from "next/navigation";
const CartPage: React.FC = () => {
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
          {/* Header */}
          <div className="grid grid-cols-6 font-semibold border-b bg-gray-100 py-3 px-6 text-center">
            <span className="col-span-2 text-left">Product</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Discount</span>
            <span>Action</span>
          </div>

          {/* Items */}
          <div className="divide-y">
            <CartItem
              image="/camera.png"
              title="Canon EOS M50 Mirrorless Camera"
              details={["Type: Mirrorless", "Color: Black"]}
              price="$910.00"
              discount="$29.00"
            />
            <CartItem
              image="/iphone.png"
              title="Apple iPhone X 256 GB Space Gray"
              details={["Memory: 256 GB", "Color: Space Gray"]}
              price="$1100.00"
            />
            <CartItem
              image="/printer.png"
              title="HP LaserJet Pro Laser Printer"
              details={["Type: Laser", "Color: White"]}
              price="$550.00"
            />
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
