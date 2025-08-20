// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#011828] text-gray-300 w-full px-25 py-10 pb-3">
      {/* Top Section */}
      <div className="border-b border-gray-700 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/white-logo.svg" alt="Logo" width={200} height={60} />
          </Link>

          {/* Newsletter */}
        </div>
      </div>

      {/* Middle Section */}
      <div className="py-12 border-b border-gray-700">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold capitalize text-white">
              Get In Touch
            </h2>
            <div className="w-12 h-0.5 bg-blue-600 mt-2"></div>
            <ul className="mt-6 space-y-3 text-sm">
              <li>📞 +1 (900) 33 169 7720</li>
              <li>Mon–Fri: 9am – 8pm</li>
              <li>Sat: 10am – 6pm</li>
              <li>
                ✉️{" "}
                <a
                  href="mailto:abc@gmail.com"
                  className="hover:underline text-gray-300"
                >
                  abc@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h2 className="text-lg font-semibold capitalize text-white">
              Information
            </h2>
            <div className="w-12 h-0.5 bg-blue-600 mt-2"></div>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
              <li>
                <Link href="#">Downloads</Link>
              </li>
              <li>
                <Link href="#">Sitemap</Link>
              </li>
              <li>
                <Link href="#">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Shop Departments */}
          <div>
            <h2 className="text-lg font-semibold capitalize text-white">
              Shop Departments
            </h2>
            <div className="w-12 h-0.5 bg-blue-600 mt-2"></div>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link href="#">Computers & Accessories</Link>
              </li>
              <li>
                <Link href="#">Smartphones & Tablets</Link>
              </li>
              <li>
                <Link href="#">TV, Video & Audio</Link>
              </li>
              <li>
                <Link href="#">Cameras & Photo</Link>
              </li>
              <li>
                <Link href="#">Headphones</Link>
              </li>
            </ul>
          </div>

          {/* Mobile App */}
          <div>
            <h2 className="text-lg font-semibold capitalize text-white">
              Our Mobile App
            </h2>
            <div className="w-12 h-0.5 bg-blue-600 mt-2"></div>
            <div className="mt-6 flex flex-col space-y-4">
              <a
                href="#"
                className="flex items-center gap-3 border border-gray-600 rounded-lg px-4 py-3 hover:bg-gray-800 transition"
              >
                <i className="lni lni-apple text-2xl"></i>
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="font-bold">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 border border-gray-600 rounded-lg px-4 py-3 hover:bg-gray-800 transition"
              >
                <i className="lni lni-play-store text-2xl"></i>
                <div>
                  <p className="text-xs">Get it on</p>
                  <p className="font-bold">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          {/* Payment */}
          <div className="flex items-center gap-2">
            <span>We Accept:</span>
            <Image
              src="/credit-cards-footer.png"
              alt="Payments"
              width={180}
              height={30}
            />
          </div>

          {/* Copyright */}
          <p className="text-gray-400">
            © {new Date().getFullYear()} ShopGrids. Designed by{" "}
            <a
              href="https://graygrids.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              CodeClub
            </a>
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <span>Follow us:</span>
            <Link
              href="#"
              className="text-gray-300 hover:text-blue-500 transition"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-sky-400 transition"
            >
              <FaTwitter size={20} />
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-pink-500 transition"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-red-500 transition"
            >
              <FaGoogle size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
