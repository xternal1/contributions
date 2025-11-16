import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import CourseHeader from "@components/course/DetailCourse/CourseHeader";
import CourseMain from "@components/course/DetailCourse/CourseMain";
import CourseSidebar from "@components/course/DetailCourse/CourseSidebar";
import CourseDetailSkeleton from "@components/course/DetailCourse/CourseDetailSkeleton";

import { useCourseStore } from "@lib/stores/guest/course/useCourseStore";

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();

  const {
    selectedCourse,
    detailLoading,
    loadCourseDetail,
    clearCourseDetail,
  } = useCourseStore();

  useEffect(() => {
    if (!slug) return;
    loadCourseDetail(slug);
    return () => {
      clearCourseDetail();
    };
  }, [slug, loadCourseDetail, clearCourseDetail]);

  const courseData = selectedCourse;
  const loading = detailLoading;

  if (loading) {
    return <CourseDetailSkeleton />;
  }

  if (!courseData) {
    return (
      <motion.div
        className="p-8 text-gray-600 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Kursus tidak ditemukan.
      </motion.div>
    );
  }

  const totalModul = courseData.modules?.length ?? 0;
  const totalKuis =
    courseData.modules?.reduce(
      (total, modul) => total + (modul.quizz_count || 0),
      0
    ) ?? 0;

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-[#141427] transition-colors duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <CourseHeader title={courseData.title} />

      {/* Layout Utama */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Konten Utama */}
        <div className="lg:col-span-8">
          <CourseMain courseData={courseData} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <CourseSidebar
            totalModul={totalModul}
            totalKuis={totalKuis}
            price={courseData.price}
            isFree={courseData.promotional_price === 0}
            hasPretestDone={courseData.user_course?.has_pre_test === 1}
            hasPosttestDone={courseData.user_course?.has_post_test === 1}
            courseData={courseData}
          />
        </div>
      </div>
    </motion.div>
  );
}



