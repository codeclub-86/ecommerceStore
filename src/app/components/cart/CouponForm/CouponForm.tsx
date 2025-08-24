import React from "react";

const CouponForm: React.FC = () => {
    return (
        <div className="border rounded-md p-4 bg-white w-full md:w-3/4">
            <div className="flex gap-2 ">
                <input
                    type="text"
                    placeholder="Enter Your Coupon"
                    className="flex-1 border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white font-semibold px-6 py-2  hover:bg-blue-700 transition">
                    Apply Coupon
                </button>
            </div>
        </div>
    );
};

export default CouponForm;
