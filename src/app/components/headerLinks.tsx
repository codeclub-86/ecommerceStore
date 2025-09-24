"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useStore } from "@/app/store/apiStore"; // ⬅️ import your zustand store

// 🔗 Social Icon Component
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
    <div className="w-8 h-8 rounded-full border flex justify-center items-center group-hover:bg-black transition-all duration-300">
      <span className="text-gray-900 group-hover:text-white">{children}</span>
    </div>
  </a>
);

const HeaderLinks = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Zustand store
  const { categories, fetchCategories, loading } = useStore();

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <header className="w-full border-t bg-white border-b">
      <div className="px-6 lg:px-10 py-4 flex items-center container mx-auto justify-between">
        {/* Left side (Menu Toggle + Categories) */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            aria-label="Toggle Menu"
            className="lg:hidden p-2 border rounded-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Categories (desktop only) */}
          <div className="hidden lg:block relative group border-r border-gray-200">
            <span
              tabIndex={0}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer text-gray-800 font-sm hover:text-blue-600 transition"
            >
              <Menu className="w-5 h-5" /> All Categories
            </span>

            {/* Dropdown */}
            <ul
              className="
                absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100
                opacity-0 scale-95 translate-y-2 invisible
                group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible
                transition-all duration-300 ease-out z-50
              "
            >
              {loading && (
                <li className="px-5 py-3 text-gray-500">Loading...</li>
              )}

              {!loading && categories.length === 0 && (
                <li className="px-5 py-3 text-gray-500">No categories found</li>
              )}

              {categories.map((cat: any, idx: number) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.id}`}
                    className={`flex justify-between items-center px-5 py-3 hover:bg-gray-50 hover:text-blue-600 transition ${idx === 0 ? "rounded-t-xl" : ""
                      } ${idx === categories.length - 1 ? "rounded-b-xl" : ""}`}
                  >
                    {cat.category_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden lg:block">
          <ul className="flex gap-8 text-gray-800 font-semibold text-[16px]">

            {/* Products Dropdown */}
            <li className="relative group">
              <Link href="/productListing" className="hover:text-blue-600">
                Products
              </Link>
              <ul
                className="
                  absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100
                  opacity-0 scale-95 translate-y-2 invisible
                  group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible
                  transition-all duration-300 ease-out z-50
                "
              >
                <li>
                  <Link href="/productListing/new" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/productListing/sale" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600">
                    On Sale
                  </Link>
                </li>
                <li>
                  <Link href="/productListing/top" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600">
                    Top Rated
                  </Link>
                </li>
              </ul>
            </li>

            {/* Brands Dropdown */}
            <li className="relative group">
              <Link href="/brands" className="hover:text-blue-600">
                Brands
              </Link>
              <ul
                className="
                  absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100
                  opacity-0 scale-95 translate-y-2 invisible
                  group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible
                  transition-all duration-300 ease-out z-50
                "
              >
                <li>
                  <Link href="/brands/a" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600">
                    Brand A
                  </Link>
                </li>
                <li>
                  <Link href="/brands/b" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600">
                    Brand B
                  </Link>
                </li>
                <li>
                  <Link href="/brands/c" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600">
                    Brand C
                  </Link>
                </li>
              </ul>
            </li>

            {/* Contact Dropdown */}
            <li className="relative group">
              <Link href="/contact" className="hover:text-blue-600">
                Contact Us
              </Link>
              <ul
                className="
                  absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100
                  opacity-0 scale-95 translate-y-2 invisible
                  group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible
                  transition-all duration-300 ease-out z-50
                "
              >
                <li>
                  <Link href="/contact/support" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/contact/faq" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact/email" className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600">
                    Email Us
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Right side (social icons) */}
        <div className="hidden md:flex items-center gap-3">
          <h5 className="font-semibold hidden lg:block">Follow Us:</h5>
          <ul className="flex gap-3">
            <li>
              <SocialIcon href="#">
                <Facebook className="w-5 h-5" />
              </SocialIcon>
            </li>
            <li>
              <SocialIcon href="#">
                <Twitter className="w-5 h-5" />
              </SocialIcon>
            </li>
            <li>
              <SocialIcon href="#">
                <Instagram className="w-5 h-5" />
              </SocialIcon>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white shadow-md animate-fade-in">
          <ul className="flex flex-col p-4 gap-3 text-gray-800 font-medium">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/productListing" className="hover:text-blue-600">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-blue-600">
                Brands
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Mobile Social Icons */}
          <div className="flex justify-center gap-4 py-3 border-t">
            <Facebook className="w-5 h-5 text-gray-700" aria-label="Facebook" />
            <Twitter className="w-5 h-5 text-gray-700" aria-label="Twitter" />
            <Instagram
              className="w-5 h-5 text-gray-700"
              aria-label="Instagram"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderLinks;
