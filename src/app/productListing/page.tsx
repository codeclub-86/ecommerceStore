"use client";

import { useState } from "react";
import SearchFilter from "../components/searchFilter/searchFilter";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ProductSort from "../components/ProductSort/ProductSort";
// import ProductCard from "../components/ProductCard";

const products = [
  {
    image: "https://via.placeholder.com/300x300.png?text=Xiaomi+Mi+Band+5",
    category: "Watches",
    name: "Xiaomi Mi Band 5",
    rating: 4,
    price: "199.00",
  },
  {
    image:
      "https://via.placeholder.com/300x300.png?text=Big+Power+Sound+Speaker",
    category: "Speaker",
    name: "Big Power Sound Speaker",
    rating: 5,
    price: "275.00",
    oldPrice: "399.00",
    discount: "-25%",
  },
];

const ProductListing: React.FC = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm  min-h-screen py-10 px-4 md:px-10 lg:px-20">
      {/* Breadcrumb at top */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
          ]}
        />
      </div>
=======
import TrendingSingle from "../components/trending/trendingSingle";
import products from "./product.js"



const ProductListing: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-sm min-h-screen py-10 px-4 md:px-10 lg:px-25">
            {/* Breadcrumb at top */}
            <div className="mb-6">
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Products", href: "/products" },
                    ]}
                />
            </div>


      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1">
          <SearchFilter />
        </div>

        {/* Right Section - Products */}
        <div className="lg:col-span-3">
          {/* Sorting and View Options */}
          <ProductSort />

          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
                    {/* Product List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProducts.map((product, index) => (
                            <TrendingSingle key={index} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-8 space-x-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-4 py-2 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-4 py-2 border rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : ""
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-4 py-2 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
