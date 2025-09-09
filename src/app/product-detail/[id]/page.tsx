"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // to get route param
import { FaHeart, FaRedoAlt, FaStar } from "react-icons/fa";
import ReviewModal from "../../components/review/ReviewModal";
import { useStore } from "@/app/store/apiStore"; // adjust path
import { ImGit } from "react-icons/im";

export default function ProductDetails() {
  const { id } = useParams();
  const { singleProduct, fetchSingleProduct, loading, error } = useStore();

  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchSingleProduct(Number(id));
    }
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    if (singleProduct) {
      setCurrentImage(singleProduct.image); // default image
    }
  }, [singleProduct]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!singleProduct) return null;

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        className={i < count ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <section className="bg-gray-100 lg:px-25 lg:py-10 sm:px-10 sm:py-5">
      <div className="container mx-auto px-4">
        <div className="bg-white p-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <div className="lg:w-1/2 w-full">
              <div className="flex flex-col">
                <div className="w-full border rounded-lg overflow-hidden">
                  <Image
                    src={currentImage}
                    alt={singleProduct.name}
                    width={600}
                    height={600}
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  {[
                    singleProduct.image,
                    ...singleProduct.images.map((img: any) => img.path),
                  ].map((img: string, idx: number) => (
                    // <p>{img}</p>
                    <Image
                      key={idx}
                      src={img}
                      alt={`Product ${idx}`}
                      width={80}
                      height={80}
                      onClick={() => setCurrentImage(img)}
                      className={`cursor-pointer border rounded-md p-1 hover:border-blue-500 transition ${
                        currentImage === img
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>
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
                  {singleProduct.category?.category_name}
                </span>
              </p>
              <h3 className="text-3xl font-bold text-blue-600 mt-3">
                ${singleProduct.price}
              </h3>
              <p
                className="text-gray-700 mt-4"
                dangerouslySetInnerHTML={{ __html: singleProduct.description }}
              />

              {/* Variations (example for Size) */}
              {singleProduct.variations?.map((variation: any) => {
                const values = JSON.parse(variation.values);
                return (
                  <div key={variation.id} className="mt-6">
                    <label className="block font-medium mb-2">
                      {variation.name}
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200">
                      {values.map((v: any, idx: number) => (
                        <option key={idx} value={v.value}>
                          {v.value}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}

              {/* Buttons */}
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

        {/* Product Details */}
        <div className="bg-white p-10 mt-12 ">
          <h4 className="text-xl font-semibold mb-3">Details</h4>
          <p
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: singleProduct.description }}
          />
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <ReviewModal />
        </div>
      </div>
    </section>
  );
}
