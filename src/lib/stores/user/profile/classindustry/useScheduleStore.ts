import { create } from 'zustand';

// Types
interface Event {
    title: string;
    desc?: string;
    link?: string;
    date: string;
    time: string;
    location?: string;
}

interface ScheduleState {
    // Calendar state
    selectedDate: number | null;
    selectedMonth: string;
    selectedYear: string;
    
    // Dropdown state
    isMonthOpen: boolean;
    isYearOpen: boolean;
    
    // Pagination state
    page: number;
    itemsPerPage: number;
    
    // Data
    events: Event[];
    months: string[];
    years: string[];
    
    // Actions
    setSelectedDate: (date: number | null) => void;
    setSelectedMonth: (month: string) => void;
    setSelectedYear: (year: string) => void;
    setIsMonthOpen: (isOpen: boolean) => void;
    setIsYearOpen: (isOpen: boolean) => void;
    setPage: (page: number) => void;
    
    // Computed actions
    handleMonthToggle: () => void;
    handleYearToggle: () => void;
    handleSelectMonth: (month: string) => void;
    handleSelectYear: (year: string) => void;
    
    // Getters (computed values)
    getCurrentEvents: () => Event[];
    getTotalPages: () => number;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
    // Initial state
    selectedDate: 10,
    selectedMonth: "January",
    selectedYear: "2021",
    isMonthOpen: false,
    isYearOpen: false,
    page: 1,
    itemsPerPage: 3,
    
    months: ["January", "February", "March"],
    years: ["2021", "2022", "2023"],
    
    events: [
        {
            title: "The Accessible Target Sizes Cheatsheet",
            desc: "Acara ini sepenuhnya GRATIS dan akan diselenggarakan hari Jumat, 6 September.",
            date: "March 20, 2021",
            time: "09:00 - 10:00 AM",
        },
        {
            title: "Zoom Designer",
            link: "https://meet.zoom.com/xyz",
            date: "23 March 2024",
            time: "09:00 – 10:00 WIB\n10:30 – 11:30 WIB",
            location: "SMK NEGERI 1 KEPANJEN",
        },
        {
            title: "Workshop UI/UX Mastery",
            desc: "Pelatihan desain interaktif untuk meningkatkan pengalaman pengguna.",
            date: "April 3, 2024",
            time: "08:30 - 11:00 AM",
            location: "Online via Google Meet",
        },
        {
            title: "Frontend Dev Conference",
            desc: "Konferensi developer front-end membahas teknologi React, Vue, dan Tailwind CSS.",
            date: "April 10, 2024",
            time: "09:00 - 17:00 WIB",
            location: "Jakarta Convention Center",
        },
        {
            title: "Creative Coding Challenge",
            desc: "Kompetisi bagi pelajar untuk membuat aplikasi inovatif berbasis web.",
            date: "April 15, 2024",
            time: "09:00 - 12:00 WIB",
            location: "SMK Negeri 1 Kepanjen",
        },
        {
            title: "Tech Talk: AI for Everyone",
            desc: "Sesi santai membahas penerapan AI dalam kehidupan sehari-hari.",
            date: "April 20, 2024",
            time: "13:00 - 15:00 WIB",
            location: "Zoom Meeting",
        },
    ],
    
    // Basic setters
    setSelectedDate: (date) => set({ selectedDate: date }),
    setSelectedMonth: (month) => set({ selectedMonth: month }),
    setSelectedYear: (year) => set({ selectedYear: year }),
    setIsMonthOpen: (isOpen) => set({ isMonthOpen: isOpen }),
    setIsYearOpen: (isOpen) => set({ isYearOpen: isOpen }),
    setPage: (page) => set({ page }),
    
    // Complex actions
    handleMonthToggle: () => set((state) => ({
        isMonthOpen: !state.isMonthOpen,
        isYearOpen: false,
    })),
    
    handleYearToggle: () => set((state) => ({
        isYearOpen: !state.isYearOpen,
        isMonthOpen: false,
    })),
    
    handleSelectMonth: (month) => set({
        selectedMonth: month,
        isMonthOpen: false,
    }),
    
    handleSelectYear: (year) => set({
        selectedYear: year,
        isYearOpen: false,
    }),
    
    // Computed getters
    getCurrentEvents: () => {
        const state = get();
        const startIndex = (state.page - 1) * state.itemsPerPage;
        return state.events.slice(startIndex, startIndex + state.itemsPerPage);
    },
    
    getTotalPages: () => {
        const state = get();
        return Math.ceil(state.events.length / state.itemsPerPage);
    },
}));