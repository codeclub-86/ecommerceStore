"use client";
import React from "react";
import { useCartStore } from "@/app/store/cartStore";
import Image from "next/image";
import Link from "next/link";

const CartSummary = () => {
    const { cart } = useCartStore();

    const subtotal = cart.reduce((sum, item) => {
        const variationExtra =
            item.variation?.reduce((acc, v) => acc + Number(v.price ?? 0), 0) ?? 0;
        const basePrice = Number(item.price ?? 0);
        return sum + (basePrice + variationExtra) * (item.quantity ?? 1);
    }, 0);

    return (
        <div className="w-full md:w-1/3 border rounded-lg shadow-lg p-5 bg-white">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cart.length > 0 ? (
                    cart.map((item) => {
                        const variationExtra =
                            item.variation?.reduce(
                                (acc, v) => acc + Number(v.price ?? 0),
                                0
                            ) ?? 0;
                        const basePrice = Number(item.price ?? 0);
                        const total = (basePrice + variationExtra) * (item.quantity ?? 1);

                        return (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 border-b pb-3"
                            >
                                <Image
                                    src={item.image || "/placeholder.png"}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    className="rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{item.name}</p>
                                    {item.variation && item.variation.length > 0 && (
                                        <p className="text-xs text-gray-500">
                                            {item.variation.map((v) => `${v.name}: ${v.value}`).join(", ")}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        {item.quantity} × ${basePrice.toFixed(2)}
                                    </p>
                                </div>
                                <span className="text-sm font-semibold">${total.toFixed(2)}</span>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500 text-sm">
                        Your cart is empty
                    </p>
                )}
            </div>

            {/* Subtotal */}
            <div className="border-t pt-4 mt-4 flex justify-between text-base font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Link
                href="/checkout"
                className={`mt-4 block w-full text-center py-2 rounded-md font-medium transition ${cart.length > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
            >
                Proceed to Checkout
            </Link>
        </div>
    );
};

export default CartSummary;
