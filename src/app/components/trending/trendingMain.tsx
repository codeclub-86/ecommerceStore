import React from "react";
import TrendingSingle from "../productCard/card";
import dummyProducts from "../../productListing/product";

const TrendingMain = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center py-12 px-6 lg:px-20 gap-12 dark-bg-css">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-white">Trending Products</h1>
        {/* <div className="w-12 h-1 mt-4 rounded-lg bg-yellow-400"></div> */}
        <p className="max-w-lg text-center mt-6 text-gray-300">
          Explore our trending products, carefully selected for quality and
          popularity.
        </p>
      </div>

      {/* Products Grid */}
      <div
        className="
          grid gap-6 w-full
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {dummyProducts.map((product) => (
          <TrendingSingle key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingMain;
