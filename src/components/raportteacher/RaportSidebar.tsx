import React from "react";
import { Search, ChevronDown } from "lucide-react";
import type { ClassOption } from "@/data/raportData";

interface RaportSidebarProps {
    selectedYear: string;
    setSelectedYear: (year: string) => void;
    years: string[];
    classOptions: ClassOption[];
    selectedClasses: string[];
    onClassFilterChange: (classId: string) => void;
    classList: string[];
    activeClass: string;
    setActiveClass: (className: string) => void;
}

const RaportSidebar: React.FC<RaportSidebarProps> = ({
    selectedYear,
    setSelectedYear,
    years,
    classOptions,
    selectedClasses,
    onClassFilterChange,
    classList,
    activeClass,
    setActiveClass,
}) => {
    return (
        <div className="w-64 flex-shrink-0">
            <div className="bg-white dark:bg-[#141427] rounded-lg p-6 shadow-sm border border-transparent dark:border-white/10">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Daftar Kelas
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Daftar kelas industri pada sekolah
                </p>

                {/* Year Selector */}
                <div className="relative mb-4">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg border-0 appearance-none cursor-pointer focus:ring-2 focus:ring-purple-500 text-sm font-medium"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-600 dark:text-purple-400 pointer-events-none" />
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Nama Kelas"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1A1A2E] text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                </div>

                {/* Filter Kelas */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Filter Kelas
                    </h4>
                    <div className="space-y-2">
                        {classOptions.map(option => (
                            <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedClasses.includes(option.id)}
                                    onChange={() => onClassFilterChange(option.id)}
                                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {option.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Apply Filter Button */}
                <button className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors text-sm mb-4">
                    Terapkan
                </button>

                {/* Class List */}
                <div className="space-y-1">
                    {classList.map(className => (
                        <button
                            key={className}
                            onClick={() => setActiveClass(className)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${activeClass === className
                                    ? "bg-purple-600 text-white font-medium"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1A1A2E]"
                                }`}
                        >
                            {className}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RaportSidebar;