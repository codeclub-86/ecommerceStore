import React from "react";

interface ProductSortProps {
    sortOption: string;
    onSortChange: (value: string) => void;
    showingRange: string;
}

const ProductSort: React.FC<ProductSortProps> = ({
    sortOption,
    onSortChange,
    showingRange,
}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white shadow-sm mb-6 space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-4">
                <span className="text-gray-600">Sort by:</span>
                <select
                    value={sortOption}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="border rounded-lg py-2 px-4 focus:outline-none"
                >
                    <option value="popularity">Popularity</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>
            </div>

            <div>
                <span className="text-gray-600">{showingRange}</span>
            </div>
        </div>
    );
};

export default ProductSort;
