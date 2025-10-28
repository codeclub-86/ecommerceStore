"use client";

import React, { useEffect, useRef } from "react";
import TrendingSingle from "../productCard/card";
import { useStore } from "@/app/store/apiStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const TrendingMain = () => {
  const router = useRouter();
  const trendingProducts = useStore((state: any) => state.trendingProducts);
  const loading = useStore((state: any) => state.loading);
  const error = useStore((state: any) => state.error);
  const fetchTrendingProducts = useStore(
    (state: any) => state.fetchTrendingProducts
  );

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchTrendingProducts();
  }, [fetchTrendingProducts]);

  const firstFive = trendingProducts?.slice(0, 5) || [];
  const rest = trendingProducts?.slice(5, 20) || [];

  const smoothScroll = (distance: number) => {
    if (!scrollRef.current) return;
    const element = scrollRef.current;

    const start = element.scrollLeft;
    const end = start + distance;
    const duration = 400;

    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out
      element.scrollLeft = start + (end - start) * ease;

      if (progress < 1) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  };

  const scrollLeft = () => smoothScroll(-300);
  const scrollRight = () => smoothScroll(300);

  const handleShowMore = () => {
    router.push("/productListing?trending=true");
  };

  return (
    <section className="w-full flex flex-col justify-center items-center py-12 px-6 lg:px-20 gap-12 dark-bg-css">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-white">Trending Products</h1>
        <p className="max-w-lg text-center mt-6 text-gray-300">
          Explore our trending products, carefully selected for quality and popularity.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-300">Loading trending products...</p>
      ) : error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : trendingProducts && trendingProducts.length > 0 ? (
        <>
          <div className="relative w-full py-6">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/3 -translate-y-1/3 bg-[#1e1e1e] text-white rounded-full p-2 hover:bg-[#2a2a2a] z-10"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              ref={scrollRef}
              className="w-full overflow-x-auto whitespace-nowrap no-scrollbar smooth-scroll"
            >
              <div className="flex gap-6">
                {firstFive.map((product: any) => (
                  <div
                    key={product.id}
                    className="inline-block min-w-[200px] sm:min-w-[220px] md:min-w-[250px] lg:min-w-[260px]"
                  >
                    <TrendingSingle {...product} />
                  </div>
                ))}
                {rest.map((product: any) => (
                  <div
                    key={product.id}
                    className="inline-block min-w-[200px] sm:min-w-[220px] md:min-w-[250px] lg:min-w-[260px]"
                  >
                    <TrendingSingle {...product} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/3 -translate-y-1/3 bg-[#1e1e1e] text-white rounded-full p-2 hover:bg-[#2a2a2a] z-10"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Show More Button */}
          <button
            onClick={handleShowMore}
            className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Show More
          </button>
        </>
      ) : (
        <p className="text-gray-300">No trending products available.</p>
      )}
    </section>
  );
};

export default TrendingMain;
