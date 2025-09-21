"use client";
import { useState } from "react";
import { useCartStore } from "@/app/store/cartStore";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
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

  // 🔹 Calculate subtotal, shipping, tax, total
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 10.5;
  const tax = 10;
  const total = subtotal + shipping + tax;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // Prepare items in backend format
    const items = cart.map((item) => ({
      product_id: item.id,
      variation: item.variation
        ? item.variation.map((v) => v.value).join(", ")
        : "",
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    // ✅ Build payload with totals
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

    console.log("Payload to API:", JSON.stringify(payload, null, 2));

    try {
      const res = await fetch("http://localhost:8000/api/placeOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit order");

      await res.json();
      alert("Order placed successfully ✅");
      clearCart();

      // Reset form
      setFormData({
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
    } catch (error) {
      console.error(error);
      alert("Something went wrong while placing the order ❌");
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
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
              <input
                name="lastName"
                type="text"
                required
                placeholder="Doe"
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
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
              <input
                name="phone"
                type="tel"
                required
                placeholder="+92 300 1234567"
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
              placeholder="123 Street Name"
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
                placeholder="Peshawar"
                value={formData.city}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
              />
              <input
                name="postalCode"
                type="text"
                required
                placeholder="25000"
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
                placeholder="Pakistan"
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
                <option value="">Select</option>
                <option>KPK</option>
                <option>Punjab</option>
                <option>Sindh</option>
              </select>
            </div>

            {/* Submit */}
            <button className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium">
              Place Order
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
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
