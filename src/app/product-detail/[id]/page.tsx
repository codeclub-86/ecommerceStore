"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/app/store/cartStore";

interface VariationOption {
  value: string;
  price?: number;
}

interface Variation {
  name: string;
  values: VariationOption[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  variations?: Variation[];
}

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCartStore();

  const [selectedVariations, setSelectedVariations] = useState<
    { name: string; value: string; price?: number }[]
  >([]);

  const handleVariationChange = (variation: Variation, value: string) => {
    const selectedValue = variation.values.find((v) => v.value === value);
    setSelectedVariations((prev) => {
      const filtered = prev.filter((v) => v.name !== variation.name);
      return [...filtered, { name: variation.name, value, price: selectedValue?.price }];
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      variation: selectedVariations.length > 0 ? selectedVariations : undefined,
    });

  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>

        {product.variations?.map((variation) => (
          <div key={variation.name} className="mb-4">
            <label className="block text-sm font-medium mb-1">{variation.name}</label>
            <select
              className="border p-2 rounded w-full"
              onChange={(e) => handleVariationChange(variation, e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select {variation.name}
              </option>
              {variation.values.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.value} {v.price ? `(+${v.price})` : ""}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
