import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["via.placeholder.com"], // your existing config
  },
  async headers() {
    return [
      {
        source: "/api/:path*", // apply CORS headers to all API routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3002", // allow admin panel
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
