import React from "react";

interface BrandsSingleProps {
  logo: string;
}

const BrandsSingle: React.FC<BrandsSingleProps> = ({ logo }) => {
  return (
    <div className="w-full h-28 flex items-center justify-center bg-none border hover:shadow-md transition">
      <img
        src={logo}
        alt="Brand Logo"
        className="max-h-16 object-contain grayscale hover:grayscale-0 transition"
      />
    </div>
  );
};

export default BrandsSingle;
