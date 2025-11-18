import CardEvent from "@components/public/auth/CardEvent/CardEvent";
import EventPagination from "./EventPagination";
import type { EventActivity } from "@features/user/models";

interface EventCardsProps {
    filter: "pending" | "joined" | "history";
    paginatedEvents: EventActivity[];
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    cancelEvent: (eventId: number) => Promise<void>;
}

const EventCards = ({
    filter,
    paginatedEvents,
    currentPage,
    totalPages,
    setCurrentPage,
    cancelEvent,
}: EventCardsProps) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedEvents.map((event) => (
                    <CardEvent
                        key={event.id}
                        event={event}
                        variant={
                            filter === "pending"
                                ? "history"
                                : filter === "joined"
                                    ? "user"
                                    : "history"
                        }
                        onCancel={cancelEvent}
                    />
                ))}
            </div>

            <EventPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};

export default EventCards;