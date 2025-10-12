import React from 'react';
import { HiSearch, HiBell } from 'react-icons/hi';
import { FaBars } from 'react-icons/fa';
import { HiOutlineChat, HiOutlineCalendar, HiOutlineMail } from 'react-icons/hi';
import { Dropdown, DropdownItem, Avatar } from 'flowbite-react';
import { BsMoon, BsGlobe2, BsCart3 } from 'react-icons/bs';

interface NavbarProps {
    toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
    return (
        <nav className="fixed top-0 left-64 z-50 w-[calc(100%-16rem)] bg-white shadow-sm h-16">
            <div className="flex items-center justify-between px-4 h-full">
                {/* Left side: Hamburger + Search + Nav links */}
                <div className="flex items-center gap-4">
                    <button onClick={toggleSidebar} className="text-gray-600 md:hidden">
                        <FaBars className="w-5 h-5" />
                    </button>

                    <HiSearch className="w-5 h-5 text-gray-600 cursor-pointer" />

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
                        <Dropdown inline label="Apps" renderTrigger={() => (
                            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                <span>Apps</span>
                            </div>
                        )}>
                            <DropdownItem>Dashboard</DropdownItem>
                            <DropdownItem>Projects</DropdownItem>
                            <DropdownItem>Tasks</DropdownItem>
                        </Dropdown>

                        <span className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
                            <HiOutlineChat className="w-5 h-5" />
                            Chat
                        </span>

                        <span className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
                            <HiOutlineCalendar className="w-5 h-5" />
                            Calendar
                        </span>

                        <span className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
                            <HiOutlineMail className="w-5 h-5" />
                            Email
                        </span>
                    </div>
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-4 text-gray-600 mx-20">
                    <BsMoon className="w-5 h-5 cursor-pointer" />
                    <BsGlobe2 className="w-5 h-5 cursor-pointer" />
                    <div className="relative cursor-pointer">
                        <BsCart3 className="w-5 h-5" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            2
                        </span>
                    </div>
                    <HiBell className="w-10 h-5 cursor-pointer" />
                    <Avatar
                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        rounded
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
