import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BrandsSingleProps {
  logo: string | null;
  name: string;
}

const BrandsSingle: React.FC<BrandsSingleProps> = ({ logo, name }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/productListing?brand=${encodeURIComponent(name)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-28 flex items-center justify-center border bg-transparent hover:shadow-md transition-shadow rounded-lg cursor-pointer"
    >
      {logo ? (
        <Image
          src={logo}
          alt={`${name} Logo`}
          width={120}
          height={64}
          className="max-h-16 object-contain transition duration-300"
        />
      ) : (
        <div className="text-sm text-white">No Logo</div>
      )}
    </div>
  );
};

export default BrandsSingle;
