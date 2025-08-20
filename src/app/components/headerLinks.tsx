"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Menu,
  ChevronDown,
  X,
} from "lucide-react";
import React, { useState } from "react";

const HeaderLinks = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border bg-white">
      <div className="px-25 py-4 flex items-center justify-between">
        {/* Left side (Logo + Menu Toggle on mobile) */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 border rounded-xs"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Categories (hidden on mobile) */}
          <div className="hidden lg:block relative group border-r border-gray-200">
            <span className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900">
              <Menu className="w-5 h-5" /> All Categories
            </span>
            <ul className="absolute left-0 mt-2 w-64 bg-white border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <li>
                <a
                  href="#"
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                >
                  Electronics <ChevronDown size={16} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                >
                  Fashion <ChevronDown size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Navbar (desktop only) */}
        <nav className="hidden lg:block">
          <ul className="flex gap-6 text-gray-800 font-semibold text-[16px]">
            <li>
              <a href="#" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-1 hover:text-blue-600"
              >
                Pages <ChevronDown size={16} />
              </a>
              <ul className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all text-gray-600 font-normal z-10">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    FAQ
                  </a>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-1 hover:text-blue-600"
              >
                Shop <ChevronDown size={16} />
              </a>
              <ul className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Shop Grid
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Shop List
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Brands
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>

        {/* Right side (social icons) */}
        <div className="hidden md:flex items-center gap-3">
          <h5 className="font-semibold hidden lg:block">Follow Us:</h5>
          <ul className="flex gap-3 text-gray-600">
            <li>
              <a href="#" className="group">
                <div className="w-8 h-8 rounded-full border flex justify-center items-center group-hover:bg-black transition-all duration-300">
                  <Facebook className="w-5 h-5 text-gray-900 group-hover:text-white" />
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="group">
                <div className="w-8 h-8 rounded-full border flex justify-center items-center group-hover:bg-black transition-all duration-300">
                  <Twitter className="w-5 h-5 text-gray-900 group-hover:text-white" />
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="group">
                <div className="w-8 h-8 rounded-full border flex justify-center items-center group-hover:bg-black transition-all duration-300">
                  <Instagram className="w-5 h-5 text-gray-900 group-hover:text-white" />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white shadow-md">
          <ul className="flex flex-col p-4 gap-3 text-gray-800 font-medium">
            <li>
              <a href="#" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Pages
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Brands
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Contact Us
              </a>
            </li>
          </ul>

          {/* Social Icons on Mobile */}
          <div className="flex justify-center gap-4 py-3 border-t">
            <Facebook className="w-5 h-5 text-gray-700" />
            <Twitter className="w-5 h-5 text-gray-700" />
            <Instagram className="w-5 h-5 text-gray-700" />
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderLinks;
