import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@components/public/auth/DashboardLayout";
import type { CourseActivity } from "@features/user/models";
import { useCourseStore } from "@lib/stores/user/profile/useCourseStore";
import { CourseGrid, EmptyState, FilterTabs, LoadingSkeleton, PageHeader, PaginationControls } from "@/components/courseuser/Index";


const CoursePage = () => {
    const navigate = useNavigate();

    // ✅ Select state values individually for better performance
    const courses = useCourseStore((s) => s.courses);
    const loading = useCourseStore((s) => s.loading);
    const filter = useCourseStore((s) => s.filter);
    const currentPage = useCourseStore((s) => s.currentPage);
    const pageSize = useCourseStore((s) => s.pageSize);
    const loadCourses = useCourseStore((s) => s.loadCourses);
    const setFilter = useCourseStore((s) => s.setFilter);
    const setCurrentPage = useCourseStore((s) => s.setCurrentPage);

    useEffect(() => {
        loadCourses(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFilterChange = (newFilter: "progress" | "done") => {
        setFilter(newFilter);
    };

    const filteredCourses =
        filter === "progress"
            ? courses.filter((c) => c.study_percentage < 100)
            : courses.filter((c) => c.study_percentage === 100);

    // pagination (using store pageSize & currentPage)
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
                    <PageHeader loading={loading} />

                    <FilterTabs
                        currentFilter={filter}
                        onFilterChange={handleFilterChange}
                        loading={loading}
                    />

                    {loading ? (
                        <LoadingSkeleton count={6} />
                    ) : filteredCourses.length > 0 ? (
                        <>
                            <CourseGrid courses={paginatedCourses} />

                            {/* Pagination */}
                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    ) : (
                        <EmptyState
                            filter={filter}
                            onNavigate={() => navigate("/course")}
                        />
                    )}
                </section>
            </main>
        </DashboardLayout>
    );
};

export default CoursePage;