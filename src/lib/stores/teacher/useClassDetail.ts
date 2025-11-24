import { create } from 'zustand';
import  {type Student}   from '@/data/classData';

interface ClassDetailState {
  currentPage: number;
  searchQuery: string;
  selectedGender: string;
  isGenderDropdownOpen: boolean;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedGender: (gender: string) => void;
  setIsGenderDropdownOpen: (isOpen: boolean) => void;
  getFilteredStudents: (students: Student[]) => Student[];
  getPaginatedStudents: (students: Student[]) => Student[];
  getTotalPages: (students: Student[]) => number;
  resetFilters: () => void;
}

export const useClassDetailStore = create<ClassDetailState>((set, get) => ({
  currentPage: 1,
  searchQuery: "",
  selectedGender: "Jenis Kelamin",
  isGenderDropdownOpen: false,

  setCurrentPage: (page) => set({ currentPage: page }),
  
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  
  setSelectedGender: (gender) => set({ 
    selectedGender: gender, 
    currentPage: 1,
    isGenderDropdownOpen: false 
  }),
  
  setIsGenderDropdownOpen: (isOpen) => set({ isGenderDropdownOpen: isOpen }),

  getFilteredStudents: (students) => {
    const { searchQuery, selectedGender } = get();
    return students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGender = selectedGender === "Jenis Kelamin" || student.gender === selectedGender;
      return matchesSearch && matchesGender;
    });
  },

  getPaginatedStudents: (students) => {
    const { currentPage } = get();
    const filtered = get().getFilteredStudents(students);
    return filtered.slice((currentPage - 1) * 10, currentPage * 10);
  },

  getTotalPages: (students) => {
    const filtered = get().getFilteredStudents(students);
    return Math.ceil(filtered.length / 10) || 1;
  },

  resetFilters: () => set({ 
    currentPage: 1, 
    searchQuery: "", 
    selectedGender: "Jenis Kelamin" 
  })
}));