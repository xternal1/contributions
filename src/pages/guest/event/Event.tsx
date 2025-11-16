import React, { useEffect, useMemo } from "react";
import BackgroundShapes from "../../../components/public/BackgroundShapes";
import EventCardGrid from "../../../components/public/CardEvent/EventCardGrid";
import EventKategory from "../../../components/public/CardEvent/EventKategory";
import { motion } from "framer-motion";
import { useEventStore } from "../../../lib/stores/guest/event/useEventStore";
import type { Eventype } from "../../../features/event/_event";
import type { EventActivity } from "../../../features/user/models";

const Event: React.FC = () => {
  // ✅ FIX: Pisahkan selector untuk menghindari re-render tidak perlu
  const loading = useEventStore((s) => s.loading);
  const events = useEventStore((s) => s.events);
  const filteredEvents = useEventStore((s) => s.filteredEvents);
  const loadEvents = useEventStore((s) => s.loadEvents);
  const setFilteredEvents = useEventStore((s) => s.setFilteredEvents);

  // ✅ FIX: useEffect dengan empty dependency - cuma run sekali
  useEffect(() => {
    loadEvents();
  }, []); // ← PENTING: Empty array!

  // Helper: produce guest-facing Eventype[] by unwrapping EventActivity.event if present
  const guestEvents = useMemo<Eventype[]>(() => {
    if (!events || !Array.isArray(events)) return [];
    return (events as Array<any>).map((it) => {
      // if wrapper (EventActivity) with .event -> return the inner event shape
      if (it && it.event) return it.event;
      // otherwise assume it is already an Eventype
      return it;
    }) as unknown as Eventype[];
  }, [events]);

  // filteredEvents (from store) may likewise be wrapped - map it for the grid
  const guestFilteredEvents = useMemo<Eventype[]>(() => {
    if (!filteredEvents || !Array.isArray(filteredEvents)) return [];
    return (filteredEvents as Array<any>).map((it) => (it && it.event ? it.event : it)) as unknown as Eventype[];
  }, [filteredEvents]);

  // When EventKategory calls onFilter with Eventype[], convert to EventActivity[] for the store.
  const handleSidebarFilter = (list: Eventype[]) => {
    const wrapped = list.map((ev) => {
      const maybeId = (ev as any).id ?? 0;
      const basic: Partial<EventActivity> = {
        id: maybeId,
        event: ev as any,
      };
      return basic as unknown as EventActivity;
    });
    setFilteredEvents(wrapped);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#141427] transition-colors duration-500">
      {/* Header */}
      <div className="relative px-6 py-11 dark:bg-[#0D0D1A] dark:bg-none bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 overflow-hidden">
        <BackgroundShapes />
        <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">Event</h1>
          <p className="mt-2 text-xs sm:text-xs text-gray-800 dark:text-white">
            <a href="/">Beranda</a>
            <span className="mx-1">&gt;</span>
            <span className="text-purple-600 dark:text-purple-400">Event</span>
          </p>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center mt-12 px-4">
        {loading ? (
          <div className="animate-pulse">
            <div className="mx-auto h-6 w-32 bg-gray-200 rounded-full dark:bg-[#0D0D1A]" />
            <div className="h-6 md:h-8 bg-gray-200 rounded w-2/3 mx-auto mt-4 dark:bg-[#0D0D1A]" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mt-2 dark:bg-[#0D0D1A]" />
          </div>
        ) : (
          <>
            <span className="px-3 py-1 bg-indigo-50 text-purple-500 rounded-full text-sm font-semibold dark:bg-[#0D0D1A] dark:border dark:border-white">
              Event GetSkill
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 dark:text-white">
              Kembangkan Kemampuanmu <br />
              Di Event GetSkill
            </h2>
            <p className="text-sm text-gray-500 mt-2 dark:text-white">
              Tingkatkan kemampuan teknis melalui event yang diselenggarakan oleh partner GetSkill
            </p>
          </>
        )}
      </div>

      <div
        className="2xl:max-w-7xl xl:max-w-6xl lg:max-w-6xl md:max-w-1xl mx-auto 
            px-10 sm:px-10 md:px-25 lg:px-20 xl:px-8 2xl:px-8 
            py-8 sm:py-10 
            grid grid-cols-1 md:grid-cols-0 lg:grid-cols-[240px_1fr] 2xl:gap-10"
      >
        {/* Sidebar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <EventKategory loading={loading} events={guestEvents} onFilter={handleSidebarFilter} />
        </motion.div>

        {/* Main content */}
        <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <EventCardGrid loading={loading} events={guestFilteredEvents.length ? guestFilteredEvents : guestEvents} />
        </motion.div>
      </div>
    </div>
  );
};

export default Event;