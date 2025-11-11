import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import { motion } from "framer-motion";

import DashboardLayout from "../../../components/public/auth/DashboardLayout";
import CardEvent from "../../../components/public/auth/CardEvent/CardEvent";
import SortDropdownEvent from "../../../components/public/SortDropdownEvent";

import type { EventActivity, EventPaginateResponse } from "../../../features/user/models";
import {
  fetchEventPending,
  fetchEventFollowed,
  fetchEventHistory,
  cancelUserEvent,
} from "../../../features/user/user_service";

import empty from "../../../assets/img/no-data/empty.svg";

const EventPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "joined" | "history">("pending");
  const [timeFilter, setTimeFilter] = useState<
    "all" | "Sedang Berlangsung" | "Akan Datang" | "Sudah Berlalu"
  >("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "accepted" | "rejected" | "canceled">("all");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        let response: EventPaginateResponse;
        if (filter === "pending") {
          response = await fetchEventPending();
        } else if (filter === "joined") {
          response = await fetchEventFollowed();
        } else {
          response = await fetchEventHistory();
        }
        setEvents(response.data);
        setCurrentPage(1);
      } catch (err) {
        console.error("Gagal ambil user events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [filter]);

  /** Handler Batal Ikuti */
  const handleCancel = async (id: number, reason?: string) => {
    const eventToCancel = events.find((e) => e.id === id);
    if (!eventToCancel) return;

    const prevEvents = [...events];

    // langsung ubah ke canceled (optimistic)
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: "canceled", reason: reason ?? "" } : e
      )
    );
    try {
      if (!eventToCancel?.id) {
        console.error("Event tidak valid");
        return;
      }
      const canceledEvent = await cancelUserEvent(eventToCancel.id, reason ?? "");
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? canceledEvent : e))
      );


      // Optional: kalau mau langsung refresh list sesuai tab
      let res: EventPaginateResponse;
      if (filter === "joined") {
        res = await fetchEventFollowed();
      } else if (filter === "pending") {
        res = await fetchEventPending();
      } else {
        res = await fetchEventHistory();
      }
      setEvents(res.data);
    } catch (err) {
      console.error("Gagal batal ikut:", err);
      setEvents(prevEvents);
    }
  };


  /** Filtering berdasarkan search, status, dll */
  let filteredEvents = events;

  if (search.trim() !== "") {
    const lowerSearch = search.toLowerCase();
    filteredEvents = filteredEvents.filter(
      (e) =>
        e.event.title.toLowerCase().includes(lowerSearch) ||
        e.event.description?.toLowerCase().includes(lowerSearch)
    );
  }

  if (filter === "joined" && timeFilter !== "all") {
    filteredEvents = events.filter((e) => e.event_time_status === timeFilter);
  }

  if (filter === "history" && statusFilter !== "all") {
    filteredEvents = filteredEvents.filter((e) => {
      if (statusFilter === "accepted") return e.status === "accepted";
      if (statusFilter === "rejected") return e.status === "declined";
      if (statusFilter === "canceled") return e.status === "canceled";
      return true;
    });
  }

  /** Pagination */
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / pageSize));
  const paginatedEvents: EventActivity[] = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <DashboardLayout slug="event">
      <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
        {/* Header */}
        {loading ? (
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
        ) : (
          <>
            <h2 className="text-xl text-start font-bold mb-5">Events Saya</h2>

            {/* Tabs */}
            <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 mb-6 justify-center md:justify-start">
              <button
                onClick={() => setFilter("pending")}
                className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
        hover:shadow-none active:translate-y-0.5 ${filter === "pending"
                    ? "bg-yellow-400 text-black dark:bg-purple-600 dark:text-white"
                    : "bg-purple-600 text-white hover:bg-yellow-400 hover:text-black dark:bg-[#141427] dark:border dark:border-purple-600 dark:hover:text-white"
                  }`}
              >
                Menunggu Konfirmasi
              </button>

              <button
                onClick={() => setFilter("joined")}
                className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
        hover:shadow-none active:translate-y-0.5 ${filter === "joined"
                    ? "bg-yellow-400 text-black dark:bg-purple-600 dark:text-white"
                    : "bg-purple-600 text-white hover:bg-yellow-400 hover:text-black dark:bg-[#141427] dark:border dark:border-purple-600 dark:hover:text-white"
                  }`}
              >
                Event Diikuti
              </button>

              <button
                onClick={() => setFilter("history")}
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
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari event..."
                  className="flex-1 py-1 px-2 rounded-r-lg focus:outline-none dark:bg-[#141427] transition-colors duration-500"
                />
              </div>

              {filter === "joined" && (
                <SortDropdownEvent
                  selected={timeFilter}
                  onChange={(value) =>
                    setTimeFilter(
                      value as "all" | "Sedang Berlangsung" | "Akan Datang" | "Sudah Berlalu"
                    )
                  }
                  variant="time"
                />
              )}

              {filter === "history" && (
                <SortDropdownEvent
                  selected={statusFilter}
                  onChange={(value) =>
                    setStatusFilter(value as "all" | "accepted" | "rejected" | "canceled")
                  }
                  variant="status"
                />
              )}
            </div>
          </>
        )}


        {/* Event Cards */}
        {loading ? (
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
        ) : filteredEvents.length > 0 ? (
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
                  onCancel={handleCancel}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  whileTap={{ scale: 0.9 }}
                  className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                    : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
                    }`}
                >
                  <ChevronsLeft />
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
                        : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:border dark:border-purple-700 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
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
                  className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                    : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
                    }`}
                >
                  <ChevronsRight />
                </motion.button>
              </div>
            </div>
          </>

        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <img
              src={empty}
              alt="Belum ada event"
              className="w-auto h-56 object-contain"
            />
            <p className="text-gray-600 text-lg font-bold mb-5 dark:text-white">Belum Ada Event</p>
            <button
              onClick={() => navigate("/event")}
              className="px-4 py-3 text-sm bg-purple-600 shadow-[5px_6px_0_#4c1d95] 
              text-white rounded-full hover:shadow hover:bg-yellow-400 hover:text-gray-950 
              transition-all duration-300 font-semibold active:translate-y-0.5"
            >
              Lihat Event Disini
            </button>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
};

export default EventPage;
