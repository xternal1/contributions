import React from "react";
import { Link } from "react-router-dom";
import logoGetskill from "../../../assets/img/logo/get-skill/landscape.png";
import defaultImg from "../../../assets/Default-Img.png";
import type { _News } from "../../../features/news/_news";

interface NewsCardProps {
  news: _News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const { slug, title, description, thumbnail, created } = news;

  return (
    <Link
      to={`/news/${slug}`}
      tabIndex={0}
      className="relative block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-transform duration-700 hover:scale-105 cursor-pointer hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.25)] card-shine"
    >
      {/* Thumbnail */}
      <div className="relative h-58 p-5 bg-white z-10">
        <div className="w-full h-full rounded-lg overflow-hidden relative shine__animate">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = defaultImg;
            }}
          />
          <span className="absolute top-2 left-2 bg-yellow-400 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
            Berita
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/70 via-transparent to-transparent" />

          {/* Watermark */}
          <div className="absolute -bottom-[-6px] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md">
            <img
              src={logoGetskill}
              alt="watermark"
              className="w-13 h-3 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Date */}
        <div className="mb-3 -mt-6 flex items-center text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 text-purple-500 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="leading-none">{created}</span>
        </div>

        {/* Title */}
        <div className="text-left flex-1 pt-0 px-0">
          <h3 className="text-base font-semibold line-clamp-2 cursor-pointer">
            <span
              className="inline bg-[linear-gradient(black,black),linear-gradient(black,black)]
                bg-[length:0%_2px,0_2px]
                bg-[position:100%_100%,0_100%]
                bg-no-repeat
                transition-[background-size] duration-1200
                hover:bg-[length:0_2px,100%_2px]"
            >
              {title}
            </span>
          </h3>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 text-justify">
          {description.replace(/<[^>]*>/g, "").slice(0, 150)}...
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
