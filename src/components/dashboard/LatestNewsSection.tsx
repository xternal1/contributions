import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "../public/CardNews/NewsCard";
import { fetchNews } from "../../features/news/services/news_service";
import type { _News } from "../../features/news/_news";

const SkeletonCard: React.FC = () => {
  return (
    <div className="relative block bg-white dark:bg-[#1E1E2D] rounded-xl border border-gray-200 dark:border-[#2D2D3A] overflow-hidden shadow-sm animate-pulse">
      {/* Thumbnail */}
      <div className="relative h-58 p-5 bg-white dark:bg-[#1E1E2D] z-10">
        <div className="w-full h-full rounded-lg overflow-hidden relative">
          <div className="bg-gray-200 dark:bg-[#2D2D3A] w-full h-full rounded-lg"></div>
          {/* Badge */}
          <div className="absolute top-2 left-2 h-5 w-14 bg-gray-300 dark:bg-[#3A395A] rounded-full"></div>
          {/* Watermark */}
          <div className="absolute -bottom-[-6px] left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#1E1E2D] rounded-full p-2 shadow-md">
            <div className="bg-gray-200 dark:bg-[#2D2D3A] w-14 h-4 rounded"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="mb-3 -mt-6 flex items-center gap-2">
          <div className="bg-gray-200 dark:bg-[#2D2D3A] h-4 w-4 rounded"></div>
          <div className="bg-gray-200 dark:bg-[#2D2D3A] h-4 w-20 rounded"></div>
        </div>
        <div className="bg-gray-200 dark:bg-[#2D2D3A] h-5 w-5/6 rounded mb-2"></div>
        <div className="bg-gray-200 dark:bg-[#2D2D3A] h-5 w-2/3 rounded mb-4"></div>
        <div className="bg-gray-200 dark:bg-[#2D2D3A] h-4 w-full rounded mb-2"></div>
        <div className="bg-gray-200 dark:bg-[#2D2D3A] h-4 w-5/6 rounded mb-2"></div>
        <div className="bg-gray-200 dark:bg-[#2D2D3A] h-4 w-4/5 rounded"></div>
      </div>
    </div>
  );
};

const LatestNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [latestFourArticles, setLatestFourArticles] = useState<_News[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setLatestFourArticles(data.slice(0, 4));
      } catch (error) {
        console.error("Gagal fetch berita:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, []);

  return (
    <div className="bg-white dark:bg-[#141427] font-sans antialiased">
      <section className="py-0 pb-16 bg-white dark:bg-[#141427] rounded-lg">
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 text-center">
          <span className="px-3 py-2 text-[10px] sm:text-xs font-semibold bg-[#F6EEFE] dark:bg-[#2C1E45] text-[#9425FE] dark:text-[#CBB3FF] rounded-full">
            Berita Terbaru
          </span>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-5 mb-2">
            Berita Terbaru
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-300 mb-6">
            Kumpulan berita terbaru dari GetSkill
          </p>

          {/* News List */}
          <div className="container mx-auto px-5 md:px-20 lg:px-0 xl:px-6 2xl:px-20 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {isLoading
                ? Array.from({ length: 4 }).map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))
                : latestFourArticles.map((news) => (
                  <div
                    key={news.id}
                    className="w-full lg:w-[110%] xl:w-auto mx-auto"
                  >
                    <NewsCard news={news} />
                  </div>
                ))}
            </div>
          </div>

          {/* Button */}
          <div
            className="mt-6 flex justify-center"
            data-aos="fade"
            data-aos-delay="700"
          >
            <button
              onClick={() => navigate("/news")}
              className="group bg-[#9425FE] text-white font-semibold py-2 px-4 
              rounded-full flex items-center justify-center mx-auto md:mx-0 gap-1
              transition-all duration-500 ease-in-out
              shadow-[4px_4px_0_#0A0082] 
              hover:bg-yellow-400 hover:shadow-none
              active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
              focus:outline-none"
            >
              <span className="transition-colors duration-500 group-hover:text-[#0A0082]">
                Lihat Semua
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 transition-colors duration-500 text-white group-hover:text-[#0A0082]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestNewsPage;