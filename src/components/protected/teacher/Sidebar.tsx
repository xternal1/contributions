import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    HiOutlineViewGrid,
    HiOutlinePuzzle,
    HiOutlineClipboardList,
    HiOutlineBeaker,
    HiOutlineClipboard,
    HiOutlineCash,
    HiOutlineChartBar,
    HiOutlineExclamation,
} from "react-icons/hi";
import { FaDoorOpen } from "react-icons/fa";
import { BsJournalBookmark } from "react-icons/bs";

const menuItems = {
    home: [
        { name: "Dashboard", to: "/dashboard/teacher", Icon: HiOutlineViewGrid },
    ],
    content: [
        { name: "Kelas", to: "/teacher/classlist", Icon: FaDoorOpen },
        { name: "Challenge", to: "/challenge", Icon: HiOutlinePuzzle },
        { name: "Jurnal", to: "/teacher/journals", Icon: BsJournalBookmark },
        { name: "Rapot", to: "/rapot", Icon: HiOutlineClipboardList },
        { name: "Test", to: "/test", Icon: HiOutlineBeaker },
        { name: "UAS", to: "/uas", Icon: HiOutlineClipboard },
        { name: "Gaji", to: "/gaji", Icon: HiOutlineCash },
        { name: "Peringkat", to: "/peringkat", Icon: HiOutlineChartBar },
        { name: "SOP", to: "/sop", Icon: HiOutlineExclamation },
    ],
};

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
    toggleSidebar?: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
    const location = useLocation();
    const isActive = (path: string) => location.pathname.includes(path);

    // Track dark mode state
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.documentElement.classList.contains('dark');
    });

    // Listen for dark mode changes
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-white dark:bg-[#0B0B15] min-h-screen border-r border-gray-100 dark:border-[#171725] z-40 transition-[width] duration-300 ${isOpen ? "w-72" : "w-24"
                }`}
        >
            <div className="h-full overflow-y-auto overflow-x-hidden p-6 space-y-6">
                {/* Brand */}
                <div className={`flex items-center gap-2 min-h-[40px] ${!isOpen ? "justify-center" : ""}`}>
                    {isOpen ? (
                        <img
                            src={isDarkMode
                                ? "/src/assets/img/logo/get-skill/landscape white.png"
                                : "/src/assets/img/logo/get-skill/landscape 3.png"
                            }
                            alt="Logo"
                            className="w-full h-auto transition-opacity duration-300"
                        />
                    ) : (
                        <img
                            src={isDarkMode
                                ? "/src/assets/img/logo/get-skill/logo white.png"
                                : "/src/assets/img/logo/get-skill/logo 3.png"
                            }
                            alt="Logo"
                            className="w-10 h-10 object-contain transition-opacity duration-300"
                        />
                    )}
                </div>
                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {/* HOME Section */}
                    <div className={`flex flex-item text-xs font-bold text-gray-900 dark:text-white mb-2 overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 max-h-10" : "opacity-0 max-h-0"
                        }`}>
                        HOME
                    </div>
                    {menuItems.home.map(({ name, to, Icon }) => (
                        <SidebarItem
                            key={name}
                            label={name}
                            icon={<Icon size={18} />}
                            path={to}
                            active={isActive(to)}
                            closeSidebar={closeSidebar}
                            isOpen={isOpen}
                        />
                    ))}

                    {/* CONTENT Section */}
                    <div className={`flex flex-item text-xs font-bold text-gray-900 dark:text-white mt-6 mb-2 overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 max-h-10" : "opacity-0 max-h-0"
                        }`}>
                        CONTENT
                    </div>
                    {menuItems.content.map(({ name, to, Icon }) => (
                        <SidebarItem
                            key={name}
                            label={name}
                            icon={<Icon size={18} />}
                            path={to}
                            active={isActive(to)}
                            closeSidebar={closeSidebar}
                            isOpen={isOpen}
                        />
                    ))}
                </nav>
            </div>
        </aside>
    );
}

/* --- Sidebar Item Component --- */
interface SidebarItemProps {
    label: string;
    icon: React.ReactNode;
    path: string;
    active: boolean;
    closeSidebar: () => void;
    isOpen: boolean;
}

const SidebarItem = ({ label, icon, path, active, closeSidebar, isOpen }: SidebarItemProps) => {
    return (

        <a href={path}
            onClick={() => {
                if (window.innerWidth < 768) {
                    closeSidebar();
                }
            }}
            title={!isOpen ? label : undefined}
            className={`flex items-center rounded-lg text-sm font-medium transition-colors duration-200 
    ${active
                    ? "bg-gradient-to-br from-purple-500 to-purple-400 text-white shadow-lg"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-[#0F0F19] dark:text-gray-400 dark:hover:text-white"
                } 
    ${!isOpen ? "justify-center p-3" : "gap-4 px-4 py-3"}`}
        >
            <span className={`flex items-center justify-center flex-shrink-0 ${!isOpen ? "w-6 h-6" : "w-6 h-6"}`}>
                {icon}
            </span>
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                }`}>
                {label}
            </span>
        </a>
    );
};

/* --- Optional helpers (named exports) --- */
export const SidebarLink: React.FC<{
    to: string;
    closeSidebar: () => void;
    children: React.ReactNode;
    getClassName?: (active: boolean) => string;
}> = ({ to, closeSidebar, children, getClassName }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(to);

    const defaultClass = (active: boolean) =>
        active
            ? "flex items-center gap-4 px-4 py-3 rounded-lg bg-gradient-to-br from-purple-500 to-purple-400 text-white shadow-lg"
            : "flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-[#0F0F19]";

    return (
        <a href={to} onClick={closeSidebar} className={getClassName ? getClassName(isActive) : defaultClass(isActive)}>
            {children}
        </a>
    );
};

export const SidebarSubLink: React.FC<{
    to: string;
    closeSidebar: () => void;
    children: React.ReactNode;
    getClassName?: (active: boolean) => string;
}> = ({ to, closeSidebar, children, getClassName }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(to);

    const defaultClass = (active: boolean) =>
        active
            ? "block px-2 py-1 rounded-md text-blue-600 font-medium"
            : "block px-2 py-1 rounded-md hover:text-gray-700";

    return (
        <a href={to} onClick={closeSidebar} className={getClassName ? getClassName(isActive) : defaultClass(isActive)}>
            {children}
        </a>
    );
};