import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface LeaderboardFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedSchool: string;
    onSchoolChange: (value: string) => void;
}

const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
    searchQuery,
    onSearchChange,
    selectedSchool,
    onSchoolChange,
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#1A1A2E] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
            </div>

            {/* School Filter */}
            <div className="relative flex-1 max-w-xs">
                <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                    value={selectedSchool}
                    onChange={(e) => onSchoolChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#1A1A2E] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                    <option value="">Sekolah</option>
                    <option value="SMKN 2 Probolinggo">SMKN 2 Probolinggo</option>
                    <option value="SMKN 1 Probolinggo">SMKN 1 Probolinggo</option>
                </select>
            </div>
        </div>
    );
};

export default LeaderboardFilters;