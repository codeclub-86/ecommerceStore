"use client";

import { Facebook, Twitter, Instagram, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useStore } from "@/app/store/apiStore";
import { useAuthStore } from "@/app/store/authStore";

const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    aria-label="Social Link"
    className="group"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="w-9 h-9 rounded-full border border-yellow-400 flex justify-center items-center group-hover:bg-yellow-400 transition-all duration-300">
      <span className="text-yellow-400 group-hover:text-black">{children}</span>
    </div>
  </a>
);

const HeaderLinks = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { categories, fetchCategories, stores, fetchStores, loading } = useStore();
  const { isLoggedIn, initializeAuth } = useAuthStore();

  useEffect(() => {
    fetchCategories();
    fetchStores();
    initializeAuth();
  }, [fetchCategories, fetchStores, initializeAuth]);

  return (
    <header className="w-full light-bg-css text-white shadow-md border-b border-yellow-400">
      <div className="px-6 lg:px-10 py-4 flex items-center justify-between container mx-auto">

        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle Menu"
            className="lg:hidden p-2 border border-yellow-400 rounded-md text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden lg:block relative group border-r border-gray-700 pr-4">
            <span
              tabIndex={0}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer text-white font-medium hover:text-yellow-400 transition"
            >
              <Menu className="w-5 h-5" /> All Categories
            </span>

            <ul
              className="absolute left-0 mt-2 w-64 bg-black rounded-xl shadow-xl border border-yellow-400/40
              opacity-0 scale-95 translate-y-2 invisible
              group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible
              transition-all duration-300 ease-out z-50"
            >
              {loading && <li className="px-5 py-3 text-gray-400">Loading...</li>}
              {!loading && categories.length === 0 && (
                <li className="px-5 py-3 text-gray-400">No categories found</li>
              )}

              {!loading &&
                categories.map((group: any, groupIdx: number) => (
                  <li
                    key={groupIdx}
                    className="relative group/category border-b border-gray-700 last:border-none"
                  >
                    <span
                      className="flex justify-between items-center px-5 py-3 font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black transition cursor-pointer"
                    >
                      {group.parent || "Unnamed Category"}
                      <svg
                        className="w-4 h-4 ml-2 transition-transform group-hover/category:rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>

                    {group.categories && group.categories.length > 0 && (
                      <ul
                        className="absolute left-full top-0 mt-0 ml-1 w-56 bg-black rounded-xl shadow-lg border border-yellow-400/40
                        opacity-0 scale-95 translate-x-2 invisible
                        group-hover/category:opacity-100 group-hover/category:scale-100 group-hover/category:translate-x-0 group-hover/category:visible
                        transition-all duration-300 ease-out z-50"
                      >
                        {group.categories.map((cat: any) => (
                          <li key={cat.id}>
                            <Link
                              href={`/productListing?category=${encodeURIComponent(cat.category_name)}`}
                              className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black transition"
                            >
                              {cat.category_name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex gap-10 text-[16px] font-semibold">
            <li>
              <Link href="/productListing" className="hover:text-yellow-400 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-yellow-400 transition">
                Brands
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="text-white px-5 py-2 rounded-full font-semibold hover:text-yellow-500 transition"
              >
                Register Now
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-400 transition">
                Contact Us
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link href="/orders" className="hover:text-yellow-400 transition">
                  My Orders
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex justify-center gap-5 py-4">
          <a
            href="https://www.facebook.com/share/17DoTWFFao/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-yellow-400 hover:text-yellow-500 transition"
          >
            <Facebook className="w-5 h-5" />
          </a>

          <a
            href="https://www.instagram.com/haasil.store?igsh=MTQ2bnpoMWFwYWl5MA=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-yellow-400 hover:text-yellow-500 transition"
          >
            <Instagram className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com/company/code-clubb/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-yellow-400 hover:text-yellow-500 transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-yellow-400 bg-black text-white shadow-md animate-fade-in">
          <ul className="flex flex-col p-4 gap-3 font-medium">
            <li>
              <Link href="/" className="hover:text-yellow-400" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/productListing" className="hover:text-yellow-400" onClick={() => setMobileMenuOpen(false)}>
                Shop
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-yellow-400" onClick={() => setMobileMenuOpen(false)}>
                Brands
              </Link>
            </li>
            <li>
              <Link href="/register" className="text-yellow-400 font-semibold" onClick={() => setMobileMenuOpen(false)}>
                Register Now
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-400" onClick={() => setMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </li>

            {isLoggedIn && (
              <li>
                <Link href="/orders" className="hover:text-yellow-400" onClick={() => setMobileMenuOpen(false)}>
                  My Orders
                </Link>
              </li>
            )}
          </ul>

          <div className="flex justify-center gap-5 py-4 border-t border-yellow-400">
            <a
              href="https://www.facebook.com/share/17DoTWFFao/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-yellow-400 hover:text-yellow-500 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href="https://www.instagram.com/haasil.store?igsh=MTQ2bnpoMWFwYWl5MA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-yellow-400 hover:text-yellow-500 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://www.linkedin.com/company/code-clubb/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-yellow-400 hover:text-yellow-500 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderLinks;
