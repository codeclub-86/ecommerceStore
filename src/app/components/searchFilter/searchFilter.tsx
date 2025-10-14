"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/app/store/apiStore";

interface SearchFilterProps {
    onCategorySelect: (categoryName: string | null) => void;
    onPriceSelect: (priceRange: [number, number] | null) => void;
    onBrandSelect: (brand: string | null) => void;
}

const priceRanges = [
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $500", min: 100, max: 500 },
    { label: "$500 - $1,000", min: 500, max: 1000 },
    { label: "$1,000 - $5,000", min: 1000, max: 5000 },
];

const SearchFilter: React.FC<SearchFilterProps> = ({
    onCategorySelect,
    onPriceSelect,
    onBrandSelect,
}) => {
    const { categories, fetchCategories, stores, fetchStores, loading } = useStore();

    const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
        fetchStores();
    }, [fetchCategories, fetchStores]);

    return (
        <>
            {/* Categories */}
            <div className="w-full p-6 bg-white shadow-sm mb-8 rounded-lg relative">
                <h3 className="text-lg font-semibold mb-4">All Categories</h3>

                {loading ? (
                    <p className="text-gray-500">Loading categories...</p>
                ) : categories.length > 0 ? (
                    <ul className="space-y-3">
                        <li
                            onClick={() => {
                                setSelectedCategory(null);
                                onCategorySelect(null);
                            }}
                            className={`cursor-pointer py-2 px-3 rounded-md transition ${selectedCategory === null
                                ? "bg-yellow-100 text-yellow-700 font-semibold"
                                : "text-gray-700 hover:bg-yellow-50"
                                }`}
                        >
                            All
                        </li>

                        {/* Parent + Child Categories */}
                        {categories.map((group: any, idx: number) => (
                            <li
                                key={idx}
                                className="relative group/category"
                            >
                                {/* Parent category (unclickable) */}
                                <div
                                    className={`flex justify-between items-center py-2 px-3 rounded-md cursor-default transition ${selectedCategory === group.parent
                                        ? "bg-yellow-100 text-yellow-700 font-semibold"
                                        : "text-gray-800 hover:bg-yellow-50"
                                        }`}
                                >
                                    {group.parent || "Unnamed Category"}

                                    {group.categories && group.categories.length > 0 && (
                                        <svg
                                            className="w-4 h-4 ml-2 text-gray-500 group-hover/category:text-yellow-600 transition-transform"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                </div>

                                {/* Dropdown on hover */}
                                {group.categories && group.categories.length > 0 && (
                                    <ul
                                        className="absolute left-full top-0 ml-2 hidden group-hover/category:block 
                    bg-white border border-gray-200 rounded-md shadow-md w-48 z-10"
                                    >
                                        {group.categories.map((cat: any) => (
                                            <li
                                                key={cat.id}
                                                className={`cursor-pointer py-2 px-3 rounded-md transition ${selectedCategory === cat.category_name
                                                    ? "bg-yellow-200 text-yellow-800 font-semibold"
                                                    : "text-gray-700 hover:bg-yellow-50"
                                                    }`}
                                                onClick={() => {
                                                    setSelectedCategory(cat.category_name);
                                                    onCategorySelect(cat.category_name);
                                                }}
                                            >
                                                {cat.category_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No categories found.</p>
                )}
            </div>

            {/* Price Filter */}
            <div className="w-full p-6 bg-white shadow-sm mb-8 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
                <div className="space-y-3">
                    {priceRanges.map((range) => (
                        <div
                            key={range.label}
                            onClick={() => {
                                setSelectedPrice(range.label);
                                onPriceSelect([range.min, range.max]);
                            }}
                            className={`py-2 px-3 cursor-pointer rounded-md transition ${selectedPrice === range.label
                                ? "bg-yellow-100 text-yellow-700 font-semibold"
                                : "text-gray-700 hover:bg-yellow-50"
                                }`}
                        >
                            {range.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Brand Filter */}
            <div className="w-full p-6 bg-white shadow-sm rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Filter by Brand</h3>
                {loading ? (
                    <p className="text-gray-500">Loading brands...</p>
                ) : stores.length > 0 ? (
                    <ul className="space-y-2">
                        <li
                            onClick={() => {
                                setSelectedBrand(null);
                                onBrandSelect(null);
                            }}
                            className={`cursor-pointer py-2 px-3 rounded-md transition ${selectedBrand === null
                                ? "bg-yellow-100 text-yellow-700 font-semibold"
                                : "text-gray-700 hover:bg-yellow-50"
                                }`}
                        >
                            All
                        </li>
                        {stores.map((store: any) => (
                            <li
                                key={store.id || store.name}
                                onClick={() => {
                                    setSelectedBrand(store.name);
                                    onBrandSelect(store.name);
                                }}
                                className={`cursor-pointer py-2 px-3 rounded-md transition ${selectedBrand === store.name
                                    ? "bg-yellow-100 text-yellow-700 font-semibold"
                                    : "text-gray-700 hover:bg-yellow-50"
                                    }`}
                            >
                                {store.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No brands available.</p>
                )}
            </div>
        </>
    );
};

export default SearchFilter;
