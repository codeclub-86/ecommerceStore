"use client";

import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaRedoAlt } from "react-icons/fa";

export default function ProductDetails() {
  const [currentImage, setCurrentImage] = useState("/product-detail1.jpg");

  const images = ["/product-detail1.jpg", "/product-detail2.jpg"];

  return (
    <section className=" bg-white lg:px-25 lg:py-10 sm:px-10 sm:py-5">
      <div className="container mx-auto px-4">
        {/* Top Area */}
        <div className="bg-gray-50 p-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <div className="lg:w-1/2 w-full">
              <div className="flex flex-col">
                <div className="w-full border rounded-lg overflow-hidden">
                  <Image
                    src={currentImage}
                    alt="Product"
                    width={600}
                    height={600}
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  {images.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`Product ${idx}`}
                      width={80}
                      height={80}
                      onClick={() => setCurrentImage(img)}
                      className={`cursor-pointer border rounded-md p-1 hover:border-blue-500 transition ${
                        currentImage === img
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 w-full">
              <h2 className="text-2xl font-semibold text-gray-900">
                GoPro Karma Camera Drone
              </h2>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Category:</span>{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Action cameras
                </a>
              </p>
              <h3 className="text-3xl font-bold text-blue-600 mt-3">
                $850{" "}
                <span className="line-through text-gray-400 ml-2">$945</span>
              </h3>
              <p className="text-gray-700 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {/* Colors */}
                <div>
                  <label className="block font-medium mb-2">Choose color</label>
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-500 cursor-pointer border-2 border-transparent hover:border-gray-700"></span>
                    <span className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer border-2 border-transparent hover:border-gray-700"></span>
                    <span className="w-6 h-6 rounded-full bg-green-500 cursor-pointer border-2 border-transparent hover:border-gray-700"></span>
                    <span className="w-6 h-6 rounded-full bg-yellow-500 cursor-pointer border-2 border-transparent hover:border-gray-700"></span>
                  </div>
                </div>

                {/* Battery Capacity */}
                <div>
                  <label className="block font-medium mb-2">
                    Battery Capacity
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200">
                    <option>5100 mAh</option>
                    <option>6200 mAh</option>
                    <option>8000 mAh</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block font-medium mb-2">Quantity</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                  <FaRedoAlt /> Compare
                </button>
                <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                  <FaHeart /> Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-gray-50 p-10 mt-12 ">
          <div className="pt-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Details & Features */}
              <div>
                <h4 className="text-xl font-semibold mb-3">Details</h4>
                <p className="text-gray-700 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <h4 className="text-xl font-semibold mb-3">Features</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Capture 4K30 Video and 12MP Photos</li>
                  <li>Game-Style Controller with Touchscreen</li>
                  <li>View Live Camera Feed</li>
                  <li>Full Control of HERO6 Black</li>
                  <li>Use App for Dedicated Camera Operation</li>
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h4 className="text-xl font-semibold mb-3">Specifications</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">Weight:</span> 35.5oz (1006g)
                  </li>
                  <li>
                    <span className="font-medium">Maximum Speed:</span> 35 mph
                    (15 m/s)
                  </li>
                  <li>
                    <span className="font-medium">Maximum Distance:</span> Up to
                    9,840ft (3,000m)
                  </li>
                  <li>
                    <span className="font-medium">Operating Frequency:</span>{" "}
                    2.4GHz
                  </li>
                  <li>
                    <span className="font-medium">Manufacturer:</span> GoPro,
                    USA
                  </li>
                </ul>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Shipping Options:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">Courier:</span> 2 - 4 days,
                    $22.50
                  </li>
                  <li>
                    <span className="font-medium">Local Shipping:</span> up to
                    one week, $10.00
                  </li>
                  <li>
                    <span className="font-medium">UPS Ground Shipping:</span> 4
                    - 6 days, $18.00
                  </li>
                  <li>
                    <span className="font-medium">Unishop Global Export:</span>{" "}
                    3 - 4 days, $25.00
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React from "react";

const page = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default page;
