import { create } from "zustand";
import type { EventActivity, EventPaginateResponse } from "../../../../features/user/models";
import {
  fetchEventPending,
  fetchEventFollowed,
  fetchEventHistory,
  cancelUserEvent,
} from "../../../../features/user/user_service";

type FilterType = "pending" | "joined" | "history";
type TimeFilterType = "all" | "Sedang Berlangsung" | "Akan Datang" | "Sudah Berlalu";
type StatusFilterType = "all" | "accepted" | "rejected" | "canceled";

interface EventState {
  // State
  events: EventActivity[];
  loading: boolean;
  filter: FilterType;
  timeFilter: TimeFilterType;
  statusFilter: StatusFilterType;
  search: string;
  currentPage: number;
  pageSize: number;

  // Computed
  filteredEvents: EventActivity[];
  paginatedEvents: EventActivity[];
  totalPages: number;

  // Actions
  setFilter: (filter: FilterType) => void;
  setTimeFilter: (filter: TimeFilterType) => void;
  setStatusFilter: (filter: StatusFilterType) => void;
  setSearch: (search: string) => void;
  setCurrentPage: (page: number) => void;
  loadEvents: () => Promise<void>;
  cancelEvent: (id: number, reason?: string) => Promise<void>;
  computeFiltered: () => void;
  setFilteredEvents: (events: EventActivity[]) => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  // Initial State
  events: [],
  loading: true,
  filter: "pending",
  timeFilter: "all",
  statusFilter: "all",
  search: "",
  currentPage: 1,
  pageSize: 3,
  filteredEvents: [],
  paginatedEvents: [],
  totalPages: 1,

  // Actions
  // ✅ FIX: Jangan panggil loadEvents() di sini - biar component yang handle
  setFilter: (filter) => {
    set({ filter, currentPage: 1 });
  },

  setTimeFilter: (timeFilter) => {
    set({ timeFilter, currentPage: 1 });
    get().computeFiltered();
  },

  setStatusFilter: (statusFilter) => {
    set({ statusFilter, currentPage: 1 });
    get().computeFiltered();
  },

  setSearch: (search) => {
    set({ search, currentPage: 1 });
    get().computeFiltered();
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    get().computeFiltered();
  },

  loadEvents: async () => {
    set({ loading: true });
    try {
      const { filter } = get();
      let response: EventPaginateResponse;

      if (filter === "pending") {
        response = await fetchEventPending();
      } else if (filter === "joined") {
        response = await fetchEventFollowed();
      } else {
        response = await fetchEventHistory();
      }

      set({ events: response.data, currentPage: 1 });
      get().computeFiltered();
    } catch (err) {
      console.error("Gagal ambil user events:", err);
      set({ events: [], filteredEvents: [], paginatedEvents: [], totalPages: 1 });
    } finally {
      set({ loading: false });
    }
  },

  cancelEvent: async (id, reason) => {
    const { events, filter } = get();
    const eventToCancel = events.find((e) => e.id === id);
    if (!eventToCancel) return;

    const prevEvents = [...events];

    // Optimistic update
    set({
      events: events.map((e) =>
        e.id === id ? { ...e, status: "canceled", reason: reason ?? "" } : e
      ),
    });
    get().computeFiltered();

    try {
      if (!eventToCancel?.id) {
        console.error("Event tidak valid");
        return;
      }

      const canceledEvent = await cancelUserEvent(eventToCancel.id, reason ?? "");
      
      set({
        events: events.map((e) => (e.id === id ? canceledEvent : e)),
      });

      // Refresh list
      let res: EventPaginateResponse;
      if (filter === "joined") {
        res = await fetchEventFollowed();
      } else if (filter === "pending") {
        res = await fetchEventPending();
      } else {
        res = await fetchEventHistory();
      }
      
      set({ events: res.data });
      get().computeFiltered();
    } catch (err) {
      console.error("Gagal batal ikut:", err);
      set({ events: prevEvents });
      get().computeFiltered();
    }
  },

  // ✅ FIX: Tambah guard untuk prevent infinite loop
  computeFiltered: () => {
    const state = get();
    const { events, search, filter, timeFilter, statusFilter, currentPage, pageSize } = state;
    
    // Guard: return early jika events kosong
    if (!events || !Array.isArray(events) || events.length === 0) {
      set({ filteredEvents: [], paginatedEvents: [], totalPages: 1 });
      return;
    }

    let filtered = [...events];

    // Search filter
    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e?.event?.title?.toLowerCase().includes(lowerSearch) ||
          e?.event?.description?.toLowerCase().includes(lowerSearch)
      );
    }

    // Time filter (for joined tab)
    if (filter === "joined" && timeFilter !== "all") {
      filtered = filtered.filter((e) => e.event_time_status === timeFilter);
    }

    // Status filter (for history tab)
    if (filter === "history" && statusFilter !== "all") {
      filtered = filtered.filter((e) => {
        if (statusFilter === "accepted") return e.status === "accepted";
        if (statusFilter === "rejected") return e.status === "declined";
        if (statusFilter === "canceled") return e.status === "canceled";
        return true;
      });
    }

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paginatedEvents = filtered.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    set({ filteredEvents: filtered, paginatedEvents, totalPages });
  },

  // ✅ FIX: Tambah guard di setFilteredEvents
  setFilteredEvents: (eventsList) => {
    if (!eventsList || !Array.isArray(eventsList)) {
      set({ filteredEvents: [], paginatedEvents: [], totalPages: 1 });
      return;
    }

    const { currentPage, pageSize } = get();
    const totalPages = Math.max(1, Math.ceil(eventsList.length / pageSize));
    const paginatedEvents = eventsList.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    set({ filteredEvents: eventsList, paginatedEvents, totalPages });
  },
}));