// src/components/news/NewsSidebar.tsx
import React from "react";
import RelatedNews from "../../public/CardNews/RelatedNews";
import type { _News } from "@features/news/_news";

interface NewsSidebarProps {
    relatedArticles: _News[];
}

const NewsSidebar: React.FC<NewsSidebarProps> = ({ relatedArticles }) => {
    return (
        <div>
            <div className="relative mt-20 lg:mt-0 mb-6 lg:ml-6 flex justify-center lg:justify-center">
                <input
                    type="text"
                    placeholder="Cari Berita"
                    className="w-[100%] md:w-[40%] lg:w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-[#0D0D1A]"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-500 dark:text-purple-400 absolute right-[3%] md:right-[32%] lg:right-3 top-2.5"
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
            <RelatedNews relatedArticles={relatedArticles} />
        </div>
    );
};

export default NewsSidebar;


