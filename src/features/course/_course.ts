// =============================
// COURSE UTAMA
// =============================

export interface Course {
  id: string;
  title: string;
  sub_title: string;
  slug: string;
  photo: string;

  is_premium: number;
  is_ready: number;

  price: number;
  promotional_price: number | null;

  rating: string;
  modules_count: number;
  course_reviews: [];
  course_review_count: number;
  user_courses_count: number;

  sub_category: string | SubCategory;
}

// =============================
// RATING & REVIEW
// =============================
export interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface CourseReview {
  id: number;
  user_id: string;
  course_id: string;
  rating: number;
  review: string;
  created_at: string;
  updated_at: string;

  course: Course;
  user: User;
}

// =============================
// MODULE & QUIZ
// =============================
export interface Quiz {
  module_slug: string;
  total_question: number;
}

export interface SubModule {
  id: string;
  title: string;
  content: string;
  step: number;
  module_id: string;
  slug: string;
  sub_title: string;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  title: string;
  sub_title: string;
  course_id: string;

  quizzes: Quiz[];
  quizz_count: number;

  sub_modules: SubModule[];
  sub_module_count: number;

  module_task_count: number;
}

// =============================
// DETAIL COURSE
// =============================
export interface DetailCourse {
  id: string;
  slug: string;
  title: string;
  sub_title: string;
  description: string;
  photo: string;

  price: number;
  promotional_price: number | null;

  rating: string;
  ratings: RatingBreakdown;
  ratings_percentage: RatingBreakdown;

  modules: Module[];
  course_reviews: CourseReview[];
  course_review_count: number;
  user_courses_count: number;

  // Status user
  user_course: User_Course | null;
  completed: string | null;
  course_test_id: string;
  is_admin: boolean;
  is_student: boolean;

  sub_category: string | SubCategory;

  created: string;
}


export interface User_Course {
  id: string;
  course_id: string;
  user_id: string;
  sub_module_id: string | null;
  has_pre_test: number;
  has_post_test: number;
  has_downloaded: number;
  created_at: string;
  updated_at: string;
  sub_module: SubModule | null;
  course: Course;
}

// =============================
// KATEGORI
// =============================
export interface SubCategory {
  id: number;
  name: string;
  course_count: number;
}

export interface Category {
  id: number;
  name: string;
  course_item_count: number;
  sub_category: SubCategory[];
}

export interface TopCourse {
  id: string;
  title: string;
  slug: string;
  photo: string;
  price: number;
  promotional_price: number | null;
  rating: number | null;
  sub_category: string;
  user: string;
  course_review_count: number;
  order?: number;
}

export interface TopRatingCourse {
  id: string;
  title: string;
  slug: string;
  photo: string;
  price: number;
  promotional_price: number | null;
  rating: number | null;
  sub_category: string;
  user: string;
  user_courses_count: number;
  order?: number;
}

// PreTes

export interface DataWrapper {
  paginate: Paginate;
  data: CourseData[];
  course_test: CourseTest;
  user_quiz: UserQuiz | null;
  test_result: TestResult | null;
  course: Course;
}

export interface Paginate {
  last_page: number;
  current_page: number;
}

export interface CourseData {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
}

export interface CourseTest {
  id: string;
  duration: number;
  total_question: number;
  is_submitted: number;
  course: Course;
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
  course_reviews: [];
  course_review_count: number;
  user_courses_count: number;
  created: string;
  is_ready: number;
  courseTestQuestions: CourseTestQuestion[];
}


export interface CourseTestQuestion {
  id: number;
  module: {
    id: string;
    title: string;
  };
  question_count: number;
}

export interface User {
  id: string;
  photo: string;
  name: string;
  email: string;
  points: number;
  phone_number: string;
  user_courses: User_Course[];
  total_courses: number;
  total_reviews: number;
  course_reviews: [];
  total_certificate: number;
  total_course_certificate: number;
  total_all_certificates: number;
  course_activities: CourseActivity[];
  event_activities: EventActivity[];
  address: string;
  banner: string | null;
  gender: string;
  created: string;
  is_not_guest: boolean;
  role: string;
}

export interface CourseActivity {
  user: User;
  course: Course;
  total_module: number;
  total_user: number;
  study_time: string;
  study_percentage: number;
  sub_module: SubModule;
  has_post_test: number;
  has_pre_test: number;
  sub_module_slug: string;
  unsubmitted_tasks: number;
  graded_tasks: number;
  ungraded_tasks: number;
  total_sub_module: number;
  completed_sub_modules: number;
  sub_module_step: number;
  max_sub_module_step: number;
  total_quiz: number;
  completed_quizzes: number;
  _debug_has_post_test_raw: number;
  _debug_has_post_test_type: string;
}

export interface EventActivity {
  user: EventUser;
  event: Event;
  status: string;
  reason: string | null;
}

export interface EventUser {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  point: number;
  phone_number: string;
  gender: string;
  address: string;
  photo: string;
  created_at: string;
  updated_at: string;
  banner: string | null;
  deleted_at: string | null;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  location: string | null;
  map_link: string | null;
  capacity: number;
  capacity_left: number;
  has_certificate: number;
  is_online: number;
  is_auto_approve: number;
  email_content: string;
  start_date_raw: string;
  start_date: string;
  start_hour: string;
  end_date_raw: string;
  end_date: string;
  end_hour: string;
  eventAttendance: EventAttendance;
  image: string;
  event_details: EventDetail[];
  start_in: string;
  created_at: string;
  event_sub_category_id: string | null;
  event_category_id: string | null;
}

export interface EventAttendance {
  id: number;
  event_id: string;
  attendance_date: string;
  attendance_link: string;
  created_at: string;
  updated_at: string;
}

export interface EventDetail {
  id: number;
  event_id: string;
  user: string;
  start: string;
  end: string;
  session: string;
  created_at: string;
  updated_at: string;
  event_date: string;
}

export interface UserQuiz {
  id: string;
  quiz_questions: string[];
  created_at: string;
}


export interface TestResult {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_classroom_name: string;
  user_class_level: string;
  user_photo: string;
  score: string;
  test_type: string;
  total_fault: number;
  total_correct: number;
  total_question: number;
  questions: Question[];
  course_slug: string
  updated_at: string;
  course: Course;
}

export interface Question {
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
