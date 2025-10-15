// ==================== TIPE DATA ====================

export interface QuizQuestion {
  id: string;
  module_id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
}

export interface UserQuiz {
  id: string;
  user_id: string;
  quiz_id: string;
  module_question_id: string;
  answer: string;
  score: number;
  created_at: string;
  updated_at: string;
  quiz_questions: string[];
}

export interface QuizRules {
  rules: string;
}

export interface QuizData {
  id: string;
  module_id: string;
  sub_module_slug_prev: string;
  sub_module_slug_next: string;
  course_slug: string;
  course_title: string;
  module_title: string;
  rules: string;
  module_slug: string;
  total_question: number;
  minimum_score: number;
  duration: number;
  retry_delay: number;
  user_latest_quiz: UserQuiz;
  user_quiz_me: UserQuiz;
  user_quizzes: UserQuiz;
  is_submited: null | boolean;
  created_at: string;
}

export interface QuizWorkingResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: {
    paginate: {
      last_page: number;
      current_page: number;
    };
    quiz: QuizData;
    data: QuizQuestion[];
    user_quiz: UserQuiz;
  };
  success: boolean;
}

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
  module_slug: string;
  questions: QuizResultQuestion[];
  updated_at: string;
  // Tambahkan field baru untuk navigasi
  course_slug?: string;
  quiz_slug?: string;
}

export interface QuizResultResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: QuizResult;
  success: boolean;
}

export interface CourseStatus {
  status: "not_finished" | "finished";
  parameter: string;
  course: {
    id: string;
    user: {
      id: string;
      photo: string;
      name: string;
      email: string;
      points: number;
      phone_number: string;
      user_courses: unknown[];
      total_courses: number;
      total_reviews: number;
      course_reviews: unknown[];
      total_certificate: number;
      total_course_certificate: number;
      total_all_certificates: number;
      course_activities: unknown[];
      event_activities: unknown[];
      address: string;
      banner: null | string;
      gender: string;
      created: string;
      is_not_guest: boolean;
      role: string;
    };
    sub_category: string;
    course_test_id: string;
    category: string;
    title: string;
    sub_title: string;
    description: string;
    slug: string;
    is_premium: number;
    price: number;
    promotional_price: null | number;
    photo: string;
    modules_count: number;
    rating: string;
    course_reviews: unknown[];
    course_review_count: number;
    user_courses_count: number;
    created: string;
    is_ready: number;
  };
}

export interface CourseStatusResponse {
  meta: {
    code: number;
    status: string;
    message: null | string;
  };
  data: CourseStatus;
  success: boolean;
}

export interface QuizSubmitRequest {
  user_quiz_id: string;
  answers: {
    quiz_question_id: string;
    answer: string;
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