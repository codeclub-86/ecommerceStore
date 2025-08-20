import React from "react";

const CouponForm: React.FC = () => {
    return (
        <div className="flex gap-2 mt-6">
            <input
                type="text"
                placeholder="Enter Your Coupon"
                className="flex-1 border px-4 py-2 rounded-lg"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Apply Coupon
            </button>
        </div>
    );
};

export default CouponForm;
