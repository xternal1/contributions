import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { EventActivity } from "@features/user/models";
import CardEvent from "@components/public/auth/CardEvent/CardEvent";
import Pagination from "./Pagination";


const EventSection = ({
    event,
    currentPage,
    setCurrentPage,
}: {
    event: EventActivity[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
}) => {
    const navigate = useNavigate();
    const itemsPerPage = 3;

    const totalPages = Math.ceil(event.length / itemsPerPage);
    const paginatedEvents = useMemo(
        () => event.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [event, currentPage]
    );

    if (event.length === 0) {
        return (
            <div>
                <p className="text-gray-600 text-sm mb-4 dark:text-white">Belum Ada Event</p>
                <button
                    onClick={() => navigate("/event")}
                    className="px-4 py-3 text-sm bg-purple-600 shadow-[5px_6px_0_#4c1d95] text-white rounded-full hover:bg-yellow-400 hover:text-gray-950 transition-all duration-300 font-semibold"
                >
                    Lihat Event Disini
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedEvents.map((evt) => (
                    <CardEvent key={evt.event.id} event={evt} />
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} setPage={setCurrentPage} />
        </>
    );
};

export default EventSection;