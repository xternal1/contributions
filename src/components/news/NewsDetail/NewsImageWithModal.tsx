// src/components/news/NewsImageWithModal.tsx
import React from "react";
import logoGetskill from "@assets/img/logo/get-skill/landscape.png";
import defaultImg from "@assets/Default-Img.png";

interface NewsImageWithModalProps {
    imageUrl: string;
    altText: string;
    onImageClick: () => void;
}

const NewsImageWithModal: React.FC<NewsImageWithModalProps> = ({ imageUrl, altText, onImageClick }) => {
    return (
        <div
            className="relative group rounded-lg overflow-hidden shadow-md max-h-[350px] w-full cursor-pointer"
            onClick={onImageClick}
        >
            <img
                src={imageUrl}
                alt={altText}
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
            <div className="absolute bottom-0 left-2 right-2 flex items-center justify-between rounded-lg px-0 md:px-6 py-2 select-none pointer-events-none text-white text-[10px] md:text-xs font-base">
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
                            className="w-3 md:w-5 lg:w-5 xl-w-5 2xl:w-5 h-3 md:h-5 lg:h-5 xl:h-5 2xl:h-5 fill-current"
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
                            className="w-3 md:w-5 lg:w-5 xl-w-5 2xl:w-5 h-3 md:h-5 lg:h-5 xl:h-5 2xl:h-5 fill-current"
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
                            className="w-3 md:w-5 lg:w-5 xl-w-5 2xl:w-5 h-3 md:h-5 lg:h-5 xl:h-5 2xl:h-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.96-2.48 9.14 9.14 0 01-2.83 1.08 4.52 4.52 0 00-7.71 4.12A12.79 12.79 0 013 4.16a4.52 4.52 0 001.4 6.03 4.44 4.44 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.44 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14 9.06 9.06 0 01-5.6 1.93A9.07 9.07 0 012 18.13a12.73 12.73 0 006.92 2.03c8.3 0 12.85-6.9 12.85-12.86 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
                        </svg>
                    </a>
                    <div>@getskill</div>
                </div>

                {/* Getskill Logo */}
                <div className="bg-white dark:bg-[#0D0D1A] rounded-full p-0.5 shadow-md inline-block -ml-19">
                    <img
                        src={logoGetskill}
                        alt="GetSkill Logo"
                        className="w-25 h-5 object-contain rounded-full dark:brightness-0 dark:invert"
                    />
                </div>

                {/* Right Text */}
                <div>getskill.id</div>
            </div>
        </div>
    );
};

export default NewsImageWithModal;


