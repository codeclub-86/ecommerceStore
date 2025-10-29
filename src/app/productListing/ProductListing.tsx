"use client"

import React, { useEffect, useState } from "react"
import Breadcrumb from "../components/Breadcrumb/Breadcrumb"
import SearchFilter from "../components/searchFilter/searchFilter"
import ProductSort from "../components/ProductSort/ProductSort"
import TrendingSingle from "../components/productCard/card"
import { useStore } from "@/app/store/apiStore"
import { useSearchParams } from "next/navigation"

const ProductListing: React.FC = () => {
    const { products, searchResults, searchQuery, loading, error, fetchProducts, categories, fetchCategories } =
        useStore()

    const [filteredProducts, setFilteredProducts] = useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedCategoryType, setSelectedCategoryType] = useState<"parent" | "sub" | null>(null)
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
    const [selectedPrice, setSelectedPrice] = useState<[number, number] | null>(null)
    const [sortOption, setSortOption] = useState("popularity")
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 9

    const [showFilters, setShowFilters] = useState(false)

    const searchParams = useSearchParams()

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    useEffect(() => {
        const categoryFromQuery = searchParams.get("category")
        const typeFromQuery = searchParams.get("type") as "parent" | "sub" | null
        const brandFromQuery = searchParams.get("brand")

        if (categoryFromQuery) setSelectedCategory(categoryFromQuery)
        if (typeFromQuery) setSelectedCategoryType(typeFromQuery)
        if (brandFromQuery) setSelectedBrand(brandFromQuery)
    }, [searchParams])

    useEffect(() => {
        if (!searchQuery) fetchProducts()
    }, [fetchProducts, searchQuery])

    const sourceProducts = searchQuery && searchResults.length > 0 ? searchResults : products

    useEffect(() => {
        let result = [...sourceProducts]
        const normalize = (str: string) => str.toLowerCase().replace(/['&]/g, "").replace(/\s+/g, "")

        if (selectedCategory && categories.length > 0) {
            const target = normalize(selectedCategory)

            if (selectedCategoryType === "parent") {
                const parentCategory = categories.find((group: any) => normalize(group.parent_category || group.parent) === target)
                if (parentCategory) {
                    const subcategoryNames = parentCategory.categories.map((c: any) => normalize(c.category_name))
                    result = result.filter((p) => {
                        const pCategory = normalize(p.category || "")
                        const pParent = normalize(p.parent_category || "")
                        return pParent === target || subcategoryNames.includes(pCategory)
                    })
                } else {
                    result = []
                }
            } else {
                result = result.filter((p) => normalize(p.category || "") === target)
            }
        }

        if (selectedPrice) {
            result = result.filter((p) => {
                const price = parseFloat(p.sale_price || p.price || 0)
                return price >= selectedPrice[0] && price <= selectedPrice[1]
            })
        }

        if (selectedBrand) {
            result = result.filter((p) => p.store?.toLowerCase() === selectedBrand.toLowerCase())
        }

        if (sortOption === "lowToHigh") {
            result.sort((a, b) => parseFloat(a.sale_price || a.price || 0) - parseFloat(b.sale_price || b.price || 0))
        } else if (sortOption === "highToLow") {
            result.sort((a, b) => parseFloat(b.sale_price || b.price || 0) - parseFloat(a.sale_price || a.price || 0))
        }

        setFilteredProducts(result)
        setCurrentPage(1)
    }, [sourceProducts, selectedCategory, selectedCategoryType, selectedPrice, selectedBrand, sortOption, categories])

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const showingRange =
        filteredProducts.length > 0
            ? `Showing: ${indexOfFirstProduct + 1} - ${Math.min(indexOfLastProduct, filteredProducts.length)} of ${filteredProducts.length} items`
            : "No items to show"

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-sm min-h-screen py-10 px-4 md:px-10 lg:px-25">
            <div className="mb-6">
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Products", href: "/productListing" }
                    ]}
                />
            </div>

            <div className="container mx-auto">

                {/* Show Filters button on mobile */}
                <div className="lg:hidden mb-4 flex justify-end">
                    <button onClick={() => setShowFilters(true)} className="px-4 py-2 bg-black text-white rounded-md">
                        Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Sidebar visible only on desktop */}
                    <div className="hidden lg:block lg:col-span-1">
                        <SearchFilter
                            onCategorySelect={(cat) => {
                                setSelectedCategory(cat)
                                setSelectedCategoryType("sub")
                            }}
                            onPriceSelect={setSelectedPrice}
                            onBrandSelect={setSelectedBrand}
                        />
                    </div>

                    <div className="lg:col-span-3">
                        <ProductSort sortOption={sortOption} onSortChange={setSortOption} showingRange={showingRange} />

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
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="px-4 py-2 border rounded disabled:opacity-50">
                                    Prev
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-4 py-2 border rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : ""}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} className="px-4 py-2 border rounded disabled:opacity-50">
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ${showFilters ? "bg-black/50 visible" : "bg-transparent invisible"
                    }`}
                onClick={() => setShowFilters(false)}
            >
                <div
                    className={`absolute left-0 top-0 bg-white w-64 h-full p-4 overflow-y-auto shadow-xl transition-transform duration-300 ${showFilters ? "translate-x-0" : "-translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()} // keep clicks inside drawer from closing
                >
                    <button className="mb-4 text-sm text-gray-600" onClick={() => setShowFilters(false)}>
                        Close
                    </button>

                    <SearchFilter
                        onCategorySelect={(cat) => {
                            setSelectedCategory(cat)
                            setSelectedCategoryType("sub")
                            setShowFilters(false)
                        }}
                        onPriceSelect={(range) => {
                            setSelectedPrice(range)
                            setShowFilters(false)
                        }}
                        onBrandSelect={(brand) => {
                            setSelectedBrand(brand)
                            setShowFilters(false)
                        }}
                    />
                </div>
            </div>



        </div>
    )
}

export default ProductListing
