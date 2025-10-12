import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import DashboardLayout from "../../../components/public/auth/DashboardLayout";

import type { DashboardDataCourse, CourseActivity, EventActivity } from "../../../features/user/models";
import { DataCourse, fetchUserCourses, fetchUserEvent } from "../../../features/user/user_service";
import CardCourses from "../../../components/public/auth/CardCourses/CardCourses";
import CardEvent from "../../../components/public/auth/CardEvent/CardEvent";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<DashboardDataCourse | null>(null);
    const [event, setEvent] = useState<EventActivity[]>([]);
    const [courses, setCourses] = useState<CourseActivity[]>([]);
    const [loading, setLoading] = useState(true);

    // pagination untuk courses
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const paginatedCourses = courses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // pagination untuk events
    const [currentPageEvent, setCurrentPageEvent] = useState(1);
    const itemsPerPageEvent = 3;
    const totalPagesEvent = Math.ceil(event.length / itemsPerPageEvent);
    const paginatedEvents = event.slice(
        (currentPageEvent - 1) * itemsPerPageEvent,
        currentPageEvent * itemsPerPageEvent
    );

    useEffect(() => {

        const loadProfile = async () => {
            try {
                const res = await DataCourse();
                setProfile(res);

                const userCourses = await fetchUserCourses(1);
                setCourses(userCourses);

                const userEvent = await fetchUserEvent(1);
                setEvent(userEvent);
            } catch (err) {
                console.error("Gagal ambil profile:", err);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    if (loading) {
        return (
            <DashboardLayout slug="dashboard">
                <main className="flex-1 p-7">
                    {/* Skeleton Statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-5 rounded-lg shadow-sm bg-white animate-pulse"
                            >
                                <div className="w-14 h-14 rounded-full bg-gray-200" />
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
                                    <div className="h-3 bg-gray-200 rounded w-24" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Skeleton Kursus */}
                    <h2 className="text-xl font-bold mb-2"></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-lg p-4 shadow-sm bg-white animate-pulse"
                            >
                                <div className="h-40 bg-gray-200 rounded mb-4" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                                <div className="h-3 bg-gray-200 rounded w-1/3" />
                            </div>
                        ))}
                    </div>

                    {/* Skeleton Event */}
                    <h2 className="text-xl font-bold mt-10 mb-2"></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-lg p-4 shadow-sm bg-white animate-pulse"
                            >
                                <div className="h-40 bg-gray-200 rounded mb-4" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                                <div className="h-3 bg-gray-200 rounded w-1/3" />
                            </div>
                        ))}
                    </div>
                </main>
            </DashboardLayout>
        );
    }


    return (
        <DashboardLayout slug="dashboard">
            {/* Konten */}
            <main className="flex-1 bg-white ml-8 p-7 rounded-xl shadow-xl border-3 border-purple-200 ">
                {/* Bagian Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 label">
                    {profile && (
                        <>
                            {[
                                { label: "KURSUS DIMILIKI", value: profile.courses_count },
                                { label: "KURSUS BELUM SELESAI", value: profile.incomplete_courses },
                                { label: "KURSUS SELESAI", value: profile.completed_courses },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-5 rounded-lg shadow-sm text-start 
                                    bg-white cursor-pointer transform transition duration-300 
                                    hover:scale-105 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl">
                                        <FaBookOpen />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold">{item.value}</p>
                                        <p className="text-gray-600 text-xs">{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Aktivitas Belajar */}
                <section className="mb-10 text-start">
                    <h2 className="text-xl font-bold mb-2">Aktivitas Belajar</h2>
                    {courses.length > 0 ? (
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
                                        photo_user={`https://api-getskill.mijurnal.com/storage/${course.course.user.photo}`}

                                    />
                                ))}
                            </div>
                            {/* Pagination Kursus */}
                            <div className="flex justify-center mt-10">
                                <div className="flex items-center gap-3">
                                    <motion.button
                                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                        disabled={currentPage === 1}
                                        whileTap={{ scale: 0.9 }}
                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${currentPage === 1
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                                            }`}
                                    >
                                        Prev
                                    </motion.button>

                                    {Array.from({ length: totalPages }).map((_, index) => {
                                        const page = index + 1;
                                        const isActive = page === currentPage;
                                        return (
                                            <motion.button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                whileTap={{ scale: 0.9 }}
                                                animate={{
                                                    scale: isActive ? 1.1 : 1,
                                                    boxShadow: isActive
                                                        ? "0px 4px 10px rgba(147, 51, 234, 0.4)"
                                                        : "none",
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-300 ${isActive
                                                        ? "bg-purple-600 text-white"
                                                        : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                                                    }`}
                                            >
                                                {page}
                                            </motion.button>
                                        );
                                    })}

                                    <motion.button
                                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        whileTap={{ scale: 0.9 }}
                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${currentPage === totalPages
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                                            }`}
                                    >
                                        Next
                                    </motion.button>
                                </div>
                            </div>
                        </>

                    ) : (
                        <>
                            <p className="text-gray-600 text-sm mb-4">Belum Ada Kursus</p>
                            <button
                                onClick={() => navigate("/course")}
                                className="px-4 py-3 text-sm bg-purple-600 shadow-[5px_6px_0_#4c1d95] 
                                         text-white rounded-full hover:shadow hover:bg-yellow-400 hover:text-gray-950 
                                            transition-all duration-300 font-semibold active:translate-y-0.5"
                            >
                                Lihat Kursus Disini
                            </button>
                        </>
                    )}
                </section>

                {/* Aktivitas Event */}
                <section className="mb-10 text-start">
                    <h2 className="text-xl font-bold mb-2">Aktivitas Event</h2>
                    {event.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedEvents.map((evt) => (
                                    <CardEvent
                                        key={evt.event.id}
                                        event={evt}
                                    />
                                ))}
                            </div>

                            {/* Pagination Event */}
                            <div className="flex justify-center mt-10">
                                <div className="flex items-center gap-3">
                                    <motion.button
                                        onClick={() => setCurrentPageEvent((p) => Math.max(p - 1, 1))}
                                        disabled={currentPageEvent === 1}
                                        whileTap={{ scale: 0.9 }}
                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${currentPageEvent === 1
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                                            }`}
                                    >
                                        Prev
                                    </motion.button>

                                    {Array.from({ length: totalPagesEvent }).map((_, index) => {
                                        const page = index + 1;
                                        const isActive = page === currentPageEvent;
                                        return (
                                            <motion.button
                                                key={page}
                                                onClick={() => setCurrentPageEvent(page)}
                                                whileTap={{ scale: 0.9 }}
                                                animate={{
                                                    scale: isActive ? 1.1 : 1,
                                                    boxShadow: isActive
                                                        ? "0px 4px 10px rgba(147, 51, 234, 0.4)"
                                                        : "none",
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-300 ${isActive
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                                                    }`}
                                            >
                                                {page}
                                            </motion.button>
                                        );
                                    })}

                                    <motion.button
                                        onClick={() => setCurrentPageEvent((p) => Math.min(p + 1, totalPagesEvent))}
                                        disabled={currentPageEvent === totalPagesEvent}
                                        whileTap={{ scale: 0.9 }}
                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${currentPageEvent === totalPagesEvent
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                                            }`}
                                    >
                                        Next
                                    </motion.button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="mb-4">
                            <p className="text-gray-600 text-sm mb-4">Belum Ada Event</p>
                            <button
                                onClick={() => navigate("/event")}
                                className="px-4 py-3 text-sm bg-purple-600 shadow-[5px_6px_0_#4c1d95] 
                   text-white rounded-full hover:shadow hover:bg-yellow-400 hover:text-gray-950 
                   transition-all duration-300  font-semibold active:translate-y-0.5">
                                Lihat Event Disini
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </DashboardLayout>
    )
};

export default DashboardPage