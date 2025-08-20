import React from "react";
import Image from "next/image";

const FeatureSingle = () => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 flex flex-row">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          TV & Audios
        </h2>
        <ul className="text-gray-700 space-y-2 text-md">
          <li className="group">
            <a
              href="#"
              className="hover:text-blue-600 hover:left-2 transition-all duration-300 relative "
            >
              Smart Television
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-600 hover:left-2 transition-all duration-300 relative "
            >
              QLET
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-600 hover:left-2 transition-all duration-300 relative "
            >
              Speaker
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-blue-600 hover:left-2 transition-all duration-300 relative "
            >
              Smart Television
            </a>
          </li>

          <li className="text-blue-600 hover:underline cursor-pointer">
            <a href="#">View All</a>
          </li>
        </ul>
      </div>

      <div className="flex justify-center mb-4">
        <Image
          src="/fetured-item-1.png"
          alt="Headphones"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default FeatureSingle;
