import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import CourseCard from "./CourseCard";
import CourseSkeleton from "./CourseSkeleton";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

// Types & Services
import type { Course } from "../../../features/course/_course";
import { fetchCourses, getSubCategoryName } from "../../../features/course/_service/course_service";

interface CourseListProps {
  filters?: {
    categories: string[];
    priceMin: string;
    priceMax: string;
    search: string;
  };
  page?: number;
  setPage?: (page: number) => void;
  limit?: number;
}

const COURSES_PER_PAGE = 6;

export default function CourseList({
  filters = { categories: [], priceMin: "", priceMax: "", search: "" },
  page = 1,
  setPage,
  limit,
}: CourseListProps) {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  /**
   * 🚀 Fetch courses dari API saat pertama kali render
   */
  useEffect(() => {
    setLoading(true);
    fetchCourses()
      .then((data) => setCourses(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  /**
   * 🔍 Filtering data berdasarkan:
   * - kategori
   * - range harga
   * - keyword pencarian
   */
  const filteredCourses = courses.filter((course) => {
    const min = filters.priceMin ? parseInt(filters.priceMin) : 0;
    const max = filters.priceMax ? parseInt(filters.priceMax) : Infinity;
    const subCategoryName = getSubCategoryName(course.sub_category);

    const matchCategory =
      filters.categories.length === 0 || filters.categories.includes(subCategoryName);

    const matchPriceMin = course.price >= min;
    const matchPriceMax = course.price <= max;

    const matchSearch =
      !filters.search.trim() ||
      course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      subCategoryName.toLowerCase().includes(filters.search.toLowerCase());

    return matchCategory && matchPriceMin && matchPriceMax && matchSearch;
  });

  /**
   * 📄 Pagination & limit data
   */
  let currentCourses: Course[] = [];
  let totalPages = 1;

  if (limit) {
    // Mode "limit" → ambil sejumlah tertentu saja
    currentCourses = filteredCourses.slice(0, limit);
  } else {
    // Mode "pagination"
    totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
    const startIndex = (page - 1) * COURSES_PER_PAGE;
    currentCourses = filteredCourses.slice(startIndex, startIndex + COURSES_PER_PAGE);
  }

  const gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5";

  return (
    <div className="flex flex-col min-h-[500px]">
      {/* LIST KURSUS */}
      <div className={gridClass}>
        <AnimatePresence mode="popLayout">
          {loading ? (
            // Skeleton saat loading
            Array.from({ length: limit || COURSES_PER_PAGE }).map((_, idx) => (
              <motion.div
                key={`skeleton-${idx}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-w-[220px] max-w-[300px]"
              >
                <CourseSkeleton />
              </motion.div>
            ))
          ) : currentCourses.length > 0 ? (
            // Daftar kursus
            currentCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="w-full"
              >
                <CourseCard course={course} />
              </motion.div>
            ))
          ) : (
            // Jika data kosong
            <motion.p
              key="no-course"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center col-span-full text-gray-500 dark:text-gray-400 py-8"
            >
              Tidak ada kursus yang ditemukan
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* PAGINATION (versi mirip EventCardGrid) */}
{!loading && !limit && setPage && totalPages > 0 && (
  <div className="flex justify-center mt-10">
    <div className="flex items-center gap-3">
      {/* Tombol Prev */}
      <motion.button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        whileTap={{ scale: 0.9 }}
        className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
          page === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
            : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
        }`}
      >
        <ChevronsLeft />
      </motion.button>

      {/* Nomor halaman dengan ellipsis */}
      {(() => {
        const pageButtons: (number | string)[] = [];

        if (totalPages <= 7) {
          for (let i = 1; i <= totalPages; i++) pageButtons.push(i);
        } else {
          const showLeftEllipsis = page > 4;
          const showRightEllipsis = page < totalPages - 3;

          pageButtons.push(1);
          if (showLeftEllipsis) pageButtons.push("...");

          const startPage = Math.max(2, page - 1);
          const endPage = Math.min(totalPages - 1, page + 1);

          for (let i = startPage; i <= endPage; i++) pageButtons.push(i);

          if (showRightEllipsis) pageButtons.push("...");
          pageButtons.push(totalPages);
        }

        return pageButtons.map((p, index) =>
          typeof p === "number" ? (
            <motion.button
              key={p}
              onClick={() => setPage(p)}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: p === page ? 1.1 : 1,
                boxShadow:
                  p === page
                    ? "0px 4px 10px rgba(147, 51, 234, 0.4)"
                    : "none",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-300 ${
                p === page
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:border dark:border-purple-700 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
              }`}
            >
              {p}
            </motion.button>
          ) : (
            <span
              key={`ellipsis-${index}`}
              className="text-gray-500 dark:text-white"
            >
              ...
            </span>
          )
        );
      })()}

      {/* Tombol Next */}
      <motion.button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        whileTap={{ scale: 0.9 }}
        className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
          page === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
            : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
        }`}
      >
        <ChevronsRight />
      </motion.button>
    </div>
  </div>
)}
    </div>
  );
}