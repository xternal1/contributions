import api from "../../../../services/api";
import type {
  QuizWorking,
  CheckFinishedCourse,
  QuizResult,
  QuizSubmitResponse,
  QuizSubmitPayload,
} from "../_quiz";

// ============================
// 1️⃣ QUIZ WORKING (GET)
// ============================
export async function fetchQuizWorking(quizId: string): Promise<QuizWorking> {
  try {
    const response = await api.get(`/api/quizzes/working/${quizId}`);
    return response.data?.data as QuizWorking;
  } catch (error) {
    console.error(`Gagal mengambil data kuis ID ${quizId}:`, error);
    throw error;
  }
}

// ============================
// 2️⃣ CHECK FINISHED COURSE (GET)
// ============================
export async function fetchCheckFinishedCourse(
  userQuizId: string
): Promise<CheckFinishedCourse> {
  try {
    const response = await api.get(`/api/check-finished-course/${userQuizId}`);
    return response.data?.data as CheckFinishedCourse;
  } catch (error) {
    console.error(`Gagal mengecek status course userQuiz ${userQuizId}:`, error);
    throw error;
  }
}

// ============================
// 3️⃣ QUIZ RESULT (GET)
// ============================
export async function fetchQuizResult(userQuizId: string): Promise<QuizResult> {
  try {
    const response = await api.get(`/api/quizzes-result/${userQuizId}`);
    return response.data?.data as QuizResult;
  } catch (error) {
    console.error(`Gagal mengambil hasil kuis userQuiz ${userQuizId}:`, error);
    throw error;
  }
}

// ============================
// 4️⃣ QUIZ SUBMIT (POST)
// ============================
export async function submitQuiz(
  quizId: string,
  payload: QuizSubmitPayload
): Promise<QuizSubmitResponse> {
  try {
    const response = await api.post(`/api/quizzes-submit/${quizId}`, payload);
    return response.data as QuizSubmitResponse;
  } catch (error) {
    console.error(`Gagal mengirim hasil kuis ID ${quizId}:`, error);
    throw error;
  }
}
