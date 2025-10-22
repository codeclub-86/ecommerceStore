"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Define the Product type
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const HeroMain = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    })
  );

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products/status/featured");
        const data = await res.json();
        if (data.success) {
          setFeaturedProducts(data.data);
        }
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <section className="relative w-full dark-bg-css">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <Carousel
          className="relative group rounded-xl overflow-hidden shadow-lg"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {featuredProducts.map((product, idx) => (
              <CarouselItem key={idx}>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 p-6 md:p-10 bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-xl">
                  {/* Left: Product Details */}
                  <div className="flex flex-col justify-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">{product.name}</h2>
                    <div
                      className="text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    <p className="text-yellow-400 text-2xl font-semibold">
                      Rs {product.price}
                    </p>
                    <Link
                      href={`/product-detail/${product.id}`}
                      className="w-fit bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
                    >
                      Buy Now
                    </Link>
                  </div>

                  {/* Right: Product Image */}
                  <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-xl shadow-lg brightness-[0.95] hover:brightness-100 transition duration-500"
                      sizes="100vw"
                    />
                  </div>
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
