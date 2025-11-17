import React from "react";

const LoadingSkeleton: React.FC = () => {
    return (
        <>
            <div className="bg-white dark:bg-[#0D0D1A] shadow rounded-xl p-4 border border-gray-300 animate-pulse space-y-4">
                <div className="h-5 bg-gray-200 dark:bg-[#3A3A5A] rounded w-1/2"></div>
                <div className="space-y-3">
                    <div className="h-10 bg-gray-200 dark:bg-[#3A3A5A] rounded w-full"></div>
                    <div className="h-10 bg-gray-200 dark:bg-[#3A3A5A] rounded w-full"></div>
                    <div className="h-10 bg-gray-200 dark:bg-[#3A3A5A] rounded w-full"></div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#0D0D1A] shadow rounded-xl p-6 border border-gray-300 animate-pulse space-y-4">
                <div className="h-5 bg-gray-200 dark:bg-[#3A3A5A] rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 dark:bg-[#3A3A5A] rounded w-full"></div>
                <div className="space-y-3 pt-4">
                    <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 dark:bg-[#3A3A5A] rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-[#3A3A5A] rounded w-1/4"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 dark:bg-[#3A3A5A] rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-[#3A3A5A] rounded w-1/4"></div>
                    </div>
                </div>
                <div className="h-12 bg-gray-200 dark:bg-[#3A3A5A] rounded w-full mt-6"></div>
            </div>
        </>
    );
};

export default LoadingSkeleton;