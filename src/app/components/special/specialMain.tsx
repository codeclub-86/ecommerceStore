"use client";
import React from "react";
import TrendingSingle from "../productCard/card";

const dummyProducts = [
  { id: "1", name: "Men's Casual T-Shirt", price: 25, image: "/p1.jpeg" },
  { id: "2", name: "Women's Summer Dress", price: 40, image: "/p3.jpeg" },
  { id: "3", name: "Men's Slim Fit Jeans", price: 55, image: "/p5.jpeg" },
  { id: "4", name: "Women's Denim Jacket", price: 65, image: "/p2.jpeg" },
  { id: "5", name: "Men's Hoodie", price: 45, image: "/p4.jpeg" },
  { id: "6", name: "Women's Blouse", price: 35, image: "/p3.jpeg" },
];

const SpecialMain = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center py-12 px-6 lg:px-20 gap-12 bg-gray-100">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
          Special Offer
        </h1>
        <div className="w-12 h-1 mt-4 rounded-lg bg-blue-600"></div>
        <p className="max-w-lg mt-6 text-gray-500">
          Discover limited-time discounts on our latest clothing collection.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {dummyProducts.map((product) => (
          <TrendingSingle key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default SpecialMain;
