"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/app/store/cartStore";
import { useAuthStore } from "@/app/store/authStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import emailjs from "emailjs-com";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const { initializeAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    state: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Prevent double submit

  useEffect(() => {
    initializeAuth();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed?.email) {
        setFormData((prev) => ({ ...prev, email: parsed.email }));
      }
    }
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 250;
  const tax = 100;
  const total = subtotal + shipping + tax;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // ✅ Stop multiple clicks
    setIsSubmitting(true);

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      setIsSubmitting(false);
      return;
    }

    const items = cart.map((item) => ({
      product_id: item.id,
      product_name: item.name,
      variation: item.variation
        ? item.variation.map((v) => v.value).join(", ")
        : "",
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    const payload = {
      customer_name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      shipping_address: formData.address,
      city: formData.city,
      postal_code: formData.postalCode,
      items,
      subtotal,
      shipping,
      tax,
      total,
    };

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/placeOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit order");
      const data = await res.json();

      // ✅ Send email with order details
      const emailPayload = {
        customer_name: payload.customer_name,
        email: payload.email,
        phone: payload.phone,
        shipping_address: payload.shipping_address,
        city: payload.city,
        postal_code: payload.postal_code,
        total: payload.total,
        order_date: new Date().toLocaleString(),
        order_id: data.order_id || Math.floor(Math.random() * 10000),
        items: payload.items.map((item) => ({
          product_name: item.product_name,

          variation: item.variation || "Default",
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
      };

      await emailjs.send(
        "service_5yxvuaq",
        "template_23c12jv",
        emailPayload,
        "RsdRulyOeRPxmhBhR"
      );

      clearCart();
      toast.success("Order placed successfully 🎉", {
        description: "Click below to view your orders",
        action: {
          label: "View Orders",
          onClick: () => router.push("/orders"),
        },
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: formData.email,
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        state: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while placing the order ❌");
    } finally {
      setIsSubmitting(false); // ✅ Re-enable after completion
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT SIDE - Shipping Form */}
      <div className="lg:col-span-2">
        <form
          onSubmit={handleFormSubmit}
          className="border rounded-lg bg-white shadow-sm"
        >
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-800 text-lg">
              Shipping Details
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* First/Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                required
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
              <input
                name="lastName"
                type="text"
                required
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                required
                readOnly
                placeholder="Your email address"
                value={formData.email}
                className="border rounded-lg px-4 py-2 w-full bg-gray-100 text-gray-700 cursor-not-allowed"
              />
              <input
                name="phone"
                type="tel"
                required
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            {/* Address */}
            <input
              name="address"
              type="text"
              required
              placeholder="Street address (e.g., 123 Main St)"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
            />

            {/* City + Post Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="city"
                type="text"
                required
                placeholder="City (e.g., Peshawar)"
                value={formData.city}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
              <input
                name="postalCode"
                type="text"
                required
                placeholder="Postal code (e.g., 25000)"
                value={formData.postalCode}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            {/* Country + State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="country"
                type="text"
                required
                placeholder="Country (e.g., Pakistan)"
                value={formData.country}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
              <select
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              >
                <option value="">Select your state</option>
                <option>KPK</option>
                <option>Punjab</option>
                <option>Sindh</option>
              </select>
            </div>


            <button
              type="submit"
              disabled={isSubmitting} // ✅ Prevent re-click
              className={`w-full font-semibold py-3 rounded-lg transition ${isSubmitting
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:bg-yellow-500"
                }`}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE - Pricing Summary */}
      <div className="space-y-6">
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3">Pricing Summary</h3>

          <div className="space-y-2 text-sm mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  Rs {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Rs {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Rs {shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>Rs {tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>Rs {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
