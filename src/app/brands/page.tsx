"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/apiStore";

const BrandsPage = () => {
  const router = useRouter();
  const { stores, fetchStores, loading, error } = useStore();

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <div className="min-h-screen light-bg-css">
      {/* Page Title */}
      <div className="bg-gradient-to-r dark-bg-css py-14 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-sm">
          Our Brands
        </h1>
        <p className="mt-3 text-gray-300 text-lg max-w-2xl mx-auto">
          Explore the world’s leading brands we collaborate with
        </p>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        {loading ? (
          <p className="text-center text-gray-500">Loading brands...</p>
        ) : error ? (
          <p className="text-center text-red-500 font-medium">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {stores.map((brand) => (
              <div
                key={brand.id}
                className="dark:bg-[#111827] rounded-2xl text-white border border-gray-800 hover:border-blue-500/60 shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center group cursor-pointer"
                onClick={() =>
                  router.push(
                    `/productListing?brand=${encodeURIComponent(brand.name)}`
                  )
                }
              >
                <div className="relative w-28 h-28 rounded-xl bg-white/5 backdrop-blur-sm p-2 shadow-inner group-hover:bg-white/10 transition-all">
                  <Image
                    src={
                      brand.logo
                        ? `${process.env.NEXT_PUBLIC_IMG_URL}logos/${brand.logo}`
                        : "/fallback-logo.png"
                    }
                    alt={brand.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <p className="mt-4 text-base font-semibold text-gray-200 group-hover:text-white transition-colors tracking-wide text-center">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsPage;
