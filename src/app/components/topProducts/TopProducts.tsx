"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/app/store/apiStore";
import Link from "next/link";

const ProductList = () => {
  const trendingProducts = useStore((state: any) => state.trendingProducts);
  const newProducts = useStore((state: any) => state.newArrivals);
  const topProducts = useStore((state: any) => state.topRatedProducts);
  const fetchTrendingProducts = useStore((state: any) => state.fetchTrendingProducts);
  const fetchNewProducts = useStore((state: any) => state.fetchNewArrivals);
  const fetchTopProducts = useStore((state: any) => state.fetchTopRatedProducts);
  const loading = useStore((state: any) => state.loading);
  const error = useStore((state: any) => state.error);

  useEffect(() => {
    fetchTrendingProducts();
    fetchNewProducts();
    fetchTopProducts();
  }, [fetchTrendingProducts, fetchNewProducts, fetchTopProducts]);

  const bestSellers = (trendingProducts || []).slice(0, 4);
  const newArrivals = (newProducts || []).slice(0, 4);
  const topRated = (topProducts || []).slice(0, 4);

  const sections = {
    "Best Sellers": bestSellers,
    "New Arrivals": newArrivals,
    "Top Rated": topRated,
  };

  return (
    <section className="w-full dark-bg-css px-6 lg:px-20 py-16">
      {loading ? (
        <p className="text-gray-400 text-center">Loading products...</p>
      ) : error ? (
        <p className="text-red-400 text-center">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Object.entries(sections).map(([section, items]: [string, any[]]) => (
            <div key={section} className="space-y-6 flex flex-col items-center">

              <div className="text-center w-full">
                <h2 className="text-lg font-bold text-yellow-400">{section}</h2>
                <div className="relative w-full h-[1px] bg-gray-700 mt-2">
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-yellow-500 rounded"></span>
                </div>
              </div>

              {/* Reduced gap here */}
              <ul className="md:space-y-4 flex md:flex-col justify-center items-center gap-4 overflow-x-auto md:overflow-visible no-scrollbar">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <Link
                      key={index}
                      href={`/product-detail/${item._id || item.id || index}`}
                      className="block min-w-[200px] md:min-w-[220px] hover:bg-[#2a2828] p-3 rounded-lg transition text-center md:text-left"
                    >
                      <li className="flex items-center gap-4">
                        <Image
                          src={item.image || item.img || "/assets/product-1.jpg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-contain rounded-md border border-gray-700 shadow-sm"
                        />

                        <div>
                          <p className="text-sm font-medium text-gray-200 hover:text-yellow-400 hover:underline transition-colors">
                            {item.name}
                          </p>
                          <p className="text-gray-400 text-sm font-semibold">
                            Rs {item.price}
                          </p>
                        </div>
                      </li>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No products found.</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
