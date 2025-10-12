// components/course/PopularCourse.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { formatRupiah } from "../../utils/formatPrice";
import CourseSkeleton from "../../components/course/PageCourse/CourseSkeleton";
import defaultImg from "../../assets/Default-Img.png";

import { fetchTopCourses } from "../../features/course/_service/course_service";
import type { TopCourse } from "../../features/course/_course";

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
      onClick={() => navigate(`/kursus/${slug}`)}
      className="card-shine w-full h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm
        transition-all duration-300 cursor-pointer overflow-hidden min-h-[300px]
        hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1"
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
          <span className="bg-gray-100 font-semibold text-gray-800 font-sans text-[10px] px-2 py-0.5 rounded-full leading-none transition-all duration-300 ease-in-out hover:bg-purple-700 hover:text-white hover:shadow-md">
            {sub_category}
          </span>
          <div className="flex items-center text-gray-500 text-[11px]">
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
          <h3 className="group relative sm:text-[15px] font-sans text-black font-semibold leading-snug line-clamp-2">
            <span
              className="inline bg-[linear-gradient(black,black),linear-gradient(black,black)]
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
          <p className="text-xs text-gray-500 mb-4 line-clamp-1">
            By <span className="font-semibold text-gray-700 font-sans">GetSkill</span>
          </p>

          {/* Footer */}
          <div className="mb-2 flex flex-row items-center justify-between gap-2">
            <button
              className="bg-yellow-400 text-gray-900 text-xs sm:text-xs md:text-[10px] lg:text-[10px] xl:text-[10px] 2xl:text-[10px] font-sans font-bold px-4 py-2 rounded-full border border-black
                transition-all duration-300 ease-in-out
                shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none active:translate-y-0.5"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/kursus/${slug}`);
              }}
            >
              Detail Course →
            </button>
            <div className="flex flex-col items-end">
              {promotional_price ? (
                <>
                  <span className="line-through text-gray-400 text-xs">
                    {formatRupiah(price)}
                  </span>
                  <span className="font-bold text-purple-700">
                    {formatRupiah(promotional_price)}
                  </span>
                </>
              ) : (
                <p
                  className={`font-bold font-sans ${isFree ? "text-purple-500" : "text-purple-700"} text-[clamp(10px,2vw,14px)]`}
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

// --- Popular Course List ---
const PopularCourseList = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<TopCourse[]>([]);

  useEffect(() => {
    async function loadPopularCourses() {
      try {
        const data = await fetchTopCourses();
        const processedData = data
          .sort((a, b) => {
            const ratingA = a.rating || 0;
            const ratingB = b.rating || 0;
            if (ratingB === ratingA) {
              return b.course_review_count - a.course_review_count;
            }
            return ratingB - ratingA;
          })
          .map((course, index) => ({
            ...course,
            order: index + 1
          }));

        setCourses(processedData.slice(0, 4));
      } catch (err) {
        console.error("Error load popular courses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPopularCourses();
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

export default function PopularCourse() {
  return (
    <div className="py-[1vh] sm:py-[2vh] md:py-[2vh] lg:py-[1vh] xl:py-[1vh] 2xl:py-[1vh] bg-gray-50">
      <div className="font-sans antialiased px-4 pt-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="px-3 py-2 text-[10px] sm:text-xs font-semibold bg-[#F6EEFE] text-[#9425FE] rounded-full">
              Kursus Terpopuler
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Jelajahi Kursus Teratas
          </h1>
          <p className="text-md text-gray-600 text-center -mb-6">
            Kelas kursus terbaik kami
          </p>
        </div>
        <div className="px-4 py-14 bg-gray-50 mx-0 sm:mx-4 md:mx-6 lg:mx-20 xl:mx-24 2xl:mx-30">
          <PopularCourseList />
        </div>
      </div>
    </div>
  );
}