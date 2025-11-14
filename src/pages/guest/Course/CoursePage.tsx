import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import SidebarFilter from "../../../components/course/PageCourse/SidebarFilter";
import CourseList from "../../../components/course/PageCourse/CourseList";
import Header from "../../../components/course/PageCourse/Header";

import { useCourseStore } from "../../../lib/stores/guest/course/useCourseStore";

export default function CoursePage() {
  const location = useLocation();
  const { filters, page, setFilters, setPage } = useCourseStore();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    const category = params.get("category") || "";
    setFilters({
      search: searchQuery,
      categories: category ? [category] : [],
    });
  }, [location.search, setFilters]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#141427] dark:via-[#141427] dark:to-[#141427] transition-colors duration-500">
      {/* Header Halaman */}
      <Header />

      {/* Konten Utama */}
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-4 lg:gap-8 px-4 sm:px-5 lg:px-8 py-8 sm:py-10">

        {/* Sidebar Filter */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SidebarFilter filters={filters} setFilters={setFilters} />
        </motion.div>

        {/* Daftar Kursus */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <CourseList filters={filters} page={page} setPage={setPage} />
        </motion.div>
      </div>
    </div>
  );
}