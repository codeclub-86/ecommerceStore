import React from "react";
import Link from "next/link";

const CartSummary: React.FC = () => {
    return (
        <div className="border rounded-lg p-6 w-full md:w-1/3 bg-white shadow-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">Order Summary</h2>

            <div className="flex justify-between text-gray-600">
                <span>Cart Subtotal</span>
                <span className="font-medium">$2560.00</span>
            </div>

            <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
            </div>

            <div className="flex justify-between text-green-600">
                <span>You Save</span>
                <span className="font-medium">-$29.00</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold text-gray-800 text-lg">
                <span>You Pay</span>
                <span>$2531.00</span>
            </div>

            <div className="space-y-3 pt-2">
                <Link href="/checkout" className="block">
                    <button className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition">
                        Checkout
                    </button>
                </Link>
                <Link href="/productListing" className="block">
                    <button className="w-full cursor-pointer bg-gray-900 text-white py-3 rounded-md font-medium hover:bg-gray-800 transition">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CartSummary;
