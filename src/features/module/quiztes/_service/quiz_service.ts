import api from "../../../../services/api";
import type { 
  QuizWorkingResponse, 
  QuizResultResponse, 
  CourseStatusResponse, 
  QuizSubmitResponse,
  QuizSubmitRequest 
} from "../_quiz";

export async function fetchQuizWorking(quizId: string): Promise<QuizWorkingResponse> {
  try {
    const response = await api.get(`api/quizzes/working/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengambil data quiz ${quizId}:`, error);
    throw error;
  }
}

export async function checkCourseFinished(userId: string): Promise<CourseStatusResponse> {
  try {
    const response = await api.get(`api/check-finished-course/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengecek status kelulusan user ${userId}:`, error);
    throw error;
  }
}

export async function fetchQuizResult(userQuizId: string): Promise<QuizResultResponse> {
  try {
    const response = await api.get(`api/quizzes-result/${userQuizId}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengambil hasil quiz ${userQuizId}:`, error);
    throw error;
  }
}

// src/features/module/quiztes/_service/quiz_service.ts

export async function submitQuizAnswers(submitData: QuizSubmitRequest): Promise<QuizSubmitResponse> {
  try {
    // ✅ Bentuk payload sesuai format backend
    const payload = {
      answer: submitData.answers.map((a) => `option_${a.answer}`), // ubah jadi array string saja
    };

    console.log("📤 Payload dikirim ke API:", payload);

    const response = await api.post(
      `/api/quizzes-submit/${submitData.user_quiz_id}`,
      payload
    );

    console.log("✅ Response API submit quiz:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal submit jawaban quiz:", error);
    throw error;
  }
}
