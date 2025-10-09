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

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
        fetchStores();
    }, [fetchCategories, fetchStores]);

    useEffect(() => {
        console.log("✅ Stores data from API:", stores);
    }, [stores]);

    const filteredCategories = categories.filter((cat) =>
        (cat.category_name ?? "").toLowerCase().includes(search.toLowerCase())
    );

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        onCategorySelect(categoryName);
    };

    const handlePriceClick = (range: { label: string; min: number; max: number }) => {
        setSelectedPrice(range.label);
        onPriceSelect([range.min, range.max]);
    };

    const handleBrandClick = (brand: string) => {
        setSelectedBrand(brand);
        onBrandSelect(brand);
    };

    return (
        <>
            {/* Search */}
            <div className="w-full p-6 bg-white shadow-sm mb-8">
                <h3 className="text-lg font-semibold mb-4">Search Product</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Here..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-2 px-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="w-full p-6 bg-white shadow-sm mb-8">
                <h3 className="text-lg font-semibold mb-4">All Categories</h3>
                {loading ? (
                    <p className="text-gray-500">Loading categories...</p>
                ) : filteredCategories.length > 0 ? (
                    <ul>
                        {filteredCategories.map((cat) => (
                            <li
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.category_name)}
                                className={`py-2 px-3 cursor-pointer hover:text-blue-600 transition ${selectedCategory === cat.category_name
                                    ? "font-semibold text-blue-600"
                                    : "text-gray-600"
                                    }`}
                            >
                                {cat.category_name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No categories found.</p>
                )}
            </div>

            {/* Price Filter */}
            <div className="w-full p-6 bg-white shadow-sm mb-8">
                <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
                <div className="space-y-3">
                    {priceRanges.map((range) => (
                        <div
                            key={range.label}
                            onClick={() => handlePriceClick(range)}
                            className={`py-2 px-3 cursor-pointer hover:text-blue-600 transition ${selectedPrice === range.label
                                ? "font-semibold text-blue-600"
                                : "text-gray-600"
                                }`}
                        >
                            {range.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Brand Filter */}

            <div className="w-full p-6 bg-white shadow-sm mb-8">
                <h3 className="text-lg font-semibold mb-4">Filter by Brand</h3>
                {loading ? (
                    <p className="text-gray-500">Loading brands...</p>
                ) : stores.length > 0 ? (
                    <div className="space-y-3">
                        {stores.map((store: any) => (
                            <div
                                key={store.id}
                                onClick={() => {
                                    setSelectedBrand(store.name);
                                    onBrandSelect(store.name);
                                }}
                                className={`py-2 px-3 cursor-pointer hover:text-blue-600 transition ${selectedBrand === store.name
                                    ? "font-semibold text-blue-600"
                                    : "text-gray-600"
                                    }`}
                            >
                                {store.name}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No brands available.</p>
                )}
            </div>

        </>
    );
};

export default SearchFilter;
