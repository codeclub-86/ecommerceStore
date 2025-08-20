"use client";
import React from "react";
import { ShoppingCart, Star } from "lucide-react";

const TrendingSingle = () => {
  return (
    <div className="">
      {/* Single Product */}
      <div className="border rounded-lg shadow-sm hover:shadow-lg transition bg-white group">
        {/* Product Image */}
        <div className="relative group overflow-hidden">
          <img
            src="/product-1.jpg"
            alt="Xiaomi Mi Band 5"
            className="w-full object-cover rounded-t-lg group-hover:scale-120 transition-all duration-300"
          />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <a
              href="/product-detail"
              className="inline-flex items-center gap-2 relative top-10 bg-blue-600 text-white px-2 py-2 hover:bg-black opacity-0 group-hover:opacity-100 group-hover:top-0 transition-all duration-200"
            >
              <ShoppingCart size={16} /> Add to Cart
            </a>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 text-start">
          <span className="block text-sm text-gray-500">Watches</span>
          <h4 className="font-semibold text-lg mt-1">
            <a
              href="/product-detail"
              className="hover:text-blue-600 transition"
            >
              Xiaomi Mi Band 5
            </a>
          </h4>

          {/* Reviews */}
          <ul className="flex items-center justify-start gap-1 mt-2 text-yellow-500">
            <li>
              <Star size={16} fill="currentColor" />
            </li>
            <li>
              <Star size={16} fill="currentColor" />
            </li>
            <li>
              <Star size={16} fill="currentColor" />
            </li>
            <li>
              <Star size={16} fill="currentColor" />
            </li>
            <li>
              <Star size={16} />
            </li>
            <li>
              <span className="text-gray-500 text-sm ml-2">4.0 Review(s)</span>
            </li>
          </ul>

          {/* Price */}
          <div className="mt-2">
            <span className="text-blue-600 font-bold text-lg">$199.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSingle;
