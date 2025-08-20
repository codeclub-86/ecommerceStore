import React from "react";

interface Category {
    name: string;
    count: number;
}

const categories: Category[] = [
    { name: "Computers & Accessories", count: 1138 },
    { name: "Smartphones & Tablets", count: 2356 },
    { name: "TV, Video & Audio", count: 420 },
    { name: "Cameras, Photo & Video", count: 874 },
    { name: "Headphones", count: 1239 },
    { name: "Wearable Electronics", count: 340 },
    { name: "Printers & Ink", count: 512 },
];

const priceRanges = [
    { label: "$50 - $100", count: 208 },
    { label: "$100 - $500", count: 311 },
    { label: "$500 - $1,000", count: 485 },
    { label: "$1,000 - $5,000", count: 213 },
];

const brands = [
    { label: "Apple", count: 254 },
    { label: "Bosch", count: 39 },
    { label: "Canon Inc.", count: 128 },
    { label: "Dell", count: 310 },
    { label: "Hewlett-Packard", count: 42 },
    { label: "Hitachi", count: 217 },
    { label: "LG Electronics", count: 310 },
    { label: "Panasonic", count: 74 },
];

const SearchFilter: React.FC = () => {
    return (
        <>
            {/* Search Product */}
            <div className="w-full p-6 bg-white rounded-lg shadow-sm mb-8">
                <h3 className="text-lg font-semibold mb-4">Search Product</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Here..."
                        className="w-full py-2 px-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* All Categories */}
            <div className="w-full p-6 bg-white rounded-lg shadow-sm mb-8">
                <h3 className="text-lg font-semibold mb-4">All Categories</h3>
                <ul>
                    {categories.map((cat, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center py-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            <span>{cat.name}</span>
                            <span className="text-sm">({cat.count})</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price Range (slider) */}
            <div className="w-full p-6 bg-white rounded-lg shadow-sm mb-8">
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="relative pt-1">
                    <input
                        type="range"
                        min={0}
                        max={500}
                        defaultValue={100}
                        className="w-full appearance-none h-2 bg-gray-200 rounded-full cursor-pointer"
                    />
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">$ 100</span>
                </div>
            </div>

            {/* Filter by Price (checkboxes) */}
            <div className="w-full p-6 bg-white rounded-lg shadow-sm mb-8">
                <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
                <div className="space-y-3">
                    {priceRanges.map((range, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`price-${index}`}
                                name="price-filter"
                                className="form-checkbox text-blue-600 rounded-sm focus:ring-blue-500"
                            />
                            <label
                                htmlFor={`price-${index}`}
                                className="ml-3 text-gray-700 cursor-pointer"
                            >
                                {range.label} ({range.count})
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter by Brand */}
            <div className="w-full p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Filter by Brand</h3>
                <div className="space-y-3">
                    {brands.map((brand, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`brand-${index}`}
                                name="brand-filter"
                                className="form-checkbox text-blue-600 rounded-sm focus:ring-blue-500"
                            />
                            <label
                                htmlFor={`brand-${index}`}
                                className="ml-3 text-gray-700 cursor-pointer"
                            >
                                {brand.label} ({brand.count})
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchFilter;
