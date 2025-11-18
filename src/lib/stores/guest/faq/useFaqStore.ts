// src/lib/stores/guest/faq/useFaqStore.ts
import { create } from "zustand";
import type { FaqCategory, Faq } from "../../../../features/faq/_faq";
import {
  fetchFaqCategories,
  fetchFaq,
  fetchFaqCategoryDetail,
  fetchFaqDetail,
} from "../../../../features/faq/_service/faq_service";

type FaqState = {
  // data utama
  categories: FaqCategory[];
  allFaqs: Faq[];

  // detail data
  categoryDetail: FaqCategory | null;
  faqDetail: Faq | null;

  // ui state
  loading: boolean;
  useFallback: boolean;
  activeCategory: string;
  activeId: number | null; // id faq yang sedang dibuka

  // actions utama
  loadInitialData: () => Promise<void>;
  loadFaqs: () => Promise<void>;
  loadFaqCategories: () => Promise<void>;
  loadCategoryDetail: (id: number) => Promise<void>;
  loadFaqDetail: (id: number) => Promise<void>;

  // interaksi UI
  setActiveCategory: (name: string) => void;
  toggleFaq: (id: number) => void;

  // helpers
  clearCategoryDetail: () => void;
  clearFaqDetail: () => void;
};

export const useFaqStore = create<FaqState>((set, get) => ({
  categories: [],
  allFaqs: [],
  categoryDetail: null,
  faqDetail: null,
  loading: true,
  useFallback: false,
  activeCategory: "Semua",
  activeId: null,

  // === LOAD INITIAL DATA (kategori atau fallback FAQ langsung) ===
  loadInitialData: async () => {
    set({ loading: true });
    try {
      const categoryData = await fetchFaqCategories();
      const hasFaqs = categoryData.some((c) => c.faqs && c.faqs.length > 0);

      if (hasFaqs) {
        set({ categories: categoryData, useFallback: false, allFaqs: [] });
      } else {
        const faqData = await fetchFaq();
        set({ allFaqs: faqData, useFallback: true, categories: [] });
      }
    } catch (err) {
      console.error("useFaqStore.loadInitialData error", err);
      try {
        const faqData = await fetchFaq();
        set({ allFaqs: faqData, useFallback: true, categories: [] });
      } catch {
        set({ allFaqs: [], categories: [], useFallback: true });
      }
    } finally {
      set({ loading: false });
    }
  },

  // === LOAD SEMUA FAQ TANPA KATEGORI ===
  loadFaqs: async () => {
    set({ loading: true });
    try {
      const faqData = await fetchFaq();
      set({ allFaqs: faqData });
    } catch (err) {
      console.error("useFaqStore.loadFaqs error", err);
      set({ allFaqs: [] });
    } finally {
      set({ loading: false });
    }
  },

  // === LOAD SEMUA KATEGORI FAQ ===
  loadFaqCategories: async () => {
    set({ loading: true });
    try {
      const cats = await fetchFaqCategories();
      set({ categories: cats });
    } catch (err) {
      console.error("useFaqStore.loadFaqCategories error", err);
      set({ categories: [] });
    } finally {
      set({ loading: false });
    }
  },

  // === LOAD DETAIL KATEGORI (FAQ PER KATEGORI) ===
  loadCategoryDetail: async (id: number) => {
    set({ loading: true, activeId: null });
    try {
      const data = await fetchFaqCategoryDetail(id);
      set({ categoryDetail: data });
    } catch (err) {
      console.error("useFaqStore.loadCategoryDetail error", err);
      set({ categoryDetail: null });
    } finally {
      set({ loading: false });
    }
  },

  // === LOAD DETAIL FAQ (SATU FAQ SAJA) ===
  loadFaqDetail: async (id: number) => {
    set({ loading: true });
    try {
      const data = await fetchFaqDetail(id);
      set({ faqDetail: data });
    } catch (err) {
      console.error("useFaqStore.loadFaqDetail error", err);
      set({ faqDetail: null });
    } finally {
      set({ loading: false });
    }
  },

  // === UI ACTIONS ===
  setActiveCategory: (name: string) => set({ activeCategory: name }),

  toggleFaq: (id: number) => {
    const { activeId } = get();
    set({ activeId: activeId === id ? null : id });
  },

  // === HELPERS ===
  clearCategoryDetail: () => set({ categoryDetail: null }),
  clearFaqDetail: () => set({ faqDetail: null }),
}));

// Export the types needed by components
export type { Faq, FaqCategory };