import React from "react";
import TrendingSingle from "./trendingSingle";

const TrendingMain = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-15 px-20 gap-20 bg-gray-100">
      {/* Header Section */}
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-3xl font-bold">Trending Products</h1>
        <div className="w-12 h-0.5 mt-5 rounded-lg bg-blue-600"></div>
        <p className="max-w-lg text-center pt-6 text-gray-500">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <TrendingSingle />
        <TrendingSingle />
        <TrendingSingle />
        <TrendingSingle />
        <TrendingSingle />
        <TrendingSingle />
      </div>
    </div>
  );
};

export default TrendingMain;
