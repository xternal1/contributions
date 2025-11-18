import EventTabs from "./EventTabs";
import EventSearchBar from "./EventSearchBar";
import type { EventTimeFilter, EventStatusFilter } from "@lib/stores/user/profile/useEventStore";

interface EventHeaderProps {
    filter: "pending" | "joined" | "history";
    search: string;
    timeFilter: EventTimeFilter;
    statusFilter: EventStatusFilter
    setFilter: (filter: "pending" | "joined" | "history") => void;
    setSearch: (search: string) => void;
    setTimeFilter: (filter: any) => void;
    setStatusFilter: (filter: any) => void;
}

const EventHeader = ({
    filter,
    search,
    timeFilter,
    statusFilter,
    setFilter,
    setSearch,
    setTimeFilter,
    setStatusFilter,
}: EventHeaderProps) => {
    return (
        <>
            <h2 className="text-xl text-start font-bold mb-5">Events Saya</h2>

            <EventTabs filter={filter} setFilter={setFilter} />

            <EventSearchBar
                filter={filter}
                search={search}
                timeFilter={timeFilter}
                statusFilter={statusFilter}
                setSearch={setSearch}
                setTimeFilter={setTimeFilter}
                setStatusFilter={setStatusFilter}
            />
        </>
    );
};

export default EventHeader;