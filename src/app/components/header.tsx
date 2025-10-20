"use client";

import { Search, Heart, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeaderLinks from "./headerLinks";
import { useState } from "react";
import { useWishlistStore } from "@/app/store/wishListStore";
import { useCartStore } from "@/app/store/cartStore";
import { useStore } from "@/app/store/apiStore";
import { useRouter } from "next/navigation";

// Search Bar
function SearchBar({ mobile = false }: { mobile?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { fetchSearchProducts } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    await fetchSearchProducts(query);
    router.push("/productListing");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full rounded-full overflow-hidden border-2 ${mobile
        ? "border-yellow-400"
        : "border-gray-600 hover:border-yellow-400 transition-all"
        }`}
    >
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 outline-none text-white text-sm bg-transparent placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 px-4 flex items-center justify-center text-black font-semibold transition-all"
      >
        <Search size={18} />
      </button>
    </form>
  );
}

export default function ShopGridsHeader() {
  const wishlist = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const cart = useCartStore((state) => state.cart);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  return (
    <header className="w-full dark-bg-css shadow-md border-b border-gray-700">
      <div className="w-full lg:px-8 md:px-6 px-3 py-4 container mx-auto">

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo6.png"
                alt="Logo"
                width={100}
                height={50}
                priority
                className="transition-transform duration-300 group-hover:scale-105 rounded-md object-contain"
              />

            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <SearchBar />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-5">
              {/* Wishlist */}
              <div className="relative">
                <button
                  onClick={() => setWishlistOpen(!wishlistOpen)}
                  className="relative p-2 h-10 w-10 rounded-full flex items-center justify-center border border-gray-600 hover:bg-yellow-400 hover:text-black transition-all group"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={22}
                    className={`${wishlistOpen
                      ? "text-yellow-400"
                      : "text-white group-hover:text-black"
                      }`}
                  />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full px-1.5">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Wishlist Dropdown */}
                {wishlistOpen && wishlist.length > 0 && (
                  <div className="absolute right-0 mt-3 w-80 bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in">
                    <div className="p-4 border-b border-gray-700 bg-[#252525] flex justify-between text-sm text-yellow-400">
                      <span>{wishlist.length} Items</span>
                      <button
                        className="text-xs text-white hover:text-yellow-400 transition"
                        onClick={() => setWishlistOpen(false)}
                      >
                        Close
                      </button>
                    </div>

                    <ul className="max-h-64 overflow-auto">
                      {wishlist.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center gap-3 p-4 border-b border-gray-700 hover:bg-[#2a2a2a] transition"
                        >
                          <button
                            className="text-gray-400 hover:text-red-500"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <X size={16} />
                          </button>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded-md"
                            loading="lazy"
                          />
                          <div>
                            <h4 className="text-sm font-semibold text-white hover:text-yellow-400">
                              <Link href={`/product-detail/${item.id}`}>
                                {item.name}
                              </Link>
                            </h4>
                            <p className="text-xs text-gray-400">
                              ${Number(item.price).toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Cart */}
              <div className="relative">
                <Link
                  href="/cart"
                  className="relative p-2 h-10 w-10 rounded-full flex items-center justify-center border border-gray-600 hover:bg-yellow-400 hover:text-black transition-all group"
                  aria-label="Cart"
                >
                  <ShoppingCart
                    size={22}
                    className="text-white group-hover:text-black"
                  />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full px-1.5">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <SearchBar mobile />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <HeaderLinks />
    </header>
  );
}
