import { HiSearch } from "react-icons/hi";
import SortDropdownEvent from "@components/public/SortDropdownEvent";
import type { EventTimeFilter, EventStatusFilter } from "@lib/stores/user/profile/useEventStore";

interface EventSearchBarProps {
    filter: "pending" | "joined" | "history";
    search: string;
    timeFilter: EventTimeFilter;
    statusFilter: EventStatusFilter
    setSearch: (search: string) => void;
    setTimeFilter: (filter: any) => void;
    setStatusFilter: (filter: any) => void;
}

const EventSearchBar = ({
    filter,
    search,
    timeFilter,
    statusFilter,
    setSearch,
    setTimeFilter,
    setStatusFilter,
}: EventSearchBarProps) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 text-sm text-start">
            <div className="flex items-center w-60 border-2 border-purple-500 rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
                <HiSearch className="mx-2 text-gray-400 dark:text-white" size={18} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari event..."
                    className="flex-1 py-1 px-2 rounded-r-lg focus:outline-none dark:bg-[#141427] transition-colors duration-500"
                />
            </div>

            {filter === "joined" && (
                <SortDropdownEvent
                    selected={timeFilter}
                    onChange={(value) => setTimeFilter(value)}
                    variant="time"
                />
            )}

            {filter === "history" && (
                <SortDropdownEvent
                    selected={statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    variant="status"
                />
            )}
        </div>
    );
};

export default EventSearchBar;