import React from "react";
import { Trash2 } from "lucide-react";

interface CartItemProps {
  image: string;
  title: string;
  details: string[];
  price: string;
  discount?: string;
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  title,
  details,
  price,
  discount,
}) => {
  return (
    <div className="grid grid-cols-6 items-center px-6 py-4">
      {/* Product Info */}
      <div className="col-span-2 flex items-center gap-4 text-left">
        <img
          src={image}
          alt={title}
          className="w-20 h-20 object-contain rounded-md border border-gray-100 bg-gray-50"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          {details.map((d, i) => (
            <p key={i} className="text-sm text-gray-500">
              {d}
            </p>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="text-center">
        <select className="border px-2 py-1 rounded w-16 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>

      {/* Subtotal */}
      <div className="text-gray-700 font-medium text-center">{price}</div>

      {/* Discount */}
      <div className="text-gray-500 text-center">
        {discount ? discount : "—"}
      </div>

      {/* Remove Button */}
      <div className="text-center">
        <button className="text-red-500 hover:text-red-700 transition">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
