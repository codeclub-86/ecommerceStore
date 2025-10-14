"use client";
import React, { useEffect } from "react";
import SpecialSingle from "@/app/components/SpecialSingle";
import { useStore } from "@/app/store/apiStore";

const SpecialMain = () => {
  const { saleProducts, fetchSaleProducts, loading, error } = useStore();

  useEffect(() => {
    fetchSaleProducts();
  }, [fetchSaleProducts]);

  return (
    <section className="w-full flex flex-col justify-center items-center py-12 px-6 lg:px-20 gap-12 light-bg-css">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-white">
          Special Offers
        </h1>
        <div className="w-12 h-1 mt-4 rounded-lg bg-yellow-400"></div>
        <p className="max-w-lg mt-6 text-gray-200">
          Discover limited-time discounts on our latest clothing collection.
        </p>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-gray-400">Loading special offers...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid gap-6 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {saleProducts && saleProducts.length > 0 ? (
            saleProducts.map((product: any) => (
              <SpecialSingle
                key={product.id}
                id={String(product.id)}
                name={product.name}
                price={Number(product.price)}
                sale_price={product.sale_price}
                image={product.image || "/fallback.png"}
                category={product.category || "General"}
                status={product.status}
                rating={product.rating || 4.5}
              />
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No special offers available right now.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default SpecialMain;
