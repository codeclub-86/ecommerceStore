"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type FeatureSingleProps = {
  title: string;
  image: string;
  alt?: string;
  slug: string; // parent category slug
};

const FeatureSingle: React.FC<FeatureSingleProps> = ({ title, image, alt = "", slug }) => {
  // Pass type=parent to indicate it's a parent category
  return (
    <Link href={`/productListing?category=${encodeURIComponent(slug)}&type=parent`}>
      <div className="flex flex-col items-center bg-white rounded-sm shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-yellow-400 cursor-pointer">
        <div className="relative w-full h-56">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
        <div className="p-5 text-center dark-bg-css text-white w-full">
          <h3 className="text-lg font-semibold tracking-wide hover:text-yellow-400 transition-colors duration-200">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default FeatureSingle;
