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
    <div className="flex items-center justify-between border-b py-3">
      <div className="flex items-center space-x-3">
        <Image
          src={image || "/placeholder.png"}
          alt={name}
          width={60}
          height={60}
          className="rounded"
        />
        <div>
          <p className="text-sm font-medium">{name}</p>
          {variation && variation.length > 0 && (
            <div className="text-xs text-gray-500">
              {variation.map((v, idx) => (
                <p key={idx}>
                  {v.name}: {v.value} (+${Number(v.price ?? 0).toFixed(2)})
                </p>
              ))}
            </div>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => decreaseQuantity(id)}
              className="p-1 border rounded"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              onClick={() => increaseQuantity(id)}
              className="p-1 border rounded"
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="text-sm font-semibold mt-1">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      <button onClick={() => removeFromCart(id)}>
        <X size={16} className="text-gray-500 hover:text-red-500" />
      </button>
    </div>
  );
};

export default CartItem;
