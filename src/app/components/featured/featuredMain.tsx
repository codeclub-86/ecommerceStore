"use client";

import React from "react";
import FeatureSingle from "./featureSingle";

const categories = [
  {
    title: "Men's Clothing",
    image: "/p4.jpeg",
    alt: "Men's clothing collection",
  },
  {
    title: "Women's Clothing",
    image: "/p1.jpeg",
    alt: "Women's clothing collection",
  },
  {
    title: "Kids & Juniors",
    image: "/kids1.webp",
    alt: "Kids and juniors clothing",
  },
  {
    title: "Accessories",
    image: "/acc1.webp",
    alt: "Fashion accessories",
  },
];

const FeaturedMain = () => {
  return (
    <section className="light-bg-css w-full py-16 px-6 lg:px-20" >
      {/* Section Header */}
      <header className="text-center mb-14">
        <h2 className="text-3xl lg:text-4xl font-bold text-white">
          Featured Categories
        </h2>
        {/* <div className="w-20 h-1 mt-4 mx-auto rounded bg-yellow-400"></div> */}
        <p className="max-w-xl mx-auto mt-6 text-gray-200">
          Explore our top categories handpicked for you.
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
