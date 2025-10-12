export interface EventAttendance {
  id: number;
  event_id: string;
  attendance_date: string;
  attendance_link: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  pagination: PaginateEvent;
  data: Eventype[];
}

export interface PaginateEvent {
  last_page: number;
  current_page: number;
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

export interface Eventype {
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
  image: string;
  start_in: string;
  created_at: string;
  eventAttendance: EventAttendance;
  event_details: EventDetail[];
  event_category_id: string;
  event_sub_category_id: string;
}


// Sub kategori event
export interface EventSubCategory {
  id: string;
  event_category_id: string;
  name: string;
}

// Kategori event
export interface EventCategory {
  id: string;
  name: string;
  sub_category: EventSubCategory[];
}