"use client";
import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaRedoAlt } from "react-icons/fa";
import ReviewModal from "../components/review/ReviewModal";
import { FaStar } from "react-icons/fa";

export default function ProductDetails() {
  const [currentImage, setCurrentImage] = useState("/product-detail1.jpg");

  const images = ["/product-detail1.jpg", "/product-detail2.jpg"];

  const reviews = [
    { stars: 5, count: 38, total: 52 },
    { stars: 4, count: 10, total: 52 },
    { stars: 3, count: 3, total: 52 },
    { stars: 2, count: 1, total: 52 },
    { stars: 1, count: 0, total: 52 },
  ];
  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < count ? "text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <section className=" bg-gray-100 lg:px-25 lg:py-10 sm:px-10 sm:py-5">
      <div className="container mx-auto px-4">
        {/* Top Area */}
        <div className="bg-white p-10">
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
        <div className="bg-white p-10 mt-12 ">
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

        <div className="">
          <div className="flex flex-col md:flex-row p-6 bg-white shadow-md w-full mt-12">
            <div className="md:w-1/3 p-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                4.5 (Overall)
              </h2>
              <div className="space-y-4 w-full max-w-md">
                {reviews.map(({ stars, count, total }) => {
                  const percent = (count / total) * 100;
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      {/* Stars */}
                      <div className="flex text-yellow-400 min-w-[100px]">
                        {renderStars(stars)}
                      </div>

                      {/* Progress bar */}
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      {/* Count */}
                      <span className="text-gray-600 text-sm min-w-[40px] text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
              <ReviewModal></ReviewModal>
            </div>
            <div className="md:w-2/3 p-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Latest Reviews
              </h2>

              <div className="space-y-5">
                {[
                  {
                    name: "Jacob Hammond",
                    title: "Awesome quality for the price",
                    stars: 5,
                    date: "2 days ago",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
                    avatar: "https://via.placeholder.com/40",
                  },
                  {
                    name: "Alex Jaza",
                    title: "My husband loves his new...",
                    stars: 5,
                    date: "1 week ago",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
                    avatar: "https://via.placeholder.com/40",
                  },
                ].map((review, idx) => (
                  <div
                    key={idx}
                    className="flex items-start p-5 bg-white rounded-xl shadow-sm border hover:shadow-md transition"
                  >
                    {/* Avatar */}
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-900 font-medium">
                          {review.title}
                        </p>
                        <span className="text-xs text-gray-400">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.name}</p>
                      <div className="flex text-yellow-400 mt-1">
                        {renderStars(review.stars)}
                      </div>
                      <p className="text-gray-500 text-sm mt-2">
                        {review.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
