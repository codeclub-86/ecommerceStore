"use client";
import React from "react";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/app/store/cartStore";

interface Variation {
  name: string;
  value: string;
  price?: number;
}

interface CartItemProps {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  variation?: Variation[];
}

const CartTable: React.FC = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartStore();

  // total amount of all items
  const grandTotal = cart.reduce((acc, item) => {
    const variationExtra =
      item.variation?.reduce((sum, v) => sum + Number(v.price ?? 0), 0) ?? 0;
    const totalItemPrice = (Number(item.price) + variationExtra) * item.quantity;
    return acc + totalItemPrice;
  }, 0);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <table className="w-full border-collapse">
        {/* Table Head */}
        <thead className="bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
          <tr>
            <th className="px-4 py-3 text-center">Image</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Variations</th>
            <th className="px-4 py-3 text-center">Quantity</th>
            <th className="px-4 py-3 text-center">Price</th>
            <th className="px-4 py-3 text-center">Remove</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {cart.length > 0 ? (
            cart.map((item: CartItemProps) => {
              const variationExtra =
                item.variation?.reduce(
                  (sum, v) => sum + Number(v.price ?? 0),
                  0
                ) ?? 0;
              const totalPrice =
                (Number(item.price) + variationExtra) * item.quantity;

              return (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  {/* Image */}
                  <td className="px-4 py-3 text-center">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover border border-gray-200 dark:border-gray-700 mx-auto"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {item.name}
                  </td>

                  {/* Variations */}
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {item.variation && item.variation.length > 0 ? (
                      <div className="space-y-0.5">
                        {item.variation.map((v, idx) => (
                          <p key={idx}>
                            {v.name}: {v.value}{" "}
                            {v.price ? (
                              <span className="text-gray-400 dark:text-gray-500">
                                (+ ${Number(v.price).toFixed(2)})
                              </span>
                            ) : null}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <span className="italic text-gray-400 dark:text-gray-600">
                        —
                      </span>
                    )}
                  </td>

                  {/* Quantity */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        <Minus
                          size={14}
                          className="text-gray-600 dark:text-gray-300"
                        />
                      </button>
                      <span className="text-sm font-medium w-7 text-center text-gray-800 dark:text-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        <Plus
                          size={14}
                          className="text-gray-600 dark:text-gray-300"
                        />
                      </button>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">
                    Rs {totalPrice.toFixed(2)}
                  </td>

                  {/* Remove Button */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full p-1.5 hover:bg-red-100 dark:hover:bg-red-900 transition"
                    >
                      <X
                        size={18}
                        className="text-gray-400 hover:text-red-500"
                      />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
              >
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>

        {/* Table Footer */}
        {cart.length > 0 && (
          <tfoot>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <td colSpan={4}></td>
              <td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">
                Total: Rs {grandTotal.toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default CartTable;
