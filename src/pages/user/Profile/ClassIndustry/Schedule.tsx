import DashboardLayout from "@components/public/auth/DashboardLayout";
import { CalendarGrid, CalendarHeader, EventList } from "@components/schedule/Index";
import { useScheduleStore } from "@lib/stores/user/profile/classindustry/useScheduleStore";

const SchedulePage = () => {
    // Get state from Zustand store
    const {
        selectedDate,
        selectedMonth,
        selectedYear,
        isMonthOpen,
        isYearOpen,
        page,
        months,
        years,
        setSelectedDate,
        handleMonthToggle,
        handleYearToggle,
        handleSelectMonth,
        handleSelectYear,
        setPage,
        getCurrentEvents,
        getTotalPages,
    } = useScheduleStore();

    // Get computed values
    const currentEvents = getCurrentEvents();
    const totalPages = getTotalPages();

    return (
        <DashboardLayout slug="schedule">
            <main className="flex-1 ml-0 xl:ml-8 pb-10">
                <section
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800
        max-w-6xl mx-auto rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 transition-all duration-300"
                >
                    {/* ======================= KALENDER ======================= */}
                    <div className="lg:col-span-2">
                        <CalendarHeader
                            isMonthOpen={isMonthOpen}
                            isYearOpen={isYearOpen}
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            months={months}
                            years={years}
                            onMonthToggle={handleMonthToggle}
                            onYearToggle={handleYearToggle}
                            onSelectMonth={handleSelectMonth}
                            onSelectYear={handleSelectYear}
                        />

                        <CalendarGrid selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                    </div>

                    {/* ======================= DAFTAR ACARA ======================= */}
                    <EventList
                        currentEvents={currentEvents}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </section>
            </main>
        </DashboardLayout>
    );
};

export default SchedulePage;