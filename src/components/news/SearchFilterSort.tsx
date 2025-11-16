// src/components/news/SearchFilterSort.tsx
import React from "react";

interface SearchFilterSortProps {
    searchTerm: string;
    selectedCategory: string;
    sortOrder: string;
    categories: string[];
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onSortChange: (value: "Terbaru" | "Terlama") => void; // Fixed type to match expected values
}

const SearchFilterSort: React.FC<SearchFilterSortProps> = ({
    searchTerm,
    selectedCategory,
    sortOrder,
    categories,
    onSearchChange,
    onCategoryChange,
    onSortChange,
}) => {
    return (
        <div className="flex flex-wrap gap-3 justify-center items-center mt-6 p-4 md:p-0">
            {/* Search */}
            <div className="relative w-full sm:w-80 md:w-90">
                <input
                    type="text"
                    placeholder="Cari Berita"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-[#0D0D1A]"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 dark:text-gray-300 absolute right-3 top-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                    />
                </svg>
            </div>

            {/* Filter */}
            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full sm:w-auto border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#0D0D1A]"
            >
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            {/* Sort */}
            <select
                value={sortOrder}
                onChange={(e) => onSortChange(e.target.value as "Terbaru" | "Terlama")}
                className="w-full sm:w-auto border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#0D0D1A]"
            >
                <option value="Terbaru">Terbaru</option>
                <option value="Terlama">Terlama</option>
            </select>
        </div>
    );
};

export default SearchFilterSort;