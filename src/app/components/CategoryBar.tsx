"use client";

import React from "react";
import Link from "next/link";

const categories = [
    { name: "Men", href: "/category/men" },
    { name: "Women", href: "/category/women" },
    { name: "Juniors", href: "/category/juniors" },
    { name: "Accessories", href: "/category/accessories" },
];

const CategoryBar = () => {
    return (
        <section className="py-10 px-6 bg-gray-800">
            <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-5">
                {categories.map((cat) => (
                    <Link
                        key={cat.name}
                        href={cat.href}
                        className="px-10 py-4 rounded-xl font-semibold text-black bg-yellow-400 hover:bg-yellow-300 transition-transform transform hover:scale-105 active:scale-95 shadow-md"
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryBar;
