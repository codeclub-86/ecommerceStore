"use client";

import React from "react";
import Image from "next/image";

type FeatureSingleProps = {
  title: string;
  image: string;
  alt?: string;
};

const FeatureSingle: React.FC<FeatureSingleProps> = ({ title, image, alt = "" }) => {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-yellow-400">
      {/* Image */}
      <div className="relative w-full h-56">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* Title */}
      <div className="p-5 text-center bg-black text-white w-full">
        <h3 className="text-lg font-semibold tracking-wide hover:text-yellow-400 transition-colors duration-200">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default FeatureSingle;
