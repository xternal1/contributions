// src/components/news/NewsHeader.tsx
import React from "react";
import { Link } from "react-router-dom";
import BackgroundShapes from "../../public/BackgroundShapes";

interface NewsHeaderProps {
    title: string;
    breadcrumbs: { label: string; path?: string }[];
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ title, breadcrumbs }) => {
    return (
        <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 dark:from-[#0D0D1A] dark:via-[#0D0D1A] dark:to-[#0D0D1A] overflow-hidden">
            <BackgroundShapes />
            <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-left relative z-10">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
                    {title}
                </h1>
                <p className="mt-2 text-xs sm:text-xs text-gray-800 dark:text-gray-300">
                    {breadcrumbs.map((breadcrumb, index) => (
                        <React.Fragment key={index}>
                            {breadcrumb.path ? (
                                <Link to={breadcrumb.path} className="hover:text-purple-400">
                                    {breadcrumb.label}
                                </Link>
                            ) : (
                                <span className="text-purple-600 dark:text-purple-400">
                                    {breadcrumb.label}
                                </span>
                            )}
                            {index < breadcrumbs.length - 1 && (
                                <span className="mx-1">{'>'}</span>
                            )}
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default NewsHeader;