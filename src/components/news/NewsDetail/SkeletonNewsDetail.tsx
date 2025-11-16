// src/components/news/SkeletonNewsDetail.tsx
import React from "react";

const SkeletonNewsDetail: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8 animate-pulse">
            <div className="lg:col-span-3">
                <div className="bg-gray-200 dark:bg-gray-700 h-[350px] w-full rounded-lg shadow-md mb-4"></div>
                <div className="flex items-center gap-2 mt-4 text-sm">
                    <div className="bg-gray-200 dark:bg-gray-700 h-5 w-5 rounded-full"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-24 rounded"></div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 h-8 w-3/4 mt-2 mb-4 rounded"></div>
                <div className="space-y-3">
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-11/12 rounded"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-10/12 rounded"></div>
                </div>
            </div>

            {/* Skeleton Sidebar */}
            <div className="lg:col-span-1">
                <div className="relative mb-6">
                    <div className="bg-gray-200 dark:bg-gray-700 h-10 w-full rounded-lg"></div>
                </div>
                <div className="mt-8 text-center">
                    <div className="bg-gray-200 dark:bg-gray-700 h-6 w-2/3 mb-4 rounded mx-auto"></div>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, idx) => (
                            <div
                                key={idx}
                                className="block rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
                            >
                                <div className="relative h-32 bg-gray-200 dark:bg-gray-700 w-full"></div>
                                <div className="p-3 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-gray-200 dark:bg-gray-700 h-3 w-3 rounded"></div>
                                        <div className="bg-gray-200 dark:bg-gray-700 h-3 w-16 rounded"></div>
                                    </div>
                                    <div className="bg-gray-200 dark:bg-gray-700 h-3 w-3/4 rounded"></div>
                                    <div className="bg-gray-200 dark:bg-gray-700 h-3 w-1/2 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonNewsDetail;


