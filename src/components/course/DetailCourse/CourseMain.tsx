import { useState } from "react";
import { FaCalendarAlt, FaUsers, FaStar } from "react-icons/fa";

import CourseDescription from "./CourseDescription";
import CourseSyllabus from "./CourseSyllabus";
import CourseReviews from "./CourseReviews";

import type { DetailCourse } from "../../../features/course/_course";
import { getSubCategoryName } from "../../../features/course/_service/course_service";

import authorImg from "../../../assets/img/logo/get-skill/Asset 4.png";

interface Props {
  courseData: DetailCourse;
}

export default function CourseMain({ courseData }: Props) {
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [showFullImage, setShowFullImage] = useState(false);

  // 🔹 Default foto kursus
  const defaultPhoto = "/images/placeholder-course.jpg";
  const coursePhoto =
    courseData.photo && courseData.photo.trim() !== "" ? courseData.photo : defaultPhoto;

  // 🔹 Tab navigasi
  const tabs = [
    { key: "deskripsi", label: "Deskripsi" },
    { key: "konten-kursus", label: "Konten Kursus" },
    { key: "ulasan", label: "Ulasan" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Gambar Kursus */}
      <div className="rounded-xl overflow-hidden mb-5 w-full">
        <div
          className="w-full aspect-[16/9] cursor-pointer"
          onClick={() => setShowFullImage(true)}
        >
          <img
            src={coursePhoto}
            alt={courseData.title}
            className="w-full h-full rounded-xl object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultPhoto;
            }}
          />
        </div>
      </div>

      {/* Modal Fullscreen Gambar */}
      {showFullImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setShowFullImage(false)}
        >
          <img
            src={coursePhoto}
            alt={courseData.title}
            className="max-w-[95%] max-h-[90%] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // biar klik gambar tidak menutup modal
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultPhoto;
            }}
          />
          <button
            onClick={() => setShowFullImage(false)}
            className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-gray-300"
          >
            ✕
          </button>
        </div>
      )}

      {/* Info Kursus */}
      <div className="px-4 sm:px-0 text-left space-y-2">
        {/* Judul */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug break-words font-poppins">
          {courseData.title}
        </h1>

        {/* Kategori & Rating */}
        <div className="flex items-center gap-4 mb-3">
          <button className="bg-gray-200 text-[10px] font-semibold text-gray-800 px-2 py-1 rounded-full transition-all duration-300 hover:bg-purple-700 hover:text-white hover:shadow-md">
            {getSubCategoryName(courseData.sub_category)}
          </button>

          <div className="flex items-center text-gray-500 text-xs">
            <FaStar
              size={12}
              className="text-yellow-500 mr-1"
              style={{ stroke: "black", strokeWidth: 20 }}
            />
            <span>({courseData.rating} Reviews)</span>
          </div>
        </div>

        {/* Info tambahan */}
        <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm">
          {/* Author */}
          <div className="flex items-center gap-2">
            <img
              src={authorImg}
              alt="Author"
              className="w-8 h-8 rounded-full object-contain"
            />
            <span>
              By <span className="font-semibold text-gray-700">GetSkill</span>
            </span>
          </div>

          <span className="mx-1">•</span>

          {/* Tanggal dibuat */}
          <div className="flex items-center gap-1">
            <FaCalendarAlt size={14} />
            {new Date(courseData.created).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <span className="mx-1">•</span>

          {/* Jumlah siswa */}
          <div className="flex items-center gap-1">
            <FaUsers size={14} />
            {courseData.user_courses_count} Siswa
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        {/* Tombol tab */}
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative py-1.5 px-4 sm:px-5 text-sm sm:text-[14px] font-semibold rounded-full transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-purple-700 text-white shadow-[4px_4px_0px_rgba(0,0,0,0.7)]"
                  : "bg-gray-200 text-gray-600 hover:bg-purple-700 hover:text-white hover:shadow-[4px_4px_0px_rgba(0,0,0,0.7)] hover:translate-y-0.5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Konten tab */}
        <div className="bg-white p-6 mt-7 rounded-xl border border-gray-300 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          {activeTab === "deskripsi" && <CourseDescription courseData={courseData} />}
          {activeTab === "konten-kursus" && <CourseSyllabus courseData={courseData} />}
          {activeTab === "ulasan" && <CourseReviews courseData={courseData} />}
        </div>
      </div>
    </div>
  );
}
