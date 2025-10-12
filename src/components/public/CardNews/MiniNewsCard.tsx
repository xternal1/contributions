import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoGetskill from "../../../assets/img/logo/get-skill/landscape.png";
import defaultImg from "../../../assets/Default-Img.png";

interface MiniNewsCardProps {
    id: string;
    image: string;
    date: string;
    title: string;
    summary?: string;
}

const MiniNewsCard: React.FC<MiniNewsCardProps> = ({ id, image, date, title, summary }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link
            to={`/news/${id}`}
            tabIndex={0}
            className="relative block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-transform duration-500 hover:scale-[1.02] cursor-pointer
                 hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.15)] card-shine w-full sm:w-[90%] md:w-[100%] lg:w-[100%] mx-auto"
        >
            {/* Thumbnail */}
            <div className="relative h-32 bg-white">
                <div className="w-full h-full rounded-md overflow-hidden relative shine__animate">
                    {/* Skeleton Loader */}
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
                    )}

                    <img
                        src={image}
                        alt={title}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"
                            }`}
                        onLoad={() => setIsLoaded(true)}
                        onError={(e) => {
                            e.currentTarget.src = defaultImg;
                            setIsLoaded(true);
                        }}
                    />

                    <span className="absolute top-1 left-1 bg-yellow-400 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                        Berita
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/60 via-transparent to-transparent" />
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-0.5 shadow">
                        <img
                            src={logoGetskill}
                            alt="GetSkill Logo"
                            className="w-12 h-3 object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-3">
                {/* Date */}
                <div className="flex items-center text-[11px] text-gray-500 mb-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 text-purple-500 h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="leading-none">{date}</span>
                </div>

                {/* Title */}
                <div className="text-left flex-1 pt-0 px-0">
                    <h3 className="text-sm font-semibold line-clamp-2 cursor-pointer">
                        <a
                            className="inline bg-[linear-gradient(black,black),linear-gradient(black,black)]
                            bg-[length:0%_2px,0_2px]
                            bg-[position:100%_100%,0_100%]
                            bg-no-repeat
                            transition-[background-size] duration-1200
                            hover:bg-[length:0_2px,100%_2px]"
                        >
                            {title}
                        </a>
                    </h3>
                </div>

                {summary && (
                    <p className="text-[11px] text-gray-600 line-clamp-2 text-justify">
                        {summary}
                    </p>
                )}
            </div>
        </Link>
    );
};

export default MiniNewsCard;
