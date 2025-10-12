import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { motion } from "framer-motion";

import DashboardLayout from "../../../components/public/auth/DashboardLayout";
import CardEvent from "../../../components/public/auth/CardEvent/CardEvent";

import type { EventActivity, EventPaginateResponse } from "../../../features/user/models";
import {
  fetchEventPending,
  fetchEventFollowed,
  fetchEventHistory,
  cancelUserEvent,
} from "../../../features/user/user_service";

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


  /** 🔹 Filtering berdasarkan search, status, dll */
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
      <main className="flex-1 bg-white ml-8 p-7 rounded-xl shadow-xl border-3 border-purple-200">
        {/* Header */}
        <h2 className="text-xl text-start font-bold mb-5">Events Saya</h2>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("pending")}
            className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
            hover:shadow-none active:translate-y-0.5 ${filter === "pending" ? "bg-yellow-400 text-black" : "bg-purple-600 text-white"
              }`}
          >
            Menunggu Konfirmasi
          </button>
          <button
            onClick={() => setFilter("joined")}
            className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
            hover:shadow-none active:translate-y-0.5 ${filter === "joined" ? "bg-yellow-400 text-black" : "bg-purple-600 text-white"
              }`}
          >
            Event Diikuti
          </button>
          <button
            onClick={() => setFilter("history")}
            className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
            hover:shadow-none active:translate-y-0.5 ${filter === "history" ? "bg-yellow-400 text-black" : "bg-purple-600 text-white"
              }`}
          >
            Riwayat Pengajuan
          </button>
        </div>

        {/* Search + Dropdown */}
        <div className="flex items-center gap-4 mb-6 text-sm text-start">
          <div className="flex items-center w-60 border-2 border-purple-400 rounded-lg focus-within:ring-2 focus-within:ring-purple-400">
            <HiSearch className="mx-2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari event..."
              className="flex-1 py-1 px-2 rounded-r-lg focus:outline-none"
            />
          </div>

          {filter === "joined" && (
            <select
              value={timeFilter}
              onChange={(e) =>
                setTimeFilter(
                  e.target.value as "all" | "Sedang Berlangsung" | "Akan Datang" | "Sudah Berlalu"
                )
              }
              className="px-3 py-1 border-2 border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="all">Semua</option>
              <option value="Sedang Berlangsung">Sedang Berlangsung</option>
              <option value="Akan Datang">Akan Datang</option>
              <option value="Sudah Berlalu">Sudah Berlalu</option>
            </select>
          )}

          {filter === "history" && (
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | "accepted" | "rejected" | "canceled")
              }
              className="px-3 py-1 border-2 border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="all">Semua</option>
              <option value="accepted">Diterima</option>
              <option value="rejected">Ditolak</option>
              <option value="canceled">Dibatalkan</option>
            </select>
          )}
        </div>

        {/* Event Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-gray-200 shadow-md p-4"
              >
                <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
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
          </>

        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <img
              src="/src/assets/img/no-data/empty.svg"
              alt="Belum ada event"
              className="w-auto h-56 object-contain"
            />
            <p className="text-gray-600 text-lg font-bold mb-5">Belum Ada Event</p>
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
