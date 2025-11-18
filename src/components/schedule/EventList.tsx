import EventCard from "./EventCard";
import EventPagination from "./EventPagination";

interface Event {
    title: string;
    desc?: string;
    link?: string;
    date?: string;
    time?: string;
    location?: string;
}

interface EventListProps {
    currentEvents: Event[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const EventList = ({ currentEvents, page, totalPages, onPageChange }: EventListProps) => {
    return (
        <div className="lg:pl-6 border-t lg:border-t-0 lg:border-l border-gray-300 dark:border-white text-left pt-4 lg:pt-0">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 text-center lg:text-left">
                Daftar Acara
            </h3>

            <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-4 text-center lg:text-left">
                Kamis, 10 Januari 2021
            </div>

            <div className="space-y-5">
                {currentEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>

            <EventPagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    );
};

export default EventList;