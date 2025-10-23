"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useStore } from "../../../app/store/apiStore";
import { FaHeart } from "react-icons/fa";
import ReviewModal from "../../components/review/ReviewModal";
import { useWishlistStore } from "@/app/store/wishListStore";
import { useAuthStore } from "@/app/store/authStore";
import { useCartStore } from "@/app/store/cartStore";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { singleProduct, fetchSingleProduct, loading, error } = useStore();

  // stores
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { initializeAuth, isLoggedIn } = useAuthStore();
  const { addToCart } = useCartStore();
  const router = useRouter();

  // state for main image
  const [mainImage, setMainImage] = useState<string | null>(null);

  // state for variations
  const [selectedVariations, setSelectedVariations] = useState<{
    [key: string]: string;
  }>({});

  // handle variation change
  const handleVariationChange = (name: string, value: string) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (id) fetchSingleProduct(Number(id));
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    if (singleProduct) {
      console.log("🔍 singleProduct data:", singleProduct);
      setMainImage(singleProduct.image || "/placeholder.png");
    }
  }, [singleProduct]);


  const reloadProduct = () => {
    if (id) fetchSingleProduct(Number(id));
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;
  if (!singleProduct) return <p className="p-10">No product found.</p>;


  // wishlist logic
  const inWishlist = isInWishlist(String(singleProduct.id));

  const toggleWishlist = () => {
    initializeAuth();

    if (!isLoggedIn) {
      toast.error("Please log in to manage your wishlist");
      router.push("/login");
      return;
    }

    const productPrice = singleProduct.sale_price
      ? Number(singleProduct.sale_price)
      : Number(singleProduct.price);

    if (inWishlist) {
      removeFromWishlist(String(singleProduct.id));
      toast.error("Removed from wishlist 💔", { icon: "💔" });
    } else {
      addToWishlist({
        id: String(singleProduct.id),
        name: singleProduct.name,
        price: productPrice,
        image: singleProduct.image,
      });
      toast.success("Added to wishlist ❤️", { icon: "❤️" });
    }
  };


  // cart logic
  // cart logic
  const handleAddToCart = () => {
    initializeAuth();

    if (!isLoggedIn) {
      toast.error("Please log in to add items to your cart.");
      router.push("/login");
      return;
    }

    const finalPrice = singleProduct.sale_price
      ? Number(singleProduct.sale_price)
      : Number(singleProduct.price);

    const variationsArray = Object.entries(selectedVariations).map(
      ([name, value]) => ({ name, value })
    );

    addToCart({
      id: Number(singleProduct.id),
      name: singleProduct.name,
      price: finalPrice,
      image: singleProduct.image,
      category: singleProduct.category,
      variation: variationsArray,
    });

    toast.success(`${singleProduct.name} added to cart 🛒`, { icon: "🛒" });
  };



  return (
    <section className="bg-white lg:px-25 lg:py-10 sm:px-10 sm:py-5">
      <div className="container mx-auto px-4">
        {/* Top Area */}
        <div className="bg-gray-50 p-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <div className="lg:w-1/2 w-full">
              <div className="flex flex-col gap-4">
                <div className="w-full border rounded-lg overflow-hidden">
                  <Image
                    src={mainImage || "/placeholder.png"}
                    alt={singleProduct.name}
                    width={300}
                    height={400}
                    className="w-full h-96 object-contain bg-white rounded-lg"
                  />

                </div>

                {singleProduct.images?.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {singleProduct.images.map((img: any, i: number) => (
                      <div
                        key={i}
                        className={`border rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 ${mainImage === img.path ? "ring-2 ring-blue-500" : ""
                          }`}
                        onClick={() => setMainImage(img.path)}
                      >
                        <Image
                          src={img.path}
                          alt={`Product image ${i + 1}`}
                          width={150}
                          height={150}
                          className="object-cover w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 w-full">
              <h2 className="text-2xl font-semibold text-gray-900">
                {singleProduct.name}
              </h2>

              <p className="text-gray-600 mt-2">
                <span className="font-medium">Category:</span>{" "}
                <span className="text-blue-600">
                  {singleProduct.category || "Uncategorized"}
                </span>
              </p>

              <h3 className="text-3xl font-bold text-blue-600 mt-3">
                Rs {Number(singleProduct.sale_price || singleProduct.price).toFixed(2)}
                {singleProduct.sale_price && (
                  <span className="line-through text-gray-400 ml-2 text-lg">
                    Rs {Number(singleProduct.price).toFixed(2)}
                  </span>
                )}
              </h3>

              <div
                className="text-gray-700 mt-4 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: singleProduct.description }}
              />

              {/* Variations */}
              {singleProduct.variations?.length > 0 && (
                <div className="mt-5 space-y-4">
                  {singleProduct.variations.map((variation: any) => {
                    // If values is a string → parse it
                    let valuesArray: any[] = [];
                    try {
                      if (typeof variation.values === "string") {
                        valuesArray = JSON.parse(variation.values);
                      } else {
                        valuesArray = variation.values || [];
                      }
                    } catch {
                      valuesArray = [];
                    }

                    return (
                      <div key={variation.id}>
                        <label className="block text-gray-700 font-medium mb-2">
                          {variation.name}
                        </label>
                        <select
                          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                          value={selectedVariations[variation.name] || ""}
                          onChange={(e) =>
                            handleVariationChange(
                              variation.name,
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select {variation.name}</option>
                          {valuesArray.map((val: any, i: number) => (
                            <option key={i} value={val.value}>
                              {val.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`w-full border py-3 rounded-lg flex items-center justify-center gap-2 transition ${inWishlist
                    ? "border-red-400 bg-red-50 text-red-500"
                    : "border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <FaHeart
                    className={inWishlist ? "text-red-500" : "text-gray-500"}
                  />
                  {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-gray-50 p-10 mt-12 rounded-lg">
          <h4 className="text-xl font-semibold mb-3">Details</h4>
          <p className="text-gray-700 leading-relaxed">
            {singleProduct.details ||
              "No additional details provided for this product."}
          </p>
        </div>

        {/* Features */}
        {singleProduct.features && (
          <div className="bg-gray-50 p-10 mt-12 rounded-lg">
            <h4 className="text-xl font-semibold mb-3">Features</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {singleProduct.features.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Product Details Section */}
        <div className="bg-gray-50 p-10 mt-12 rounded-lg">
          <h4 className="text-xl font-semibold mb-5">Product Details</h4>
          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-medium">Name:</span> {singleProduct.name}
            </li>
            <li>
              <span className="font-medium">Category:</span>{" "}
              {singleProduct.category || "N/A"}
            </li>
            {singleProduct.sku && (
              <li>
                <span className="font-medium">SKU:</span> {singleProduct.sku}
              </li>
            )}
            {singleProduct.brand && (
              <li>
                <span className="font-medium">Brand:</span>{" "}
                {singleProduct.brand}
              </li>
            )}
            {singleProduct.stock !== undefined && (
              <li>
                <span className="font-medium">Stock:</span>{" "}
                {singleProduct.stock > 0 ? "In Stock" : "Out of Stock"}
              </li>
            )}
          </ul>

          {/* Paragraph Description */}
          {singleProduct.description && (
            <div
              className="mt-6 text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: singleProduct.description }}
            />
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-gray-50 p-10 mt-12 rounded-lg">
          <h4 className="text-xl font-semibold mb-5">Customer Reviews</h4>
          {singleProduct.reviews?.length > 0 ? (
            <div className="space-y-4">
              {singleProduct.reviews.map((rev: any) => (
                <div key={rev.id} className="border p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{rev.user}</h5>
                    <span className="text-yellow-500">
                      {"★".repeat(rev.rating)}
                      <span className="text-gray-300">
                        {"★".repeat(5 - rev.rating)}
                      </span>
                    </span>
                  </div>
                  <p className="mt-1 font-semibold">{rev.subject}</p>
                  <p className="text-gray-600">{rev.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{rev.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          {/* Review Form */}
          <ReviewModal pid={singleProduct.id} onSuccess={reloadProduct} />
        </div>
      </div>
    </section>
  );
}
