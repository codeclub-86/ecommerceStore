import React from "react";

const ProductSort: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white rounded-lg shadow-sm mb-6 space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-4">
                <span className="text-gray-600">Sort by:</span>
                <select className="border rounded-lg py-2 px-4 focus:outline-none">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
                <span className="text-gray-600">Showing: 1 - 12 items</span>
            </div>
            <div className="flex items-center space-x-2">
                {/* Grid View Icon */}
                <button className="p-2 border rounded-lg text-gray-400 hover:text-blue-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 11h6V5H4v6zm0 7h6v-6H4v6zm7 0h6v-6h-6v6zm7-13v6h-6V5h6z"></path>
                    </svg>
                </button>
                {/* List View Icon (Active) */}
                <button className="p-2 border rounded-lg bg-blue-500 text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductSort;
