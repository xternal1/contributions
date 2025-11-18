// src/lib/stores/user/profile/useCourseStore.ts
import {create} from "zustand";
import type { CourseActivity } from "@features/user/models";
import { fetchUserCourses } from "@features/user/user_service";

type CourseState = {
  courses: CourseActivity[];
  loading: boolean;
  filter: "progress" | "done";
  currentPage: number;
  pageSize: number;

  loadCourses: (userId?: number) => Promise<void>;
  setFilter: (f: "progress" | "done") => void;
  setCurrentPage: (p: number) => void;
};

// small local Set type to avoid importing SetState from zustand (avoids the exported-member error)
type SetFn<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

export const useCourseStore = create<CourseState>((set: SetFn<CourseState>) => ({
  courses: [],
  loading: true,
  filter: "progress",
  currentPage: 1,
  pageSize: 3,

  loadCourses: async (userId = 1) => {
    set({ loading: true });
    try {
      const userCourses = await fetchUserCourses(userId);
      set({ courses: userCourses });
    } catch (err) {
      console.error("Gagal ambil profile:", err);
      set({ courses: [] });
    } finally {
      set({ loading: false });
    }
  },

  setFilter: (f: "progress" | "done") => {
    // show the short loading animation as before
    set({ loading: true, filter: f, currentPage: 1 });
    setTimeout(() => set({ loading: false }), 500);
  },

  setCurrentPage: (p: number) => {
    set({ currentPage: p });
  },
}));
