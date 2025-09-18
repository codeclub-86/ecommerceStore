"use client";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
    mobile?: boolean;
    onSearch?: (results: any[] | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ mobile = false, onSearch }) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) {
            onSearch?.(null);
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`/searchProducts?query=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error("Failed to fetch search results");

            const data = await res.json();
            onSearch?.(data);
        } catch (err) {
            console.error(err);
            onSearch?.([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex w-full border rounded-md overflow-hidden ${mobile ? "" : "border-gray-400 rounded-sm"
                }`}
        >
            <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-3 py-2 outline-none text-gray-700 text-sm"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-4 flex items-center justify-center text-white"
            >
                {loading ? "..." : <Search size={18} />}
            </button>
        </form>
    );
};

export default SearchBar;
