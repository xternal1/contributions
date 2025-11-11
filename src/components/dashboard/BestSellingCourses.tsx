// components/course/PopularCourse.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { formatRupiah } from "../../utils/formatPrice";
import CourseSkeleton from "../../components/course/PageCourse/CourseSkeleton";
import defaultImg from "../../assets/Default-Img.png";

import { fetchTopRatingCourses } from "../../features/course/_service/course_service";
import type { TopRatingCourse } from "../../features/course/_course";

// --- Course Card Component ---
interface CourseCardProps {
  slug: string;
  photo: string;
  sub_category: string;
  title: string;
  price: number;
  promotional_price: number | null;
  rating: number | null;
}

const CourseCard = ({
  slug,
  photo,
  sub_category,
  title,
  price,
  promotional_price,
  rating,
}: CourseCardProps) => {
  const navigate = useNavigate();
  const isFree = price === 0;

  return (
    <div
      onClick={() => navigate(`/course/${slug}`)}
      className="card-shine w-full h-full flex flex-col bg-white dark:bg-[#1E1E2D] rounded-md border border-gray-200 dark:border-white shadow-sm
        transition-all duration-300 cursor-pointer overflow-hidden min-h-[300px]
        hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,0.3)] dark:hover:shadow-[7px_7px_0px_0px_rgba(147,51,234,0.25)] hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative w-full aspect-video flex items-center justify-center p-2 sm:p-3 overflow-hidden">
        <div className="relative overflow-hidden rounded-xl shine__animate w-full h-full">
          <img
            src={photo}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultImg;
            }}
          />
        </div>
      </div>

      {/* Bottom Section Content */}
      <div className="flex-1 px-4 py-3 text-left flex flex-col">
        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-gray-100 dark:bg-[#2D2D3A] font-semibold text-gray-800 dark:text-gray-200 font-sans text-[10px] px-2 py-0.5 rounded-full leading-none transition-all duration-300 ease-in-out hover:bg-purple-700 hover:text-white hover:shadow-md">
            {sub_category}
          </span>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-[11px]">
            <FaStar
              size={12}
              className="text-yellow-500 mr-1"
              style={{
                stroke: "black",
                strokeWidth: 20,
              }}
            />
            <span>({rating !== null ? rating.toFixed(1) : "0.0"} Reviews)</span>
          </div>
        </div>
        {/* Title */}
        <div className="min-h-[55px] mb-3">
          <h3 className="group relative sm:text-[15px] font-sans text-black dark:text-white font-semibold leading-snug line-clamp-2">
            <span
              className="inline bg-[linear-gradient(black,black),linear-gradient(black,black)] dark:bg-[linear-gradient(white,white),linear-gradient(white,white)]
              bg-[length:0%_2px,0_2px]
              bg-[position:100%_100%,0_100%]
              bg-no-repeat
              transition-[background-size] duration-900
              hover:bg-[length:0_2px,100%_2px]"
            >
              {title}
            </span>
          </h3>
        </div>

        {/* Author */}
        <div className="mt-auto">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-1">
            By <span className="font-semibold text-gray-700 dark:text-gray-300 font-sans">GetSkill</span>
          </p>

          {/* Footer */}
          <div className="mb-2 flex flex-row items-center justify-between gap-2">
            <div className="flex flex-col items-end">
              {promotional_price ? (
                <>
                  <span className="line-through text-gray-400 dark:text-gray-500 text-xs">
                    {formatRupiah(price)}
                  </span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">
                    {formatRupiah(promotional_price)}
                  </span>
                </>
              ) : (
                <p
                  className={`font-bold font-sans ${isFree ? "text-purple-500 dark:text-purple-400" : "text-purple-700 dark:text-purple-400"} text-[clamp(18px,2vw,14px)]`}
                >
                  {isFree ? "Free" : formatRupiah(price)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Best Selling Course List ---
const BestSellingCourseList = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<TopRatingCourse[]>([]);

  useEffect(() => {
    async function loadBestSellingCourses() {
      try {
        const data = await fetchTopRatingCourses();
        // Pastikan data memiliki user_courses_count
        const processedData = data
          .map((course, index) => ({
            ...course,
            user_courses_count: course.user_courses_count ?? 0,
            order: index + 1
          }))
          .sort((a, b) => b.user_courses_count - a.user_courses_count);
        ;

        setCourses(processedData.slice(0, 4));
      } catch (err) {
        console.error("Error load best selling courses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBestSellingCourses();
  }, []);

  const gridClass =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4 w-full";

  return (
    <div className="flex flex-col">
      <div className={gridClass}>
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <CourseSkeleton />
              </motion.div>
            ))
          ) : (
            <>
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full"
                >
                  <CourseCard {...course} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function BestSellingCourse() {
  return (
    <div className="py-[1vh] sm:py-[2vh] md:py-[2vh] lg:py-[1vh] xl:py-[1vh] 2xl:py-[1vh] bg-gray-50 dark:bg-[#141427]">
      <div className="font-sans antialiased px-4 pt-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="px-3 py-2 text-[10px] sm:text-xs font-semibold bg-[#F6EEFE] dark:bg-[#2C1E45] text-[#9425FE] dark:text-[#CBB3FF] rounded-full">
              Kursus Terlaris
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-2">
            Kursus Terlaris Di Getskill
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-300 text-center -mb-6">
            Daftar kursus yang paling laris di getskill
          </p>
        </div>
        <div className="px-4 py-14 bg-gray-50 dark:bg-[#141427] mx-0 sm:mx-4 md:mx-6 lg:mx-20 xl:mx-24 2xl:mx-30">
          <BestSellingCourseList />
        </div>
      </div>
    </div>
  );
}