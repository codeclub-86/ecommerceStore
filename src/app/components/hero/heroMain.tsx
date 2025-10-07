"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroImages = [
  { src: "/slider-bg1.jpg", alt: "Men's fashion banner" },
  { src: "/slider-bg2.jpg", alt: "Women's fashion banner" },
  { src: "/slider-bnr.jpg", alt: "Kids fashion banner" },
  // { src: "/hero4.jpg", alt: "Accessories collection" },
];

const HeroMain = () => {
  const plugin = useRef(
    Autoplay({
      delay: 4000, // 4 seconds
      stopOnInteraction: false,
    })
  );

  return (
    <section className="relative w-full bg-gray-900">
      <div className="max-w-6xl mx-auto py-6 px-4">
        <Carousel
          className="relative group rounded-xl overflow-hidden shadow-lg"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {heroImages.map((img, idx) => (
              <CarouselItem key={idx}>
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority
                    className="object-cover brightness-[0.9] hover:brightness-100 transition duration-500"
                    sizes="100vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="absolute top-1/2 left-3 -translate-y-1/2 bg-yellow-400/90 text-black hover:bg-yellow-300 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition" />
          <CarouselNext className="absolute top-1/2 right-3 -translate-y-1/2 bg-yellow-400/90 text-black hover:bg-yellow-300 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition" />
        </Carousel>
      </div>
    </section>
  );
};

export default HeroMain;
