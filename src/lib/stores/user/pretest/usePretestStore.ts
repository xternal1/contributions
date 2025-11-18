// src/lib/stores/user/pretest/usePretestStore.ts
import { create } from "zustand";
import type { DataWrapper, TestResult } from "../../../../features/course/_course";
import {
  fetchCourseDetail,
  fetchPreTest,
  submitPreTest,
  fetchPreTestResult,
  fetchNavigate,
} from "../../../../features/course/_service/course_service";

type Answers = Record<string, string | undefined>;

type SubmitResult = { success: boolean; testResult?: TestResult | null };

type PretestState = {
  pretest: DataWrapper | null;
  result: TestResult | null;
  loading: boolean;
  error: string | null;
  starting: boolean;
  answers: Answers;
  timeLeft: number;
  isTimerStarted: boolean;
  currentPage: number;

  setError: (msg: string | null) => void;
  setLoading: (v: boolean) => void;
  setPretest: (p: DataWrapper | null) => void;

  loadPretestBySlug: (slug: string) => Promise<void>;
  loadPretestByCourseTestId: (courseTestId: string, page?: number) => Promise<void>;
  loadResult: (id: string) => Promise<void>;
  startNavigate: (slug: string) => Promise<any | null>;
  startExamFlow: (slug: string) => Promise<void>;

  answerQuestion: (pageNumber: number, value: string) => void;
  goToPage: (pageNumber: number) => Promise<void>;
  submitAnswers: () => Promise<SubmitResult>;

  startTimer: (durationSeconds: number) => void;
  stopTimer: () => void;
  resetStore: () => void;
};

let _timerId: number | null = null;

