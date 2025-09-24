"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart, Star, Heart } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/app/store/wishListStore";
import { useAuthStore } from "@/app/store/authStore";
import { useCartStore } from "@/app/store/cartStore";
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
  const { addToCart } = useCartStore();
  const router = useRouter();

  const inWishlist = isInWishlist(id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    initializeAuth();
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    inWishlist
      ? removeFromWishlist(id)
      : addToWishlist({ id, name, price, image });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const finalPrice = sale_price ? Number(sale_price) : price;
    addToCart({
      id: Number(id),
      name,
      price: finalPrice,
      image,
      category,
      variation: undefined,
    });
  };

  return (
    <div className="relative flex flex-col bg-white border rounded-lg shadow-sm hover:shadow-md transition h-full group">
      {/* Wishlist */}
      <button
        aria-label="Add to Wishlist"
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow transition ${
          inWishlist ? "bg-red-100" : "bg-white"
        }`}
      >
        <Heart
          size={18}
          className={`transition ${
            inWishlist ? "text-red-500 fill-red-500" : "text-gray-500"
          }`}
        />
      </button>

      {/* Product Link */}
      <Link href={`/product-detail/${id}`} className="flex flex-col h-full">
        {/* Status Badge */}
        {status && (
          <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            {status}
          </span>
        )}

        {/* Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          />

          {/* Add to Cart */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-black opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-grow">
          <span className="block text-sm text-gray-500">{category}</span>
          <h4 className="font-semibold text-lg mt-1 line-clamp-2 flex-grow">
            <span className="hover:text-blue-600 transition">{name}</span>
          </h4>

          {/* Rating */}
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
                {rating.toFixed(1)}
              </span>
            </li>
          </ul>

          {/* Price */}
          <div className="mt-2">
            {sale_price ? (
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold text-lg">
                  ${Number(sale_price).toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  ${Number(price).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-blue-600 font-bold text-lg">
                ${Number(price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TrendingSingle;
