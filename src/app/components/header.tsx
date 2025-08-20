"use client";
import {
  Search,
  Phone,
  Heart,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeaderLinks from "./headerLinks";

export default function ShopGridsHeader() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="w-full bg-white shadow-sm px-25 py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-around py-4">
            {/* Logo */}
            <div className="w-7/12 md:w-3/12">
              <Link href="/" className="flex items-center">
                <Image src="/logo.svg" alt="Logo" width={200} height={80} />
              </Link>
            </div>

            {/* Search */}
            <div className="hidden md:flex w-7/12 lg:w-5/12">
              <div className="flex w-full border border-gray-200 rounded-sm overflow-hidden ">
                {/* Select */}
                <div className="relative">
                  <select className="appearance-none h-full px-4 py-2 pr-8 border-r border-gray-200 bg-white text-gray-600 text-sm outline-none cursor-pointer">
                    <option>All</option>
                    <option>Option 01</option>
                    <option>Option 02</option>
                    <option>Option 03</option>
                    <option>Option 04</option>
                  </select>
                  {/* ▼ custom arrow */}
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                    ▼
                  </span>
                </div>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none"
                />

                {/* Button */}
                <button className="bg-blue-600 hover:bg-blue-700 px-4 flex items-center justify-center text-white">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Right Area */}
            <div className="w-5/12 md:w-2/12 lg:w-4/12 flex items-center justify-center gap-4 ">
              {/* Hotline */}
              <div className="hidden lg:flex items-center gap-2 text-sm">
                <div className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center">
                  <Phone className="text-black font-light" size={18} />
                </div>
                <div>
                  <span className="font-semibold">Hotline:</span> <br />
                  <span className="text-gray-500">(+100) 123 456 7890</span>
                </div>
              </div>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 h-10 w-10 -mr-2 rounded-full flex items-center justify-center border group hover:bg-black transition-all duration-200 hover:text-white"
              >
                <Heart
                  size={22}
                  className="text-gray-700 group-hover:text-white"
                />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full px-1">
                  0
                </span>
              </Link>

              {/* Cart */}
              <div className="relative group">
                <Link
                  href="/cart"
                  className="relative p-2 h-10 w-10 rounded-full flex group  items-center justify-center border hover:bg-black transition-all duration-200"
                >
                  <ShoppingCart
                    size={22}
                    className="text-gray-700  group-hover:text-white"
                  />
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full px-1">
                    2
                  </span>
                </Link>

                {/* Dropdown cart */}
                <div className="relative group">
                  {/* Dropdown cart */}
                  <div
                    className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transform group-hover:translate-y-1 transition-all duration-200 z-50"
                  >
                    {/* Header */}
                    <div className="p-4 border-b flex justify-between text-sm">
                      <span>2 Items</span>
                      <Link
                        href="/cart"
                        className="text-blue-600 hover:underline"
                      >
                        View Cart
                      </Link>
                    </div>

                    {/* Items */}
                    <ul className="max-h-64 overflow-auto">
                      <li className="flex items-center gap-3 p-4 border-b">
                        <button className="text-gray-400 hover:text-red-500">
                          <X size={16} />
                        </button>
                        <Image
                          src="/item1.jpg"
                          alt="Item"
                          width={50}
                          height={50}
                          className="rounded"
                        />
                        <div>
                          <h4 className="text-sm font-semibold">
                            <Link href="/product-details">
                              Apple Watch Series 6
                            </Link>
                          </h4>
                          <p className="text-xs text-gray-500">1x - $99.00</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3 p-4 border-b">
                        <button className="text-gray-400 hover:text-red-500">
                          <X size={16} />
                        </button>
                        <Image
                          src="/item2.jpg"
                          alt="Item"
                          width={50}
                          height={50}
                          className="rounded"
                        />
                        <div>
                          <h4 className="text-sm font-semibold">
                            <Link href="/product-details">
                              Wi-Fi Smart Camera
                            </Link>
                          </h4>
                          <p className="text-xs text-gray-500">1x - $35.00</p>
                        </div>
                      </li>
                    </ul>

                    {/* Footer */}
                    <div className="p-4">
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span>Total</span>
                        <span>$134.00</span>
                      </div>
                      <Link
                        href="/checkout"
                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <div className="flex w-full border rounded-md overflow-hidden">
              <select className="px-3 py-2 border-r text-gray-600 text-sm outline-none">
                <option>All</option>
                <option>Option 01</option>
                <option>Option 02</option>
                <option>Option 03</option>
                <option>Option 04</option>
              </select>
              <input
                type="text"
                placeholder="Search"
                className="flex-1 px-3 py-2 outline-none text-gray-700"
              />
              <button className="bg-blue-600 px-4 flex items-center justify-center text-white">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <HeaderLinks></HeaderLinks>
    </header>
  );
}
