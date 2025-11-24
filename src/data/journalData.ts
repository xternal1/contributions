export interface Journal {
  id: number;
  no: number;
  title: string;
  image: string;
  date: string;
  class: string;
  description: string;
}

export interface JournalAttendance {
  id: number;
  no: number;
  name: string;
  class: string;
  status: "Hadir" | "Sakit" | "Izin" | "Alfa";
}

export interface JournalDetail {
  id: number;
  title: string;
  image: string;
  description: string;
  attendances: JournalAttendance[];
}

export interface Student {
  id: number;
  name: string;
  class: string;
}

// Mock Journals Data
export const mockJournals: Journal[] = [
  {
    id: 1,
    no: 1,
    title: "XII RPL 1 - SMKN 1 Kepanjen",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=journal1",
    date: "10 Januari 2023",
    class: "XII RPL 1 - SMKN 1 Kepanjen",
    description: "Lorem ipsum dolor si amet...."
  },
  {
    id: 2,
    no: 1,
    title: "XII RPL 1 - SMKN 1 Kepanjen",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=journal2",
    date: "10 Januari 2023",
    class: "XII RPL 1 - SMKN 1 Kepanjen",
    description: "Lorem ipsum dolor si amet...."
  },
  {
    id: 3,
    no: 1,
    title: "XII RPL 1 - SMKN 1 Kepanjen",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=journal3",
    date: "10 Januari 2023",
    class: "XII RPL 1 - SMKN 1 Kepanjen",
    description: "Lorem ipsum dolor si amet...."
  },
  {
    id: 4,
    no: 1,
    title: "XII RPL 1 - SMKN 1 Kepanjen",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=journal4",
    date: "10 Januari 2023",
    class: "XII RPL 1 - SMKN 1 Kepanjen",
    description: "Lorem ipsum dolor si amet...."
  },
  {
    id: 5,
    no: 1,
    title: "XII RPL 1 - SMKN 1 Kepanjen",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=journal5",
    date: "10 Januari 2023",
    class: "XII RPL 1 - SMKN 1 Kepanjen",
    description: "Lorem ipsum dolor si amet...."
  },
  {
    id: 6,
    no: 1,
    title: "XII RPL 1 - SMKN 1 Kepanjen",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=journal6",
    date: "10 Januari 2023",
    class: "XII RPL 1 - SMKN 1 Kepanjen",
    description: "Lorem ipsum dolor si amet...."
  },
  {
    id: 7,
    no: 1,
    title: "XII RPL 1 - SMKN 1 Kepanjen",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=journal7",
    date: "10 Januari 2023",
    class: "XII RPL 1 - SMKN 1 Kepanjen",
    description: "Lorem ipsum dolor si amet...."
  }
];

// Mock Journal Detail Data
export const mockJournalDetail: JournalDetail = {
  id: 1,
  title: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=journaldetail",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  attendances: Array(8).fill(null).map((_, i) => ({
    id: i + 1,
    no: 1,
    name: "Afhan Fahrul Ban Dalam",
    class: "XII RPL 1",
    status: "Hadir" as const
  }))
};

// Mock Students for Attendance
export const mockStudentsForAttendance: Student[] = Array(10).fill(null).map((_, i) => ({
  id: i + 1,
  name: "Ahmad Lukman Hakim",
  class: "X RPL 1"
}));
