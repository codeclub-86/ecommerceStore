import React from "react";

interface CartItemProps {
    image: string;
    title: string;
    details: string[];
    price: string;
    discount?: string;
}

const CartItem: React.FC<CartItemProps> = ({ image, title, details, price, discount }) => {
    return (
        <div className="flex items-center justify-between border-b py-4">
            {/* Product Info */}
            <div className="flex items-center gap-4 w-1/3">
                <img src={image} alt={title} className="w-20 h-20 object-contain" />
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    {details.map((d, i) => (
                        <p key={i} className="text-sm text-gray-500">
                            {d}
                        </p>
                    ))}
                </div>
            </div>

            {/* Quantity */}
            <div className="w-1/6">
                <select className="border px-2 py-1 rounded">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>

            {/* Subtotal */}
            <div className="w-1/6 text-gray-700">{price}</div>

            {/* Discount */}
            <div className="w-1/6 text-gray-500">{discount ? discount : "-"}</div>

            {/* Remove */}
            <div className="w-1/6 text-center">
                <button className="text-red-500 text-lg font-bold">✕</button>
            </div>
        </div>
    );
};

export default CartItem;
