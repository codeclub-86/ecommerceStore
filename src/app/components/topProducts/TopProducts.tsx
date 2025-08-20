"use client";
import React from "react";

const products = {
  "Best Sellers": [
    {
      name: "GoPro Hero4 Silver",
      price: "$287.99",
      img: "/product-1.jpg",
    },
    {
      name: "GoPro Hero4 Silver",
      price: "$287.99",
      img: "/product-1.jpg",
    },
    {
      name: "GoPro Hero4 Silver",
      price: "$287.99",
      img: "/product-1.jpg",
    },
  ],
  "New Arrivals": [
    {
      name: "GoPro Hero4 Silver",
      price: "$287.99",
      img: "/product-1.jpg",
    },
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
    <div className="w-full bg-white px-25 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(products).map(([section, items]) => (
          <div key={section}>
            {/* Section Title */}
            <h2 className="text-md pb-2">
              {section}
              <div className="relative w-full h-[0.5px] top-2 bg-gray-200">
                <span className="absolute bottom-0 left-0 w-16 h-[0.5px] bg-blue-600"></span>
              </div>
            </h2>

            {/* Products */}
            <ul className="mt-6 space-y-5">
              {items.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-md border"
                  />
                  <div>
                    <p className="text-sm text-gray-800 hover:text-blue-600 cursor-pointer">
                      {item.name}
                    </p>
                    <p className="text-gray-500 text-sm">{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
