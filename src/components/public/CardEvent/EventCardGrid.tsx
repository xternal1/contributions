import { Card } from "flowbite-react";
import {
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Eventype } from "../../../features/event/_event";
import SortDropdown from "../SortDropdown";

type EventCardGridProps = {
  events: Eventype[];
  loading?: boolean;
  initialPage?: number;
};

const EventCardGrid: React.FC<EventCardGridProps> = ({
  events,
  loading = false,
  initialPage = 1,
}) => {
  const [sortOption, setSortOption] = useState<"terbaru" | "terlama" | "terpopuler">("terbaru");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const eventsPerPage = 9;

  // Sorting
  const sortedEvents = useMemo(() => {
    const result = [...events];
    result.sort((a, b) => {
      switch (sortOption) {
        case "terpopuler":
          return (b.capacity_left ?? 0) - (a.capacity_left ?? 0);
        case "terbaru":
          return new Date(b.start_date_raw).getTime() - new Date(a.start_date_raw).getTime();
        case "terlama":
          return new Date(a.start_date_raw).getTime() - new Date(b.start_date_raw).getTime();
      }
    });
    return result;
  }, [events, sortOption]);

  // Pagination
  const totalPages = Math.max(Math.ceil(sortedEvents.length / eventsPerPage), 1);
  const currentEvents = sortedEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const skeletonArray = Array.from({ length: eventsPerPage });

  return (
    <div className="w-full max-w-screen-xl mx-auto px-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {loading ? (
          <div className="w-full flex justify-between items-center animate-pulse">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm">
              Showing {sortedEvents.length} Total Results
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Sort By:</span>
              <SortDropdown
                selected={sortOption}
                onChange={(value) => {
                  setSortOption(value as typeof sortOption);
                  setCurrentPage(1);
                }}
                loading={loading}
              />
            </div>
          </>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start min-h-[40vh]">
        <AnimatePresence mode="wait">
          {loading
            ? skeletonArray.map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="relative flex flex-col justify-between rounded-2xl shadow-sm p-0 overflow-hidden animate-pulse"
              >
                <div className="h-40 w-full bg-gray-200 rounded-xl"></div>
                <div className="p-4">
                  <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
                </div>
                <div className="border-t border-gray-200 pt-3 px-4 pb-3">
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))
            : currentEvents.length > 0
              ? currentEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Link to={`/event/${event.slug}`}>
                    <Card className="h-full card-shine relative flex flex-col justify-between border rounded-2xl shadow-sm hover:shadow-[8px_8px_0_#D3DAD9] hover:scale-[1.02] transition-all duration-300 cursor-pointer p-0 overflow-visible z-10">
                      <div className="relative -mt-1 -mx-1">
                        <div className="shine__animate">
                          <img
                            src={event.image || "/src/assets/Default-Img.png"}
                            alt={event.title}
                            className="h-40 w-full object-cover rounded-xl"
                            onError={(e) => {
                              e.currentTarget.src = "/src/assets/Default-Img.png";
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-1 -left-1 bg-yellow-400 text-sm font-bold text-gray-900 px-5 py-2 rounded-full border shadow-[5px_5px_0_#4c1d95] z-10">
                          {event.start_date}
                        </div>
                      </div>

                      <div className="text-left flex-1 pt-3 px-2">
                        <h3 className="text-md font-semibold line-clamp-2 min-h-[50px]">
                          <a className="inline bg-[linear-gradient(black,black),linear-gradient(black,black)]
                          bg-[length:0%_2px,0_2px]
                          bg-[position:100%_100%,0_100%]
                          bg-no-repeat
                          transition-[background-size] duration-900
                          hover:bg-[length:0_2px,100%_2px]">
                            {event.title}
                          </a>
                        </h3>

                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-3">
                          {event.is_online ? (
                            <>
                              <HiOutlineGlobeAlt size={25} />
                              <span className="truncate hover:text-yellow-500">
                                {event.map_link || "Online Event"}
                              </span>
                            </>
                          ) : (
                            <>
                              <HiOutlineLocationMarker size={25} />
                              <span className="truncate hover:text-yellow-500">
                                {event.location}
                              </span>
                            </>
                          )}
                        </div>

                        <span
                          className={`mt-2 inline-block text-xs font-semibold px-2 py-0.5 rounded-md ${event.is_online
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                            }`}
                        >
                          {event.is_online ? "Online" : "Offline"}
                        </span>
                      </div>

                      <div className="border-t border-gray-200 pt-4 text-xs text-gray-500 pb-1">
                        <div className="flex justify-between items-center w-full overflow-hidden">
                          <span className="flex items-center gap-1">
                            <HiOutlineUsers size={18} />
                            <span className="truncate">Sisa Kuota: {event.capacity_left ?? 0}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <HiOutlineClock size={18} />
                            <span className="truncate">
                              {new Date(event.start_date) > new Date()
                                ? `${event.start_in}`
                                : new Date(event.end_date) > new Date()
                                  ? "Berlangsung"
                                  : "Selesai"}
                            </span>
                            {/* <span className="truncate">
                            {event.start_in}
                          </span> */}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))
              : (
                <div className="col-span-full text-center text-gray-500 py-20">
                  <p className="text-lg font-semibold">Event Tidak Ditemukan</p>
                  <p className="text-sm mt-2">Coba ubah filter atau pilih kategori lain.</p>
                </div>
              )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            whileTap={{ scale: 0.9 }}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-purple-100"
              }`}
          >
            Prev
          </motion.button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <motion.button
                key={page}
                onClick={() => setCurrentPage(page)}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive
                    ? "0px 4px 10px rgba(147, 51, 234, 0.4)"
                    : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-300 ${isActive
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                  }`}
              >
                {page}
              </motion.button>
            );
          })}

          <motion.button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            whileTap={{ scale: 0.9 }}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-purple-100"
              }`}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default EventCardGrid;
