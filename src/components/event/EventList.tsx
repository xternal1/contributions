import { useNavigate } from "react-router-dom";
import CardEvent from "../../components/public/auth/CardEvent/CardEvent";
import empty from "../../assets/img/no-data/empty.svg";
import type { EventActivity } from "../../features/user/models";
import type { EventFilter } from "../../lib/stores/user/profile/useEventStore";

interface EventListProps {
    loading: boolean;
    events: EventActivity[];
    filter: EventFilter;
    onCancel: (id: number, reason?: string) => Promise<void>;
}

const EventList = ({ loading, events, filter, onCancel }: EventListProps) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse rounded-xl border border-gray-200 shadow-md p-4 dark:border-[#141427] dark:bg-[#0D0D1A]"
                    >
                        <div className="h-40 bg-gray-200 rounded-lg mb-4 dark:bg-[#141427]"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 dark:bg-[#141427]"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 dark:bg-[#141427]"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 dark:bg-[#141427]"></div>
                    </div>
                ))}
            </div>
        );
    }

    return events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
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
                    onCancel={onCancel}
                />
            ))}
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center py-10">
            <img
                src={empty}
                alt="Belum ada event"
                className="w-auto h-56 object-contain"
            />
            <p className="text-gray-600 text-lg font-bold mb-5 dark:text-white">
                Belum Ada Event
            </p>
            <button
                onClick={() => navigate("/event")}
                className="px-4 py-3 text-sm bg-purple-600 shadow-[5px_6px_0_#4c1d95] 
        text-white rounded-full hover:shadow hover:bg-yellow-400 hover:text-gray-950 
        transition-all duration-300 font-semibold active:translate-y-0.5"
            >
                Lihat Event Disini
            </button>
        </div>
    );
};

export default EventList;