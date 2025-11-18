// src/lib/stores/news/useNewsStore.ts
import { create } from "zustand";
import type { _News } from "../../../../features/news/_news";
import { fetchNews, fetchNewsDetail } from "../../../../features/news/services/news_service";

type NewsState = {
  newsList: _News[];
  selectedNews: _News | null;
  relatedNews: _News[];
  isLoading: boolean;

  // UI / controls
  searchTerm: string;
  selectedCategory: string;
  sortOrder: "Terbaru" | "Terlama";
  currentPage: number;
  itemsPerPage: number;
  isModalOpen: boolean;

  // actions
  loadNews: () => Promise<void>;
  loadNewsDetail: (slug: string) => Promise<void>;
  setSearchTerm: (v: string) => void;
  setSelectedCategory: (v: string) => void;
  setSortOrder: (v: "Terbaru" | "Terlama") => void;
  setCurrentPage: (p: number) => void;
  toggleModal: (v?: boolean) => void;

  // helpers for scroll caching (optional)
  saveScrollPosition: () => void;
  restoreScrollPosition: () => void;
};

export const useNewsStore = create<NewsState>((set, get) => ({
  newsList: [],
  selectedNews: null,
  relatedNews: [],
  isLoading: true, // start true so pages which check loading show skeleton until loadNews runs

  searchTerm: "",
  selectedCategory: "Semua",
  sortOrder: "Terbaru",
  currentPage: 1,
  itemsPerPage: 8,
  isModalOpen: false,

  loadNews: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchNews();
      set({ newsList: data });
    } catch (err) {
      console.error("loadNews error", err);
      set({ newsList: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  loadNewsDetail: async (slug: string) => {
    set({ isLoading: true });
    try {
      const detail = await fetchNewsDetail(slug);
      set({ selectedNews: detail });

      // build related from already fetched list (if available) else fetch all
      const list = get().newsList.length ? get().newsList : await fetchNews();
      const related = list
        .filter((item) => item.category_id === detail.category_id && item.slug !== slug)
        .slice(0, 5);
      set({ relatedNews: related, newsList: list });
    } catch (err) {
      console.error("loadNewsDetail error", err);
      set({ selectedNews: null, relatedNews: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  setSearchTerm: (v) => set({ searchTerm: v, currentPage: 1 }),
  setSelectedCategory: (v) => set({ selectedCategory: v, currentPage: 1 }),
  setSortOrder: (v) => set({ sortOrder: v, currentPage: 1 }),
  setCurrentPage: (p) => set({ currentPage: p }),

  toggleModal: (v) => {
    if (typeof v === "boolean") set({ isModalOpen: v });
    else set((s) => ({ isModalOpen: !s.isModalOpen }));
  },

  saveScrollPosition: () => {
    try {
      localStorage.setItem("newsDetailScrollPosition", String(window.scrollY || 0));
    } catch (e) {}
  },

  restoreScrollPosition: () => {
    try {
      const val = localStorage.getItem("newsDetailScrollPosition");
      if (val) window.scrollTo(0, parseInt(val));
    } catch (e) {}
  },
}));
