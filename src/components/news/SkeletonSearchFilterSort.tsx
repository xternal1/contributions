// src/components/news/SkeletonSearchFilterSort.tsx
import React from "react";

const SkeletonSearchFilterSort: React.FC = () => {
    return (
        <div className="flex flex-wrap gap-3 justify-center items-center mt-6 p-4 md:p-0">
            {/* Search Skeleton */}
            <div className="relative w-full sm:w-80 md:w-90">
                <div className="bg-white dark:bg-[#0D0D1A] border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm h-10 flex items-center px-3 animate-pulse">
                    <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
                    <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>

            {/* Filter Skeleton */}
            <div className="bg-white dark:bg-[#0D0D1A] border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm h-10 w-full sm:w-40 flex items-center px-3 animate-pulse">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            {/* Sort Skeleton */}
            <div className="bg-white dark:bg-[#0D0D1A] border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm h-10 w-full sm:w-32 flex items-center px-3 animate-pulse">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonSearchFilterSort;