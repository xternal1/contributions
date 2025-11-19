import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@components/public/auth/DashboardLayout";
import type { CourseActivity } from "@features/user/models";
import { useCourseStore } from "@lib/stores/user/profile/useCourseStore";
import { CourseGrid, EmptyState, FilterTabs, LoadingSkeleton, PageHeader, PaginationControls } from "@/components/courseuser/Index";


const CoursePage = () => {
    const navigate = useNavigate();

    // store selector (only state/actions we need)
    const {
        courses,
        loading,
        filter,
        currentPage,
        pageSize,
        loadCourses,
        setFilter,
        setCurrentPage,
    } = useCourseStore((s) => ({
        courses: s.courses,
        loading: s.loading,
        filter: s.filter,
        currentPage: s.currentPage,
        pageSize: s.pageSize,
        loadCourses: s.loadCourses,
        setFilter: s.setFilter,
        setCurrentPage: s.setCurrentPage,
    }));

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