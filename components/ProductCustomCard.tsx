"use client";
import { useState } from "react";
import CustomPriceInput from "./CustomPriceInput";

function ProductCustomCard() {
  const [productName, setProductName] = useState<string>("");
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="h-20 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-4xl font-bold">
        📦 CUSTOM
      </div>

      <div className="p-5">
        <div className="mt-4 space-y-2">
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-600 mb-1" htmlFor="custom-name">
              Custom Name
            </label>
            <div className="flex flex-row">
              <input
                id="custom-name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          <CustomPriceInput name={productName} id={"custom"} />
        </div>
      </div>
    </div>
  );
}

export default ProductCustomCard;
