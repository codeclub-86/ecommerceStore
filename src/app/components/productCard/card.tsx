"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart, Star, Heart } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/app/store/wishListStore";
import { useAuthStore } from "@/app/store/authStore";
import { useCartStore } from "@/app/store/cartStore"; // ✅ import cart store
import { useRouter } from "next/navigation";

interface TrendingSingleProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
  status?: string;
  sale_price?: number | string;
}

const TrendingSingle: React.FC<TrendingSingleProps> = ({
  id,
  name,
  price,
  image,
  category,
  rating = 4,
  status,
  sale_price,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { initializeAuth, isLoggedIn } = useAuthStore();
  const { addToCart } = useCartStore(); // ✅

  const router = useRouter();
  const inWishlist = isInWishlist(id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    initializeAuth();

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: Number(id), // make sure it’s a number since your CartItem.id is number
      name,
      price,
      image,
      category,
      variation: undefined, // or pass selected variation if you support it
    });
  };


  return (
    <div className="relative">
      {/* Wishlist Button */}
      <button
        aria-label="Add to Wishlist"
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow transition ${inWishlist ? "bg-red-100" : "bg-white"
          }`}
      >
        <Heart
          size={18}
          className={`transition ${inWishlist ? "text-red-500 fill-red-500" : "text-gray-500"
            }`}
        />
      </button>

      {/* Product Card */}
      <Link
        href={`/product-detail/${id}`}
        className="border rounded-lg shadow-sm hover:shadow-lg transition bg-white group relative block"
      >
        {status && (
          <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            {status}
          </span>
        )}

        {/* Product Image */}
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="w-full object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-300"
          />

          {/* Add to Cart button */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 relative top-10 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-black opacity-0 group-hover:opacity-100 group-hover:top-0 transition-all duration-300"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 text-start">
          <span className="block text-sm text-gray-500">{category}</span>
          <h4 className="font-semibold text-lg mt-1">
            <span className="hover:text-blue-600 transition">{name}</span>
          </h4>

          {/* Reviews */}
          <ul className="flex items-center gap-1 mt-2 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <Star
                  size={16}
                  fill={i < rating ? "currentColor" : "none"}
                  className={i < rating ? "text-yellow-500" : "text-gray-300"}
                />
              </li>
            ))}
            <li>
              <span className="text-gray-500 text-sm ml-2">
                {rating.toFixed(1)} Review(s)
              </span>
            </li>
          </ul>

          {/* Price */}
          <div className="mt-2">
            {sale_price ? (
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold text-lg">
                  ${sale_price}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  ${price}
                </span>
              </div>
            ) : (
              <span className="text-blue-600 font-bold text-lg">${price}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TrendingSingle;
