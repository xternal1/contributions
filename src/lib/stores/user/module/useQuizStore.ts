// src/lib/stores/user/module/useQuizStore.ts
import { create } from "zustand";
import {
  fetchQuizWorking,
  submitQuizAnswers,
  fetchQuizResult,
  checkCourseFinished,
} from "../../../../features/module/quiztes/_service/quiz_service";
import { fetchQuizDetail } from "../../../../features/module/_service/module_service";
import type {
  QuizWorkingResponse,
  QuizQuestion,
  QuizSubmitRequest,
  QuizData,
  QuizResult,
  QuizResultResponse,
  CourseStatusResponse,
} from "../../../../features/module/quiztes/_quiz";
import type { QuizType } from "../../../../features/module/_module";

type QuizState = {
  // Quiz Working State
  quiz: QuizData | null;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  userQuizId: string;
  timeLeft: number;
  loading: boolean;
  submitting: boolean;
  error: string | null;

  // Quiz Result State
  result: QuizResult | null;
  quizDetail: QuizType | null;
  resultLoading: boolean;
  resultError: string | null;
  headerMessage: string;
  courseTitle: string;
  isNavigating: boolean;

  // UI State
  showSuccessModal: boolean;

  // Actions - Quiz Working
  loadQuiz: (id: string) => Promise<void>;
  setCurrentIndex: (index: number) => void;
  selectAnswer: (questionId: string, option: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitQuiz: (autoSubmit?: boolean) => Promise<boolean>;
  decrementTime: () => void;
  setShowSuccessModal: (show: boolean) => void;

  // Actions - Quiz Result
  loadQuizResult: (id: string) => Promise<void>;
  loadQuizDetailForResult: (moduleSlug: string) => Promise<QuizType | null>;
  setIsNavigating: (navigating: boolean) => void;

  // Reset
  resetQuiz: () => void;
  resetResult: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  quiz: null,
  questions: [],
  currentIndex: 0,
  answers: {},
  userQuizId: "",
  timeLeft: 0,
  loading: true,
  submitting: false,
  error: null,

  result: null,
  quizDetail: null,
  resultLoading: true,
  resultError: null,
  headerMessage: "",
  courseTitle: "",
  isNavigating: false,

  showSuccessModal: false,

  // ===== Quiz working =====
  loadQuiz: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const firstResponse: QuizWorkingResponse = await fetchQuizWorking(id);
      const allQuestions = [...firstResponse.data.data];
      const totalPages = firstResponse.data.paginate.last_page;

      for (let page = 2; page <= totalPages; page++) {
        const nextResponse: QuizWorkingResponse = await fetchQuizWorking(`${id}?page=${page}`);
        allQuestions.push(...nextResponse.data.data);
      }

      set({
        quiz: firstResponse.data.quiz,
        questions: allQuestions,
        userQuizId: firstResponse.data.user_quiz.id,
        timeLeft: firstResponse.data.quiz.duration * 60,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("loadQuiz error", error);
      set({
        error: "Gagal memuat quiz.",
        loading: false,
      });
    }
  },

  setCurrentIndex: (index: number) => set({ currentIndex: index }),

  selectAnswer: (questionId: string, option: string) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: option } })),

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) set({ currentIndex: currentIndex + 1 });
  },

  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) set({ currentIndex: currentIndex - 1 });
  },

  submitQuiz: async (autoSubmit = false) => {
    const { userQuizId, questions, answers } = get();
    if (!userQuizId) return false;
    set({ submitting: true });

    try {
      const submitData: QuizSubmitRequest = {
        user_quiz_id: userQuizId,
        answers: questions.map((q) => ({
          quiz_question_id: q.id,
          answer: answers[q.id] || "",
        })),
      };

      const response = await submitQuizAnswers(submitData);
      if (response.success) {
        set({ showSuccessModal: true, submitting: false });
        return true;
      } else {
        if (!autoSubmit) alert("Gagal mengirim jawaban quiz.");
        set({ submitting: false });
        return false;
      }
    } catch (error) {
      if (!autoSubmit) alert("Terjadi kesalahan saat mengirim jawaban.");
      set({ submitting: false });
      return false;
    }
  },

  decrementTime: () => {
    set((state) => {
      const newTime = state.timeLeft - 1;
      if (newTime <= 0) {
        // auto submit
        get().submitQuiz(true);
        return { timeLeft: 0 };
      }
      return { timeLeft: newTime };
    });
  },

  setShowSuccessModal: (show: boolean) => set({ showSuccessModal: show }),

  // ===== Quiz result =====
  loadQuizDetailForResult: async (moduleSlug: string) => {
    try {
      const detail: QuizType = await fetchQuizDetail(moduleSlug);
      set({ quizDetail: detail });
      return detail;
    } catch (error) {
      console.error("loadQuizDetailForResult error", error);
      return null;
    }
  },

  loadQuizResult: async (id: string) => {
    set({ resultLoading: true, resultError: null });
    try {
      const response: QuizResultResponse = await fetchQuizResult(id);
      if (response.meta.code !== 200) throw new Error(response.meta.message);
      set({ result: response.data });

      const courseStatus: CourseStatusResponse = await checkCourseFinished(id);
      const courseFinished = courseStatus?.data?.status === "finished";
      const title = courseStatus?.data?.course?.title || "";
      set({ courseTitle: title });

      let message = "";
      if (response.data.status === "Lulus" || Number(response.data.score) >= 70 || courseFinished) {
        message = "🎉 Selamat, Anda berhasil menyelesaikan quiz!";
      } else {
        message = "😔 Maaf, kamu belum berhasil menyelesaikan quiz. Coba lagi nanti.";
      }
      set({ headerMessage: message });

      if (response.data.module_slug) await get().loadQuizDetailForResult(response.data.module_slug);

      set({ resultLoading: false });
    } catch (error) {
      console.error("loadQuizResult error", error);
      set({ resultError: "Gagal memuat hasil quiz.", resultLoading: false });
    }
  },

  setIsNavigating: (navigating: boolean) => set({ isNavigating: navigating }),

  // ===== reset =====
  resetQuiz: () =>
    set({
      quiz: null,
      questions: [],
      currentIndex: 0,
      answers: {},
      userQuizId: "",
      timeLeft: 0,
      loading: true,
      submitting: false,
      error: null,
      showSuccessModal: false,
    }),

  resetResult: () =>
    set({
      result: null,
      quizDetail: null,
      resultLoading: true,
      resultError: null,
      headerMessage: "",
      courseTitle: "",
      isNavigating: false,
    }),
}));
