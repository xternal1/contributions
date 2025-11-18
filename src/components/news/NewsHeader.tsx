// src/components/news/NewsHeader.tsx
import React from "react";
import BackgroundShapes from "../../components/public/BackgroundShapes";

interface NewsHeaderProps {
    title: string;
    breadcrumbs?: { label: string; href?: string }[];
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ title, breadcrumbs = [] }) => {
    return (
        <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 dark:from-[#0D0D1A] dark:via-[#0D0D1A] dark:to-[#0D0D1A] overflow-hidden">
            <BackgroundShapes />
            <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-left relative z-10">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
                    {title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center text-sm sm:text-xs text-gray-800 dark:text-gray-300">
                    {breadcrumbs.map((breadcrumb, index) => (
                        <React.Fragment key={index}>
                            <a
                                href={breadcrumb.href || "#"}
                                className={`hover:text-purple-400 ${index === breadcrumbs.length - 1 ? "text-purple-600 dark:text-purple-400" : ""}`}
                            >
                                {breadcrumb.label}
                            </a>
                            {index < breadcrumbs.length - 1 && (
                                <span className="mx-1 text-gray-500 dark:text-gray-400">{'>'}</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsHeader;


