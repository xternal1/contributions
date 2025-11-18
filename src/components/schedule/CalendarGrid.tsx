interface CalendarGridProps {
    selectedDate: number | null;
    onSelectDate: (date: number) => void;
}

const CalendarGrid = ({ selectedDate, onSelectDate }: CalendarGridProps) => {
    return (
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
                            onClick={() => type === "current" && onSelectDate(day)}
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
    );
};

export default CalendarGrid;