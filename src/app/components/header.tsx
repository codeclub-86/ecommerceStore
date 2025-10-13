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


// 🔍 Search Bar
function SearchBar({ mobile = false }: { mobile?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { fetchSearchProducts } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    await fetchSearchProducts(query);
    router.push("/productListing"); // redirect user to shop page
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full border-2 rounded-full overflow-hidden ${mobile
        ? "border-yellow-400"
        : "border-gray-300 hover:border-yellow-400 transition-all"
        }`}
    >
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 outline-none text-gray-800 text-sm bg-transparent placeholder-gray-500"
      />
      <button
        type="submit"
        className="bg-yellow-400 hover:bg-black hover:text-yellow-400 px-4 flex items-center justify-center text-black transition-all"
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
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="w-full lg:px-8 md:px-6 px-3 py-8 container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                width={120}
                height={60}
                priority
                className="transition-transform duration-300 group-hover:scale-105"
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
                  className="relative p-2 h-10 w-10 rounded-full flex items-center justify-center border border-gray-300 hover:bg-black hover:border-black transition-all group"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={22}
                    className={`${wishlistOpen
                      ? "text-yellow-400"
                      : "text-gray-700 group-hover:text-yellow-400"
                      }`}
                  />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-yellow-400 text-xs font-bold rounded-full px-1.5">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Wishlist Dropdown */}
                {wishlistOpen && wishlist.length > 0 && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in">
                    <div className="p-4 border-b bg-yellow-50 flex justify-between text-sm text-gray-700">
                      <span>{wishlist.length} Items</span>
                      <button
                        className="text-xs text-red-500 hover:underline"
                        onClick={() => setWishlistOpen(false)}
                      >
                        Close
                      </button>
                    </div>

                    <ul className="max-h-64 overflow-auto">
                      {wishlist.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center gap-3 p-4 border-b hover:bg-yellow-50 transition"
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
                            <h4 className="text-sm font-semibold text-gray-800 hover:text-yellow-500">
                              <Link href={`/product-detail/${item.id}`}>
                                {item.name}
                              </Link>
                            </h4>
                            <p className="text-xs text-gray-500">
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
                  className="relative p-2 h-10 w-10 rounded-full flex items-center justify-center border border-gray-300 hover:bg-black hover:border-black transition-all group"
                  aria-label="Cart"
                >
                  <ShoppingCart
                    size={22}
                    className="text-gray-700 group-hover:text-yellow-400"
                  />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-yellow-400 text-xs font-bold rounded-full px-1.5">
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
