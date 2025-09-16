"use client";

import { useAuthStore } from "./store/authStore"; // adjust path
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, initializeAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initializeAuth(); // load from localStorage on mount
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login"); // redirect if not logged in
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <div className="text-center p-6">Redirecting...</div>; // show loading until redirect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
