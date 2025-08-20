"use client";
import React, { useEffect } from "react";
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
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <section className="hero-area py-2 lg:px-25 md:px-25 sm:px-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side slider */}
          <div className="lg:w-2/3 w-full">
            <div className="slider-head">
              <div className="hero-slider space-y-6">
                <Carousel
                  className="relative group"
                  plugins={[plugin.current]}
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    <CarouselItem>
                      {/* Slide 1 */}
                      <div
                        className="single-slider bg-cover bg-center py-25 px-5 text-black relative"
                        style={{ backgroundImage: "url('/slider-bg1.jpg')" }}
                      >
                        <div className="content max-w-xs">
                          <h2 className="text-3xl font-bold leading-snug">
                            <span className="block text-gray-500 text-lg font-medium">
                              No restocking fee ($35 savings)
                            </span>
                            M75 Sport Watch
                          </h2>
                          <p className="mt-3 text-gray-500 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </p>
                          <h3 className="text-2xl font-semibold mt-4">
                            <span className="text-gray-500 text-lg mr-2">
                              Now Only
                            </span>
                            $320.99
                          </h3>
                          <div className="mt-10">
                            <a
                              href="product-grids.html"
                              className="px-8 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                            >
                              Shop Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>

                    {/* Slide 2 */}
                    <CarouselItem>
                      <div
                        className="single-slider bg-cover bg-center py-25 px-5 text-black relative"
                        style={{ backgroundImage: "url('/slider-bg2.jpg')" }}
                      >
                        <div className="content max-w-xs">
                          <h2 className="text-3xl font-bold leading-snug">
                            <span className="block text-gray-500 text-lg font-medium">
                              Big Sale Offer
                            </span>
                            Get the Best Deal on CCTV Camera
                          </h2>
                          <p className="mt-3 text-gray-500 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </p>
                          <h3 className="text-2xl font-semibold mt-4">
                            <span className="text-gray-500 text-lg mr-2">
                              Combo Only:
                            </span>
                            $590.00
                          </h3>
                          <div className="mt-10">
                            <a
                              href="product-grids.html"
                              className="px-8 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                            >
                              Shop Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>

                  {/* Arrows that only show on hover */}
                  <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition" />
                  <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition" />
                </Carousel>
              </div>
            </div>
          </div>

          {/* Right side banners */}
          <div className="lg:w-1/3 w-full flex flex-col gap-6">
            {/* Small Banner 1 */}
            <div
              className="hero-small-banner bg-cover bg-center py-15 px-5 text-white"
              style={{
                backgroundImage: "url('/slider-bnr.jpg')",
              }}
            >
              <div className="content">
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
            <div className="hero-small-banner bg-gray-100 p-8">
              <div className="content text-gray-900">
                <h2 className="text-xl font-bold">Weekly Sale!</h2>
                <p className="mt-2 text-sm">
                  Saving up to 50% off all online store items this week.
                </p>
                <div className="mt-4">
                  <a
                    className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    href="product-grids.html"
                  >
                    Shop Now
                  </a>
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
