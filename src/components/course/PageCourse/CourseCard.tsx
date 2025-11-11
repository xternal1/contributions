import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../../utils/formatPrice";
import type { Course } from "../../../features/course/_course";
import { getSubCategoryName } from "../../../features/course/_service/course_service";
import defaultImg from "../../../assets/Default-Img.png";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();

  // 🎯 Cek apakah kursus gratis
  const isFree = course.is_premium === 0 || course.price === 0;

  // 🖼️ Gunakan foto kursus atau default
  const photo =
    course.photo && course.photo.trim() !== "" ? course.photo : defaultImg;

  return (
    <div
  onClick={() => navigate(`/course/${course.slug}`)}
  className="card-shine w-full h-full flex flex-col bg-white dark:bg-[#0D0D1A] rounded-xl border border-gray-200 dark:border-white shadow-sm 
    transition-all duration-300 cursor-pointer overflow-hidden min-h-[300px]
    hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,0.3)] 
    dark:hover:shadow-[0_0_15px_2px_rgba(168,85,247,0.5)]
    hover:-translate-y-1 
    dark:hover:border-purple-500"
>

      {/* ✅ Image Section */}
      <div className="relative w-full aspect-video flex items-center justify-center p-2 sm:p-3 overflow-hidden">
        <div className="relative overflow-hidden rounded-xl shine__animate w-full h-full">
          <img
            src={photo}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultImg; // fallback jika gagal load
            }}
          />
        </div>
      </div>

      {/* Konten */}
      <div className="flex-1 px-4 py-3 text-left flex flex-col">
        {/* Kategori & Rating */}
        <div className="flex items-center justify-between mb-3">
          {/* Badge Kategori */}
          <span
            className="
              font-semibold font-sans text-gray-800 dark:text-white text-[10px]
              px-2 py-1 rounded-full leading-none
              bg-gray-100 dark:bg-purple-700 
              transition-all duration-300 ease-in-out
              hover:bg-purple-700 hover:text-white hover:shadow-md
              dark:hover:bg-purple-600 dark:hover:shadow-purple-400
            "
          >
            {getSubCategoryName(course.sub_category)}
          </span>

          {/* Rating */}
          <div className="flex items-center text-gray-500 dark:text-white text-[11px]">
            <FaStar
              size={12}
              className="text-yellow-500 mr-1"
              style={{ stroke: "black", strokeWidth: 20 }}
            />
            <span>({parseFloat(course.rating).toFixed(1)} Reviews)</span>
          </div>
        </div>

        {/* Judul */}
        <div className="min-h-[55px]">
          <h3 className="text-[15px] font-medium line-clamp-2 min-h-[30px] dark:text-white">
            <a
              className="inline bg-[linear-gradient(gray,gray),linear-gradient(gray,gray)] dark:bg-[linear-gradient(white,white),linear-gradient(white,white)]
                bg-[length:0%_2px,0_2px]
                bg-[position:100%_100%,0_100%]
                bg-no-repeat
                transition-[background-size] duration-900
                hover:bg-[length:0_2px,100%_2px]"
            >
              {course.title}
            </a>
          </h3>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          {/* Author */}
          <p className="text-xs text-gray-500 dark:text-white mb-4 line-clamp-1">
            By{" "}
            <span className="font-semibold text-gray-700 dark:text-white font-sans">
              GetSkill
            </span>
          </p>

          {/* Tombol & Harga */}
          <div className="mb-2 flex flex-row items-center justify-between gap-2">
            <p
              className={`font-bold font-sans ${
                isFree
                  ? "text-purple-500 dark:text-purple-400"
                  : "text-purple-700 dark:text-purple-500"
              } text-[18px]`}
            >
              {isFree ? "Free" : formatRupiah(course.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
