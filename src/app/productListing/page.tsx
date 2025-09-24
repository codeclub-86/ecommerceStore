"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import SearchFilter from "../components/searchFilter/searchFilter";
import ProductSort from "../components/ProductSort/ProductSort";
import TrendingSingle from "../components/productCard/card";
import { useStore } from "@/app/store/apiStore";

const ProductListing: React.FC = () => {
  const { products, loading, error, fetchProducts } = useStore();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<[number, number] | null>(
    null
  );
  const [sortOption, setSortOption] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Fetch all products once
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Apply filters + sorting whenever filters/sort change
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price filter
    if (selectedPrice) {
      result = result.filter((p) => {
        const price = parseFloat(p.sale_price || p.price || 0);
        return price >= selectedPrice[0] && price <= selectedPrice[1];
      });
    }

    // Sorting
    if (sortOption === "lowToHigh") {
      result.sort(
        (a, b) =>
          parseFloat(a.sale_price || a.price || 0) -
          parseFloat(b.sale_price || b.price || 0)
      );
    } else if (sortOption === "highToLow") {
      result.sort(
        (a, b) =>
          parseFloat(b.sale_price || b.price || 0) -
          parseFloat(a.sale_price || a.price || 0)
      );
    }
    // "popularity" left as default (no sorting)

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, selectedCategory, selectedPrice, sortOption]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Showing range text
  const showingRange =
    filteredProducts.length > 0
      ? `Showing: ${indexOfFirstProduct + 1} - ${Math.min(
        indexOfLastProduct,
        filteredProducts.length
      )} of ${filteredProducts.length} items`
      : "No items to show";

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
          <SearchFilter
            onCategorySelect={setSelectedCategory}
            onPriceSelect={setSelectedPrice}
            onBrandSelect={() => { }}
          />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-3">
          <ProductSort
            sortOption={sortOption}
            onSortChange={setSortOption}
            showingRange={showingRange}
          />

          {/* Loading / Error States */}
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Product List */}
          {!loading && !error && (
            <>
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <TrendingSingle key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No products found for the selected filters.
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {!loading && !error && filteredProducts.length > 0 && (
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
