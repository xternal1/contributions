import api from "../../../services/api";
import type { Course, Category, SubCategory, DetailCourse, TopCourse, TopRatingCourse, DataWrapper, TestResult, CourseActivity  } from "../_course";

// =============================
// COURSE
// =============================

/**
 * Ambil daftar semua course
 */
export async function fetchCourses(): Promise<Course[]> {
  try {
    const response = await api.get("/api/courses");
    // response.data.data.data → karena pagination biasanya nested
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil data courses:", error);
    throw error;
  }
}

/**
 * Ambil detail course berdasarkan slug
 */
export async function fetchCourseDetail(slug: string): Promise<DetailCourse | null> {
  try {
    const response = await api.get(`/api/courses/${slug}`);
    return response.data?.data || null;
  } catch (error) {
    console.error("Gagal mengambil data course:", error);
    throw error;
  }
}

// =============================
// CATEGORY & SUBCATEGORY
// =============================

/**
 * Ambil semua sub kategori (flat, tanpa nested)
 */
export async function fetchSubCategories(): Promise<SubCategory[]> {
  try {
    const response = await api.get("/api/sub-categories");
    return response.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil data subkategori:", error);
    throw error;
  }
}

/**
 * Ambil kategori utama (dengan nested sub_category)
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await api.get("/api/categories");
    // response.data.data.data → biasanya untuk paginated response
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil data kategori:", error);
    throw error;
  }
}

// =============================
// UTILS
// =============================

/**
 * Utility: Ambil nama subkategori (string atau object)
 */
export function getSubCategoryName(sub: string | SubCategory): string {
  return typeof sub === "string" ? sub : sub?.name ?? "";
}

// fetch khusus top course
export async function fetchTopCourses(): Promise<TopCourse[]> {
  try {
    const response = await api.get("/api/top-courses");
    return response.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil data top courses:", error);
    throw error;
  }
}

// fetch khusus top rating course
export async function fetchTopRatingCourses(): Promise<TopRatingCourse[]> {
  try {
    const response = await api.get("/api/top-rating-courses");
    return response.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil data top courses:", error);
    throw error;
  }
}


// PreTest
export async function fetchPreTest(course_test_id: string): Promise<DataWrapper | null> {
  try {
    const response = await api.get(`/api/course-pre-test/${course_test_id}`);
    return response.data?.data || null;
  } catch (error) {
    console.error("Gagal mengambil data pretest id:", error);
    return null;
  }
}


// Kirim jawaban user ke backend
export async function submitPreTest(user_course_test_id: string | number, answer: string[]) {
  try {
    const response = await api.post(
      `/api/course-submit-test/${user_course_test_id}`,
      { answer }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Gagal submit pretest:", error);
    throw error;
  }
}

// Hasil PreTesty
export async function fetchPreTestResult(id: string): Promise<TestResult | null> {
  try {
    const response = await api.get(`/api/course-test-statistic/${id}`);
    return response.data?.data || null;
  } catch (error) {
    console.error("Gagal mengambil data pretest id:", error);
    return null;
  }
}

export async function fetchNavigate(slug: string): Promise<CourseActivity | null> {
  try {
    const response = await api.post(`/api/student/lesson-start/${slug}`);
    return response.data?.data || null;
  } catch (error) {
    console.error("Gagal mengambil data pretest id:", error);
    return null;
  }
}