export const usePretestStore = create<PretestState>((set, get) => ({
  pretest: null,
  result: null,
  loading: false,
  error: null,
  starting: false,
  answers: JSON.parse(localStorage.getItem("pretest_answers") || "{}"),
  timeLeft: parseInt(localStorage.getItem("pretest_timeLeft") || "0", 10) || 0,
  isTimerStarted: !!localStorage.getItem("pretest_timeLeft"),
  currentPage: 1,

  setError: (msg) => set({ error: msg }),
  setLoading: (v) => set({ loading: v }),
  setPretest: (p) => set({ pretest: p }),

  loadPretestBySlug: async (slug) => {
    try {
      set({ loading: true, error: null });
      const course = await fetchCourseDetail(slug);
      if (!course?.course_test_id) {
        set({ error: "Course test id tidak ditemukan", loading: false });
        return;
      }
      await get().loadPretestByCourseTestId(String(course.course_test_id), 1);
    } catch (err) {
      console.error("loadPretestBySlug:", err);
      set({ error: "Gagal memuat pretest.", loading: false });
    } finally {
      set({ loading: false });
    }
  },

  loadPretestByCourseTestId: async (courseTestId, page = 1) => {
    try {
      set({ loading: true, error: null });
      const data = await fetchPreTest(`${courseTestId}?page=${page}`);
      set({ pretest: data, currentPage: data?.paginate?.current_page || page });
      const durationMin = (data as any)?.course_test?.duration;
      if (durationMin && !get().isTimerStarted) {
        const durationSec = durationMin * 60;
        get().startTimer(durationSec);
      }
    } catch (err) {
      console.error("loadPretestByCourseTestId:", err);
      set({ error: "Gagal memuat pretest." });
    } finally {
      set({ loading: false });
    }
  },

  loadResult: async (id) => {
    try {
      set({ loading: true, error: null });
      const data = await fetchPreTestResult(id);
      if (!data || !data.id) {
        set({ error: "Hasil tes tidak ditemukan." });
        return;
      }
      set({ result: data });
    } catch (err) {
      console.error("loadResult:", err);
      set({ error: "Gagal mengambil hasil pretest." });
    } finally {
      set({ loading: false });
    }
  },

  startNavigate: async (slug) => {
    try {
      const data = await fetchNavigate(slug);
      return data;
    } catch (err) {
      console.error("startNavigate:", err);
      throw err; // Re-throw to let caller handle
    }
  },

  startExamFlow: async (slug) => {
    set({ starting: true, error: null });
    try {
      await fetchNavigate(slug);
    } catch (err) {
      console.error("startExamFlow:", err);
      set({ error: "Gagal memulai pretest." });
      throw err;
    } finally {
      set({ starting: false });
    }
  },

  answerQuestion: (pageNumber, value) => {
    const key = String(pageNumber);
    const newAnswers = { ...(get().answers || {}), [key]: value };
    set({ answers: newAnswers });
    localStorage.setItem("pretest_answers", JSON.stringify(newAnswers));
    localStorage.setItem(`answer_${key}`, value);
  },

  goToPage: async (pageNumber) => {
    const pretest = get().pretest;
    if (!pretest) return;
    try {
      set({ loading: true });
      if ((pretest as any).course_test_id) {
        const data = await fetchPreTest(`${(pretest as any).course_test_id}?page=${pageNumber}`);
        set({ pretest: data, currentPage: data?.paginate?.current_page || pageNumber });
      } else {
        set({ error: "Tidak bisa pindah halaman. Data tidak lengkap." });
      }
    } catch (err) {
      console.error("goToPage:", err);
      set({ error: "Gagal pindah soal." });
    } finally {
      set({ loading: false });
    }
  },

  submitAnswers: async () => {
    const pretest = get().pretest;
    if (!pretest?.user_quiz?.id) {
      set({ error: "Tidak ada quiz aktif untuk disubmit." });
      return { success: false } as SubmitResult;
    }
    try {
      set({ loading: true, error: null });
      const lastPage = pretest.paginate?.last_page || 1;
      const orderedAnswers: string[] = [];
      for (let i = 1; i <= lastPage; i++) {
        const saved = localStorage.getItem(`answer_${i}`);
        orderedAnswers.push(saved ?? "null");
      }
      const allAnswered = orderedAnswers.every((a) => a !== "null");
      if (!allAnswered) {
        set({ error: "Semua soal harus dijawab sebelum submit." });
        return { success: false } as SubmitResult;
      }

      const res = await submitPreTest(pretest.user_quiz.id, orderedAnswers);
      if (res?.success) {
        // Clean up localStorage
        for (let i = 1; i <= lastPage; i++) localStorage.removeItem(`answer_${i}`);
        localStorage.removeItem("pretest_answers");
        localStorage.removeItem("pretest_timeLeft");
        
        // Fetch test result
        const testResult = await fetchPreTestResult(pretest.user_quiz.id);
        set({ result: testResult, answers: {}, timeLeft: 0, isTimerStarted: false });
        return { success: true, testResult } as SubmitResult;
      }
      return { success: false } as SubmitResult;
    } catch (err) {
      console.error("submitAnswers:", err);
      set({ error: "Gagal submit jawaban." });
      return { success: false } as SubmitResult;
    } finally {
      set({ loading: false });
    }
  },

  startTimer: (durationSeconds) => {
    if (_timerId) {
      window.clearInterval(_timerId);
    }
    set({ timeLeft: durationSeconds, isTimerStarted: true });
    localStorage.setItem("pretest_timeLeft", String(durationSeconds));

    _timerId = window.setInterval(() => {
      const prev = get().timeLeft;
      const updated = prev > 0 ? prev - 1 : 0;
      set({ timeLeft: updated });
      localStorage.setItem("pretest_timeLeft", String(updated));
      if (updated === 0) {
        window.clearInterval(_timerId!);
        _timerId = null;
        set({ isTimerStarted: false });
        // Note: Auto-submit is handled by component watching timeLeft
      }
    }, 1000);
  },

  stopTimer: () => {
    if (_timerId) {
      window.clearInterval(_timerId);
      _timerId = null;
    }
    set({ isTimerStarted: false });
    localStorage.setItem("pretest_timeLeft", String(get().timeLeft));
  },

  resetStore: () => {
    if (_timerId) {
      window.clearInterval(_timerId);
      _timerId = null;
    }
    // Don't clear localStorage here - let component handle it
    set({
      pretest: null,
      result: null,
      loading: false,
      error: null,
      starting: false,
      answers: {},
      timeLeft: 0,
      isTimerStarted: false,
      currentPage: 1,
    });
  },
}));