import { useState, useEffect } from "react";
import BackgroundShapes from "../../../components/public/BackgroundShapes";
import EventCardGrid from "../../../components/public/CardEvent/EventCardGrid";
import { fetchEvents } from "../../../features/event/_services/eventService";
// import dumyevents from "../../../data/events";
import type { Eventype } from "../../../features/event/_event";
// import type { Event as ApiEvent } from "../../../features/event/_event";
import { motion } from "framer-motion";
import EventKategory from "../../../components/public/CardEvent/EventKategory";

const Event: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Eventype[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Eventype[]>([]);

  // useEffect(() => {
  //   setEvents(dumyevents);
  //   setFilteredEvents(dumyevents);
  //   setLoading(false);
  // }, []);


  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Gagal memuat event:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  useEffect(() => {
    if (!loading) {
      setFilteredEvents(events);
    }
  }, [events, loading]);


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 overflow-hidden">
        <BackgroundShapes />
        <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Event
          </h1>
          <p className="mt-2 text-xs sm:text-xs text-gray-800">
            <a href="/">Beranda</a>
            <span className="mx-1">&gt;</span>
            <span className="text-purple-600">Event</span>
          </p>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center mt-12 px-4">
        {loading ? (
          <div className="animate-pulse">
            <div className="mx-auto h-6 w-32 bg-gray-200 rounded-full"></div>
            <div className="h-6 md:h-8 bg-gray-200 rounded w-2/3 mx-auto mt-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mt-2"></div>
          </div>
        ) : (
          <>
            <span className="px-3 py-1 bg-indigo-50 text-purple-500 rounded-full text-sm font-semibold">
              Event GetSkill
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
              Kembangkan Kemampuanmu <br />
              Di Event GetSkill
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Tingkatkan kemampuan teknis melalui event yang diselenggarakan
              oleh partner GetSkill
            </p>
          </>
        )}
      </div>

      <div className="2xl:max-w-7xl xl:max-w-6xl lg:max-w-6xl md:max-w-1xl mx-auto 
            px-10 sm:px-10 md:px-25 lg:px-20 xl:px-8 2xl:px-8 
            py-8 sm:py-10 
            grid grid-cols-1 md:grid-cols-0 lg:grid-cols-[240px_1fr] 2xl:gap-10">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <EventKategory
            loading={loading}
            events={events}
            onFilter={(filteredEvents) => setFilteredEvents(filteredEvents)}
          />


        </motion.div>

        {/* Konten Utama */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <EventCardGrid loading={loading} events={filteredEvents} />
        </motion.div>
      </div>
    </div>
  );
};

export default Event;
