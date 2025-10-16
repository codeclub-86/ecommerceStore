"use client";

import React, { useEffect, useState } from "react";
import FeatureSingle from "./featureSingle";

type ApiCategory = {
  parent_category: string;
  parent_image: string;
  categories: {
    id: number;
    category_name: string;
  }[];
};

const FeaturedMain = () => {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/getCategories");
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="light-bg-css w-full py-16 px-6 lg:px-20 text-center text-white">
        Loading categories...
      </section>
    );
  }

  return (
    <section className="light-bg-css w-full py-16 px-6 lg:px-20">
      <header className="text-center mb-14">
        <h2 className="text-3xl lg:text-4xl font-bold text-white">
          Featured Categories
        </h2>
        <p className="max-w-xl mx-auto mt-6 text-gray-200">
          Explore our top categories handpicked for you.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((item, index) => (
          <FeatureSingle
            key={index}
            title={item.parent_category}
            image={item.parent_image}
            alt={item.parent_category}
            slug={item.categories[0]?.category_name || item.parent_category}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedMain;
