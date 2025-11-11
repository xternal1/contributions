import { useState } from "react";
import DashboardLayout from "../../../../components/public/auth/DashboardLayout";
import calendarIcon from "../../../../assets/img/icons/calendar.png";
import clockIcon from "../../../../assets/img/icons/32.png";
import mapPinIcon from "../../../../assets/img/icons/library.svg";

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

    return (
        <DashboardLayout slug="schedule">
            <main className="flex-1 ml-0 xl:ml-8 pb-10">
                <section
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800
        max-w-6xl mx-auto rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 transition-all duration-300"
                >
                    {/* ======================= KALENDER ======================= */}
                    <div className="lg:col-span-2">
                        {/* Header Kalender */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                            <h3 className="font-semibold text-xl sm:text-2xl text-[#2E3160] dark:text-white text-center sm:text-left">
                                Kalender
                            </h3>

                            {/* Dropdown Bulan & Tahun */}
                            <div className="flex flex-wrap justify-center sm:justify-end gap-3">
                                {/* Dropdown Bulan */}
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setIsMonthOpen(!isMonthOpen);
                                            setIsYearOpen(false);
                                        }}
                                        className="flex justify-between items-center w-32 sm:w-36 px-4 py-2 border border-[#2E3160] dark:border-[#9425FE]
                                        rounded-full text-sm font-medium text-[#2E3160] dark:text-white bg-white/70 dark:bg-[#0F0F1A]
                                        focus:outline-none cursor-pointer hover:border-[#9425FE] hover:shadow-[0_0_8px_#C084FC]
                                        transition-all duration-300 backdrop-blur-sm"
                                        >
                                        {selectedMonth}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${isMonthOpen ? "rotate-180" : "rotate-0"
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isMonthOpen && (
                                        <div className="absolute top-11 left-0 w-32 sm:w-36 bg-white dark:bg-[#0F0F1A] border border-[#DADAF7] dark:border-[#9425FE]
                                            rounded-xl shadow-lg shadow-[#C084FC]/20 overflow-hidden animate-fadeIn z-50">
                                            {months.map((month) => (
                                                <div
                                                    key={month}
                                                    onClick={() => {
                                                        setSelectedMonth(month);
                                                        setIsMonthOpen(false);
                                                    }}
                                                    className={`px-4 py-2 text-sm text-center cursor-pointer font-medium transition-all duration-200
                                                            ${selectedMonth === month
                                                            ? "bg-[#9425FE] text-white"
                                                            : "text-[#2E3160] dark:text-gray-300 hover:bg-[#F3E8FF] dark:hover:bg-[#1E1E2A] hover:text-[#9425FE]"
                                                        }`}
                                                >
                                                    {month}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Dropdown Tahun */}
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setIsYearOpen(!isYearOpen);
                                            setIsMonthOpen(false);
                                        }}
                                        className="flex justify-between items-center w-28 sm:w-36 px-4 py-2 border border-[#2E3160] dark:border-[#9425FE]
                                        rounded-full text-sm font-medium text-[#2E3160] dark:text-white bg-white/70 dark:bg-[#0F0F1A]
                                        focus:outline-none cursor-pointer hover:border-[#9425FE] hover:shadow-[0_0_8px_#C084FC]
                                        transition-all duration-300 backdrop-blur-sm"
                                        >
                                        {selectedYear}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${isYearOpen ? "rotate-180" : "rotate-0"
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isYearOpen && (
                                        <div className="absolute top-11 left-0 w-28 sm:w-36 bg-white dark:bg-[#0F0F1A] border border-[#DADAF7] dark:border-[#9425FE]
                                            rounded-xl shadow-lg shadow-[#C084FC]/20 overflow-hidden animate-fadeIn z-50">
                                            {years.map((year) => (
                                                <div
                                                    key={year}
                                                    onClick={() => {
                                                        setSelectedYear(year);
                                                        setIsYearOpen(false);
                                                    }}
                                                    className={`px-4 py-2 text-sm text-center cursor-pointer font-medium transition-all duration-200
                                                            ${selectedYear === year
                                                            ? "bg-[#9425FE] text-white"
                                                            : "text-[#2E3160] dark:text-gray-300 hover:bg-[#F3E8FF] dark:hover:bg-[#1E1E2A] hover:text-[#9425FE]"
                                                        }`}
                                                >
                                                    {year}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Grid Kalender */}
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-2 text-center text-gray-700 dark:text-gray-300">
                            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => (
                                <div
                                    key={day}
                                    className="text-[8px] sm:text-[10px] md:text-[12px] font-semibold uppercase tracking-wide text-gray-500 dark:text-white"
                                >
                                    {day}
                                </div>
                            ))}

                            {(() => {
                                const days: { day: number; type: "prev" | "current" | "next" }[] = [];
                                days.push({ day: 31, type: "prev" });
                                for (let i = 1; i <= 30; i++) days.push({ day: i, type: "current" });
                                let nextDay = 1;
                                while (days.length < 35) days.push({ day: nextDay++, type: "next" });

                                return days.map(({ day, type }, index) => {
                                    const hasEvent = [3, 10, 17, 30].includes(day);
                                    const isSelected = selectedDate === day && type === "current";

                                    return (
                                        <div
                                            key={`${type}-${day}-${index}`}
                                            onClick={() => type === "current" && setSelectedDate(day)}
                                            className={`relative flex flex-col items-start justify-center h-12 sm:h-14 md:h-20 rounded-xl border-[2px] text-xs sm:text-sm transition-all duration-300
                                                    ${type === "prev" || type === "next"
                                                    ? "text-gray-400 border-gray-200 dark:text-gray-600 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 cursor-default"
                                                    : isSelected
                                                        ? "bg-[#9425FE] text-white border-[3px] border-white dark:border-black outline outline-[2px] outline-[#9425FE] shadow-md scale-[1.02]"
                                                        : "border-[#9425FE] hover:border-[#9425FE] hover:shadow-[0_0_0_2px_#a855f7] dark:border-violet-700 dark:hover:border-violet-500 cursor-pointer"
                                                }`}
                                                >
                                            <span
                                                className={`absolute top-1 left-[4px] sm:left-2 text-[10px] sm:text-sm font-semibold
                                                        ${type === "prev" || type === "next"
                                                        ? "text-gray-400 dark:text-gray-400"
                                                        : isSelected
                                                            ? "text-white"
                                                            : "text-[#9425FE] dark:text-purple-400"
                                                    }`}
                                            >
                                                {day}
                                            </span>

                                            {hasEvent && (
                                                <span
                                                    className={`absolute bottom-2 left-[4px] sm:left-2 mt-1 text-[7px] sm:text-[9px] font-medium
                                                            ${type === "prev" || type === "next"
                                                            ? "text-gray-400 dark:text-gray-400"
                                                            : isSelected
                                                                ? "text-white"
                                                                : "text-[#9425FE] dark:text-violet-400"
                                                        }`}
                                                >
                                                    | 3 Acara
                                                </span>

                                            )}
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>

                    {/* ======================= DAFTAR ACARA ======================= */}
                    <div className="lg:pl-6 border-t lg:border-t-0 lg:border-l border-gray-300 dark:border-white text-left pt-4 lg:pt-0">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 text-center lg:text-left">
                            Daftar Acara
                        </h3>

                        <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-4 text-center lg:text-left">
                            Kamis, 10 Januari 2021
                        </div>

                        <div className="space-y-5">
                            {currentEvents.map((event, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-300 dark:border-white pb-4 last:border-none"
                                >
                                    <h4 className="text-[15px] font-semibold text-gray-800 dark:text-white mb-1">
                                        {event.title}
                                    </h4>

                                    {event.desc && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
                                            {event.desc}
                                        </p>
                                    )}

                                    {event.link && (
                                        <a
                                            href={event.link}
                                            className="text-xs text-blue-500 underline break-all"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {event.link}
                                        </a>
                                    )}

                                    {event.date && (
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            <img src={calendarIcon} alt="calendar" className="w-3.5 h-3.5" />
                                            {event.date}
                                        </div>
                                    )}

                                    {event.time && (
                                        <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {event.time.split("\n").map((time, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <img src={clockIcon} alt="clock" className="w-3.5 h-3.5" />
                                                    <span>{time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {event.location && (
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            <img src={mapPinIcon} alt="map" className="w-3.5 h-3.5" />
                                            {event.location}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-6 gap-2 flex-wrap">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`w-8 h-8 sm:w-7 sm:h-7 rounded-full text-sm font-medium transition-all duration-200 border
                                            ${num === page
                                            ? "bg-[#9425FE] text-white border-[#9425FE] shadow-md"
                                            : "bg-gray-200 text-[#9425FE] border-gray-300 hover:bg-[#EDE9FE] dark:bg-black dark:text-[#9425FE] dark:border-[#9425FE] dark:hover:bg-[#1E1E2A]"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </DashboardLayout>
    );
};

export default SchedulePage;
