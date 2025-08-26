"use client";

import { Search, Phone, Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeaderLinks from "./headerLinks";
import CartComp from "./cartComp";
import { useState } from "react";

// 🔍 Reusable Search Bar
function SearchBar({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`flex w-full border rounded-md overflow-hidden ${
        mobile ? "" : "border-gray-400 rounded-sm"
      }`}
    >
      <select
        className="appearance-none px-3 py-2 border-r border-gray-400 text-gray-600 text-sm outline-none"
        aria-label="Search category"
      >
        <option>All</option>
        <option>Option 01</option>
        <option>Option 02</option>
        <option>Option 03</option>
      </select>

      <input
        type="text"
        placeholder="Search"
        aria-label="Search products"
        className="flex-1 px-3 py-2 outline-none text-gray-700 text-sm"
      />

      <button
        className="bg-blue-600 hover:bg-blue-700 px-4 flex items-center justify-center text-white"
        aria-label="Search"
      >
        <Search size={18} />
      </button>
    </div>
  );
}

export default function ShopGridsHeader() {
  const [wishlist] = useState([
    { id: 1, name: "Apple AirPods Pro", price: "$199.00", img: "/item1.jpg" },
    { id: 2, name: "Sony WH-1000XM5", price: "$349.00", img: "/item2.jpg" },
    { id: 3, name: "iPad Mini 2024", price: "$499.00", img: "/item3.jpg" },
  ]);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="w-full lg:px-8 md:px-6 px-2 py-10 container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={180}
                height={60}
                priority
              />
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <SearchBar />
            </div>

            {/* Right Area */}
            <div className="flex items-center gap-6">
              {/* Hotline */}
              {/* <div className="hidden lg:flex items-center gap-2 text-sm">
                <div className="h-10 w-10 rounded-full border flex items-center justify-center">
                  <Phone className="text-black" size={18} />
                </div>
                <div>
                  <span className="font-semibold">Hotline:</span> <br />
                  <span className="text-gray-500">(+100) 123 456 7890</span>
                </div>
              </div> */}

              {/* Wishlist */}
              <div className="relative group">
                <span
                  className="relative p-2 h-10 w-10 rounded-full flex items-center justify-center border group hover:bg-black transition-all"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={22}
                    className="text-gray-700 group-hover:text-white"
                  />
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full px-1">
                    {wishlist.length}
                  </span>
                </span>

                {/* Dropdown */}
                <div
                  className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transform group-hover:translate-y-1 transition-all duration-200 z-50"
                >
                  <div className="p-4 border-b text-sm flex justify-between">
                    <span>{wishlist.length} Items</span>
                  </div>

                  <ul className="max-h-64 overflow-auto">
                    {wishlist.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 p-4 border-b"
                      >
                        <button
                          className="text-gray-400 hover:text-red-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X size={16} />
                        </button>
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded"
                          loading="lazy"
                        />
                        <div>
                          <h4 className="text-sm font-semibold">
                            <Link href="/product-details">{item.name}</Link>
                          </h4>
                          <p className="text-xs text-gray-500">{item.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cart */}
              <CartComp />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <SearchBar mobile />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <HeaderLinks />
    </header>
  );
}
