"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart, Star, Heart } from "lucide-react";
import Link from "next/link";

interface TrendingSingleProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
}

const TrendingSingle: React.FC<TrendingSingleProps> = ({
  id,
  name,
  price,
  image,
  category = "Watches",
  rating = 4,
}) => {
  return (
    <Link
      href={`/product-detail/${id}`}
      className="border rounded-lg shadow-sm hover:shadow-lg transition bg-white group relative"
    >
      {/* Wishlist Button */}
      <button
        aria-label="Add to Wishlist"
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow hover:bg-red-50 transition"
      >
        <Heart
          size={18}
          className="text-gray-500 hover:text-red-500 transition"
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="w-full object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-2 relative top-10 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-black opacity-0 group-hover:opacity-100 group-hover:top-0 transition-all duration-300">
            <ShoppingCart size={16} /> Add to Cart
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 text-start">
        <span className="block text-sm text-gray-500">{category}</span>
        <h4 className="font-semibold text-lg mt-1">
          <span className="hover:text-blue-600 transition">{name}</span>
        </h4>

        {/* Reviews */}
        <ul className="flex items-center gap-1 mt-2 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <Star
                size={16}
                fill={i < rating ? "currentColor" : "none"}
                className={i < rating ? "text-yellow-500" : "text-gray-300"}
              />
            </li>
          ))}
          <li>
            <span className="text-gray-500 text-sm ml-2">
              {rating.toFixed(1)} Review(s)
            </span>
          </li>
        </ul>

        {/* Price */}
        <div className="mt-2">
          <span className="text-blue-600 font-bold text-lg">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TrendingSingle;
