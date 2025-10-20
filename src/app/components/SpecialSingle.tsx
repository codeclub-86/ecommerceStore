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

interface SpecialSingleProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    average_rating?: number; // ✅ renamed for clarity
    status?: string;
    sale_price?: number | string;
}

const SpecialSingle: React.FC<SpecialSingleProps> = ({
    id,
    name,
    price,
    image,
    category = "General",
    average_rating = 0,
    status,
    sale_price,
}) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
    const { initializeAuth, isLoggedIn } = useAuthStore();
    const { addToCart } = useCartStore();
    const router = useRouter();

    const inWishlist = isInWishlist(id);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        initializeAuth();
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }
        if (inWishlist) {
            removeFromWishlist(id);
            toast.error("Removed from Favorites ❤️");
        } else {
            addToWishlist({ id, name, price, image });
            toast.success("Added to Favorites ❤️");
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        initializeAuth();
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }

        const finalPrice = sale_price ? Number(sale_price) : price;
        addToCart({
            id: Number(id),
            name,
            price: finalPrice,
            image,
            category,
            variation: undefined,
        });
        toast.success(`${name} added to cart 🛒`);
    };


    const isOnSale = sale_price && Number(sale_price) < Number(price);

    // ⭐ Round rating to one decimal safely
    const roundedRating = Number(average_rating) || 0;

    return (
        <div className="relative flex flex-col transition h-full group rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-white/5">
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

            {/* SALE Badge */}
            {isOnSale && (
                <span className="absolute top-3 left-3 z-10 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded shadow">
                    SALE
                </span>
            )}

            {/* Product Clickable Area */}
            <Link href={`/product-detail/${id}`} className="flex flex-col h-full">
                {/* Image */}
                <div className="relative w-full h-64 overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Add to Cart Button */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                        <button
                            onClick={handleAddToCart}
                            className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-2 hover:bg-black hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md font-medium"
                        >
                            <ShoppingCart size={16} /> Add to Cart
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-grow dark-bg-css">
                    <span className="block text-sm text-white">{category}</span>
                    <h4 className="font-semibold text-white text-lg mt-1 line-clamp-2 flex-grow">
                        <span className="hover:text-yellow-500 transition">{name}</span>
                    </h4>

                    {/* ⭐ Rating */}
                    <div className="mt-2">
                        <ul className="flex items-center gap-1 text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <li key={i}>
                                    <Star
                                        size={16}
                                        fill={i < Math.floor(roundedRating) ? "currentColor" : "none"}
                                        stroke={
                                            i < Math.floor(roundedRating) ? "currentColor" : "#9CA3AF"
                                        }
                                    />
                                </li>
                            ))}
                        </ul>

                        {roundedRating > 0 ? (
                            <p className="text-xs text-gray-400 mt-1">
                                {roundedRating.toFixed(1)} / 5
                            </p>
                        ) : (
                            <p className="text-xs text-gray-500 mt-1">No reviews yet</p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                        {isOnSale ? (
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400 font-bold text-lg">
                                    Rs {Number(sale_price).toFixed(0)}
                                </span>
                                <span className="text-gray-500 line-through text-sm">
                                    Rs {Number(price).toFixed(0)}
                                </span>
                            </div>
                        ) : (
                            <span className="text-white font-bold text-lg">
                                Rs {Number(price).toFixed(0)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SpecialSingle;
