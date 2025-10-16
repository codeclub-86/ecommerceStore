"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGoogle,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { useEffect } from "react";
import { useStore } from "@/app/store/apiStore";

export default function Footer() {
  const { categories, fetchCategories } = useStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Extract only parent category names
  const parentCategories =
    categories?.map((cat: any) => cat.parent) || [];

  const footerData = {
    contact: {
      phone: "+92 314 0078748",
      hours: ["Mon–Fri: 2pm – 10pm"],
      email: "info@codeclub.tech",
    },
    information: [
      { name: "Shop", href: "/productListing" },
      { name: "Register Now", href: "/register" },
      { name: "Brands", href: "/brands" },
      { name: "Contact Us", href: "/contact" },
    ],
    departments: parentCategories,
    social: [
      { href: "#", label: "Facebook", icon: <FaFacebookF size={20} /> },
      { href: "#", label: "Twitter", icon: <FaTwitter size={20} /> },
      { href: "#", label: "Instagram", icon: <FaInstagram size={20} /> },
      { href: "#", label: "Google", icon: <FaGoogle size={20} /> },
    ],
  };

  return (
    <footer className="bg-[#011828] text-gray-300 w-full px-6 sm:px-10 lg:px-20 py-10 pb-3">
      {/* Top Section */}
      <div className="border-b border-gray-700 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/white-logo.svg"
              alt="Haasil Logo"
              width={200}
              height={60}
              priority
            />
          </Link>
        </div>
      </div>

      {/* Middle Section */}
      <div className="py-12 border-b border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold text-white">Get In Touch</h2>
            <div className="w-12 h-0.5 bg-blue-600 mt-2"></div>
            <ul className="mt-6 space-y-3 text-sm">
              <li>📞 {footerData.contact.phone}</li>
              {footerData.contact.hours.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
              <li>
                ✉️{" "}
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="hover:underline text-gray-300"
                >
                  {footerData.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <FooterColumn title="Information" links={footerData.information} />

          {/* Departments (only parent categories) */}
          <FooterColumn title="Shop Departments" links={footerData.departments} />

          {/* Mobile App */}
          <div>
            <h2 className="text-lg font-semibold text-white">Our Mobile App</h2>
            <div className="w-12 h-0.5 bg-blue-600 mt-2"></div>
            <div className="mt-6 flex flex-col space-y-4">
              <a
                href="#"
                aria-label="Download on the App Store"
                className="flex items-center gap-3 border border-gray-600 rounded-lg px-4 py-3 hover:bg-gray-800 transition"
              >
                <FaApple className="text-2xl" />
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="font-bold">App Store</p>
                </div>
                <p>Coming Soon</p>
              </a>
              <a
                href="#"
                aria-label="Get it on Google Play"
                className="flex items-center gap-3 border border-gray-600 rounded-lg px-4 py-3 hover:bg-gray-800 transition"
              >
                <FaGooglePlay className="text-2xl" />
                <div>
                  <p className="text-xs">Get it on</p>
                  <p className="font-bold">Google Play</p>
                </div>
                <p>Coming Soon</p>

              </a>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span>We Accept:</span> Cash on Delivery
          </div>

          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} Haasil. Designed by{" "}
            <a
              href="https://codeclub.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              CodeClub
            </a>
          </p>

          <div className="flex items-center gap-4">
            <span>Follow us:</span>
            {footerData.social.map(({ href, label, icon }, i) => (
              <Link
                key={i}
                href={href}
                aria-label={label}
                className="text-gray-300 hover:text-blue-500 transition"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Reusable Footer Column Component
const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[] | string[];
}) => (
  <div>
    <h2 className="text-lg font-semibold text-white">{title}</h2>
    <div className="w-12 h-0.5 bg-blue-600 mt-2"></div>
    <ul className="mt-6 space-y-3 text-sm">
      {links.map((link: any, idx) => (
        <li key={idx}>
          {typeof link === "string" ? (
            <span className="hover:underline hover:text-gray-100 transition cursor-pointer">
              {link}
            </span>
          ) : (
            <Link
              href={link.href}
              className="hover:underline hover:text-gray-100 transition"
            >
              {link.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);
