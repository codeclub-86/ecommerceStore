"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/apiStore"; // adjust path if needed

const BrandsPage = () => {
  const router = useRouter();
  const { stores, fetchStores, loading, error } = useStore();

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Title */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
          Our Brands
        </h1>
        <p className="mt-2 text-gray-200 text-lg">
          Explore the world’s leading brands we collaborate with
        </p>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading brands...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {stores.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center group cursor-pointer"
                onClick={() => router.push(`/productListing?brand=${encodeURIComponent(brand.name)}`)} // ⬅️ optional navigation
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={
                      brand.logo
                        ? `${process.env.NEXT_PUBLIC_IMG_URL}logos/${brand.logo}`
                        : "/fallback-logo.png"
                    }
                    alt={brand.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-blue-600">
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
