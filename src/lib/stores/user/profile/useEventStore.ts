// src/lib/stores/user/profile/useEventStore.ts
import { create } from "zustand";
import type { EventActivity, EventPaginateResponse } from "../../../../features/user/models";
import {
  fetchEventPending,
  fetchEventFollowed,
  fetchEventHistory,
  cancelUserEvent,
} from "../../../../features/user/user_service";

// Export these types for component usage
export type EventFilter = "pending" | "joined" | "history";
export type EventTimeFilter = "all" | "Sedang Berlangsung" | "Akan Datang" | "Sudah Berlalu";
export type EventStatusFilter = "all" | "accepted" | "rejected" | "canceled";

type EventState = {
  events: EventActivity[];
  loading: boolean;
  filter: EventFilter;
  timeFilter: EventTimeFilter;
  statusFilter: EventStatusFilter;
  search: string;
  currentPage: number;
  pageSize: number;

  loadEvents: (filterOverride?: EventFilter) => Promise<void>;
  setFilter: (f: EventFilter) => void;
  setTimeFilter: (t: EventTimeFilter) => void;
  setStatusFilter: (s: EventStatusFilter) => void;
  setSearch: (s: string) => void;
  setCurrentPage: (p: number) => void;
  cancelEvent: (id: number, reason?: string) => Promise<void>;
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
      const canceledEvent = await cancelUserEvent(eventToCancel.id, reason ?? "");
      set({ events: get().events.map((e) => (e.id === id ? canceledEvent : e)) });

      // refresh list for current tab
      await get().loadEvents(get().filter);
    } catch (err) {
      console.error("Gagal batal ikut:", err);
      set({ events: prev });
    }
  },
}));