import { Card } from "flowbite-react";
import { LuBookMinus, LuClock } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

import DefaultImg from "../../../../assets/Default-Img.png";
import noProfile from "../../../../assets/img/no-image/no-profile.jpeg";

interface CardCoursesProps {
    slug: string;
    title: string;
    category: string;
    photo: string;
    study_percentage: number;
    rating: number;
    total_module: number;
    total_user: number;
    study_time: string;
    user: string;
    photo_user: string;
}

const CardCourses = ({
    slug,
    title,
    category,
    photo,
    study_percentage,
    rating,
    total_module,
    total_user,
    study_time,
    user,
    photo_user,
}: CardCoursesProps) => {


    return (
        <Link to={`/course/${slug}`}>
            <Card className="h-full card-shine relative flex flex-col justify-between border rounded-2xl shadow-sm hover:shadow-[8px_8px_0_#D3DAD9] hover:scale-[1.02] transition-all duration-300 cursor-pointer p-0 overflow-visible z-10 dark:bg-[#0D0D1A] dark:border-white dark:hover:border-purple-500 dark:shadow-[0_0_15px_rgba(128,90,213,0.2)] dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                <div className="relative -mt-1 -mx-1">
                    <div className="shine__animate">
                        <img
                            src={photo || DefaultImg}
                            alt={title}
                            className="h-35 w-full object-cover rounded-xl"
                            onError={(e) => {
                                e.currentTarget.src = DefaultImg;
                            }}
                        />
                    </div>
                </div>

                {/* Konten */}
                <div className="text-left flex-1 flex flex-col justify-between">
                    {/* Badge kategori */}
                    <div>
                        <span className="inline-block text-[12px] font-semibold px-2 py-0.5 rounded-md bg-purple-600 text-white mb-2">
                            {category}
                        </span>
                    </div>

                    {/* Judul */}
                    <h3 className="text-sm font-semibold line-clamp-3 min-h-[50px] mb-1">
                        <a className="inline bg-[linear-gradient(black,black),linear-gradient(black,black)] dark:bg-[linear-gradient(white,white),linear-gradient(white,white)]
                          bg-[length:0%_2px,0_2px]
                          bg-[position:100%_100%,0_100%]
                          bg-no-repeat
                          transition-[background-size] duration-900
                          hover:bg-[length:0_2px,100%_2px]">
                            {title}
                        </a>
                    </h3>

                    {/* Author + rating */}
                    <div className="flex items-center justify-between gap-2 text-gray-500 text-xs mb-3 dark:text-white">
                        <div className="flex items-center gap-1">
                            <img
                                src={photo_user || DefaultImg}
                                alt="user"
                                className="w-5 h-5 rounded-full"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = noProfile;
                                }}
                            />
                            <span className="text-gray-700 dark:text-white">{user}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-white text-[11px]">
                            <div className="flex items-center">
                                <FaStar
                                    size={12}
                                    className="text-yellow-500 mr-1"
                                    style={{ stroke: "black", strokeWidth: 20 }}
                                />
                                <span>({rating.toFixed(1)} Reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                        <div className="flex justify-between text-[10px] font-semibold text-gray-600 mb-1 dark:text-white">
                            <span>COMPLETE</span>
                            <span>{study_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${study_percentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Footer info */}
                    <div className="flex items-center justify-center text-[10px] text-gray-600 border-t pt-2 dark:text-white">
                        <div className="flex items-center gap-2">
                            <LuBookMinus size={20} />
                            <span>{total_module}</span>

                            <span className="text-gray-400">•</span>

                            <LuClock size={20} />
                            <span>{study_time}</span>

                            <span className="text-gray-400">•</span>

                            <GraduationCap size={22} />
                            <span>{total_user}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default CardCourses;
