import { create } from 'zustand';
import type { DashboardDataCourse, CourseActivity, EventActivity } from "@features/user/models";
import { DataCourse, fetchUserCourses, fetchUserEvent } from "@features/user/user_service";

interface DashboardState {
    profile: DashboardDataCourse | null;
    event: EventActivity[];
    courses: CourseActivity[];
    loading: boolean;
    coursePage: number;
    eventPage: number;
    setProfile: (profile: DashboardDataCourse | null) => void;
    setEvent: (event: EventActivity[]) => void;
    setCourses: (courses: CourseActivity[]) => void;
    setLoading: (loading: boolean) => void;
    setCoursePage: (page: number) => void;
    setEventPage: (page: number) => void;
    loadDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    profile: null,
    event: [],
    courses: [],
    loading: true,
    coursePage: 1,
    eventPage: 1,
    setProfile: (profile) => set({ profile }),
    setEvent: (event) => set({ event }),
    setCourses: (courses) => set({ courses }),
    setLoading: (loading) => set({ loading }),
    setCoursePage: (coursePage) => set({ coursePage }),
    setEventPage: (eventPage) => set({ eventPage }),
    loadDashboardData: async () => {
        try {
            const [profileData, courseData, eventData] = await Promise.all([
                DataCourse(),
                fetchUserCourses(1),
                fetchUserEvent(1),
            ]);
            set({
                profile: profileData,
                courses: courseData,
                event: eventData,
            });
        } catch (err) {
            console.error("Gagal memuat dashboard:", err);
        } finally {
            set({ loading: false });
        }
    },
}));