export interface TransactionResponse {
  meta: Meta;
  data: TransactionFullDetail;
  code: number;
  message: string;
  status: string;
  success: boolean;
}

export interface Meta {
  code: number;
  status: string;
  message: string;
}

export interface TransactionFullDetail {
  id: string;
  amount: number;
  fee_amount: number;
  paid_amount: number;
  invoice_id: string;
  invoice_status: string;
  invoice_url: string;
  paid_at: string | null;
  created_at: string;
  expiry_date: string;
  payment_channel: string;
  payment_method: string;
  course: Course;
  product: Product;
  user: User;
  course_voucher: number | null;
}

export interface Course {
  id: string;
  sub_category_id: number;
  category: string;
  sub_category: string;
  title: string;
  sub_title: string;
  description: string;
  price: number;
  promotional_price: number | null;
  photo: string;
  rating: string;
  modules_count: number;
  is_premium: number;
  is_ready: number;
  slug: string;
  created: string;
  course_test_id: string;
  course_review_count: number;
  course_reviews: any[];
  user: AdminUser;
}

export interface Product {
  id: string;
  user: AdminUser;
  category: string;
  sub_category: string;
  title: string;
  sub_title: string;
  description: string;
  price: number;
  promotional_price: number | null;
  photo: string;
  rating: string;
  modules_count: number;
  is_premium: number;
  is_ready: number;
  slug: string;
  created: string;
  course_test_id: string;
  course_review_count: number;
  course_reviews: any[];
}

// User pembeli
export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  address: string;
  photo: string | null;
  banner: string | null;
  point: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  email_verified_at: string;
  user_photo: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  address: string;
  photo: string;
  banner: string | null;
  points: number;
  role: string;
  total_all_certificates: number;
  total_certificate: number;
  total_course_certificate: number;
  total_courses: number;
  total_reviews: number;
  user_courses_count: number;
  user_courses: any[];
  course_activities: any[];
  event_activities: any[];
  is_not_guest: boolean;
  created: string;
  created_at?: string;
}

export interface CourseVoucher {
  id?: string;
  code?: string;
  discount?: number;
  expiry_date?: string;
}
