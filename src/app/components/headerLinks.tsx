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
import { useStore } from "@/app/store/apiStore";

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
  const { categories, fetchCategories, loading } = useStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <header className="w-full bg-black text-white shadow-md border-b border-yellow-400">
      <div className="px-6 lg:px-10 py-4 flex items-center justify-between container mx-auto">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Menu"
            className="lg:hidden p-2 border border-yellow-400 rounded-md text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Categories */}
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
              {categories.map((cat: any, idx: number) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.id}`}
                    className={`flex justify-between items-center px-5 py-3 text-white hover:bg-yellow-400 hover:text-black transition 
                    ${idx === 0 ? "rounded-t-xl" : ""} 
                    ${idx === categories.length - 1 ? "rounded-b-xl" : ""}`}
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
          <ul className="flex gap-10 text-[16px] font-semibold">
            {/* Products */}
            <li className="relative group">
              <Link href="/productListing" className="hover:text-yellow-400 transition">
                Products
              </Link>
              <ul
                className="absolute left-0 mt-2 w-48 bg-black rounded-lg shadow-lg border border-yellow-400/40
                opacity-0 scale-95 translate-y-2 invisible
                group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible
                transition-all duration-300 ease-out z-50"
              >
                <li>
                  <Link href="/productListing" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/productListing" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">
                    On Sale
                  </Link>
                </li>
                <li>
                  <Link href="/productListing" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">
                    Top Rated
                  </Link>
                </li>
              </ul>
            </li>

            {/* Brands */}
            <li className="relative group">
              <Link href="/brands" className="hover:text-yellow-400 transition">
                Brands
              </Link>
              <ul
                className="absolute left-0 mt-2 w-48 bg-black rounded-lg shadow-lg border border-yellow-400/40
                opacity-0 scale-95 translate-y-2 invisible
                group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible
                transition-all duration-300 ease-out z-50"
              >
                <li>
                  <Link href="/brands/a" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">
                    Brand A
                  </Link>
                </li>
                <li>
                  <Link href="/brands/b" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">
                    Brand B
                  </Link>
                </li>
                <li>
                  <Link href="/brands/c" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">
                    Brand C
                  </Link>
                </li>
              </ul>
            </li>

            {/* Register Now */}
            <li>
              <Link
                href="/register"
                className=" text-white px-5 py-2 rounded-full font-semibold  hover:text-yellow-500 transition"
              >
                Register Now
              </Link>
            </li>

            {/* Contact Us */}
            <li className="relative group">
              <Link href="/contact" className="hover:text-yellow-400 transition">
                Contact Us
              </Link>
              <ul
                className="absolute left-0 mt-2 w-48 bg-black rounded-lg shadow-lg border border-yellow-400/40
                opacity-0 scale-95 translate-y-2 invisible
                group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:visible
                transition-all duration-300 ease-out z-50"
              >
                <li>
                  <Link href="/contact/support" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/contact/faq" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact/email" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition">
                    Email Us
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Right side social icons */}
        <div className="hidden md:flex items-center gap-5">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-yellow-400 bg-black text-white shadow-md animate-fade-in">
          <ul className="flex flex-col p-4 gap-3 font-medium">
            <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link href="/productListing" className="hover:text-yellow-400">Shop</Link></li>
            <li><Link href="/brands" className="hover:text-yellow-400">Brands</Link></li>
            <li><Link href="/register" className="text-yellow-400 font-semibold">Register Now</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400">Contact Us</Link></li>
          </ul>

          <div className="flex justify-center gap-5 py-4 border-t border-yellow-400">
            <Facebook className="w-5 h-5 text-yellow-400" />
            <Twitter className="w-5 h-5 text-yellow-400" />
            <Instagram className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderLinks;
