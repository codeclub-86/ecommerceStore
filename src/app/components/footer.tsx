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
import { useEffect, useState } from "react";
import { useStore } from "@/app/store/apiStore";

export default function Footer() {
  const { categories, fetchCategories } = useStore();
  const [parentCategories, setParentCategories] = useState<string[]>([]);

  // Fetch categories client-side and update state
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categories) {
      const parents = categories.map((cat: any) => cat.parent);
      setParentCategories(parents);
    }
  }, [categories]);

  const footerData = {
    contact: {
      phone: "+92 3141334484",
      hours: ["Mon–Fri: 2pm – 10pm"],
      emails: ["support@haasl.store", "haasilpk@gmail.com"],
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
              src="/logo6.png"
              alt="Haasil Logo"
              width={80}
              height={40}
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
                <li key={`hour-${idx}`}>{line}</li>
              ))}
              {footerData.contact.emails.map((email) => (
                <li key={email}>
                  ✉️{" "}
                  <a
                    href={`mailto:${email}`}
                    className="hover:underline text-gray-300"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <FooterColumn
            title="Information"
            links={footerData.information}
            keyPrefix="info"
          />

          {/* Departments */}
          <FooterColumn
            title="Shop Departments"
            links={footerData.departments}
            keyPrefix="dept"
          />

          {/* Mobile App */}
          <div>
            <h2 className="text-lg font-semibold text-white">Our Mobile App</h2>
            <div className="w-12 h-0.5 bg-blue-600 mt-2"></div>
            <div className="mt-6 flex flex-col space-y-4">
              <AppLink icon={<FaApple className="text-2xl" />} title="App Store" />
              <AppLink icon={<FaGooglePlay className="text-2xl" />} title="Google Play" />
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
            © {new Date().getFullYear()} Haasil. Product Of{" "}
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
            {footerData.social.map(({ href, label, icon }) => (
              <Link
                key={label}
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

const FooterColumn = ({
  title,
  links,
  keyPrefix = "col",
}: {
  title: string;
  links: { name: string; href: string }[] | string[];
  keyPrefix?: string;
}) => (
  <div>
    <h2 className="text-lg font-semibold text-white">{title}</h2>
    <div className="w-12 h-0.5 bg-blue-600 mt-2"></div>
    <ul className="mt-6 space-y-3 text-sm">
      {links.map((link: any, idx) => (
        <li key={`${keyPrefix}-${typeof link === "string" ? link : link.href}`}>
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

const AppLink = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <a
    href="#"
    aria-label={`Get it on ${title}`}
    className="flex items-center gap-3 border border-gray-600 rounded-lg px-4 py-3 hover:bg-gray-800 transition"
  >
    {icon}
    <div>
      <p className="text-xs">{title === "App Store" ? "Download on the" : "Get it on"}</p>
      <p className="font-bold">{title}</p>
    </div>
    <p>Coming Soon</p>
  </a>
);
