// src/lib/stores/user/profile/useEventStore.ts
import { create } from "zustand";
import type { EventActivity, EventPaginateResponse } from "@features/user/models";
import {
  fetchEventPending,
  fetchEventFollowed,
  fetchEventHistory,
  cancelUserEvent,
} from "@features/user/user_service";

// Export these types for component usage
export type EventFilter = "pending" | "joined" | "history";
export type EventTimeFilter = "all" | "Sedang Berlangsung" | "Akan Datang" | "Sudah Berlalu";
export type EventStatusFilter = "all" | "accepted" | "rejected" | "canceled";

type EventState = {
  // State
  events: EventActivity[];
  loading: boolean;
  filter: EventFilter;
  timeFilter: EventTimeFilter;
  statusFilter: EventStatusFilter;
  search: string;
  currentPage: number;
  pageSize: number;

  // Actions
  loadEvents: (filterOverride?: EventFilter) => Promise<void>;
  setFilter: (f: EventFilter) => void;
  setTimeFilter: (t: EventTimeFilter) => void;
  setStatusFilter: (s: EventStatusFilter) => void;
  setSearch: (s: string) => void;
  setCurrentPage: (p: number) => void;
  cancelEvent: (id: number, reason?: string) => Promise<void>;

  // Computed/Derived values
  getFilteredEvents: () => EventActivity[];
  getPaginatedEvents: () => EventActivity[];
  getTotalPages: () => number;
};

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  loading: true,
  filter: "pending",
  timeFilter: "all",
  statusFilter: "all",
  search: "",
  currentPage: 1,
  pageSize: 3,

  loadEvents: async (filterOverride?: EventFilter) => {
    const activeFilter = filterOverride ?? get().filter;
    set({ loading: true });
    try {
      let response: EventPaginateResponse;
      if (activeFilter === "pending") {
        response = await fetchEventPending();
      } else if (activeFilter === "joined") {
        response = await fetchEventFollowed();
      } else {
        response = await fetchEventHistory();
      }
      set({ events: response.data, currentPage: 1 });
    } catch (err) {
      console.error("Gagal ambil user events:", err);
      set({ events: [] });
    } finally {
      set({ loading: false });
    }
  },

  setFilter: (f: EventFilter) => {
    set({ filter: f, currentPage: 1 });
    get().loadEvents(f);
  },

  setTimeFilter: (t: EventTimeFilter) => set({ timeFilter: t, currentPage: 1 }),

  setStatusFilter: (s: EventStatusFilter) => set({ statusFilter: s, currentPage: 1 }),

  setSearch: (s: string) => set({ search: s, currentPage: 1 }),

  setCurrentPage: (p: number) => set({ currentPage: p }),

  cancelEvent: async (id: number, reason?: string) => {
    const events = get().events;
    const eventToCancel = events.find((e) => e.id === id);
    if (!eventToCancel) return;

    const prev = [...events];

    // optimistic update
    set({
      events: events.map((e) =>
        e.id === id ? { ...e, status: "canceled", reason: reason ?? "" } : e
      ),
    });

    try {
      if (!eventToCancel?.id) {
        console.error("Event tidak valid");
        return;
      }
      const canceledEvent = await cancelUserEvent(eventToCancel.id, reason ?? "");
      set({ events: get().events.map((e) => (e.id === id ? canceledEvent : e)) });

      // refresh list for current tab
      let res: EventPaginateResponse;
      const { filter } = get();
      if (filter === "joined") {
        res = await fetchEventFollowed();
      } else if (filter === "pending") {
        res = await fetchEventPending();
      } else {
        res = await fetchEventHistory();
      }
      set({ events: res.data });
    } catch (err) {
      console.error("Gagal batal ikut:", err);
      set({ events: prev });
    }
  },

  // ✅ COMPUTED: Get filtered events based on search, timeFilter, statusFilter
  getFilteredEvents: () => {
    const { events, search, filter, timeFilter, statusFilter } = get();
    let filtered = [...events];

    // Filter by search
    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.event.title.toLowerCase().includes(lowerSearch) ||
          e.event.description?.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter by time (only for "joined" tab)
    if (filter === "joined" && timeFilter !== "all") {
      filtered = filtered.filter((e) => e.event_time_status === timeFilter);
    }

    // Filter by status (only for "history" tab)
    if (filter === "history" && statusFilter !== "all") {
      filtered = filtered.filter((e) => {
        if (statusFilter === "accepted") return e.status === "accepted";
        if (statusFilter === "rejected") return e.status === "declined";
        if (statusFilter === "canceled") return e.status === "canceled";
        return true;
      });
    }

    return filtered;
  },

  // ✅ COMPUTED: Get paginated events
  getPaginatedEvents: () => {
    const { currentPage, pageSize } = get();
    const filtered = get().getFilteredEvents();
    return filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  },

  // ✅ COMPUTED: Get total pages
  getTotalPages: () => {
    const { pageSize } = get();
    const filtered = get().getFilteredEvents();
    return Math.max(1, Math.ceil(filtered.length / pageSize));
  },
}));