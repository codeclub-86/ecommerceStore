"use client";

import React from "react";
import CartItem from "../components/cart/CartItem/CartItem";
import CartSummary from "../components/cart/CartSummary/CartSummary";
import CouponForm from "../components/cart/CouponForm/CouponForm";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

const CartPage: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6  mt-15 lg:px-25">

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

            {/* Cart Table Header */}
            <div className="grid grid-cols-5 font-semibold border-b pb-2">
                <span className="col-span-2">Product Name</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span>Discount</span>
            </div>

            {/* Cart Items */}
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

            {/* Coupon + Summary */}
            <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="w-full md:w-2/3">
                    <CouponForm />
                </div>
                <CartSummary />
            </div>
        </div>
    );
};

export default CartPage;
