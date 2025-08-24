"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Menu,
  ChevronDown,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <header className="w-full border-t bg-white border-b ">
      <div className="px-6 lg:px-10 py-4 flex items-center container  mx-auto justify-between">
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
              <li>
                <Link
                  href="/category/electronics"
                  className="flex justify-between items-center px-5 py-3 hover:bg-gray-50 hover:text-blue-600 transition rounded-t-xl"
                >
                  Electronics <ChevronDown size={16} />
                </Link>
              </li>
              <li>
                <Link
                  href="/category/fashion"
                  className="flex justify-between items-center px-5 py-3 hover:bg-gray-50 hover:text-blue-600 transition"
                >
                  Fashion <ChevronDown size={16} />
                </Link>
              </li>
              <li>
                <Link
                  href="/category/home"
                  className="flex justify-between items-center px-5 py-3 hover:bg-gray-50 hover:text-blue-600 transition rounded-b-xl"
                >
                  Home & Living <ChevronDown size={16} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden lg:block">
          <ul className="flex gap-8 text-gray-800 font-semibold text-[16px]">
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
