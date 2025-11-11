import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { fetchCourseDetail } from "../../../features/course/_service/course_service";
import type { DetailCourse } from "../../../features/course/_course";

import CourseHeader from "../../../components/course/DetailCourse/CourseHeader";
import CourseMain from "../../../components/course/DetailCourse/CourseMain";
import CourseSidebar from "../../../components/course/DetailCourse/CourseSidebar";
import CourseDetailSkeleton from "../../../components/course/DetailCourse/CourseDetailSkeleton";

export default function CourseDetail() {
  // ambil slug dari url param
  const { slug } = useParams<{ slug: string }>();

  const [courseData, setCourseData] = useState<DetailCourse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data detail kursus berdasarkan slug
  useEffect(() => {
    if (!slug) return;

    const loadCourseDetail = async () => {
      try {
        console.log("📡 Fetching detail kursus slug:", slug);
        const data = await fetchCourseDetail(slug);
        console.log("✅ Data kursus:", data);
        setCourseData(data);
      } catch (err) {
        console.error("❌ Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourseDetail();
  }, [slug]);

  // 🔹 Loading state
  if (loading) {
    return <CourseDetailSkeleton />;
  }

  // 🔹 Data kosong
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

  // 🔹 Hitung total modul & kuis
  const totalModul = courseData.modules?.length ?? 0;
  const totalKuis =
    courseData.modules?.reduce(
      (total, modul) => total + (modul.quizz_count || 0),
      0
    ) ?? 0;

  // 🔹 Render layout utama
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