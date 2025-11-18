import { useState } from "react";
import DashboardLayout from "@components/public/auth/DashboardLayout";
import { CalendarGrid, CalendarHeader, EventList } from "@components/schedule/Index";

const SchedulePage = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(10);
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("January");
    const [selectedYear, setSelectedYear] = useState("2021");
    const [page, setPage] = useState(1);

    const months = ["January", "February", "March"];
    const years = ["2021", "2022", "2023"];

    const events = [
        {
            title: "The Accessible Target Sizes Cheatsheet",
            desc: "Acara ini sepenuhnya GRATIS dan akan diselenggarakan hari Jumat, 6 September.",
            date: "March 20, 2021",
            time: "09:00 - 10:00 AM",
        },
        {
            title: "Zoom Designer",
            link: "https://meet.zoom.com/xyz",
            date: "23 March 2024",
            time: "09:00 – 10:00 WIB\n10:30 – 11:30 WIB",
            location: "SMK NEGERI 1 KEPANJEN",
        },
        {
            title: "Workshop UI/UX Mastery",
            desc: "Pelatihan desain interaktif untuk meningkatkan pengalaman pengguna.",
            date: "April 3, 2024",
            time: "08:30 - 11:00 AM",
            location: "Online via Google Meet",
        },
        {
            title: "Frontend Dev Conference",
            desc: "Konferensi developer front-end membahas teknologi React, Vue, dan Tailwind CSS.",
            date: "April 10, 2024",
            time: "09:00 - 17:00 WIB",
            location: "Jakarta Convention Center",
        },
        {
            title: "Creative Coding Challenge",
            desc: "Kompetisi bagi pelajar untuk membuat aplikasi inovatif berbasis web.",
            date: "April 15, 2024",
            time: "09:00 - 12:00 WIB",
            location: "SMK Negeri 1 Kepanjen",
        },
        {
            title: "Tech Talk: AI for Everyone",
            desc: "Sesi santai membahas penerapan AI dalam kehidupan sehari-hari.",
            date: "April 20, 2024",
            time: "13:00 - 15:00 WIB",
            location: "Zoom Meeting",
        },
    ];

    // Pagination
    const itemsPerPage = 3;
    const totalPages = Math.ceil(events.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

    const handleMonthToggle = () => {
        setIsMonthOpen(!isMonthOpen);
        setIsYearOpen(false);
    };

    const handleYearToggle = () => {
        setIsYearOpen(!isYearOpen);
        setIsMonthOpen(false);
    };

    const handleSelectMonth = (month: string) => {
        setSelectedMonth(month);
        setIsMonthOpen(false);
    };

    const handleSelectYear = (year: string) => {
        setSelectedYear(year);
        setIsYearOpen(false);
    };

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