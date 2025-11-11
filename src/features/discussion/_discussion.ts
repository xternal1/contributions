export interface DiscussionResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: Discussion[];
  success: boolean;
}

export interface Discussion {
  id: number;
  discussion_title: string;
  discussion_question: string;
  user: DiscussionUser;
  module: DiscussionModule;
  discussion_answers_count: number;
  discussion_tags: DiscussionTagWrapper[];
  time_ago: string;
  course_slug: string;
  slug: string;
}

export interface DiscussionUser {
  id: string;
  name: string;
  photo: string;
}

export interface DiscussionModule {
  id: string;
  title: string;
  step: number;
  slug: string;
  sub_title: string;
  course: DiscussionCourse;
  quizzes: DiscussionQuiz[];
  quizz_count: number;
  module_question_count: number;
  sub_modules: DiscussionSubModule[];
  sub_module_count: number;
  module_tasks: DiscussionTask[];
  module_task_count: number;
  is_done: boolean | null;
}

export interface DiscussionCourse {
  id: string;
  sub_category_id: number;
  user_id: string;
  title: string;
  sub_title: string;
  photo: string;
  slug: string;
  description: string;
  is_premium: number;
  price: number;
  is_ready: number;
  created_at: string;
  updated_at: string;
  promotional_price: number;
}

export interface DiscussionSubModule {
  id: string;
  module: string;
  step: number;
  module_id: string;
  title: string;
  slug: string;
  sub_title: string;
  url_youtube: string | null;
  course_id: string;
  course_title: string;
  course_slug: string;
  course_sub_title: string;
  course_sub_category: string;
}

export interface DiscussionQuiz {
  id: string;
  module_id: string;
  sub_module_slug_prev: string | null;
  sub_module_slug_next: string | null;
  course_slug: string;
  course_title: string;
  module_title: string;
  rules: string;
  module_slug: string;
  total_question: number;
  minimum_score: number;
  duration: number;
  retry_delay: number;
  user_latest_quiz: UserQuiz | null;
  user_quiz_me: UserQuiz | null;
  user_quizzes: UserQuiz | null;
  is_submited: boolean | null;
  created_at: string;
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
}


export interface DiscussionTask {
  id?: string;
  title?: string;
  description?: string;
  is_completed?: boolean;
}

export interface DiscussionTagWrapper {
  tag: DiscussionTag;
}

export interface DiscussionTag {
  id: number;
  name: string;
}


export interface DiscussionAnswerResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: DiscussionAnswer[];
  success: boolean;
}

export interface DiscussionAnswer {
  id: number;
  answer: string;
  discussion_answers: DiscussionAnswer[];
  discussion_answers_reply_count: number;
  discussion: {
    id: number;
    course_id: string;
    module_id: string;
    user_id: string;
    discussion_title: string;
    discussion_question: string;
    slug: string;
    created_at: string;
    updated_at: string;
  };
  user: DiscussionAnswerUser;
  time_ago: string;
}

export interface DiscussionAnswerUser {
  id: string;
  photo: string;
  name: string;
  email: string;
  points: number;
  phone_number: string;
  user_courses: UserCourse[];
  total_courses: number;
  total_reviews: number;
  course_reviews: CourseReview[];
  total_certificate: number;
  total_course_certificate: number;
  total_all_certificates: number;
  course_activities: CourseActivity[];
  event_activities: EventActivity[];
  address: string;
  banner: string;
  gender: string;
  created: string;
  is_not_guest: boolean;
  role: string;
}

export interface UserCourse {
  id: number;
  user_id: string;
  course_id: string;
  sub_module_id: string;
  has_pre_test: number;
  has_post_test: number;
  has_downloaded: number;
  created_at: string;
  updated_at: string;
}

export interface CourseReview {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  review: string;
  created_at: string;
  updated_at: string;
}

export interface CourseActivity {
  user: User;
  course: ActivityCourse;
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
  _debug_has_post_test_raw?: number;
  _debug_has_post_test_type?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
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

export interface ActivityCourse {
  id: string;
  module_count: number;
  module_task_count: number;
  sub_category: SubCategory;
  title: string;
  sub_title: string;
  description: string;
  is_premium: number;
  price: number;
  promotional_price: number | null;
  slug: string;
  photo: string;
  user: User;
  is_ready: number;
  ratings: number[];
  rating: number;
  status: string;
  step: number | null;
  course_test_id: string;
}

export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SubModule {
  id: string;
  module_id: string;
  step: number;
  title: string;
  slug: string;
  sub_title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface EventActivity {
  user: User;
  event: Event;
  status: string;
  reason: string | null;
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