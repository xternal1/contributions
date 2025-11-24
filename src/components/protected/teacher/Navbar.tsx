import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { HiSun } from "react-icons/hi";
import noProfile from "@assets/img/no-image/no-profile.jpeg";

interface NavbarProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

type ProfilData = {
    id?: string;
    photo?: string | null;
    name?: string;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // Read profile from localStorage (same as kode-mu)
    const [user] = useState<ProfilData | null>(() => {
        try {
            const raw = localStorage.getItem("profile");
            return raw ? (JSON.parse(raw) as ProfilData) : null;
        } catch {
            return null;
        }
    });

    return (
        <nav
            className={`fixed top-0 right-0 z-50 bg-white/80 dark:bg-[#141427] text-black dark:text-white backdrop-blur-md shadow-md h-20 ${isSidebarOpen
                    ? "w-[calc(100%-18rem)] transition-[width] duration-300 ease-out"
                    : "w-[calc(100%-6rem)] transition-[width] duration-300 ease-in"
                }`}
        >
            <div className="px-6 h-full flex items-center justify-between">
                {/* LEFT: hamburger */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-600 dark:text-gray-400 p-2 rounded hover:bg-gray-100 dark:hover:bg-[#0D0D1A] transition-colors duration-200"
                        aria-label="Toggle sidebar"
                    >
                        <FaBars className="w-5 h-5" />
                    </button>
                </div>

                {/* RIGHT: dark mode toggle + avatar */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle theme"
                        className="relative w-16 h-8 rounded-full transition-all duration-500 flex items-center bg-[#141427] dark:bg-white border border-gray-300 dark:border-white"
                    >
                        <div className="absolute inset-0 rounded-full flex justify-between items-center px-3 pointer-events-none">
                            <BsFillMoonStarsFill size={16} className="text-[#141427]" />
                            <HiSun size={18} className="text-white" />
                        </div>

                        <div
                            className={`absolute w-6 h-6 bg-white dark:bg-[#141427] rounded-full shadow-md transform transition-transform duration-500 ${darkMode ? "translate-x-8" : "translate-x-2"
                                }`}
                        />
                    </button>

                    {/* Profile Avatar */}
                    <Link to="/dashboard/user/profile" className="flex items-center">
                        <img
                            src={
                                user?.photo
                                    ? user.photo.startsWith("http")
                                        ? user.photo
                                        : `${import.meta.env.VITE_API_URL}/storage/${user.photo}`
                                    : noProfile
                            }
                            alt={user?.name ?? "Profile"}
                            className="w-9 h-9 rounded-full object-cover"
                            onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.onerror = null;
                                target.src = noProfile;
                            }}
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;