"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FeatureSingleProps {
  title: string;
  items: string[];
  image: string;
  alt: string;
}

const FeatureSingle: React.FC<FeatureSingleProps> = ({
  title,
  items,
  image,
  alt,
}) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative w-40 h-40 mb-5">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain rounded-md"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>

      {/* Items */}
      <ul className="text-gray-700 space-y-2 text-sm w-full text-left">
        {items.slice(0, 4).map((item, index) => (
          <li key={index}>
            <Link
              href="#"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {item}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="#"
            className="text-blue-600 hover:underline font-medium"
          >
            View All →
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FeatureSingle;
