import api from "../../../services/api";
import type { ModuleType, SubModuleDetailType, QuizType, ModuleTaskType, CoursePostTestResponse,QuizResponse, UserQuizResult, UserQuizResultResponse} from "../_module";

// Ambil semua module dari course
export async function fetchModules(courseSlug: string): Promise<ModuleType[]> {
  try {
    const response = await api.get(`/api/list-module/${courseSlug}`);
    return response.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil data module:", error);
    throw error;
  }
}

// Ambil detail submodule
export async function fetchSubModule(slug: string): Promise<SubModuleDetailType> {
  try {
    const response = await api.get(`/api/sub-modules/detail/${slug}`);
    return response.data?.data;
  } catch (error) {
    console.error(`Gagal mengambil detail submodule ${slug}:`, error);
    throw error;
  }
}

export async function fetchQuizDetail(slug: string): Promise<QuizType> {
  try {
    const response = await api.get<QuizResponse>(`/api/quizzes/${slug}`);
    // kembalikan objek quiz langsung
    return response.data.data;
  } catch (error) {
    console.error(`❌ Gagal mengambil detail quiz ${slug}:`, error);
    throw error;
  }
}

// Ambil semua task berdasarkan module_id
export async function fetchModuleTasks(moduleId: string): Promise<ModuleTaskType[]> {
  try {
    const response = await api.get(`/api/module-tasks/${moduleId}`); 
    return response.data?.data || [];
  } catch (error) {
    console.error(`Gagal mengambil tugas modul ${moduleId}:`, error);
    throw error;
  }
}

// Ambil Final Audit / Course Post Test berdasarkan course_test_id
export async function fetchCoursePostTest(courseTestId: string): Promise<CoursePostTestResponse> {
  try {
    const response = await api.get(`/api/course-post-test/${courseTestId}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengambil course post test ${courseTestId}:`, error);
    throw error;
  }
}

// Ambil hasil kuis user berdasarkan slug module
export async function fetchUserQuizResult(slugModule: string): Promise<UserQuizResult[]> {
  try {
    const response = await api.get<UserQuizResultResponse>(`/api/user-quizzes/${slugModule}`);
    return response.data.data || [];
  } catch (error) {
    console.error(`❌ Gagal mengambil hasil kuis user untuk module ${slugModule}:`, error);
    throw error;
  }
}