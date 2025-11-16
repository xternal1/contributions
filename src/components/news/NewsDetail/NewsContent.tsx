// src/components/news/NewsDetail/NewsContent.tsx
import React from "react";

interface NewsContentProps {
    newsTitle: string;
    createdAt: string;
    description: string;
}

const NewsContent: React.FC<NewsContentProps> = ({ newsTitle, createdAt, description }) => {
    return (
        <div>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-purple-500 dark:text-purple-400 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className="leading-none">{createdAt}</span>
            </div>

            <h2 className="mt-2 text-lg md:text-2xl font-extrabold text-gray-900 dark:text-white text-left">
                {newsTitle}
            </h2>

            <div
                id="detail-description"
                className={`
          text-gray-800 dark:text-gray-300 leading-relaxed
          [&>p]:mb-4 [&>p]:text-justify
          [&>h3]:text-xl [&>h3]:font-bold [&>h3]:-mt-4 [&>h3]:mb-2 [&>h3]:text-gray-900 dark:[&>h3]:text-white
          [&>blockquote]:bg-purple-100 dark:[&>blockquote]:bg-purple-900/30 [&>blockquote]:text-purple-900 dark:[&>blockquote]:text-purple-300 [&>blockquote]:italic [&>blockquote]:text-justify
          [&>blockquote]:p-10 [&>blockquote]:rounded-md [&>blockquote]:relative [&>blockquote]:my-6
          [&>blockquote::after]:content-['\\201C'] [&>blockquote::after]:absolute [&>blockquote::after]:text-7xl
          [&>blockquote::after]:text-purple-300 dark:[&>blockquote::after]:text-purple-600 [&>blockquote::after]:right-4 [&>blockquote::after]:top-2
          [&>blockquote::after]:font-[Arial]
          [&_*em]:italic [&_*em]:text-gray-700 dark:[&_*em]:text-gray-400 [&_em]:text-sm
          [&>hr]:hidden
        `}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
};

export default NewsContent;