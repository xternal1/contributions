import React from "react";
import MiniNewsCard from "./MiniNewsCard";
import type { _News } from "../../../features/news/_news";

interface RelatedNewsProps {
  relatedArticles: _News[];
}

const RelatedNews: React.FC<RelatedNewsProps> = ({ relatedArticles }) => {
  if (relatedArticles.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 text-sm">Tidak ada berita terbaru.</p>;
  }

  return (
    <div className="bg-gray-50 dark:bg-[#141427] rounded-lg shadow p-4 space-y-4 lg:ml-6">
      <h2 className="font-bold text-lg mb-3 border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-800 dark:text-gray-200">
        Berita Terbaru
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
        {relatedArticles.map((article) => (
          <MiniNewsCard
            key={article.slug}
            id={article.id}
            image={article.thumbnail}
            date={article.created}
            title={article.title}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedNews;
