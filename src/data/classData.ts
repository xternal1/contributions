export interface Student {
  id: number;
  name: string;
  class: string;
  gender: "Laki - laki" | "Perempuan";
  nisn: string;
  avatar: string;
}

export interface SchoolData {
  name: string;
  logo: string;
  type: string;
  tahunAjaran: string;
  kepalaSekolah: string;
  npsn: string;
  nomorTelepon: string;
  email: string;
  jenjangPendidikan: string;
  akreditasi: string;
  deskripsi: string;
  alamat: string;
}

export interface TeacherData {
  name: string;
  role: string;
  avatar: string;
}

export interface ClassItem {
  id: number;
  title: string;
  category: string;
  division: string;
  teacherName: string;
  teacherTitle: string;
  teacherAvatar: string;
}

// Mock Students Data
export const mockStudents: Student[] = Array(10).fill(null).map((_, i) => ({
  id: i + 1,
  name: "Ahmad Lukman Hakim",
  class: "X RPL 1",
  gender: "Laki - laki",
  nisn: "0987654567",
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`
}));

// Mock School Data
export const mockSchoolData: SchoolData = {
  name: "SMK NEGERI 1 KEPANJEN",
  logo: "https://api.dicebear.com/7.x/shapes/svg?seed=school",
  type: "Negeri",
  tahunAjaran: "2023/2024",
  kepalaSekolah: "Lasmono S.Pd.Mm",
  npsn: "123123123",
  nomorTelepon: "082229414949",
  email: "smkn1kepanjen@gmail.com",
  jenjangPendidikan: "SMA/SMK/MA",
  akreditasi: "C",
  deskripsi: "-",
  alamat: "Jl, Ngadiluwih, Kedungpedaringan, Kec. Kepanjen, Kabupaten Malang, Jawa Timur 65163, Indonesia"
};

// Mock Teacher Data
export const mockTeacherData: TeacherData = {
  name: "Suyadi Oke Joss Sp.d",
  role: "Wali Kelas XII RPL 1",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher"
};

// Mock Mentor Data
export const mockMentorData: TeacherData = {
  name: "Alfian Justin",
  role: "Mentor Kelas Industri",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mentor"
};

// Mock Classes Data (from ClassList)
export const mockClasses: ClassItem[] = [
  {
    id: 1,
    title: "XII DKV 2",
    category: "SMKN 1 KEPANJEN",
    division: "Devisi Web Development",
    teacherName: "Wali Kelas",
    teacherTitle: "Suyadi Oke Joss Sp.d",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1",
  },
  {
    id: 2,
    title: "XII DKV 2",
    category: "SMKN 1 KEPANJEN",
    division: "Devisi UI/UX Design",
    teacherName: "Wali Kelas",
    teacherTitle: "Suyadi Oke Joss Sp.d",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher2",
  },
  {
    id: 3,
    title: "XII DKV 2",
    category: "SMKN 1 KEPANJEN",
    division: "Devisi Mobile",
    teacherName: "Wali Kelas",
    teacherTitle: "Suyadi Oke Joss Sp.d",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher3",
  },
  {
    id: 4,
    title: "XII DKV 2",
    category: "SMKN 1 KEPANJEN",
    division: "Devisi Digital Marketing",
    teacherName: "Wali Kelas",
    teacherTitle: "Suyadi Oke Joss Sp.d",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher4",
  },
];