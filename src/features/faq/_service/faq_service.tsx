// src/features/faq/_service/faq_service.ts
import api from "../../../services/api";
import type {
  Faq,
  FaqCategory,
} from "../_faq";

// Ambil semua FAQ (list untuk landing page)
export async function fetchFaq(): Promise<Faq[]> {
  try {
    const response = await api.get("/api/faq-user");
    return response.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil FAQ landing:", error);
    throw error;
  }
}

// Ambil detail FAQ by ID
export async function fetchFaqDetail(id: number): Promise<Faq> {
  try {
    const response = await api.get(`/api/faq-user/${id}`);
    return response.data?.data;
  } catch (error) {
    console.error(`Gagal mengambil detail FAQ ID ${id}:`, error);
    throw error;
  }
}


// Ambil semua kategori FAQ
export async function fetchFaqCategories(): Promise<FaqCategory[]> {
  try {
    const response = await api.get("/api/faqs-category");
    return response.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil FAQ categories:", error);
    throw error;
  }
}

// Ambil detail kategori FAQ
export async function fetchFaqCategoryDetail(id: number): Promise<FaqCategory> {
  try {
    const response = await api.get(`/api/faqs-category/${id}`);
    return response.data?.data;
  } catch (error) {
    console.error(`Gagal mengambil detail FAQ category ID ${id}:`, error);
    throw error;
  }
}
