import React from "react";
import Image from "next/image";

interface BrandsSingleProps {
  logo: string | null; // Accept null
  name: string;
}

const BrandsSingle: React.FC<BrandsSingleProps> = ({ logo, name }) => {
  return (
    <div className="w-full h-28 flex items-center justify-center border bg-transparent hover:shadow-md transition-shadow rounded-lg">
      {logo ? (
        <Image
          src={logo}
          alt={`${name} Logo`}
          width={120}
          height={64}
          className="max-h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
        />
      ) : (
        // Optional: Show placeholder or text
        <div className="text-sm text-gray-400">No Logo</div>
      )}
    </div>
  );
};

export default BrandsSingle;
