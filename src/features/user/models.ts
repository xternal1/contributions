// Type untuk user
export interface LoginResponse {
  user: User;
  token: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  point: number;
  phone_number: string;
  gender: Gender;
  address: string;
  photo: string | null;
  banner: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

// Type untuk request login
export interface LoginPayload {
  email: string;
  password: string;
}

// Type untuk request register
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UpdatePasswordPayload {
  old_password: string;
  password: string;
  password_confirmation: string;
}

export interface DashboardDataCourse {
  courses_count: number;
  completed_courses: number;
  incomplete_courses: number;

}

// =======================
// User Profile Interfaces
// =======================

export interface ProfilData {
  id: string;
  photo: string;
  name: string;
  email: string;
  points: number;
  phone_number: string;
  user_courses: CourseUser[];
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
  gender: Gender;
  created: string;
  is_not_guest: boolean;
  role: string;
}

export type Gender = "laki-laki" | "perempuan";

export interface CourseUser {
  id: string;
  user_id: string;
  course_id: string;
  sub_module_id: string | null;
  has_pre_test: number;
  has_post_test: number;
  has_downloaded: number;
}

export interface CourseActivity {
  user: CourseUserData;
  course: CourseDetail;
  total_module: number;
  total_user: number;
  study_time: string;
  study_percentage: number;
  sub_module: SubModule | null;
  has_post_test: number;
  has_pre_test: number;
  sub_module_slug: string | null;
  unsubmitted_tasks: number;
  graded_tasks: number;
  ungraded_tasks: number;
  total_sub_module: number;
  completed_sub_modules: number;
  sub_module_step: number;
  max_sub_module_step: number;
  total_quiz: number;
  completed_quizzes: number;
}

// Data user yang sedang ikut course
export interface CourseUserData {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  point: number;
  phone_number: string;
  gender: Gender;
  address: string;
  photo: string;
  created_at: string;
  updated_at: string;
  banner: string | null;
  deleted_at: string | null;
}

// Detail course
export interface CourseDetail {
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
  user: TeacherUser;
  is_ready: number;
  ratings: number[];
  rating: number;
  status: string;
  step: number | null;
  course_test_id: string;
}

// Sub kategori course
export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// Pengajar course
export interface TeacherUser {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  point: number;
  phone_number: string;
  gender: Gender;
  address: string;
  photo: string;
  created_at: string;
  updated_at: string;
  banner: string | null;
  deleted_at: string | null;
}

// Sub module (materi/step kursus)
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


export interface Paginate {
  last_page: number;
  current_page: number;
}

export interface EventPaginateResponse {
  paginate: Paginate;
  data: EventActivity[];
}


export interface EventActivity {
  id: number;
  user: EventUser;
  event: EventData;
  status: "pending" | "accepted" | "canceled" | "declined";
  event_time_status: string;
  reason: string | null;
  created_at: string;
}

export interface EventUser {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  point: number;
  phone_number: string;
  gender: Gender;
  address: string;
  photo: string;
  created_at: string;
  updated_at: string;
  banner: string | null;
  deleted_at: string | null;
}

export interface EventData {
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
  relativeTime: string;
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

