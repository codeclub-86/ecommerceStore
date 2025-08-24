"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import BrandsSingle from "./BrandsSingle";

const brands = [
  { name: "Apple", logo: "/brand-1.png" },
  { name: "Samsung", logo: "/brand-1.png" },
  { name: "Sony", logo: "/brand-1.png" },
  { name: "LG", logo: "/brand-1.png" },
  { name: "Bose", logo: "/brand-1.png" },
  { name: "Microsoft", logo: "/brand-1.png" },
  { name: "Asus", logo: "/brand-1.png" },
  { name: "HP", logo: "/brand-1.png" },
  { name: "Lenovo", logo: "/brand-1.png" },
  { name: "Dell", logo: "/brand-1.png" },
];

const BrandsMain: React.FC = () => {
  const autoplay = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  return (
    <section className="w-full bg-gray-50 py-16">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Popular Brands</h2>
        <div className="relative w-16 h-[2px] bg-blue-600 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Carousel */}
      <div className="mt-12 max-w-6xl mx-auto">
        <Carousel
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          className="w-full"
        >
          <CarouselContent>
            {brands.map((brand, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <BrandsSingle logo={brand.logo} name={brand.name} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default BrandsMain;
