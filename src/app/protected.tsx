"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && pathname !== "/login" && pathname !== "/register") {
      router.replace("/login");
    }

    if (token && (pathname === "/login" || pathname === "/register")) {
      router.replace("/");
    }

    setLoading(false);
  }, [router, pathname]);

  if (loading) return null;

  return <>{children}</>;
}
