import { useEffect } from "react";
import DashboardLayout from "@components/public/auth/DashboardLayout";
import { StatsSection, CoursesSection, EventSection, DashboardSkeleton } from "@components/dashboarduser/Index";
import { useDashboardStore } from "@lib/stores/user/profile/useDashboardStore";

const DashboardPage = () => {
    const {
        profile,
        event,
        courses,
        loading,
        coursePage,
        eventPage,
        setCoursePage,
        setEventPage,
        loadDashboardData
    } = useDashboardStore();

    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);

    if (loading) {
        return (
            <DashboardLayout slug="dashboard">
                <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
                    <DashboardSkeleton />
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