"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart, Star, Heart } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/app/store/wishListStore";
import { useAuthStore } from "@/app/store/authStore";
import { useCartStore } from "@/app/store/cartStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface TrendingSingleProps {
  id: string;
  name: string;
  price: number;
  image: string;
  store?: string;
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
  store,
  rating = 4,
  status,
  sale_price,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { initializeAuth, isLoggedIn } = useAuthStore();
  const { addToCart } = useCartStore();
  const router = useRouter();

  const inWishlist = isInWishlist(id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    initializeAuth();
    if (!isLoggedIn) {
      toast.error("Please log in to use the wishlist.");
      router.push("/login");
      return;
    }

    if (inWishlist) {
      removeFromWishlist(id);
      toast("Removed from wishlist ", {
        icon: "❌",
        style: { background: "#222", color: "#fff" },
      });
    } else {
      addToWishlist({ id, name, price, image });
      toast.success("Added to wishlist ");
    }
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
    toast.success("Added to cart 🛒");
  };

  return (
    <div className="relative flex flex-col transition h-full group rounded-lg overflow-hidden shadow-sm hover:shadow-md">
      {/* Wishlist */}
      <button
        aria-label="Add to Wishlist"
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition ${inWishlist ? "bg-yellow-100" : "bg-white"
          }`}
      >
        <Heart
          size={18}
          className={`transition ${inWishlist ? "text-yellow-500 fill-yellow-500" : "text-gray-700"
            }`}
        />
      </button>

      {/* Product Link */}
      <Link href={`/product-detail/${id}`} className="flex flex-col h-full">
        {status && (
          <span className="absolute top-3 left-3 z-10 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 shadow">
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
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 whitespace-nowrap bg-yellow-400 text-black px-4 py-2 hover:bg-black hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md font-medium"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>

          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-grow light-bg-css">
          <span className="block text-sm text-white">{category}</span>
          <h4 className="font-semibold text-white text-lg mt-1 line-clamp-2 flex-grow">
            <span className="hover:text-yellow-500 transition">{name}</span>
          </h4>
          <p className="text-sm text-gray-100">{store}</p>

          {/* Rating */}
          <ul className="flex items-center gap-1 mt-2 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <Star
                  size={16}
                  fill={i < rating ? "currentColor" : "none"}
                  className={i < rating ? "text-yellow-400" : "text-gray-300"}
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
                <span className="text-white font-bold text-lg">
                  ${Number(sale_price).toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  ${Number(price).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-white font-bold text-lg">
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
