"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useStore } from "../../../app/store/apiStore";
import { FaHeart, FaRedoAlt } from "react-icons/fa";
import ReviewModal from "../../components/review/ReviewModal";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { singleProduct, fetchSingleProduct, loading, error } = useStore();

  useEffect(() => {
    if (id) fetchSingleProduct(Number(id));
  }, [id, fetchSingleProduct]);

  const reloadProduct = () => {
    if (id) fetchSingleProduct(Number(id));
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;
  if (!singleProduct) return <p className="p-10">No product found.</p>;

  const imageUrl = singleProduct.image || "/placeholder.png";

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
                    src={imageUrl}
                    alt={singleProduct.name}
                    width={600}
                    height={600}
                    className="object-cover w-full h-auto"
                  />
                </div>

                {singleProduct.images?.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {singleProduct.images.map((img: any, i: number) => (
                      <div key={i} className="border rounded-lg overflow-hidden">
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
              <h2 className="text-2xl font-semibold text-gray-900">{singleProduct.name}</h2>

              <p className="text-gray-600 mt-2">
                <span className="font-medium">Category:</span>{" "}
                <span className="text-blue-600">
                  {singleProduct.category || "Uncategorized"}
                </span>
              </p>

              <h3 className="text-3xl font-bold text-blue-600 mt-3">
                ${Number(singleProduct.sale_price || singleProduct.price).toFixed(2)}{" "}
                {singleProduct.sale_price && (
                  <span className="line-through text-gray-400 ml-2">
                    ${Number(singleProduct.price).toFixed(2)}
                  </span>
                )}
              </h3>

              <p className="text-gray-700 mt-4">{singleProduct.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                  <FaRedoAlt /> Compare
                </button>
                <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                  <FaHeart /> Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        {singleProduct.features && (
          <div className="bg-gray-50 p-10 mt-12">
            <h4 className="text-xl font-semibold mb-3">Features</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {singleProduct.features.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

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
