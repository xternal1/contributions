    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { ChevronsRight, ChevronsLeft } from "lucide-react";
    import DashboardLayout from "../../../components/public/auth/DashboardLayout";
    import { motion } from "framer-motion";

    import type { CourseActivity } from "../../../features/user/models";
    import { fetchUserCourses } from "../../../features/user/user_service";
    import CardCourses from "../../../components/public/auth/CardCourses/CardCourses";

    import empty from "../../../assets/img/no-data/empty.svg";


    const CoursePage = () => {
        const navigate = useNavigate();
        const [courses, setCourses] = useState<CourseActivity[]>([]);
        const [loading, setLoading] = useState(true);

        const [filter, setFilter] = useState<"progress" | "done">("progress");

        // pagination state
        const [currentPage, setCurrentPage] = useState(1);
        const pageSize = 3;

        useEffect(() => {
            const loadProfile = async () => {
                try {
                    const userCourses = await fetchUserCourses(1);
                    setCourses(userCourses);
                } catch (err) {
                    console.error("Gagal ambil profile:", err);
                } finally {
                    setLoading(false);
                }
            };
            loadProfile();
        }, []);

        const handleFilterChange = (newFilter: "progress" | "done") => {
            setLoading(true);
            setFilter(newFilter);

            setTimeout(() => {
                setLoading(false);
            }, 500);
        };


        const filteredCourses =
            filter === "progress"
                ? courses.filter((c) => c.study_percentage < 100)
                : courses.filter((c) => c.study_percentage === 100);

        // pagination
        const totalPages = Math.max(1, Math.ceil(filteredCourses.length / pageSize));
        const paginatedCourses: CourseActivity[] = filteredCourses.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
        );

        return (
            <DashboardLayout slug="course">
                <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
                    {/* Aktivitas Belajar */}
                    <section className="text-start">
                       {loading ? (
                        <div className="h-8 w-48 mb-4 rounded-lg bg-gray-200 dark:bg-[#0D0D1A] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gray-200 dark:bg-[#0D0D1A]" />
                        </div>
                    ) : (
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                            Aktivitas Belajar
                        </h2>
                    )}

                    {loading ? (
                        <div className="flex gap-3 mb-6">
                            {[...Array(2)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-10 w-40 rounded-full bg-gray-200 dark:bg-[#0D0D1A] relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gray-200 dark:bg-[#0D0D1A]" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex gap-3 mb-6">
                            <button
                                onClick={() => handleFilterChange("progress")}
                                className={`px-5 py-3 rounded-full font-bold transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                                    hover:shadow-none active:translate-y-0.5 ${filter === "progress"
                                        ? "bg-yellow-400 text-black text-sm dark:bg-purple-600 dark:text-white"
                                        : "bg-gray-200 text-sm text-gray-600 dark:border dark:border-purple-600 dark:text-white dark:bg-[#141427]"
                                    }`}
                            >
                                Dalam Pengerjaan
                            </button>
                            <button
                                onClick={() => handleFilterChange("done")}
                                className={`px-5 py-3 rounded-full font-bold transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                                    hover:shadow-none active:translate-y-0.5 ${filter === "done"
                                        ? "bg-purple-600 text-white text-sm dark:bg-purple-600 dark:text-white"
                                        : "bg-gray-200 text-sm text-gray-600 dark:border dark:border-purple-600 dark:text-white dark:bg-[#141427]"
                                    }`}
                            >
                                Selesai
                            </button>
                        </div>
                    )}

                        {loading ? (
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
                        ) : filteredCourses.length > 0 ? (
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

                                {/* Pagination */}
                                <div className="flex justify-center mt-10">
                                    <div className="flex items-center gap-3">
                                        <motion.button
                                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                            disabled={currentPage === 1}
                                            whileTap={{ scale: 0.9 }}
                                            className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === 1
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                                                : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
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
                                                        : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:border dark:border-purple-700 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
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
                                            className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === totalPages
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                                                : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
                                                }`}
                                        >
                                            <ChevronsRight />
                                        </motion.button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {filter === "progress" ? (
                                    <div className="flex flex-col items-center justify-center py-10">
                                        <img
                                            src={empty}
                                            alt="Belum ada kursus selesai"
                                            className="w-auto h-56 object-contain "
                                        />
                                        <p className="text-gray-600 text-lg font-bold mb-5 dark:text-white">
                                            Belum Ada Kursus Berjalan
                                        </p>
                                        <button
                                            onClick={() => navigate("/course")}
                                            className="px-4 py-3 text-sm bg-purple-600 shadow-[5px_6px_0_#4c1d95] 
                                                    text-white rounded-full hover:shadow hover:bg-yellow-400 hover:text-gray-950 
                                                    transition-all duration-300 font-semibold active:translate-y-0.5"
                                        >
                                            Lihat Kursus Disini
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10">
                                        <img
                                            src={empty}
                                            alt="Belum ada kursus selesai"
                                            className="w-auto h-56 object-contain "
                                        />
                                        <p className="text-gray-600 font-bold text-lg mb-5 dark:text-white">
                                            Kamu belum menyelesaikan kursus apapun.
                                        </p>

                                        <button
                                            onClick={() => navigate("/course")}
                                            className="px-4 py-3 text-sm bg-purple-600 shadow-[5px_6px_0_#4c1d95] 
                                                    text-white rounded-full hover:shadow hover:bg-yellow-400 hover:text-gray-950 
                                                    transition-all duration-300 font-semibold active:translate-y-0.5"
                                        >
                                            Lihat Kursus Disini
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                </main>
            </DashboardLayout>
        );
    };

    export default CoursePage;
