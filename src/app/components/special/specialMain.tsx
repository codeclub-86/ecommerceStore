"use client";
import React from "react";
import SpecialSingle from "../../../app/components/SpecialSingle";

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
    <section className="w-full flex flex-col justify-center items-center py-12 px-6 lg:px-20 gap-12 light-bg-css">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-yellow-400">
          Special Offers
        </h1>
        <div className="w-12 h-1 mt-4 rounded-lg bg-yellow-400"></div>
        <p className="max-w-lg mt-6 text-gray-200">
          Discover limited-time discounts on our latest clothing collection.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dummyProducts.map((product) => (
          <SpecialSingle key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default SpecialMain;
