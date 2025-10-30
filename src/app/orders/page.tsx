"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, CalendarDays } from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";

interface Product {
  product_id: number;
  product_name: string;
  product_image: string;
  variation: string | null;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  order_id: number;
  customer_name: string;
  email: string;
  phone: string;
  shipping_address: string;
  city: string;
  postal_code: string;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | string;
  order_date: string;
  items: Product[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customer-orders/${user.email}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const statusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500 bg-yellow-500/10";
      case "processing":
        return "text-blue-400 bg-blue-500/10";
      case "shipped":
        return "text-purple-400 bg-purple-500/10";
      case "delivered":
        return "text-green-400 bg-green-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center">
        <p className="text-yellow-300 animate-pulse">Loading your orders...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-[#0f0f0f] text-white flex flex-col justify-center items-center">
        <p className="text-gray-300 text-xl font-medium tracking-wide">
          You have no orders yet
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all"
        >
          Start Shopping
        </button>
      </section>
    );
  }

  const cancelOrder = async (orderId: number) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cancel-order/${orderId}`,
        { method: "POST" }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Refresh UI
      setOrders((prev) =>
        prev.map((order) =>
          order.order_id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (error) {
      alert("Failed to cancel order. Try again.");
    }
  };
  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white py-10 px-4 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-yellow-300">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">No orders yet.</div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-8">
          {orders.map((order) => (
            <motion.div
              key={order.order_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-700 shadow-xl p-6 md:p-8 hover:border-yellow-300/40 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between gap-3 mb-6 border-b border-gray-700 pb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Package size={16} />
                    <span>Order #{order.order_id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDays size={14} />
                    <span>Placed on {order.order_date}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-start md:items-end">
                  <span
                    className={`text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full h-fit ${statusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                  {order.status === "pending" && (
                    <button
                      onClick={() => cancelOrder(order.order_id)}
                      className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md transition"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Products */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {order.items.map((product) => (
                  <div
                    key={product.product_id}
                    className="bg-[#181818] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-700 hover:border-yellow-400/40 transition-all"
                  >
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                    />
                    <div className="flex flex-col flex-1 text-left">
                      <h3 className="font-medium text-base">
                        {product.product_name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Qty: {product.quantity}
                      </p>
                      <p className="font-semibold text-yellow-300 mt-1">
                        Rs {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-6 flex justify-end border-t border-gray-800 pt-4">
                <p className="text-lg font-semibold">
                  Total:{" "}
                  <span className="text-yellow-300">Rs {order.total}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
