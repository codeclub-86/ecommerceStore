"use client";

import React from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroMain = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="hero-area py-4 sm:py-6 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Hero Slider */}
          <div className="lg:w-2/3 w-full">
            <Carousel
              className="relative group"
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {/* Slide 1 */}
                <CarouselItem>
                  <div
                    className="single-slider bg-cover bg-center py-20 px-6 text-black relative rounded-xl shadow-md"
                    role="img"
                    aria-label="M75 Sport Watch - No restocking fee, only $320.99"
                    style={{ backgroundImage: "url('/slider-bg1.jpg')" }}
                  >
                    <div className="content max-w-md backdrop-blur-sm p-6 rounded-lg">
                      <h2 className="text-3xl font-bold leading-snug">
                        <span className="block text-gray-500 text-lg font-medium">
                          No restocking fee ($35 savings)
                        </span>
                        M75 Sport Watch
                      </h2>
                      <p className="mt-3 text-gray-600 text-sm">
                        Premium design with unbeatable comfort and precision.
                      </p>
                      <h3 className="text-2xl font-semibold mt-4">
                        <span className="text-gray-500 text-lg mr-2">
                          Now Only
                        </span>
                        $320.99
                      </h3>
                      <div className="mt-6">
                        <Link
                          href="/productListing"
                          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Slide 2 */}
                <CarouselItem>
                  <div
                    className="single-slider bg-cover bg-center py-20 px-6 text-black relative rounded-xl shadow-md"
                    role="img"
                    aria-label="CCTV Camera - Big Sale Offer only $590.00"
                    style={{ backgroundImage: "url('/slider-bg2.jpg')" }}
                  >
                    <div className="content max-w-md backdrop-blur-sm p-6 rounded-lg">
                      <h2 className="text-3xl font-bold leading-snug">
                        <span className="block text-gray-500 text-lg font-medium">
                          Big Sale Offer
                        </span>
                        Get the Best Deal on CCTV Camera
                      </h2>
                      <p className="mt-3 text-gray-600 text-sm">
                        Save big on high-quality surveillance and home security.
                      </p>
                      <h3 className="text-2xl font-semibold mt-4">
                        <span className="text-gray-500 text-lg mr-2">
                          Combo Only:
                        </span>
                        $590.00
                      </h3>
                      <div className="mt-6">
                        <Link
                          href="/productListing"
                          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>

              {/* Slider Controls */}
              <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition" />
              <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition" />
            </Carousel>
          </div>

          {/* Right Side: Banners */}
          <div className="lg:w-1/3 w-full flex flex-col gap-6">
            {/* Small Banner 1 */}
            <div
              className="hero-small-banner bg-cover bg-center py-12 px-6 rounded-xl shadow-md flex items-end"
              style={{ backgroundImage: "url('/slider-bnr.jpg')" }}
              role="img"
              aria-label="iPhone 12 Pro Max for $259.99"
            >
              <div className="content backdrop-blur-sm p-4 rounded-md">
                <h2 className="text-xl font-semibold text-black">
                  <span className="block text-gray-500 text-sm">
                    New line required
                  </span>
                  iPhone 12 Pro Max
                </h2>
                <h3 className="text-2xl font-bold mt-2 text-black">$259.99</h3>
              </div>
            </div>

            {/* Small Banner 2 */}
            <div className="hero-small-banner bg-gray-100 p-8 rounded-xl shadow-md">
              <div className="content text-gray-900">
                <h2 className="text-xl font-bold">Weekly Sale!</h2>
                <p className="mt-2 text-sm">
                  Save up to 50% off all items this week only.
                </p>
                <div className="mt-4">
                  <Link
                    href="/productListing"
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMain;
