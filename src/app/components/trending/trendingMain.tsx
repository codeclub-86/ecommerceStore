"use client";

import React, { useEffect } from "react";
import TrendingSingle from "../productCard/card";
import { useStore } from "@/app/store/apiStore";

const TrendingMain = () => {
  const trendingProducts = useStore((state: any) => state.trendingProducts);
  const loading = useStore((state: any) => state.loading);
  const error = useStore((state: any) => state.error);
  const fetchTrendingProducts = useStore(
    (state: any) => state.fetchTrendingProducts
  );

  useEffect(() => {
    fetchTrendingProducts();
  }, [fetchTrendingProducts]);

  return (
    <section className="w-full flex flex-col justify-center items-center py-12 px-6 lg:px-20 gap-12 bg-gray-800">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-white">Trending Products</h1>
        <div className="w-12 h-1 mt-4 rounded-lg bg-yellow-400"></div>
        <p className="max-w-lg text-center mt-6 text-gray-300">
          Explore our trending products, carefully selected for quality and
          popularity.
        </p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-gray-300">Loading trending products...</p>
      ) : error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : (
        <div
          className="
            grid gap-6 w-full
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {trendingProducts && trendingProducts.length > 0 ? (
            trendingProducts.map((product: any) => (
              <TrendingSingle key={product.id} {...product} />
            ))
          ) : (
            <p className="text-gray-300">No trending products available.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default TrendingMain;
