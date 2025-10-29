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
    <section className="w-full dark-bg-css px-4 sm:px-6 lg:px-20 py-12">
      {loading ? (
        <p className="text-gray-400 text-center">Loading products...</p>
      ) : error ? (
        <p className="text-red-400 text-center">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Object.entries(sections).map(([section, items]: [string, any[]]) => (
            <div key={section} className="w-full">
              <div className="text-center w-full mb-6">
                <h2 className="text-lg font-bold text-yellow-400">{section}</h2>
                <div className="relative w-full h-[1px] bg-gray-700 mt-2">
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-yellow-500 rounded"></span>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-4 w-full">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <Link
                      key={index}
                      href={`/product-detail/${item._id || item.id || index}`}
                      className="p-3 rounded-lg transition bg-[#1c1a1a] hover:bg-[#2a2828] w-full border border-gray-800 min-h-[90px] flex"
                    >
                      <li className="flex items-center gap-3 w-full">
                        <div className="w-[70px] h-[70px] flex justify-center items-center bg-[#111] rounded-md border border-gray-700 overflow-hidden shrink-0">
                          <Image
                            src={item.image || "/assets/product-1.jpg"}
                            alt={item.name}
                            width={70}
                            height={70}
                            className="object-contain"
                          />
                        </div>

                        <div className="flex flex-col justify-center w-full">
                          <p className="text-sm font-medium text-gray-200 hover:text-yellow-400 hover:underline line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-gray-400 text-sm font-semibold mt-1">
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
