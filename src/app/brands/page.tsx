"use client";
import React from "react";
import Image from "next/image";

const brands = [
  {
    id: 1,
    name: "Nike",
    logo: "/brand-1.png",
  },
  {
    id: 2,
    name: "Adidas",
    logo: "/brands/adidas.png",
  },
  {
    id: 3,
    name: "Puma",
    logo: "/brands/puma.png",
  },
  {
    id: 4,
    name: "Reebok",
    logo: "/brands/reebok.png",
  },
  {
    id: 5,
    name: "Apple",
    logo: "/brands/apple.png",
  },
  {
    id: 6,
    name: "Samsung",
    logo: "/brands/samsung.png",
  },
];

const BrandsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Title */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
          Our Brands
        </h1>
        <p className="mt-2 text-gray-200 text-lg">
          Explore the world’s leading brands we collaborate with
        </p>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-24 h-24">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-blue-600">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
