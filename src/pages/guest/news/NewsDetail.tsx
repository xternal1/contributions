import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BackgroundShapes from "../../../components/public/BackgroundShapes";
import RelatedNews from "../../../components/public/CardNews/RelatedNews";
import logoGetskill from "../../../assets/img/logo/get-skill/landscape.png";
import defaultImg from "../../../assets/Default-Img.png";
import { FiX } from "react-icons/fi";

import { fetchNewsDetail, fetchNews } from "../../../features/news/services/news_service";
import type { _News } from "../../../features/news/_news";

// --- Skeleton ---
const SkeletonNewsDetail: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8 animate-pulse">
      <div className="lg:col-span-3">
        <div className="bg-gray-200 h-[350px] w-full rounded-lg shadow-md mb-4"></div>
        <div className="flex items-center gap-2 mt-4 text-sm">
          <div className="bg-gray-200 h-5 w-5 rounded-full"></div>
          <div className="bg-gray-200 h-4 w-24 rounded"></div>
        </div>
        <div className="bg-gray-200 h-8 w-3/4 mt-2 mb-4 rounded"></div>
        <div className="space-y-3">
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-11/12 rounded"></div>
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-10/12 rounded"></div>
        </div>
      </div>

      {/* Skeleton Sidebar */}
      <div className="lg:col-span-1">
        <div className="relative mb-6">
          <div className="bg-gray-200 h-10 w-full rounded-lg"></div>
        </div>
        <div className="mt-8 text-center">
          <div className="bg-gray-200 h-6 w-2/3 mb-4 rounded mx-auto"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="block rounded-lg border border-gray-200 overflow-hidden shadow-sm"
              >
                <div className="relative h-32 bg-gray-200 w-full"></div>
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 h-3 w-3 rounded"></div>
                    <div className="bg-gray-200 h-3 w-16 rounded"></div>
                  </div>
                  <div className="bg-gray-200 h-3 w-3/4 rounded"></div>
                  <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<_News | null>(null);
  const [relatedNews, setRelatedNews] = useState<_News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);

        // Fetch News Detail
        const detail = await fetchNewsDetail(slug!);
        setNews(detail);

        // Fetch All News
        const allNews = await fetchNews();
        const related = allNews
          .filter((item) => item.category_id === detail.category_id && item.slug !== slug)
          .slice(0, 5);
        setRelatedNews(related);

      } catch (error) {
        console.error(error);
        setNews(null);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, [slug]);

  useEffect(() => {
    const savedScrollY = localStorage.getItem("newsDetailScrollPosition");
    if (savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY));
    }
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "newsDetailScrollPosition",
        window.scrollY.toString()
      );
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!isLoading && !news) {
    return (
      <div className="text-center py-20 text-gray-500">
        Berita tidak ditemukan.
      </div>
    );
  }

  if (isLoading || !news) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 overflow-hidden">
          <BackgroundShapes />
          <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-left relative z-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Detail Berita
            </h1>
            <p className="mt-2 text-xs sm:text-xs text-gray-800">
              <Link to="/">Beranda</Link>
              <span className="mx-1">&gt;</span>
              <Link to="/news">Berita</Link>
            </p>
          </div>
        </div>

        <SkeletonNewsDetail />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 overflow-hidden">
        <BackgroundShapes />
        <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Detail Berita
          </h1>
          <p className="mt-2 text-xs sm:text-xs text-gray-800">
            <Link to="/">Beranda</Link>
            <span className="mx-1">&gt;</span>
            <Link to="/news">Berita</Link>
            <span className="mx-1">&gt;</span>
            <span className="text-purple-600">{news.title}</span>
          </p>
        </div>
      </div>

      {/* Content & sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-4 grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="lg:col-span-3">
          <div
            className="relative group rounded-lg overflow-hidden shadow-md max-h-[350px] w-full cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={news.thumbnail}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = defaultImg;
              }}
            />
            {/* Overlay with group-hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold rounded-lg transition-opacity duration-300">
              Klik untuk melihat ukuran penuh
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-t from-purple-900/80 via-purple-700/10 to-transparent" />

            {/* Watermark */}
            <div className="absolute bottom-0 left-2 right-2 flex items-center justify-between rounded-lg px-6 py-2 select-none pointer-events-none text-white text-xs font-base">
              {/* Social Icons left */}
              <div className="flex space-x-2 text-white">
                <a
                  href="https://instagram.com/getskill"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-purple-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/getskill"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-purple-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12a10 10 0 10-11.5 9.87v-7h-3v-3h3v-2.3c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 1-2 2v2.3h3.4l-.5 3h-2.9v7A10 10 0 0022 12z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/getskill"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="hover:text-purple-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.96-2.48 9.14 9.14 0 01-2.83 1.08 4.52 4.52 0 00-7.71 4.12A12.79 12.79 0 013 4.16a4.52 4.52 0 001.4 6.03 4.44 4.44 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.44 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14 9.06 9.06 0 01-5.6 1.93A9.07 9.07 0 012 18.13a12.73 12.73 0 006.92 2.03c8.3 0 12.85-6.9 12.85-12.86 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
                  </svg>
                </a>
                <div>@getskill</div>
              </div>

              {/* Getskill Logo */}
              <div className="bg-white rounded-full p-0.5 shadow-md inline-block -ml-19">
                <img
                  src={logoGetskill}
                  alt="GetSkill Logo"
                  className="w-20 h-4 object-contain rounded-full"
                />
              </div>

              {/* Right Text */}
              <div>getskill.id</div>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-2"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="relative rounded-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-white hover:text-gray-300 text-2xl"
                >
                  <FiX />
                </button>
                <img
                  src={news.thumbnail}
                  alt={news.title}
                  className="w-full max-h-[90vh] object-contain rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = defaultImg;
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-purple-500 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="leading-none">{news.created}</span>
          </div>

          <h2 className="mt-2 text-2xl font-extrabold text-gray-900 text-left">
            {news.title}
          </h2>

          <div
            id="detail-description"
            className="
            text-gray-800 leading-relaxed
            [&>p]:mb-4 [&>p]:text-justify
            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:-mt-4 [&>h3]:mb-2
            [&>blockquote]:bg-purple-100 [&>blockquote]:text-purple-900 [&>blockquote]:italic [&>blockquote]:text-justify
            [&>blockquote]:p-10 [&>blockquote]:rounded-md [&>blockquote]:relative [&>blockquote]:my-6
            [&>blockquote::after]:content-['”'] [&>blockquote::after]:absolute [&>blockquote::after]:text-7xl
            [&>blockquote::after]:text-purple-300 [&>blockquote::after]:right-4 [&>blockquote::after]:top-2
            [&>blockquote::after]:font-[Arial]
            [&_*em]:italic [&_*em]:text-gray-700 [&_em]:text-sm
            [&>hr]:hidden
          "
            dangerouslySetInnerHTML={{ __html: news.description }}
          />
        </div>

        {/* Sidebar */}
        <div>
          <div className="relative mt-20 lg:mt-0 mb-6 lg:ml-6 flex justify-center lg:justify-center">
            <input
              type="text"
              placeholder="Cari Berita"
              className="w-[100%] md:w-[40%] lg:w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 placeholder-gray-400"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-500 absolute right-[3%] md:right-[32%] lg:right-3 top-2.5"
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
          <RelatedNews relatedArticles={relatedNews} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;