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

const CartItem: React.FC<CartItemProps> = ({
  id,
  image,
  name,
  price,
  quantity,
  variation,
}) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();

  const variationExtra =
    variation?.reduce((acc, v) => acc + Number(v.price ?? 0), 0) ?? 0;
  const totalPrice = (Number(price ?? 0) + variationExtra) * (quantity ?? 1);

  return (
    <div className="grid grid-cols-12 items-center gap-4 border-b border-gray-200 py-4 px-2 hover:bg-gray-50 transition-colors">
      {/* Image */}
      <div className="col-span-2 flex justify-center">
        <Image
          src={image || "/placeholder.png"}
          alt={name}
          width={64}
          height={64}
          className="rounded-md object-cover border border-gray-200"
        />
      </div>

      {/* Name & Variations */}
      <div className="col-span-4">
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        {variation && variation.length > 0 && (
          <div className="text-xs text-gray-500 mt-1 space-y-0.5">
            {variation.map((v, idx) => (
              <p key={idx}>
                {v.name}: {v.value}{" "}
                <span className="text-gray-400">
                  (+${Number(v.price ?? 0).toFixed(2)})
                </span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="col-span-3 flex items-center justify-center gap-2">
        <button
          onClick={() => decreaseQuantity(id)}
          className="p-1 border rounded-md hover:bg-gray-100 transition"
        >
          <Minus size={14} />
        </button>
        <span className="text-sm font-medium w-6 text-center">{quantity}</span>
        <button
          onClick={() => increaseQuantity(id)}
          className="p-1 border rounded-md hover:bg-gray-100 transition"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Price */}
      <div className="col-span-2 text-sm font-bold text-gray-800 text-center">
        ${totalPrice.toFixed(2)}
      </div>

      {/* Remove Button */}
      <div className="col-span-1 flex justify-center">
        <button
          onClick={() => removeFromCart(id)}
          className="p-1 hover:bg-red-100 rounded-full transition"
        >
          <X size={18} className="text-gray-500 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
