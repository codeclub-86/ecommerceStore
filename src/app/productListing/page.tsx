"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import SearchFilter from "../components/searchFilter/searchFilter";
import ProductSort from "../components/ProductSort/ProductSort";
import TrendingSingle from "../components/productCard/card";
import { useStore } from "@/app/store/apiStore";

const ProductListing: React.FC = () => {
  const { products, loading, error, fetchProducts } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm min-h-screen py-10 px-4 md:px-10 lg:px-25">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
          ]}
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <SearchFilter />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-3">
          <ProductSort />

          {/* Loading / Error States */}
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Product List */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <TrendingSingle key={product.id} {...product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && products.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
