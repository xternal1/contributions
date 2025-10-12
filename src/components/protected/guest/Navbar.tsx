import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { HiSearch, HiMenu, HiX } from "react-icons/hi";
// import { FaUserCircle } from "react-icons/fa";
import { BsBoxArrowLeft } from "react-icons/bs";
import { fetchCourses } from "../../../features/course/_service/course_service";
import { fetchProfile, fetchProfileById } from "../../../features/user/user_service";
import type { ProfilData } from "../../../features/user/models";
import CategoryDropdown from "../../public/CategoryDropdown";

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

  // 🔹 Filter state
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
          // asumsinya data.courses itu array
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
        // Ambil data login user
        const profile = await fetchProfile();
        setUser(profile);

        if (profile?.id) {
          // Simpan id ke localStorage
          localStorage.setItem("userId", profile.id.toString());

          // Ambil detail lengkap user by id
          const detail = await fetchProfileById(profile.id);
          console.log("User detail lengkap:", detail);

          // Kalau mau replace state dengan detail
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
      className={`fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md 
      ${showNavbar
          ? scrollDirection === "down"
            ? "animate-slideDown"
            : "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
        }`}
    >
      <div className="xl:w-full px-9 2xl:px-30 xl:px-25 lg:px-25 md:px-25 h-20 flex font-sans justify-between items-center">
        {/* Logo & Links */}
        <div className="flex items-center space-x-10">
          <NavLink to="/">
            {/* Logo Desktop */}
            <img
              src="/src/assets/img/logo/get-skill/logo.png"
              alt="Logo Desktop"
              className="hidden lg:block w-auto h-11"
            />
            {/* Logo Mobile */}
            <img
              src="/src/assets/img/logo/get-skill/landscape.png"
              alt="Logo Mobile"
              className="block lg:hidden w-auto h-10"
            />
          </NavLink>

          <ul className="hidden lg:flex items-center space-x-6 ">
            {navLinks.map(({ name, to }) => (
              <li key={name}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-700 text-sm font-semibold"
                      : "text-black text-sm font-semibold hover:text-purple-700"
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Search & Login */}
        <div className="flex items-center space-x-4 relative">
          {/* Search Bar */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full bg-white px-2 py-2 relative">
            <CategoryDropdown setFilters={setFilters} />
            <div className="h-6 border-l border-gray-200 mx-2" />

            <input
              type="text"
              placeholder="Pencarian kursus..."
              className="py-1 px-2 w-40 text-sm bg-transparent focus:outline-none placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={() => handleSearchClick(searchTerm)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white hover:opacity-90 transition"
            >
              <HiSearch size={18} />
            </button>

            {/* Dropdown hasil search */}
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSearchClick(item.title)}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-purple-100"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Button */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
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
                      : "/src/assets/img/no-image/no-profile.jpeg"
                  }
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover"
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
        <div className="lg:hidden px-6 pt-2 pb-4 space-y-2 border-t-4 border-amber-100 bg-white">
          {navLinks.map(({ name, to }) => (
            <NavLink
              key={name}
              to={to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-purple-700 font-semibold text-sm"
                  : "block text-gray-800 font-semibold text-sm hover:text-purple-700"
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
