"use client";
import React from "react";
import Image from "next/image";

const products = {
  "Best Sellers": [
    { name: "GoPro Hero4 Silver", price: "$287.99", img: "/product-1.jpg" },
    { name: "GoPro Hero4 Silver", price: "$287.99", img: "/product-1.jpg" },
    { name: "GoPro Hero4 Silver", price: "$287.99", img: "/product-1.jpg" },
  ],
  "New Arrivals": [
    { name: "GoPro Hero4 Silver", price: "$287.99", img: "/product-1.jpg" },
  ],
  "Top Rated": [
    {
      name: "Samsung Gear 360 VR Camera",
      price: "$68.00",
      img: "/product-1.jpg",
    },
  ],
};

const ProductList = () => {
  return (
    <section className="w-full bg-white px-6 lg:px-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {Object.entries(products).map(([section, items]) => (
          <div key={section} className="space-y-6">
            {/* Section Title */}
            <div>
              <h2 className="text-lg font-bold text-gray-900">{section}</h2>
              <div className="relative w-full h-[1px] bg-gray-200 mt-2">
                <span className="absolute bottom-0 left-0 w-16 h-[2px] bg-blue-600 rounded"></span>
              </div>
            </div>

            {/* Products */}
            <ul className="space-y-6">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-contain rounded-md border shadow-sm"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 hover:text-blue-600 hover:underline transition-colors cursor-pointer">
                      {item.name}
                    </p>
                    <p className="text-gray-500 text-sm font-semibold">
                      {item.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
