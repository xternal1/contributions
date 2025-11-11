import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FileTerminal } from "lucide-react";
import { FaHome, FaAward, FaRegUser, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaArrowRightArrowLeft, FaChartLine, FaCreditCard } from "react-icons/fa6";
import { TbFileStar, TbLogout } from "react-icons/tb";
import { GoShield } from "react-icons/go";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdLock, IoMdUnlock } from "react-icons/io";


import classindustry from "../../../assets/img/logo/logo_class_industri1.png";
import classindustrydark from "../../../assets/img/logo/logo_class_industri2.png";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

import { toast } from "react-hot-toast";

// import type { ProfilData } from "../../../features/user/models";
// import { fetchProfile, fetchProfileById } from "../../../features/user/user_service";

import noProfile from "../../../assets/img/no-image/no-profile.jpeg";

interface ProfilData {
  id: number;
  name: string;
  email: string;
  photo?: string;
  is_locked: boolean;
}
interface SidebarDashboardProps {
  slug?: string;
  refreshKey?: number;
}

type MenuItem =
  | { to: string; label: string; icon: React.ReactElement }
  | {
    label: string;
    icon: React.ReactElement;
    submenu: { to: string; label: string; icon: React.ReactElement }[];
  };

const SidebarDashboard: React.FC<SidebarDashboardProps> = ({ slug, refreshKey = 0 }) => {
  const [user, setUser] = useState<ProfilData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyUser: ProfilData = {
      id: 1,
      name: "Paspradawu",
      email: "paspradawu@example.com",
      photo: "",

      is_locked: true,
    };

    setTimeout(() => {
      setUser(dummyUser);
      setLoading(false);
    }, 800);
  }, [slug, refreshKey]);

  // useEffect(() => {
  //   const loadProfile = async () => {
  //     try {
  //       const baseProfile = await fetchProfile();
  //       if (baseProfile?.id) {
  //         const detailProfile = await fetchProfileById(baseProfile.id);
  //         const dummyLocked = true;
  //         setUser({
  //           ...(detailProfile || baseProfile),
  //           is_locked: dummyLocked,
  //         } as ProfilData & { is_locked: boolean });
  //       }
  //     } catch (error) {
  //       console.error("Gagal memuat profil:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadProfile();
  // }, [slug, refreshKey]);

  useEffect(() => {
    const savedState = localStorage.getItem("isIndustryOpen");
    if (savedState === "true") setIsIndustryOpen(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("isIndustryOpen", String(isIndustryOpen));
  }, [isIndustryOpen]);


  const baseMenu: MenuItem[] = [
    { to: "/dashboard/user", label: "Dashboard", icon: <FaHome size={18} /> },
    { to: "/dashboard/user/course", label: "Kursus Saya", icon: <HiOutlineBookOpen size={18} /> },
    { to: "/dashboard/user/event", label: "Event Saya", icon: <IoBookmarkOutline size={18} /> },
  ];

  const studentIndustryMenu: MenuItem = {
    label: "Kelas Industri",
    icon: (
      <>
        <img
          src={classindustry}
          alt="Kelas Industri"
          className="w-4.5 h-auto dark:hidden"
        />

        <img
          src={classindustrydark}
          alt="Kelas Industri Dark"
          className="w-4.5 h-auto hidden dark:block"
        />
      </>
    ),
    submenu: [
      { to: "/dashboard/user/classes", label: "Kelas", icon: <MdOutlineMeetingRoom size={16} /> },
      { to: "/dashboard/user/challenges", label: "Tantangan", icon: <FileTerminal size={16} /> },
      { to: "/dashboard/user/schedule", label: "Jadwal", icon: <FaCalendarAlt size={16} /> },
      { to: "/dashboard/user/rating", label: "Peringkat", icon: <FaChartLine size={16} /> },
      { to: "/dashboard/user/payment", label: "Pembayaran", icon: <FaCreditCard size={16} /> },
      { to: "/dashboard/user/sop-student", label: "SOP", icon: <GoShield size={16} /> },
    ],
  };

  const additionalMenu: MenuItem[] = [
    { to: "/dashboard/user/certificate", label: "Sertifikat", icon: <FaAward size={18} /> },
    { to: "/dashboard/user/reviews", label: "Reviews", icon: <TbFileStar size={18} /> },
    { to: "/dashboard/user/transaction", label: "Riwayat Transaksi", icon: <FiShoppingBag size={18} /> },
    { to: "/dashboard/user/exchange", label: "Penukaran Hadiah", icon: <FaArrowRightArrowLeft size={18} /> },
    { to: "/dashboard/user/profile", label: "Profil Saya", icon: <FaRegUser size={18} /> },
  ];

  // const menuItems: MenuItem[] =
  //   user?.role === "student"
  //     ? [...baseMenu, studentIndustryMenu, ...additionalMenu]
  //     : [...baseMenu, ...additionalMenu];

  const menuItems: MenuItem[] = [
    ...baseMenu,
    studentIndustryMenu,
    ...additionalMenu,
  ];

  const lockedSubmenus = [
    "/dashboard/user/classes",
    "/dashboard/user/challenges",
    "/dashboard/user/schedule",
    "/dashboard/user/rating",
    "/dashboard/user/sop-student",
  ];



  const hasSubmenu = (item: MenuItem): item is Extract<MenuItem, { submenu: { to: string; label: string; icon: React.ReactElement }[] }> => {
    return "submenu" in item;
  };


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <aside className="w-full h-full 2xl:w-64 xl:w-64 lg:w-60 top-0 bg-transparent flex flex-col gap-5 transition-colors duration-500">
      {/* CARD PROFIL */}
      <div className="bg-white border-3 border-purple-200 shadow-md rounded-xl p-4 dark:bg-[#0D0D1A] dark:border-white transition-all duration-500">
        {loading ? (
          <div className="animate-pulse flex items-center">
            <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-[#1E1E2D]" />
            <div className="ml-3 flex-1 space-y-2">
              <div className="h-3 w-3/4 bg-gray-200 rounded dark:bg-[#1E1E2D]" />
              <div className="h-2 w-1/2 bg-gray-200 rounded dark:bg-[#1E1E2D]" />
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <img
              src={
                user?.photo
                  ? user.photo.startsWith("http")
                    ? user.photo
                    : `${import.meta.env.VITE_API_URL}/storage/${user.photo}`
                  : noProfile
              }
              alt="profile"
              className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover dark:bg-[#141427] dark:border-white"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.onerror = null;
                target.src = noProfile;
              }}
            />
            <div className="ml-3 text-start">
              <h3 className="font-semibold text-sm text-gray-800 dark:text-white">
                {user?.name || "Guest"}
              </h3>
              <p className="text-gray-500 text-[11px] truncate max-w-[120px] dark:text-gray-300">
                {user?.email || "-"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-3 border-purple-200 shadow-md rounded-xl p-4 dark:bg-[#0D0D1A] dark:border-white transition-all duration-500 flex-1 flex flex-col justify-between">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-3 w-20 bg-gray-200 rounded dark:bg-[#1E1E2D]" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded dark:bg-[#1E1E2D]" />
            ))}
          </div>
        ) : (
          <>
            <nav className="space-y-3 font-semibold text-xs">
              <h3 className="text-gray-400 text-start text-[10px] font-semibold mb-3 dark:text-white">
                DASHBOARD
              </h3>
              {menuItems.map((item) =>
                hasSubmenu(item) ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                      className={`flex items-center justify-between w-full border-b-2 pb-2 ${user?.is_locked
                        ? "text-gray-600 hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                        : "text-gray-600 hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                        } border-gray-200 dark:border-white`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        {item.label}
                      </div>
                      <motion.div
                        animate={{ rotate: isIndustryOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="mr-2"
                      >
                        <HiChevronDown size={18} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isIndustryOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="ml-5 mt-4 space-y-2 overflow-hidden"
                        >
                          {item.submenu.map((sub) => {
                            const isSubLocked =
                              user?.is_locked && lockedSubmenus.some((path) => sub.to.startsWith(path));

                            const showLockIcon = lockedSubmenus.includes(sub.to);

                            return (
                              <NavLink
                                key={sub.to}
                                to={isSubLocked ? "#" : sub.to}
                                onClick={(e) => {
                                  if (isSubLocked) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toast.error(
                                      "Fitur ini dikunci. Selesaikan pembayaran minimal 70% untuk membuka akses."
                                    );
                                  }
                                }}
                                className={({ isActive }) => {
                                  if (isSubLocked) {
                                    return "flex items-center justify-between border-b pb-2 text-gray-400 cursor-not-allowed border-gray-200 dark:border-white";
                                  }
                                  if (isActive) {
                                    return "flex items-center justify-between border-b pb-2 text-purple-600 border-purple-600 dark:text-purple-400 dark:border-purple-400";
                                  }
                                  return "flex items-center justify-between border-b pb-2 text-gray-600 hover:text-purple-600 border-gray-200 dark:text-white dark:border-white dark:hover:text-purple-400";
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={isSubLocked ? "text-gray-400" : ""}>{sub.icon}</span>
                                  <span>{sub.label}</span>
                                </div>

                                {showLockIcon && (
                                  <>
                                    {isSubLocked ? (
                                      <IoMdLock className="text-gray-400 opacity-70 w-4 h-4 mr-2" />
                                    ) : (
                                      <IoMdUnlock className="text-gray-600 dark:text-white opacity-70 w-4 h-4 mr-2" />
                                    )}
                                  </>
                                )}
                              </NavLink>
                            );

                          })}


                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/dashboard/user"}
                    className={({ isActive }) =>
                      `flex items-center gap-2 border-b-2 pb-2 ${isActive
                        ? "text-purple-600 border-purple-600 dark:text-purple-400 dark:border-purple-400"
                        : "text-gray-600 border-gray-200 hover:text-purple-600 dark:text-white dark:border-white dark:hover:text-purple-400"
                      }`
                    }
                  >
                    {item.icon} {item.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Logout */}
            <div className="mt-7 text-start text-xs">
              <h3 className="text-gray-400 font-semibold text-[10px] mb-3 dark:text-white">USER</h3>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-purple-600 hover:text-yellow-400 dark:text-purple-400"
              >
                <TbLogout size={18} /> Logout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default SidebarDashboard;
