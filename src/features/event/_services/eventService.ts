import api from "../../../services/api";
import type { Eventype, Event, EventCategory } from "../_event";

export async function fetchEvents(): Promise<Eventype[]> {
  try {
    const response = await api.get("/api/events-user");
    return response.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil data event:", error);
    throw error;
  }
}

export async function fetchEventDetail(slug: string): Promise<Event> {
  try {
    const response = await api.get(`/api/events/${slug}`);
    return response.data?.data;
  } catch (error) {
    console.error(`Gagal mengambil detail event ID ${slug}:`, error);
    throw error;
  }
}

export async function fetchEventCategories(): Promise<EventCategory[]> {
  try {
    const response = await api.get("/api/event-categories");
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil data kategori event:", error);
    throw error;
  }
}

