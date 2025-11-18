// src/components/news/NewsGrid.tsx
import React from "react";
import NewsCard from "../public/CardNews/NewsCard";
import SkeletonNewsCard from "./SkeletonNewsCard";
import type { _News as NewsArticle } from "../../features/news/_news"; // Renamed to avoid conflict

interface NewsGridProps {
    articles: NewsArticle[];
    isLoading: boolean;
    itemsPerPage: number;
    emptyMessage?: string;
}

const NewsGrid: React.FC<NewsGridProps> = ({
    articles,
    isLoading,
    itemsPerPage,
    emptyMessage = "Tidak ada berita yang cocok."
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
                [...Array(itemsPerPage)].map((_, index) => <SkeletonNewsCard key={index} />)
            ) : articles.length > 0 ? (
                articles.map((article) => <NewsCard key={article.id} news={article} />)
            ) : (
                <p className="col-span-full text-gray-500 dark:text-gray-400">{emptyMessage}</p>
            )}
        </div>
    );
};

export default NewsGrid;


