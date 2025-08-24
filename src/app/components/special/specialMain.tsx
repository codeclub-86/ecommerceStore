import React from "react";
import TrendingSingle from "../productCard/card";

const dummyProducts = [
  { id: "1", name: "Xiaomi Mi Band 5", price: 199, image: "/product-1.jpg" },
  {
    id: "2",
    name: "Apple Watch Series 6",
    price: 299,
    image: "/product-1.jpg",
  },
  {
    id: "3",
    name: "Samsung Galaxy Watch",
    price: 249,
    image: "/product-1.jpg",
  },
  { id: "4", name: "Fitbit Versa 3", price: 179, image: "/product-1.jpg" },
  {
    id: "5",
    name: "Garmin Forerunner 245",
    price: 349,
    image: "/product-1.jpg",
  },
  { id: "6", name: "Huawei Watch GT 3", price: 229, image: "/product-1.jpg" },
];

const SpecialMain = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center py-12 px-6 lg:px-20 gap-12 bg-gray-100">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold">Special Offer</h1>
        <div className="w-12 h-1 mt-4 rounded-lg bg-blue-600"></div>
        <p className="max-w-lg mt-6 text-gray-500">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {dummyProducts.map((product) => (
          <TrendingSingle key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default SpecialMain;
