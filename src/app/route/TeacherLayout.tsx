import React, { useState } from "react";
import Sidebar from "@components/protected/teacher/Sidebar";
import Navbar from "@/components/protected/teacher/Navbar";
import { Outlet } from "react-router-dom";

export default function TeacherLayout({ children }: { children?: React.ReactNode }) {
    // Load sidebar state from localStorage, default to true (open)
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        const saved = localStorage.getItem('sidebarOpen');
        return saved ? JSON.parse(saved) : true;
    });

    const toggleSidebar = () => {
        setIsSidebarOpen((prev: boolean) => {
            const newState = !prev;
            localStorage.setItem('sidebarOpen', JSON.stringify(newState));
            return newState;
        });
    };

    const closeSidebar = () => {
        // Only close on mobile, don't change the persistent state
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-[#141427]">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-24"
                }`}>
                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                {/* Page Content */}
                <main className="flex-1 pt-20 p-6">
                    {children}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}