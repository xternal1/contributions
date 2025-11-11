import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import DashboardLayout from "../../../components/public/auth/DashboardLayout";

import type { DashboardDataCourse, CourseActivity, EventActivity } from "../../../features/user/models";
import { DataCourse, fetchUserCourses, fetchUserEvent } from "../../../features/user/user_service";
import CardCourses from "../../../components/public/auth/CardCourses/CardCourses";
import CardEvent from "../../../components/public/auth/CardEvent/CardEvent";

// ===============================
// Reusable Pagination Component
// ===============================
const Pagination = ({ totalPages, currentPage, setPage }: {
    totalPages: number;
    currentPage: number;
    setPage: (page: number) => void;
}) => (
    <div className="flex justify-center mt-10">
        <div className="flex items-center gap-3">
            <motion.button
                onClick={() => setPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                whileTap={{ scale: 0.9 }}
                className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:bg-[#0D0D1A]"
                        : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:bg-[#0D0D1A] dark:border dark:border-white"
                    }`}
            >
                <ChevronsLeft />
            </motion.button>

            {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                return (
                    <motion.button
                        key={page}
                        onClick={() => setPage(page)}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                            scale: isActive ? 1.1 : 1,
                            boxShadow: isActive ? "0px 4px 10px rgba(147, 51, 234, 0.4)" : "none",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className={`w-8 h-8 rounded-full text-sm font-medium ${isActive
                                ? "bg-purple-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:border dark:border-purple-700 dark:bg-[#0D0D1A]"
                            }`}
                    >
                        {page}
                    </motion.button>
                );
            })}

            <motion.button
                onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                whileTap={{ scale: 0.9 }}
                className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:bg-[#0D0D1A]"
                        : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:bg-[#0D0D1A] dark:border dark:border-white"
                    }`}
            >
                <ChevronsRight />
            </motion.button>
        </div>
    </div>
);

// ===============================
// Stats Section
// ===============================
const StatsSection = ({ profile }: { profile: DashboardDataCourse }) => {
    const stats = [
        { label: "KURSUS DIMILIKI", value: profile.courses_count },
        { label: "KURSUS BELUM SELESAI", value: profile.incomplete_courses },
        { label: "KURSUS SELESAI", value: profile.completed_courses },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 label">
            {stats.map((item, i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 p-5 border rounded-lg shadow-md text-start 
                    bg-white cursor-pointer transform transition duration-300 dark:bg-[#2C004F]
                    hover:scale-105 hover:-translate-y-1 hover:shadow-md"
                >
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl">
                        <FaBookOpen />
                    </div>
                    <div>
                        <p className="text-xl font-bold">{item.value}</p>
                        <p className="text-gray-600 text-xs dark:text-white">{item.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ===============================
// Courses Section
// ===============================
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

// ===============================
// Events Section
// ===============================
const EventSection = ({
    event,
    currentPage,
    setCurrentPage,
}: {
    event: EventActivity[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
}) => {
    const navigate = useNavigate();
    const itemsPerPage = 3;

    const totalPages = Math.ceil(event.length / itemsPerPage);
    const paginatedEvents = useMemo(
        () => event.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [event, currentPage]
    );

    if (event.length === 0) {
        return (
            <div>
                <p className="text-gray-600 text-sm mb-4 dark:text-white">Belum Ada Event</p>
                <button
                    onClick={() => navigate("/event")}
                    className="px-4 py-3 text-sm bg-purple-600 shadow-[5px_6px_0_#4c1d95] text-white rounded-full hover:bg-yellow-400 hover:text-gray-950 transition-all duration-300 font-semibold"
                >
                    Lihat Event Disini
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedEvents.map((evt) => (
                    <CardEvent key={evt.event.id} event={evt} />
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} setPage={setCurrentPage} />
        </>
    );
};

// ===============================
// Main Dashboard Page
// ===============================
const DashboardPage = () => {
    const [profile, setProfile] = useState<DashboardDataCourse | null>(null);
    const [event, setEvent] = useState<EventActivity[]>([]);
    const [courses, setCourses] = useState<CourseActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [coursePage, setCoursePage] = useState(1);
    const [eventPage, setEventPage] = useState(1);

    const loadDashboardData = useCallback(async () => {
        try {
            const [profileData, courseData, eventData] = await Promise.all([
                DataCourse(),
                fetchUserCourses(1),
                fetchUserEvent(1),
            ]);
            setProfile(profileData);
            setCourses(courseData);
            setEvent(eventData);
        } catch (err) {
            console.error("Gagal memuat dashboard:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);

    if (loading) {
        return (
            <DashboardLayout slug="dashboard">
                <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
                    {/* Skeleton Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-5 rounded-lg shadow-sm bg-gray-100 dark:bg-[#0D0D1A] animate-pulse"
                            >
                                <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-[#141427]"></div>
                                <div className="flex-1">
                                    <div className="h-5 bg-gray-300 dark:bg-[#141427] rounded w-16 mb-2"></div>
                                    <div className="h-3 bg-gray-300 dark:bg-[#141427] rounded w-24"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Skeleton Courses */}
                    <section className="mb-10">
                        <div className="h-6 bg-gray-300 dark:bg-[#141427] rounded w-48 mb-5 animate-pulse"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="animate-pulse rounded-xl border border-gray-200 shadow-md p-4 dark:border-[#0D0D1A] dark:bg-[#0D0D1A]"
                                    >
                                        <div className="h-40 bg-gray-200 rounded-lg mb-4 dark:bg-[#141427]"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 dark:bg-[#141427]"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 dark:bg-[#141427]"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/3 dark:bg-[#141427]"></div>
                                    </div>
                                ))}
                        </div>
                    </section>

                    {/* Skeleton Event */}
                    <section>
                        <div className="h-6 bg-gray-300 dark:bg-[#141427] rounded w-48 mb-5 animate-pulse"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="h-64 bg-gray-200 dark:bg-[#0D0D1A] rounded-lg animate-pulse"
                                ></div>
                            ))}
                        </div>
                    </section>
                </main>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout slug="dashboard">
            <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
                {profile && <StatsSection profile={profile} />}

                <section className="mb-10 text-start">
                    <h2 className="text-xl font-bold mb-2">Aktivitas Belajar</h2>
                    <CoursesSection
                        courses={courses}
                        currentPage={coursePage}
                        setCurrentPage={setCoursePage}
                    />
                </section>

                <section className="mb-10 text-start">
                    <h2 className="text-xl font-bold mb-2">Aktivitas Event</h2>
                    <EventSection event={event} currentPage={eventPage} setCurrentPage={setEventPage} />
                </section>
            </main>
        </DashboardLayout>
    );
};

export default DashboardPage;
