import MonthDropdown from "./MonthDropdown";
import YearDropdown from "./YearDropdown";

interface CalendarHeaderProps {
    isMonthOpen: boolean;
    isYearOpen: boolean;
    selectedMonth: string;
    selectedYear: string;
    months: string[];
    years: string[];
    onMonthToggle: () => void;
    onYearToggle: () => void;
    onSelectMonth: (month: string) => void;
    onSelectYear: (year: string) => void;
}

const CalendarHeader = ({
    isMonthOpen,
    isYearOpen,
    selectedMonth,
    selectedYear,
    months,
    years,
    onMonthToggle,
    onYearToggle,
    onSelectMonth,
    onSelectYear,
}: CalendarHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h3 className="font-semibold text-xl sm:text-2xl text-[#2E3160] dark:text-white text-center sm:text-left">
                Kalender
            </h3>

            {/* Dropdown Bulan & Tahun */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-3">
                <MonthDropdown
                    isMonthOpen={isMonthOpen}
                    selectedMonth={selectedMonth}
                    months={months}
                    onToggle={onMonthToggle}
                    onSelectMonth={onSelectMonth}
                />

                <YearDropdown
                    isYearOpen={isYearOpen}
                    selectedYear={selectedYear}
                    years={years}
                    onToggle={onYearToggle}
                    onSelectYear={onSelectYear}
                />
            </div>
        </div>
    );
};

export default CalendarHeader;