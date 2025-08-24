"use client";
import { useState } from "react";
import PageTitle from "../components/pageTitle";

export default function CheckoutPage() {
  const [coupon, setCoupon] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send data to API or backend
    alert("Form submitted successfully 🚀");
  };

  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT SIDE - Shipping Form */}
      <div className="lg:col-span-2">
        <form
          onSubmit={handleFormSubmit}
          className="border rounded-lg bg-white shadow-sm"
        >
          {/* Header */}
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-800 text-lg">
              Shipping Details
            </h2>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-6">
            {/* User Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 234 567 890"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-800">
                Mailing Address
              </label>
              <input
                type="text"
                required
                placeholder="123 Street Name"
                className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* City + Post Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">
                  City
                </label>
                <input
                  type="text"
                  required
                  placeholder="Los Angeles"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">
                  Post Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="90001"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Country + State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">
                  Country
                </label>
                <input
                  type="text"
                  required
                  placeholder="United States"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">
                  State / Region
                </label>
                <select
                  required
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select</option>
                  <option>California</option>
                  <option>Texas</option>
                  <option>New York</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE - Coupon + Pricing */}
      <div className="space-y-6">
        {/* Pricing Table */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3">Pricing Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>$144.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>$10.50</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>$10.00</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>$164.50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
