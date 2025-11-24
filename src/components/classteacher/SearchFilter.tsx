import React from 'react';
import { HiSearch, HiChevronDown } from 'react-icons/hi';

interface SearchFilterProps {
    searchQuery: string;
    selectedGender: string;
    isGenderDropdownOpen: boolean;
    genderOptions: string[];
    onSearchChange: (query: string) => void;
    onGenderSelect: (gender: string) => void;
    onToggleDropdown: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
    searchQuery,
    selectedGender,
    isGenderDropdownOpen,
    genderOptions,
    onSearchChange,
    onGenderSelect,
    onToggleDropdown
}) => {
    return (
        <div className="p-6 flex gap-4">
            <div className="w-[300px] relative">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-[#171725] bg-white dark:bg-[#0F0F19] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div className="relative">
                <button
                    onClick={onToggleDropdown}
                    className="px-6 py-3 rounded-lg border border-gray-200 dark:border-[#171725] bg-white dark:bg-[#0F0F19] text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-[#171725] transition-colors"
                >
                    {selectedGender}
                    <HiChevronDown size={20} className={`transition-transform ${isGenderDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isGenderDropdownOpen && (
                    <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-[#0F0F19] border border-gray-200 dark:border-[#171725] rounded-lg shadow-lg z-10">
                        {genderOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => onGenderSelect(option)}
                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-[#171725] transition-colors first:rounded-t-lg last:rounded-b-lg ${selectedGender === option ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default SearchFilter;