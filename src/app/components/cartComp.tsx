"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  href: string;
}

export default function CartDropdown() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Apple Watch Series 6",
      price: 99.0,
      quantity: 1,
      image: "/item1.jpg",
      href: "/product-details/1",
    },
    {
      id: 2,
      name: "Wi-Fi Smart Camera",
      price: 35.0,
      quantity: 1,
      image: "/item2.jpg",
      href: "/product-details/2",
    },
  ]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="relative group">
      {/* Cart Icon */}
      <Link
        href="/cart"
        className="relative p-2 h-10 w-10 rounded-full flex items-center justify-center border hover:bg-black transition-all duration-200"
      >
        <ShoppingCart
          size={22}
          className="text-gray-700 group-hover:text-white"
        />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full px-1">
            {cartItems.length}
          </span>
        )}
      </Link>

      {/* Dropdown */}
      <div
        className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg 
        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
        transform group-hover:translate-y-1 transition-all duration-200 z-50"
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between text-sm">
          <span>{cartItems.length} Item(s)</span>
          <Link href="/cart" className="text-blue-600 hover:underline">
            View Cart
          </Link>
        </div>

        {/* Items */}
        {cartItems.length > 0 ? (
          <ul className="max-h-64 overflow-auto">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 p-4 border-b hover:bg-gray-50"
              >
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold line-clamp-1">
                    <Link href={item.href}>{item.name}</Link>
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.quantity}x - ${item.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500 text-sm">
            Your cart is empty 🛒
          </div>
        )}

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
