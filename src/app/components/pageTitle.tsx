"use client";

import Link from "next/link";
import { Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        {/* Left - Title */}
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>

        {/* Right - Breadcrumbs */}
        <nav className="text-sm text-gray-500 flex items-center space-x-2">
          {/* Home link always first */}
          <Link href="/" className="flex items-center hover:text-blue-600">
            <Home size={16} className="mr-1" />
            Home
          </Link>

          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-gray-400">›</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-blue-600">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-800 font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
