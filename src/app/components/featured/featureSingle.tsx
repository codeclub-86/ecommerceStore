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
    <div className="sm:w-full lg:max-w-sm md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-row justify-between">
      {/* Text Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
        <ul className="text-gray-700 space-y-2 text-md">
          {items.slice(0, 4).map((item, index) => (
            <li key={index}>
              <Link
                href="#"
                className="hover:text-blue-600 hover:translate-x-1 transition-all duration-300 inline-block"
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link href="#" className="text-blue-600 hover:underline">
              View All
            </Link>
          </li>
        </ul>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mt-6">
        <Image
          src={image}
          alt={alt}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default FeatureSingle;
