import React from "react";
import FeatureSingle from "./featureSingle";

const featuredMain = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-15 px-25 gap-20">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-3xl font-bold ">Featured Categories</h1>
        <div className="w-12 h-0.5 mt-5 rounded-lg bg-blue-600"></div>
        <p className="max-w-lg text-center pt-6 text-gray-500">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form.
        </p>
      </div>
      <div className="flex flex-row flex-wrap w-full h-full gap-5">
        <FeatureSingle></FeatureSingle>
        <FeatureSingle></FeatureSingle>
        <FeatureSingle></FeatureSingle>
        <FeatureSingle></FeatureSingle>
      </div>
    </div>
  );
};

export default featuredMain;
