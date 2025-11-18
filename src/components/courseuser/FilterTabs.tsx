import React from "react";

interface FilterTabsProps {
    currentFilter: "progress" | "done";
    onFilterChange: (filter: "progress" | "done") => void;
    loading: boolean;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ currentFilter, onFilterChange, loading }) => {
    return (
        <>
            {loading ? (
                <div className="flex gap-3 mb-6">
                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="h-10 w-40 rounded-full bg-gray-200 dark:bg-[#0D0D1A] relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gray-200 dark:bg-[#0D0D1A]" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => onFilterChange("progress")}
                        className={`px-5 py-3 rounded-full font-bold transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                            hover:shadow-none active:translate-y-0.5 ${currentFilter === "progress"
                                ? "bg-yellow-400 text-black text-sm dark:bg-purple-600 dark:text-white"
                                : "bg-gray-200 text-sm text-gray-600 dark:border dark:border-purple-600 dark:text-white dark:bg-[#141427]"
                            }`}
                    >
                        Dalam Pengerjaan
                    </button>
                    <button
                        onClick={() => onFilterChange("done")}
                        className={`px-5 py-3 rounded-full font-bold transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                            hover:shadow-none active:translate-y-0.5 ${currentFilter === "done"
                                ? "bg-purple-600 text-white text-sm dark:bg-purple-600 dark:text-white"
                                : "bg-gray-200 text-sm text-gray-600 dark:border dark:border-purple-600 dark:text-white dark:bg-[#141427]"
                            }`}
                    >
                        Selesai
                    </button>
                </div>
            )}
        </>
    );
};

export default FilterTabs;