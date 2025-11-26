export interface Student {
  id: number;
  name: string;
  class: string;
  photo: string;
  grade: number | null;
}

export interface ClassOption {
  id: string;
  name: string;
}

export const years = ["2024/2025", "2023/2024", "2022/2023"];

export const classOptions: ClassOption[] = [
  { id: "kelas10", name: "Kelas 10" },
  { id: "kelas11", name: "Kelas 11" },
  { id: "kelas12", name: "Kelas 12" },
];

export const classList = [
  "XII RPL 1",
  "XII RPL 2",
  "XI DKV 1",
  "X DKV 1",
  "X DKV 2",
];

export const students: Student[] = Array(9).fill(null).map((_, i) => ({
  id: i + 1,
  name: "Ahmad Lukman Hakim",
  class: "X RPL 1",
  photo: `https://ui-avatars.com/api/?name=Ahmad+Lukman&background=7C3AED&color=fff&seed=${i}`,
  grade: i === 0 ? null : 7.8,
}));