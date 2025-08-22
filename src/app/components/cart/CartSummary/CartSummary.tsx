import React from "react";
import Link from "next/link";

const CartSummary: React.FC = () => {
    return (
        <div className="border rounded-lg p-6 space-y-3 w-full md:w-1/3">
            <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span>$2560.00</span>
            </div>
            <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div className="flex justify-between text-green-600">
                <span>You Save</span>
                <span>$30.00</span>
            </div>
            <div className="flex justify-between font-semibold">
                <span>You Pay</span>
                <span>$2531.00</span>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Checkout
            </button>
            <Link href="/productListing">
                <button className="w-full border border-gray-400 py-2 rounded-lg hover:bg-gray-100">
                    Continue Shopping
                </button>
            </Link>
        </div>
    );
};

export default CartSummary;
