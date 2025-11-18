interface YearDropdownProps {
    isYearOpen: boolean;
    selectedYear: string;
    years: string[];
    onToggle: () => void;
    onSelectYear: (year: string) => void;
}

const YearDropdown = ({
    isYearOpen,
    selectedYear,
    years,
    onToggle,
    onSelectYear,
}: YearDropdownProps) => {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
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
                            onClick={() => onSelectYear(year)}
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
    );
};

export default YearDropdown;