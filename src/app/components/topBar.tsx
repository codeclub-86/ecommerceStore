"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

const TopNavbar = () => {
  const router = useRouter();
  const { isLoggedIn, user, logout, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="w-full bg-[#031521] text-white text-sm p-3 flex">
      <div className="w-full mx-auto flex items-end justify-end px-6 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>Hello {user?.userName}</span>
          </div>

          {!isLoggedIn ? (
            <>
              <Link href="/login" className="hover:text-gray-300 transition">
                Sign In
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
