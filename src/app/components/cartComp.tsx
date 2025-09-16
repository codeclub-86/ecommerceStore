"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/app/store/cartStore";
import { useEffect, useState } from "react";

// Product type from API
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  href: string;
}

export default function CartDropdown() {
  const { cart, removeFromCart } = useCartStore();
  const [products, setProducts] = useState<Record<string, Product>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      if (cart.length === 0) return;

      try {
        const map: Record<string, Product> = {};

        // Fetch each product individually
        await Promise.all(
          cart.map(async (item) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/getSingleProduct/${item.id}`
            );
            const data = await res.json();

            if (data.success && data.product) {
              const p = data.product;
              map[p.id] = {
                id: p.id,
                name: p.name,
                price: parseFloat(p.price), // since API returns string
                image: p.image,
                href: `/product-detail/${p.id}`,
              };
            }
          })
        );

        setProducts(map);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, [cart]);

  // Calculate total
  const total = cart.reduce((sum, item) => {
    const product = products[item.id];
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

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
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full px-1">
            {cart.length}
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
          <span>{cart.length} Item(s)</span>
          <Link href="/cart" className="text-blue-600 hover:underline">
            View Cart
          </Link>
        </div>

        {/* Items */}
        {cart.length > 0 ? (
          <ul className="max-h-64 overflow-auto">
            {cart.map((item) => {
              const product = products[item.id];
              if (!product) return null; // still loading
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-4 border-b hover:bg-gray-50"
                >
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold line-clamp-1">
                      <Link href={product.href}>{product.name}</Link>
                    </h4>
                    <p className="text-xs text-gray-500">
                      {item.quantity}x - ${product.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500 text-sm">
            Your cart is empty 🛒
          </div>
        )}

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
