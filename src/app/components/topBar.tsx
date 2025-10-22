"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User, ChevronDown, LogOut, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishListStore";

const TopNavbar = () => {
  const router = useRouter();
  const { isLoggedIn, user, logout, initializeAuth } = useAuthStore();
  const { clearCart, setUserId, loadUserCart } = useCartStore();
  const { clearWishlist, setUserId: setWishlistUserId, loadUserWishlist } =
    useWishlistStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 1️⃣ Initialize auth only once
  useEffect(() => {
    initializeAuth();
  }, []);

  // 2️⃣ Load both cart + wishlist after auth
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
  }, [isLoggedIn, user]);

  // 3️⃣ Logout clears everything
  const handleLogout = () => {
    clearCart();
    clearWishlist();
    logout();
    router.push("/login");
  };

  return (
    <div className="w-full bg-[#031521] text-white text-sm p-3 flex">
      <div className="w-full mx-auto flex items-end justify-end px-6 py-2 relative">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>Hello {user?.userName || "Guest"}</span>
          </div>

          {!isLoggedIn ? (
            <Link href="/login" className="hover:text-gray-300 transition">
              Sign In
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:text-gray-300 transition"
              >
                Profile <ChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[#0e2235] border border-gray-700 rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#19324d] transition"
                  >
                    <ArrowRight size={14} />
                    Switch to Selling
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-[#19324d] transition"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
