import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { HiSun } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import noProfile from "@assets/img/no-image/no-profile.jpeg";

interface NavbarProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

type ProfilData = {
    id?: string;
    photo?: string | null;
    name?: string;
    email?: string;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved === "dark";
    });
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        if (isProfileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileOpen]);

    // Read profile from localStorage
    const [user] = useState<ProfilData | null>(() => {
        try {
            const raw = localStorage.getItem("profile");
            return raw ? (JSON.parse(raw) as ProfilData) : null;
        } catch {
            return null;
        }
    });

    const handleLogout = () => {
        localStorage.removeItem("profile");
        localStorage.removeItem("token");
        setIsProfileOpen(false);
        navigate("/login");
    };

    const profileImageSrc = user?.photo
        ? user.photo.startsWith("http")
            ? user.photo
            : `${import.meta.env.VITE_API_URL}/storage/${user.photo}`
        : noProfile;

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

                    {/* Profile Avatar with Modal */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center focus:outline-none"
                        >
                            <img
                                src={profileImageSrc}
                                alt={user?.name ?? "Profile"}
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent hover:ring-purple-500 transition-all duration-200"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = noProfile;
                                }}
                            />
                        </button>

                        {/* Profile Modal */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#1A1A2E] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                                {/* User Info Section */}
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-left">
                                        User Profile
                                    </h3>

                                    <div className="flex items-start gap-4 mb-6">
                                        <img
                                            src={profileImageSrc}
                                            alt={user?.name ?? "Profile"}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                                            onError={(e) => {
                                                const target = e.currentTarget as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = noProfile;
                                            }}
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 text-left">
                                                {user?.name || "admin"}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <MdEmail className="w-4 h-4" />
                                                <span>{user?.email || "admin@gmail.com"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-2">
                                        <Link
                                            to="/dashboard/user/profile"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="block w-full py-3 px-4 text-center bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
                                        >
                                            Profile Saya
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full py-3 px-4 text-center bg-white dark:bg-[#141427] border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-medium rounded-lg transition-colors duration-200"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;