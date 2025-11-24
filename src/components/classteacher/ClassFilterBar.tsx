import React from 'react';
import { HiSearch, HiAdjustments } from 'react-icons/hi';

interface ClassFilterBarProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    filterText?: string;
    onFilterClick?: () => void;
}

const ClassFilterBar: React.FC<ClassFilterBarProps> = ({
    searchValue = "",
    onSearchChange,
    filterText = "Daftar Sekolah yang ada/dipilih ke mentor",
    onFilterClick
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0D0D1A] border border-gray-200 dark:border-[#1A1A2E] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
            </div>

            {/* Filter Button */}
            <button
                onClick={onFilterClick}
                className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-[#0D0D1A] border border-gray-200 dark:border-[#1A1A2E] rounded-xl text-gray-600 dark:text-gray-400 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
            >
                <HiAdjustments className="h-5 w-5" />
                <span className="whitespace-nowrap">{filterText}</span>
            </button>

            {/* Additional Filter Info (optional, for second image) */}
            <div className="hidden lg:flex items-center px-6 py-3 bg-white dark:bg-[#0D0D1A] border border-gray-200 dark:border-[#1A1A2E] rounded-xl text-gray-500 dark:text-gray-400">
                Kelas-kelas yang ada disekolah itu
            </div>
        </div>
    );
};

export default ClassFilterBar;