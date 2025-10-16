"use client";

import React, { Suspense } from "react";
import ProductListing from "./ProductListing";

export default function ProductListingPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading products...</div>}>
      <ProductListing />
    </Suspense>
  );
}
