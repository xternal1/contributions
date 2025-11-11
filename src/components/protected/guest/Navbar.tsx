import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { HiSearch, HiMenu, HiX } from "react-icons/hi";
// import { FaUserCircle } from "react-icons/fa";
import { BsBoxArrowLeft } from "react-icons/bs";
import { fetchCourses } from "../../../features/course/_service/course_service";
import { fetchProfile, fetchProfileById } from "../../../features/user/user_service";
import type { ProfilData } from "../../../features/user/models";
import CategoryDropdown from "../../public/CategoryDropdown";

import { BsFillMoonStarsFill } from "react-icons/bs";
import { HiSun } from "react-icons/hi";

import logoPortrait from "../../../assets/img/logo/get-skill/logo.png";
import logoLandscape from "../../../assets/img/logo/get-skill/landscape.png";
import noProfile from "../../../assets/img/no-image/no-profile.jpeg";

type Course = {
  id: string;
  title: string;
};

const navLinks = [
  { name: "Beranda", to: "/" },
  { name: "Kursus", to: "/course" },
  { name: "Event", to: "/event" },
  { name: "Kelas Industri", to: "/kelas-industri" },
  { name: "Berita", to: "/news" },
  { name: "FAQ", to: "/faq" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<ProfilData | null>(null);

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


  // Filter state
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceMin: "",
    priceMax: "",
    search: "",
  });

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Course[]>([]);

  /** Sinkronkan searchTerm dengan query URL */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    setSearchTerm(searchQuery);
  }, [location.search]);

  /** Scroll behavior */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection("down");
        setShowNavbar(true);
      } else {
        setScrollDirection("up");
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /** Update hasil suggestion ketika searchTerm berubah */
  useEffect(() => {
    let active = true;

    async function loadCourses() {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        const data = await fetchCourses();
        if (active) {
          const filtered = data.filter(
            (course: Course) =>
              course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              course.title.toLowerCase() !== searchTerm.toLowerCase()
          );
          setSearchResults(filtered);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadCourses();
    return () => {
      active = false;
    };
  }, [searchTerm]);

  /** Reset ke /kursus tanpa query jika search dikosongkan */
  useEffect(() => {
    if (
      searchTerm.trim() === "" &&
      location.pathname === "/course" &&
      location.search.includes("search=")
    ) {
      navigate("/course", { replace: true });
    }
  }, [searchTerm, location.pathname, location.search, navigate]);

  /** Klik hasil search */
  const handleSearchClick = (keyword: string) => {
    setSearchResults([]);
    navigate(`/course?search=${encodeURIComponent(keyword)}`);
    setFilters((prev) => ({ ...prev, search: keyword }));
  };

  /** Tekan Enter untuk search langsung */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick(searchTerm);
    }
  };

  /** Navigasi otomatis ke /kursus jika pilih kategori */
  useEffect(() => {
    if (filters.categories.length > 0) {
      navigate(`/course?category=${encodeURIComponent(filters.categories[0])}`);
    }
  }, [filters.categories, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  /** Logout function */
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await fetchProfile();
        setUser(profile);

        if (profile?.id) {
          // Simpan id ke localStorage
          localStorage.setItem("userId", profile.id.toString());

          // Ambil detail lengkap user by id
          const detail = await fetchProfileById(profile.id);
          console.log("User detail lengkap:", detail);

          if (detail) {
            setUser(detail);
          }
        }
      } catch (err) {
        console.error("Gagal ambil profile:", err);
      }
    }

    if (isLoggedIn) {
      loadProfile();
    }
  }, [isLoggedIn]);


  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#141427] text-black dark:text-white transition-colors duration-500 backdrop-blur-md 
      ${showNavbar
          ? scrollDirection === "down"
            ? "animate-slideDown"
            : "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
        }`}
    >
      <div className="xl:w-full px-9 2xl:px-28 xl:px-20 lg:px-20 md:px-15 h-20 flex font-sans justify-between items-center">
        {/* Logo & Links */}
        <div className="flex items-center space-x-10">
          <NavLink to="/">
            {/* Logo Desktop */}
            <img
              src={logoPortrait}
              alt="Logo Desktop"
              className="hidden lg:block w-auto h-11"
            />
            {/* Logo Mobile */}
            <img
              src={logoLandscape}
              alt="Logo Mobile"
              className="block lg:hidden w-auto h-10"
            />
          </NavLink>

          <ul className="hidden lg:flex items-center space-x-6">
            {navLinks.map(({ name, to }) => (
              <li key={name}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-700 text-sm font-semibold dark:text-purple-400 transition-colors duration-500"
                      : "text-black text-sm font-semibold hover:text-purple-700 dark:text-white dark:hover:text-gray-300 transition-colors duration-500"
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Search & Login */}
        <div className="flex items-center space-x-2 relative">
          {/* Search Bar */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full bg-white dark:bg-[#0D0D1A] transition-colors duration-500 px-2 py-2 relative">
            <CategoryDropdown setFilters={setFilters} />
            <div className="h-6 border-l border-gray-200 mx-2" />

            <input
              type="text"
              placeholder="Pencarian kursus..."
              className="py-1 px-2 w-36 text-sm bg-transparent focus:outline-none placeholder-gray-400 dark:placeholder-white transition-colors duration-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={() => handleSearchClick(searchTerm)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white dark:text-black hover:opacity-90 transition"
            >
              <HiSearch size={18} />
            </button>

            {/* Dropdown hasil search */}
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 dark:bg-[#0D0D1A]">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSearchClick(item.title)}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-purple-100 rounded-lg dark:hover:bg-purple-600"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-16 sm:w-18 md:w-20 h-8 sm:h-9 md:h-10 rounded-full transition-all duration-500 flex items-center bg-[#141427] dark:bg-white border border-gray-300 dark:border-white"
          >
            {/* Icon background */}
            <div className="absolute inset-0 rounded-full flex justify-between items-center px-3">
              <BsFillMoonStarsFill
                size={18}
                className={`text-[#141427] transition-opacity duration-500 
                  }`}
              />
              <HiSun
                size={22}
                className={`text-white transition-opacity duration-500
                  }`}
              />
            </div>

            {/* Bulatan yang bergerak */}
            <div
              className={`absolute w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 bg-white dark:bg-[#141427] rounded-full shadow-md transform transition-transform duration-500 ${
                darkMode 
                ? "translate-x-8 sm:translate-x-9 md:translate-x-10" 
                : "translate-x-2 sm:translate-x-2"
                }`}
            ></div>
          </button>

          {/* Auth Button */}
          {isLoggedIn ? (
            <div className="flex items-center 2xl:space-x-3 xl:space-x-2 lg:space-x-1 md:space-x-0.5">
              {/* Icon User ke halaman profile */}
              <Link
                to="/dashboard/user/profile"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <img
                  src={
                    user?.photo
                      ? user.photo.startsWith("http")
                        ? user.photo
                        : `${import.meta.env.VITE_API_URL}/storage/${user.photo}`
                      : noProfile
                  }
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src = noProfile;
                  }}
                />
              </Link>

              {/* Tombol Logout */}
              <button
                onClick={handleLogout}
                className="hidden lg:flex items-center gap-2 bg-red-500 text-white text-xs hover:text-black font-bold px-4 py-3 rounded-full hover:bg-red-600 transition"
              >
                <BsBoxArrowLeft size={20} />
                <span>Keluar</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden lg:block bg-yellow-500 text-black text-xs font-semibold px-5 py-3 rounded-full hover:bg-purple-700 hover:text-white transition"
            >
              Masuk
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-600"
          >
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden px-6 pt-2 pb-4 space-y-2 border-t-4 border-purple-100 bg-white dark:bg-[#0D0D1A] dark:border-purple-950">
          {navLinks.map(({ name, to }) => (
            <NavLink
              key={name}
              to={to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-purple-700 font-semibold text-sm dark:text-purple-400"
                  : "block text-gray-800 font-semibold text-sm hover:text-purple-700 dark:text-white dark:hover:text-purple-400"
              }
            >
              {" "}
              {name}{" "}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block text-center bg-yellow-500 text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-purple-700 hover:text-white transition"
            >
              Masuk
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
