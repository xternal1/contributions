import { create } from "zustand";
import type { DetailCourse } from "../../../../features/course/_course";
import { fetchCourseDetail } from "../../../../features/course/_service/course_service";

type Filters = {
  categories: string[];
  priceMin: string;
  priceMax: string;
  search: string;
};

type CourseState = {
  // detail
  selectedCourse: DetailCourse | null;
  detailLoading: boolean;

  // list UI (filters + paging)
  filters: Filters;
  page: number;

  // actions - ✅ Support both function and partial object updates
  setFilters: (f: Partial<Filters> | ((prev: Filters) => Filters)) => void;
  setPage: (p: number) => void;

  loadCourseDetail: (slug: string) => Promise<void>;
  clearCourseDetail: () => void;
};

export const useCourseStore = create<CourseState>((set, _get) => ({
  selectedCourse: null,
  detailLoading: true,

  filters: {
    categories: [],
    priceMin: "",
    priceMax: "",
    search: "",
  },
  page: 1,

  // ✅ Handle both partial objects and updater functions
  setFilters: (update) =>
    set((s) => ({
      filters:
        typeof update === "function"
          ? update(s.filters) // Function form: setFilters(prev => ...)
          : { ...s.filters, ...update }, // Partial object: setFilters({ ... })
      page: 1, // Reset page on filter change
    })),

  setPage: (p) => set({ page: p }),

  loadCourseDetail: async (slug: string) => {
    set({ detailLoading: true, selectedCourse: null });
    try {
      const data = await fetchCourseDetail(slug);
      set({ selectedCourse: data });
    } catch (err) {
      console.error("useCourseStore.loadCourseDetail error", err);
      set({ selectedCourse: null });
    } finally {
      set({ detailLoading: false });
    }
  },

  clearCourseDetail: () => set({ selectedCourse: null, detailLoading: false }),
}));
