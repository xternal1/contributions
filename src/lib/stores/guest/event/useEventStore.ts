// src/lib/stores/event/useEventStore.ts
import { create } from "zustand";
import type { Eventype } from "../../../../features/event/_event";
import { fetchEvents, fetchEventDetail } from "../../../../features/event/_services/eventService";

type EventState = {
  // list
  events: Eventype[];
  filteredEvents: Eventype[];
  loading: boolean; // alias/general loading (keperluan component yang expect `loading`)

  // detail
  selectedEvent: Eventype | null;
  event: Eventype | null; // alias supaya component dapat menggunakan `event`
  detailLoading: boolean; // specific loading for detail
  // ui
  isOpen: boolean;

  // actions
  loadEvents: () => Promise<void>;
  setFilteredEvents: (items: Eventype[]) => void;

  loadEventDetail: (slug: string) => Promise<void>;
  setSelectedEvent: (ev: Eventype | null) => void;
  clearSelectedEvent: () => void;

  setIsOpen: (v: boolean) => void;
  clearEvents: () => void;
};

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  filteredEvents: [],
  loading: true,

  selectedEvent: null,
  event: null,
  detailLoading: true,

  isOpen: false,

  // load list of events (keperluan Event page)
  loadEvents: async () => {
    set({ loading: true });
    try {
      const data = await fetchEvents();
      set({ events: data, filteredEvents: data });
    } catch (err) {
      console.error("useEventStore.loadEvents error", err);
      set({ events: [], filteredEvents: [] });
    } finally {
      set({ loading: false });
    }
  },

  setFilteredEvents: (items) => set({ filteredEvents: items }),

  // load detail by slug (keperluan DetailEvent)
  loadEventDetail: async (slug: string) => {
    set({ detailLoading: true, loading: true, selectedEvent: null, event: null });
    try {
      const data = await fetchEventDetail(slug);
      // set both aliases so components can read either `selectedEvent` or `event`
      set({ selectedEvent: data, event: data });
    } catch (err) {
      console.error("useEventStore.loadEventDetail error", err);
      set({ selectedEvent: null, event: null });
    } finally {
      set({ detailLoading: false, loading: false });
    }
  },

  setSelectedEvent: (ev) => set({ selectedEvent: ev, event: ev }),

  clearSelectedEvent: () => set({ selectedEvent: null, event: null, detailLoading: false, loading: false }),

  setIsOpen: (v) => set({ isOpen: v }),

  clearEvents: () =>
    set({
      events: [],
      filteredEvents: [],
      selectedEvent: null,
      event: null,
      loading: false,
      detailLoading: false,
      isOpen: false,
    }),
}));
