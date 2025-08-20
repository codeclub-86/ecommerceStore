"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import BrandsSingle from "./BrandsSingle";

const BrandsMain = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // Example logos
  const brands = [
    "/brand-1.png",
    "/brand-1.png",
    "/brand-1.png",
    "/brand-1.png",
    "/brand-1.png",
    "/brand-1.png",
    "/brand-1.png",
    "/brand-1.png",
    "/brand-1.png",
    "/brand-1.png",
  ];

  return (
    <div className="w-full bg-gray-50 py-15">
      {/* Section Title */}
      <h2 className="text-center text-2xl  text-gray-800">Popular Brands</h2>

      {/* Carousel */}
      <div className="mt-12 max-w-5xl mx-auto">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full"
        >
          <CarouselContent className="">
            {brands.map((logo, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <BrandsSingle logo={logo} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default BrandsMain;
