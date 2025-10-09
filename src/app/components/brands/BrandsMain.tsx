"use client";
import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import BrandsSingle from "./BrandsSingle";
import { useStore } from "@/app/store/apiStore"; // adjust path if needed

const BrandsMain: React.FC = () => {
  const autoplay = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  // ✅ Select values individually to avoid creating a new object each render
  const stores = useStore((state) => state.stores);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const fetchStores = useStore((state) => state.fetchStores);

  useEffect(() => {
    fetchStores(); // fetch stores when component mounts
  }, []);

  return (
    <section className="w-full bg-gray-50 py-16">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Popular Brands</h2>
        <div className="relative w-16 h-[2px] bg-blue-600 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Carousel */}
      <div className="mt-12 max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading stores...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <Carousel
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            className="w-full"
          >
            <CarouselContent>
              {(stores.length > 0 ? stores : []).map(
                (store: any, index: number) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                  >
                    <BrandsSingle
                      logo={
                        store.logo
                          ? `${process.env.NEXT_PUBLIC_IMG_URL}/logos/${store.logo}`
                          : ""
                      }
                      name={store.name}
                    />
                  </CarouselItem>
                )
              )}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default BrandsMain;
