import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { CourseActivity } from "@features/user/models";
import CardCourses from "@components/public/auth/CardCourses/CardCourses";
import Pagination from "./Pagination";

const CoursesSection = ({
    courses,
    currentPage,
    setCurrentPage,
}: {
    courses: CourseActivity[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
}) => {
    const navigate = useNavigate();
    const itemsPerPage = 3;

    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const paginatedCourses = useMemo(
        () => courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [courses, currentPage]
    );

    if (courses.length === 0) {
        return (
            <div>
                <p className="text-gray-600 text-sm mb-4 dark:text-white">Belum Ada Kursus</p>
                <button
                    onClick={() => navigate("/course")}
                    className="px-4 py-3 text-sm bg-purple-600 shadow-[5px_6px_0_#4c1d95] text-white rounded-full hover:bg-yellow-400 hover:text-gray-950 transition-all duration-300 font-semibold"
                >
                    Lihat Kursus Disini
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCourses.map((course) => (
                    <CardCourses
                        key={course.course.id}
                        slug={course.course.slug}
                        title={course.course.title}
                        category={course.course.sub_category.name}
                        photo={course.course.photo}
                        study_percentage={course.study_percentage}
                        rating={course.course.rating}
                        total_module={course.total_module}
                        total_user={course.total_user}
                        study_time={course.study_time}
                        user={course.course.user.name}
                        photo_user={`${import.meta.env.VITE_API_URL}/storage/${course.course.user.photo}`}
                    />
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} setPage={setCurrentPage} />
        </>
    );
};

export default CoursesSection;