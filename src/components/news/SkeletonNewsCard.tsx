// src/components/news/SkeletonNewsCard.tsx
import React from "react";

const SkeletonNewsCard: React.FC = () => {
    return (
        <div className="bg-white dark:bg-[#141427] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-40 w-full rounded-md mb-4"></div>
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-gray-200 dark:bg-gray-700 h-5 w-5 rounded-full"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-4 w-24 rounded"></div>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 h-5 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-5/6 rounded"></div>
        </div>
    );
};

export default SkeletonNewsCard;