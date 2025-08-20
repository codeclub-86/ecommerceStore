"use client";
import React from "react";
import {
  FaApple,
  FaGooglePlay,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGoogle,
} from "react-icons/fa";
import {
  SiVisa,
  SiAmericanexpress,
  SiPaypal,
  SiMastercard,
} from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#0c1e35] text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
          {/* Logo & Newsletter */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">ShopGrids</h2>
            <p className="text-sm mb-4">
              Subscribe to our Newsletter <br />
              Get all the latest information, Sales and Offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email address here..."
                className="px-4 py-2 rounded-l-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 relative">
              Get In Touch With Us
              <span className="block w-10 h-0.5 bg-blue-600 mt-2"></span>
            </h3>
            <p className="text-sm">Phone: +1 (900) 33 169 7720</p>
            <p className="text-sm">Monday-Friday: 9.00 am - 8.00 pm</p>
            <p className="text-sm">Saturday: 10.00 am - 6.00 pm</p>
            <p className="text-sm mt-2">support@shopgrids.com</p>
          </div>

          {/* Mobile App */}
          <div>
            <h3 className="text-white font-semibold mb-4 relative">
              Our Mobile App
              <span className="block w-10 h-0.5 bg-blue-600 mt-2"></span>
            </h3>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <FaApple size={20} /> Download on the App Store
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
              >
                <FaGooglePlay size={20} /> Download on Google Play
              </a>
            </div>
          </div>

          {/* Info & Departments */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-4 relative">
                Information
                <span className="block w-10 h-0.5 bg-blue-600 mt-2"></span>
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Downloads
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Sitemap
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    FAQs Page
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 relative">
                Shop Departments
                <span className="block w-10 h-0.5 bg-blue-600 mt-2"></span>
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Computers & Accessories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Smartphones & Tablets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    TV, Video & Audio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Cameras, Photo & Video
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Headphones
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400 gap-4">
          {/* Payment */}
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">We Accept:</span>
            <SiVisa size={32} />
            <SiAmericanexpress size={32} />
            <SiMastercard size={32} />
            <SiPaypal size={32} />
          </div>

          {/* Copyright */}
          <p className="text-center">Designed and Developed by GrayGrids</p>

          {/* Socials */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-500">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-500">
              <FaGoogle />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
