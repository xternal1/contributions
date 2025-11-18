import { useEffect } from "react";
import DashboardLayout from "@components/public/auth/DashboardLayout";
import { useEventStore } from "@lib/stores/user/profile/useEventStore";
import { EventCards, EventCardsSkeleton, EventEmptyState, EventHeader, EventHeaderSkeleton } from "@components/eventuser/Index";


const EventPage = () => {
  // Store Imports
  const {
    loading,
    filter,
    timeFilter,
    statusFilter,
    search,
    currentPage,
    loadEvents,
    setFilter,
    setTimeFilter,
    setStatusFilter,
    setSearch,
    setCurrentPage,
    cancelEvent,
    getFilteredEvents,
    getPaginatedEvents,
    getTotalPages,
  } = useEventStore();

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Get computed values
  const filteredEvents = getFilteredEvents();
  const paginatedEvents = getPaginatedEvents();
  const totalPages = getTotalPages();

  return (
    <DashboardLayout slug="event">
      <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
        {/* Header */}
        {loading ? (
          <EventHeaderSkeleton />
        ) : (
          <EventHeader
            filter={filter}
            search={search}
            timeFilter={timeFilter}
            statusFilter={statusFilter}
            setFilter={setFilter}
            setSearch={setSearch}
            setTimeFilter={setTimeFilter}
            setStatusFilter={setStatusFilter}
          />
        )}

        {/* Event Cards */}
        {loading ? (
          <EventCardsSkeleton />
        ) : filteredEvents.length > 0 ? (
          <EventCards
            filter={filter}
            paginatedEvents={paginatedEvents}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            cancelEvent={cancelEvent}
          />
        ) : (
          <EventEmptyState />
        )}
      </main>
    </DashboardLayout>
  );
};

export default EventPage;