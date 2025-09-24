import React from "react";
import FeatureSingle from "./featureSingle";

const categories = [
  {
    title: "Men's Clothing",
    items: ["T-Shirts", "Shirts", "Jeans", "Jackets"],
    image: "/p4.jpeg",
    alt: "Men's clothing collection",
  },
  {
    title: "Women's Clothing",
    items: ["Dresses", "Tops", "Jeans", "Skirts"],
    image: "/p1.jpeg",
    alt: "Women's clothing collection",
  },
  {
    title: "Kids & Juniors",
    items: ["Boys", "Girls", "School Wear", "Casual Wear"],
    image: "/kids1.webp",
    alt: "Kids and juniors clothing",
  },
  {
    title: "Accessories",
    items: ["Bags", "Belts", "Hats", "Scarves"],
    image: "/acc1.webp",
    alt: "Fashion accessories",
  },
];

const FeaturedMain = () => {
  return (
    <section className="w-full py-16 px-6 lg:px-20 bg-gray-50">
      {/* Section Header */}
      <header className="text-center mb-14">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Featured Categories
        </h2>
        <div className="w-16 h-1 mt-4 mx-auto rounded bg-blue-600"></div>
        <p className="max-w-xl mx-auto mt-6 text-gray-600">
          Explore our curated categories with handpicked items and exclusive deals.
        </p>
      </header>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <FeatureSingle key={index} {...category} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedMain;
