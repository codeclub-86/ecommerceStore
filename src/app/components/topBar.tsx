"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";

import { useRouter } from "next/navigation";

const TopNavbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Run once on mount
    checkToken();

    // Listen for changes in localStorage (cross-tab + same-tab)
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/register");
    router.refresh();
  };

  return (
    <div className="w-full bg-[#031521] text-white text-sm p-3 flex ">
      <div className="w-full mx-auto flex items-end justify-end px-6 py-2">
        {/* Left Section - Currency & Language */}

        {/* Middle Section - Nav Links */}
        {/* <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-gray-300 transition">
            Contact Us
          </Link>
        </div> */}

        {/* Right Section - Auth */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>Hello</span>
          </div>

          {!isLoggedIn ? (
            <>
              <Link href="/login" className="hover:text-gray-300 transition">
                Sign In
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/register" className="hover:text-gray-300 transition">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-400">|</span>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
