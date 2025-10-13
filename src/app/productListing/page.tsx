"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import SearchFilter from "../components/searchFilter/searchFilter";
import ProductSort from "../components/ProductSort/ProductSort";
import TrendingSingle from "../components/productCard/card";
import { useStore } from "@/app/store/apiStore";
import { useSearchParams } from "next/navigation";

const ProductListing: React.FC = () => {
  const {
    products,
    searchResults,
    searchQuery,
    loading,
    error,
    fetchProducts,
  } = useStore();

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<[number, number] | null>(null);
  const [sortOption, setSortOption] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const searchParams = useSearchParams();

  // 🔹 Read ?category= or ?brand= from URL
  useEffect(() => {
    const categoryFromQuery = searchParams.get("category");
    const brandFromQuery = searchParams.get("brand");
    if (categoryFromQuery) setSelectedCategory(categoryFromQuery);
    if (brandFromQuery) setSelectedBrand(brandFromQuery);
  }, [searchParams]);

  // 🔹 Fetch all products only if not searching
  useEffect(() => {
    if (!searchQuery) {
      fetchProducts();
    }
  }, [fetchProducts, searchQuery]);

  // 🔹 Decide which products to show
  const sourceProducts =
    searchQuery && searchResults.length > 0 ? searchResults : products;

  // 🔹 Apply filters + sorting
  useEffect(() => {
    let result = [...sourceProducts];

    if (selectedCategory) {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedPrice) {
      result = result.filter((p) => {
        const price = parseFloat(p.sale_price || p.price || 0);
        return price >= selectedPrice[0] && price <= selectedPrice[1];
      });
    }

    if (selectedBrand) {
      result = result.filter(
        (p) => p.store?.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

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

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [sourceProducts, selectedCategory, selectedPrice, selectedBrand, sortOption]);

  // 🔹 Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const showingRange =
    filteredProducts.length > 0
      ? `Showing: ${indexOfFirstProduct + 1} - ${Math.min(indexOfLastProduct, filteredProducts.length)} of ${filteredProducts.length} items`
      : "No items to show";

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm min-h-screen py-10 px-4 md:px-10 lg:px-25">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/productListing" },
          ]}
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <SearchFilter
            onCategorySelect={setSelectedCategory}
            onPriceSelect={setSelectedPrice}
            onBrandSelect={setSelectedBrand}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <ProductSort
            sortOption={sortOption}
            onSortChange={setSortOption}
            showingRange={showingRange}
          />

          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

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
                  No products found {searchQuery ? `for "${searchQuery}"` : "for the selected filters"}.
                </div>
              )}
            </>
          )}

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
