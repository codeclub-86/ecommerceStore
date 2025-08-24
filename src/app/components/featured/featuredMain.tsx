import React from "react";
import FeatureSingle from "./featureSingle";

const categories = [
  {
    title: "TV & Audios",
    items: ["Smart Television", "QLED", "Speakers", "Soundbars"],
    image: "/fetured-item-1.png",
    alt: "TV and Audio products",
  },
  {
    title: "Headphones",
    items: ["Wireless", "Over-Ear", "In-Ear", "Gaming Headsets"],
    image: "/fetured-item-1.png",
    alt: "Headphones collection",
  },
  {
    title: "Laptops & Computers",
    items: ["Gaming Laptops", "Ultrabooks", "Monitors", "Accessories"],
    image: "/fetured-item-1.png",
    alt: "Laptop and computer collection",
  },
  {
    title: "Cameras & Photography",
    items: ["DSLR", "Mirrorless", "Lenses", "Tripods"],
    image: "/fetured-item-1.png",
    alt: "Camera products",
  },
];

const FeaturedMain = () => {
  return (
    <section className="w-full py-12 px-6 lg:px-12 ">
      {/* Section Header */}
      <header className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Featured Categories
        </h2>
        <div className="w-12 h-1 mt-4 mx-auto rounded bg-blue-600"></div>
        <p className="max-w-lg mx-auto mt-6 text-gray-500">
          Discover our handpicked categories with top products and exclusive
          deals.
        </p>
      </header>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <FeatureSingle key={index} {...category} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedMain;
