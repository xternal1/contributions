import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
    HiOutlineHome,
    HiOutlineCalendar,
    HiOutlineDocumentText,
    HiOutlineViewGrid,
    HiOutlineClipboardList,
    HiOutlineAdjustments,
    HiChevronDown,
    HiChevronUp,
    HiOutlineUserCircle
} from 'react-icons/hi';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname.includes(path);
    const [openLandingPage, setOpenLandingPage] = useState(true);

    return (
        <aside
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transition-transform duration-200 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
        >
            <div className="h-full overflow-y-auto p-6 space-y-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="/src/assets/logo/logo.png" alt="Logo" className="w-6 h-6" />
                    <span className="text-lg font-bold text-purple-600">GetSkill</span>
                </div>

                {/* Sections */}
                <nav className="space-y-6 text-sm text-gray-500">
                    {/* HOME */}
                    <div>
                        <p className="text-xs font-semibold text-gray-900 mb-2">HOME</p>
                        <ul className="space-y-2">
                            <SidebarItem
                                label="Dashboard"
                                icon={<HiOutlineHome />}
                                path="/dashboard"
                                active={isActive('/dashboard')}
                                closeSidebar={closeSidebar}
                            />
                            <SidebarItem
                                label="Tahun Ajaran"
                                icon={<HiOutlineCalendar />}
                                path="/tahun-ajaran"
                                active={isActive('/tahun-ajaran')}
                                closeSidebar={closeSidebar}
                            />
                        </ul>
                    </div>

                    {/* KURSUS */}
                    <div>
                        <p className="text-xs font-semibold text-gray-900 mb-2">KURSUS</p>
                        <ul className="space-y-2">
                            <SidebarItem
                                label="Kursus"
                                icon={<HiOutlineDocumentText />}
                                path="/kursus"
                                active={isActive('/kursus')}
                                closeSidebar={closeSidebar}
                            />
                            <SidebarItem
                                label="Kategori"
                                icon={<HiOutlineViewGrid />}
                                path="/kategori-kursus"
                                active={isActive('/kategori-kursus')}
                                closeSidebar={closeSidebar}
                            />
                        </ul>
                    </div>

                    {/* KONTEN */}
                    <div>
                        <p className="text-xs font-semibold text-gray-900 mb-2">KONTEN</p>
                        <ul className="space-y-2">
                            <SidebarItem
                                label="Berita"
                                icon={<HiOutlineClipboardList />}
                                path="/berita"
                                active={isActive('/berita')}
                                closeSidebar={closeSidebar}
                            />
                            <SidebarItem
                                label="Kategori Berita"
                                icon={<HiOutlineViewGrid />}
                                path="/kategori-berita"
                                active={isActive('/kategori-berita')}
                                closeSidebar={closeSidebar}
                            />
                            <SidebarItem
                                label="Event"
                                icon={<HiOutlineCalendar />}
                                path="/event"
                                active={isActive('/event')}
                                closeSidebar={closeSidebar}
                            />
                        </ul>
                    </div>

                    {/* LANDING PAGE */}
                    <div>
                        <p className="text-xs font-semibold text-gray-900 mb-2">LANDING PAGE</p>
                        <button
                            className="flex items-center justify-between w-full text-left text-gray-500 hover:text-gray-700"
                            onClick={() => setOpenLandingPage(!openLandingPage)}
                        >
                            <div className="flex items-center gap-2">
                                <HiOutlineAdjustments className="w-5 h-5" />
                                <span>Konfigurasi</span>
                            </div>
                            {openLandingPage ? <HiChevronUp /> : <HiChevronDown />}
                        </button>
                        {openLandingPage && (
                            <ul className="ml-6 mt-2 space-y-1 list-disc text-xs text-gray-500">
                                <li>
                                    <SidebarSubItem label="FAQ" path="/faq" active={isActive('/faq')} closeSidebar={closeSidebar} />
                                </li>
                                <li>
                                    <SidebarSubItem label="Footer" path="/footer" active={isActive('/footer')} closeSidebar={closeSidebar} />
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* PROFILE */}
                    <div>
                        <p className="text-xs font-semibold text-gray-900 mb-2">PROFILE</p>
                        <ul className="space-y-2">
                            <SidebarItem
                                label="User"
                                icon={<HiOutlineUserCircle />}
                                path="/user"
                                active={isActive('/user')}
                                closeSidebar={closeSidebar}
                            />
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;

interface SidebarItemProps {
    label: string;
    icon: React.ReactNode;
    path: string;
    active: boolean;
    closeSidebar: () => void;
}

const SidebarItem = ({ label, icon, path, active, closeSidebar }: SidebarItemProps) => (
    <li>
        <a
            href={path}
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-2 py-2 rounded-md transition ${active ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-500 hover:bg-gray-100'
                }`}
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </a>
    </li>
);

interface SidebarSubItemProps {
    label: string;
    path: string;
    active: boolean;
    closeSidebar: () => void;
}

const SidebarSubItem = ({ label, path, active, closeSidebar }: SidebarSubItemProps) => (
    <a
        href={path}
        onClick={closeSidebar}
        className={`block px-2 py-1 rounded-md ${active ? 'text-blue-600 font-medium' : 'hover:text-gray-700'
            }`}
    >
        {label}
    </a>
);
