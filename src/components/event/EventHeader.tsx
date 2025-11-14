import { HiSearch } from "react-icons/hi";
import SortDropdownEvent from "../../components/public/SortDropdownEvent";
import type { EventFilter, EventTimeFilter, EventStatusFilter } from "../../lib/stores/user/profile/useEventStore";

interface EventHeaderProps {
    loading: boolean;
    filter: EventFilter;
    timeFilter: EventTimeFilter;
    statusFilter: EventStatusFilter;
    search: string;
    onFilterChange: (filter: EventFilter) => void;
    onTimeFilterChange: (filter: EventTimeFilter) => void;
    onStatusFilterChange: (filter: EventStatusFilter) => void;
    onSearchChange: (search: string) => void;
}

const EventHeader = ({
    loading,
    filter,
    timeFilter,
    statusFilter,
    search,
    onFilterChange,
    onTimeFilterChange,
    onStatusFilterChange,
    onSearchChange,
}: EventHeaderProps) => {
    if (loading) {
        return (
            <div className="animate-pulse space-y-6">
                {/* Title skeleton */}
                <div className="h-8 w-40 bg-gray-200 rounded-lg dark:bg-[#0D0D1A]"></div>

                {/* Tabs skeleton */}
                <div className="flex flex-wrap md:flex-nowrap gap-3 justify-center md:justify-start">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-10 w-40 bg-gray-200 rounded-full dark:bg-[#0D0D1A]"
                        ></div>
                    ))}
                </div>

                {/* Search + Dropdown skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                    <div className="h-8 w-40 bg-gray-200 rounded-lg dark:bg-[#0D0D1A]"></div>
                    <div className="h-8 w-40 bg-gray-200 rounded-lg dark:bg-[#0D0D1A]"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <h2 className="text-xl text-start font-bold mb-5">Events Saya</h2>

            {/* Tabs */}
            <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 mb-6 justify-center md:justify-start">
                <button
                    onClick={() => onFilterChange("pending")}
                    className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
hover:shadow-none active:translate-y-0.5 ${filter === "pending"
                            ? "bg-yellow-400 text-black dark:bg-purple-600 dark:text-white"
                            : "bg-purple-600 text-white hover:bg-yellow-400 hover:text-black dark:bg-[#141427] dark:border dark:border-purple-600 dark:hover:text-white"
                        }`}
                >
                    Menunggu Konfirmasi
                </button>

                <button
                    onClick={() => onFilterChange("joined")}
                    className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
hover:shadow-none active:translate-y-0.5 ${filter === "joined"
                            ? "bg-yellow-400 text-black dark:bg-purple-600 dark:text-white"
                            : "bg-purple-600 text-white hover:bg-yellow-400 hover:text-black dark:bg-[#141427] dark:border dark:border-purple-600 dark:hover:text-white"
                        }`}
                >
                    Event Diikuti
                </button>

                <button
                    onClick={() => onFilterChange("history")}
                    className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
hover:shadow-none active:translate-y-0.5 ${filter === "history"
                            ? "bg-yellow-400 text-black dark:bg-purple-600 dark:text-white"
                            : "bg-purple-600 text-white hover:bg-yellow-400 hover:text-black dark:bg-[#141427] dark:border dark:border-purple-600 dark:hover:text-white"
                        }`}
                >
                    Riwayat Pengajuan
                </button>
            </div>

            {/* Search + Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 text-sm text-start">
                <div className="flex items-center w-60 border-2 border-purple-500 rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
                    <HiSearch className="mx-2 text-gray-400 dark:text-white" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Cari event..."
                        className="flex-1 py-1 px-2 rounded-r-lg focus:outline-none dark:bg-[#141427] transition-colors duration-500"
                    />
                </div>

                {filter === "joined" && (
                    <SortDropdownEvent
                        selected={timeFilter}
                        onChange={(value) => onTimeFilterChange(value as EventTimeFilter)}
                        variant="time"
                    />
                )}

                {filter === "history" && (
                    <SortDropdownEvent
                        selected={statusFilter}
                        onChange={(value) => onStatusFilterChange(value as EventStatusFilter)}
                        variant="status"
                    />
                )}
            </div>
        </>
    );
};

export default EventHeader;