import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "@assets/Default-Img.png";

interface CourseSectionProps {
    loading: boolean;
    course: any; // Ganti 'any' dengan tipe data yang sesuai untuk course
    orderAmount: number;
}

const CourseSection: React.FC<CourseSectionProps> = ({ loading, course, orderAmount }) => {
    return (
        <div className="lg:col-span-2">
            <div
                className="bg-white dark:bg-[#0D0D1A] shadow rounded-xl p-6 flex flex-col gap-4 text-left
                border border-gray-300 dark:border-white
                transition-all duration-500
                hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]
                dark:hover:shadow-[8px_8px_0_0_rgba(148,37,254,0.2)]"
            >
                {loading ? (
                    <div className="animate-pulse space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-45 md:h-45 bg-gray-300 dark:bg-[#2C2C44] rounded-lg"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-6 bg-gray-200 dark:bg-[#3A3A5A] rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-[#3A3A5A] rounded w-1/2"></div>
                                <div className="h-5 bg-gray-200 dark:bg-[#3A3A5A] rounded w-1/4"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-5 bg-gray-200 dark:bg-[#3A3A5A] rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 dark:bg-[#3A3A5A] rounded w-full"></div>
                            <div className="h-4 bg-gray-200 dark:bg-[#3A3A5A] rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 dark:bg-[#3A3A5A] rounded w-4/6"></div>
                        </div>
                    </div>
                ) : (
                    course && (
                        <>
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <Link to={`/course/${course.slug}`}>
                                    <div className="w-[230px] h-[160px] rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1B1B33] flex items-center justify-center">
                                        <img
                                            src={course.photo || defaultImg}
                                            alt={course.title}
                                            className="w-full h-full object-cover object-center"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = defaultImg;
                                            }}
                                        />
                                    </div>
                                </Link>

                                <div className="text-left -pl-1 sm:pl-6">
                                    <span
                                        className="text-xs
        bg-gray-100 dark:bg-[#2C004F]
        text-black dark:text-gray-200
        px-2 py-1 rounded-full
        transition-colors duration-500
        hover:bg-purple-600 hover:text-white
        dark:hover:bg-purple-600 dark:hover:text-white"
                                    >
                                        {typeof course.sub_category === "string" ? course.sub_category : course.sub_category?.name}
                                    </span>

                                    <h2 className="text-sm font-semibold mt-2 text-gray-800 dark:text-white">{course.title}</h2>

                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 mb-2">By GetSkill</p>

                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-purple-600 dark:text-purple-400 font-semibold text-xs">Rp {orderAmount.toLocaleString("id-ID")}</p>
                                        <span className="text-gray-500 dark:text-gray-400 text-xs">({parseFloat(course.rating).toFixed(1)} Reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-justify border-t border-gray-300 dark:border-white pt-4">
                                <h3 className="font-bold text-gray-800 dark:text-white text-base mb-5">Deskripsi:</h3>
                                <div
                                    className="text-gray-600 dark:text-gray-300 text-sm sm:text-xs leading-7 space-y-4
                                    [&_p]:mb-3 [&_p]:leading-relaxed
                                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
                                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2
                                    [&_li]:mb-1 [&_strong]:font-semibold
                                    [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-gray-800 dark:[&_h3]:text-white [&_h3]:mb-3"
                                    dangerouslySetInnerHTML={{ __html: course.description }}
                                />
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    );
};

export default CourseSection;