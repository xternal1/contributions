import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/public/auth/DashboardLayout";
import EventHeader from "../../../components/event/EventHeader";
import EventList from "../../../components/event/EventList";
import EventPagination from "../../../components/event/EventPagination";
import { useEventStore } from "../../../lib/stores/user/profile/useEventStore";
import type { EventActivity } from "../../../features/user/models";

const EventPage = () => {
  const navigate = useNavigate();

  const {
    events,
    loading,
    filter,
    timeFilter,
    statusFilter,
    search,
    currentPage,
    pageSize,
    loadEvents,
    setFilter,
    setTimeFilter,
    setStatusFilter,
    setSearch,
    setCurrentPage,
    cancelEvent,
  } = useEventStore((s) => ({
    events: s.events,
    loading: s.loading,
    filter: s.filter,
    timeFilter: s.timeFilter,
    statusFilter: s.statusFilter,
    search: s.search,
    currentPage: s.currentPage,
    pageSize: s.pageSize,
    loadEvents: s.loadEvents,
    setFilter: s.setFilter,
    setTimeFilter: s.setTimeFilter,
    setStatusFilter: s.setStatusFilter,
    setSearch: s.setSearch,
    setCurrentPage: s.setCurrentPage,
    cancelEvent: s.cancelEvent,
  }));

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Handler Batal Ikuti */
  const handleCancel = async (id: number, reason?: string) => {
    await cancelEvent(id, reason);
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
        <EventHeader
          loading={loading}
          filter={filter}
          timeFilter={timeFilter}
          statusFilter={statusFilter}
          search={search}
          onFilterChange={setFilter}
          onTimeFilterChange={setTimeFilter}
          onStatusFilterChange={setStatusFilter}
          onSearchChange={setSearch}
        />

        {/* Event Cards */}
        <EventList
          loading={loading}
          events={paginatedEvents}
          filter={filter}
          onCancel={handleCancel}
        />

        {/* Pagination */}
        <EventPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </DashboardLayout>
  );
};

export default EventPage;