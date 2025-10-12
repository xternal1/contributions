// ===============================
// QUIZ WORKING
// ===============================
export interface QuizPaginate {
  last_page: number;
  current_page: number;
}

export interface UserLatestQuiz {
  id: string;
  score: number;
  created_at: string;
}

export interface QuizWorkingInfo {
  id: string;
  module_id: string;
  course_slug: string;
  course_title: string;
  module_title: string;
  rules: string;
  total_question: number;
  minimum_score: number;
  duration: number;
  user_latest_quiz: UserLatestQuiz;
}

export interface QuizQuestion {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
}

export interface UserQuiz {
  id: string;
  created_at: string;
  quiz_questions: string[];
}

export interface QuizWorking {
  paginate: QuizPaginate;
  quiz: QuizWorkingInfo;
  data: QuizQuestion[];
  user_quiz: UserQuiz;
}

// ===============================
// CHECK FINISHED COURSE
// ===============================
export interface CourseUser {
  id: string;
  photo: string;
  name: string;
  email: string;
  points: number;
  phone_number: string;
  gender: string;
  address: string;
  role: string;
}

export interface FinishedCourseDetail {
  id: string;
  user: CourseUser;
  sub_category: string;
  course_test_id: string;
  category: string;
  title: string;
  sub_title: string;
  description: string;
  slug: string;
  is_premium: number;
  price: number;
  promotional_price: number | null;
  photo: string;
  modules_count: number;
  rating: string;
  course_review_count: number;
  user_courses_count: number;
  created: string;
  is_ready: number;
}

export interface CheckFinishedCourse {
  status: string;
  parameter: string;
  course: FinishedCourseDetail;
}

// ===============================
// QUIZ RESULT
// ===============================
export interface QuizResultQuestion {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_answer: string;
  user_answer: string;
  correct: boolean;
}

export interface QuizResult {
  id: string;
  score: string;
  total_fault: number;
  total_correct: number;
  status: string;
  total_question: number;
  questions: QuizResultQuestion[];
  updated_at: string;
}

// ===============================
// QUIZ SUBMIT PAYLOAD & RESPONSE
// ===============================
export interface QuizSubmitPayload {
  user_quiz_id: string;
  answers: {
    question_id: string;
    selected_option: string;
  }[];
}

export interface QuizSubmitResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: boolean;
  success: boolean;
}
