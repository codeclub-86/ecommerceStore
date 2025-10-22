"use client";

import {
  Search,
  Heart,
  X,
  ShoppingCart,
  ArrowRight,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeaderLinks from "./headerLinks";
import { useState, useEffect, useRef } from "react";
import { useWishlistStore } from "@/app/store/wishListStore";
import { useCartStore } from "@/app/store/cartStore";
import { useStore } from "@/app/store/apiStore";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";

function SearchBar({ mobile = false }: { mobile?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { fetchSearchProducts } = useStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const router = useRouter();
  const { isLoggedIn, user, logout, initializeAuth } = useAuthStore();
  const { clearCart, setUserId, loadUserCart } = useCartStore();
  const {
    clearWishlist,
    setUserId: setWishlistUserId,
    loadUserWishlist,
  } = useWishlistStore();

  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      const id = user.id.toString();
      setUserId(id);
      setWishlistUserId(id);
      setTimeout(() => {
        loadUserCart(id);
        loadUserWishlist(id);
      }, 100);
    }
  }, [
    isLoggedIn,
    user,
    setUserId,
    setWishlistUserId,
    loadUserCart,
    loadUserWishlist,
  ]);

  const handleLogout = () => {
    clearCart();
    clearWishlist();
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full dark-bg-css shadow-md border-b border-gray-700">
      <div className="w-full lg:px-8 md:px-6 px-3 py-4 container mx-auto">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
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
                <div className="absolute right-0 mt-3 w-80 bg-[#0c1a2b] border border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in">
                  <div className="p-4 border-b border-gray-700 bg-[#13243b] flex justify-between text-sm text-yellow-400">
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
                        className="flex items-center gap-3 p-4 border-b border-gray-700 hover:bg-[#1b304d] transition"
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

            {/* Profile / Selling */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 hover:opacity-80 transition"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-black border border-yellow-400 flex items-center justify-center">
                    <User size={18} className="text-yellow-400" />
                  </div>
                  <ChevronDown size={14} className="text-yellow-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#0b1a2d] border border-gray-700 rounded-md shadow-lg py-2 z-50">
                    <Link
                      href="/register"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#142a46] text-yellow-400 transition"
                    >
                      <ArrowRight size={14} />
                      Switch to Selling
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left text-white hover:bg-[#142a46] transition"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#0b1a2d] border border-yellow-400 rounded-full text-yellow-400 hover:bg-[#142a46] transition"
                >
                  <ArrowRight size={14} />
                  Switch to Selling
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <SearchBar mobile />
        </div>
      </div>

      <HeaderLinks />
    </header>
  );
}
