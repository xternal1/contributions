import { useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { Search, PlusCircle, X, BookOpen, BookText, MessageCircleMore, ChevronsRight, ChevronsLeft } from "lucide-react";
import { motion } from "framer-motion";
import TipTapEditor from "../../../../components/discussion/TipTapEditor";

import { fetchModules, fetchDiscussions, fetchTags, fetchSubmitDiscussion, fetchSubmitTags } from "../../../../features/discussion/_service/discussionService";
import type { Discussion, DiscussionTag, DiscussionCourse } from "../../../../features/discussion/_discussion";

import { fetchProfile } from "../../../../features/user/user_service";
import type { ProfilData } from "../../../../features/user/models";

import DiscussionDropdown from "../../../../components/public/DiscussionDropdown";

import { toast } from "react-hot-toast";

import book from "../../../../assets/img/book.png";
import noProfile from "../../../../assets/img/no-image/no-profile.jpeg";
import empty from "../../../../assets/img/no-data/empty.svg";

const DiscussionPage = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    const [showModal, setShowModal] = useState(false);
    const [modules, setModules] = useState<DiscussionCourse[]>([]);
    const [selectedModule, setSelectedModule] = useState<string>("");
    const [discussions, setDiscussions] = useState<Discussion[]>([]);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState<DiscussionTag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [filterStatus, setFilterStatus] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<string[]>([]);
    const [selectedModuleForNewDiscussion, setSelectedModuleForNewDiscussion] = useState<string>("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tagsInput, setTagsInput] = useState<string[]>([]);
    const [currentUser, setCurrentUser] = useState<ProfilData | null>(null);
    const [loadingDiscussions, setLoadingDiscussions] = useState<boolean>(true);


    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(discussions.length / itemsPerPage);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await fetchProfile();
                setCurrentUser(user);
            } catch {
                console.warn("Gagal ambil user login");
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const loadModules = async () => {
            try {
                const data = await fetchModules(slug || "all");
                setModules(data);
            } catch (error) {
                console.error("Gagal memuat modul:", error);
            }
        };
        loadModules();
    }, [slug]);


    useEffect(() => {
        const loadDiscussions = async () => {
            try {
                if (slug) {
                    const data = await fetchDiscussions(
                        slug,
                        selectedModule || undefined,
                        filterStatus,
                        sortOrder
                    );
                    setDiscussions(data);
                }
            } catch (error) {
                console.error("Gagal fetch data diskusi:", error);
            } finally {
                setLoadingDiscussions(false);
            }
        };
        loadDiscussions();
    }, [slug, selectedModule, filterStatus, sortOrder]);



    useEffect(() => {
        const loadTags = async () => {
            const data = await fetchTags();
            setTags(data);
        };
        loadTags();
    }, []);


    const handleClick = (slug: string) => {
        navigate(`/module/discussion/forum/${slug}`);
    };

    const filteredDiscussions = discussions.filter((d) => {
        const matchesSearch = d.discussion_title
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchesTags =
            selectedTags.length === 0 ||
            d.discussion_tags?.some(t => selectedTags.includes(t?.tag?.name || ""))

        return matchesSearch && matchesTags;
    });


    const paginatedDiscussions = filteredDiscussions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleTagClick = (tagName: string) => {
        setSelectedTags(prev =>
            prev.includes(tagName)
                ? prev.filter(tag => tag !== tagName)
                : [...prev, tagName]
        );
    };


    const handleSubmitDiscussion = async () => {
        if (!slug || !title || !description) {
            toast.error("Judul dan deskripsi wajib diisi!");
            return;
        }

        try {
            const ensuredTags: string[] = [];
            for (const tagName of tagsInput) {

                const existing = tags.find((t) => t.name.toLowerCase() === tagName.toLowerCase());
                if (existing) {
                    ensuredTags.push(existing.name);
                } else {
                    try {
                        const newTag = await fetchSubmitTags(tagName);
                        ensuredTags.push(newTag.name);
                        setTags((prev) => [...prev, newTag]);
                    } catch (err) {
                        console.error("Gagal menambahkan tag:", err);
                        toast.error(`Gagal menambahkan tag "${tagName}"`);
                    }
                }
            }

            const formData = new FormData();
            formData.append("module_id", selectedModuleForNewDiscussion);
            formData.append("discussion_title", title);
            formData.append("discussion_question", description);

            // Tambahkan semua tag yang dipilih
            tagsInput.forEach((tag: string, index: number) => {
                formData.append(`tag[${index}]`, tag);
            });

            await fetchSubmitDiscussion(slug, formData);
            toast.success("Diskusi berhasil dibuat!");

            // Reset form
            setShowModal(false);
            setTitle("");
            setDescription("");
            setTagsInput([]);
            setSelectedModuleForNewDiscussion("");

            const refreshed = await fetchDiscussions(slug);
            setDiscussions(refreshed);
        } catch (err) {
            toast.error("Gagal membuat diskusi!");
            console.error(err);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 pb-15 dark:bg-[#141427] transition-colors duration-500">
            {/* Header */}
            <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-sm mx-auto pt-8">
                {/* Header kecil */}
                <div className="flex items-center bg-gradient-to-br from-purple-500 to-purple-700 py-3 px-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white text-2xl flex items-center justify-center mr-2"
                    >
                        <FiChevronLeft size={24} className="p-0.5 rounded-full bg-purple-400 text-white"/>
                    </button>
                    <h1 className="text-white font-semibold text-left text-lg">Kembali</h1>
                </div>

                {/* Card Intro */}
                <div className="relative min-h-37 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-left px-5 mb-4 md:mb-0 md:flex-1">
                        <h5 className="text-xl font-semibold text-white">Forum Diskusi</h5>
                        <h2 className="text-2xl font-bold text-white">
                            Selamat Datang, {currentUser?.name || "User"} Di Forum Diskusi
                        </h2>
                        <p className="text-white mt-1 sm:text-base md:text-base">
                            Konsultasi seputar materi belajar Anda
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-end w-full md:w-auto">
                        <img
                            src={book}
                            alt="Ilustrasi Ujian"
                            className="w-80 sm:w-80 md:w-60 mx-8 mt-6 md:mt-0 2xl:absolute xl:absolute lg:absolute 2xl:right-2 2xl:-bottom-0 xl:right-2 xl:-bottom-0 lg:right-2 lg:-bottom-0"
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto mt-8 flex flex-col lg:flex-row gap-8">
                    {/* Left Section - Discussions */}
                    <div className="flex-1 space-y-4 bg-white rounded-xl p-7 shadow dark:bg-[#0D0D1A] dark:border-2 dark:border-white transition-colors duration-500">
                        {/* Search & Filter */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2 w-full md:w-1/2 bg-white px-3 py-2 rounded-lg shadow dark:bg-[#141427] dark:border dark:border-white transition-colors duration-500">
                                <Search className="text-purple-500 dark:text-white" />
                                <input
                                    type="text"
                                    placeholder="Cari topik diskusi..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full outline-none text-sm text-gray-500 dark:placeholder:text-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="w-full md:w-1/3">
                                <DiscussionDropdown
                                    modules={modules}
                                    selectedModule={selectedModule}
                                    onChange={setSelectedModule}
                                />
                            </div>
                        </div>

                        {/* Filter Tag */}
                        <div className="mb-9 mt-9 text-start font-semibold flex items-center flex-wrap gap-2">
                            <h2 className="text-md text-gray-800 dark:text-white">Diskusi berdasarkan :</h2>

                            {selectedTags.length > 0 && selectedTags.map(tagName => (
                                <div
                                    key={tagName}
                                    className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-md text-xs shadow cursor-pointer hover:bg-purple-700 transition"
                                >
                                    <span>#{tagName}</span>
                                    <X
                                        size={16}
                                        onClick={() =>
                                            setSelectedTags(prev => prev.filter(t => t !== tagName))
                                        }
                                        className="cursor-pointer hover:text-gray-200"
                                    />
                                </div>
                            ))}
                        </div>


                        {/* Discussion List */}
                        {loadingDiscussions ? (
                            // Skeleton Loader
                            <div className="space-y-4 animate-pulse">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-[#0D0D1A] rounded-lg border border-gray-200 p-5 shadow"
                                    >
                                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                                                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/5"></div>
                                            </div>
                                        </div>
                                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                                        <div className="flex gap-3 mt-4">
                                            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                            <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) :
                            paginatedDiscussions.length > 0 ? (
                                    paginatedDiscussions.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleClick(item.slug || item.id.toString())}
                                            className="bg-white text-start shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg hover:border-purple-500 transition cursor-pointer dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
                                        >
                                            {/* Header */}
                                            <div className="bg-purple-600 text-white px-4 py-2 flex items-center gap-2">
                                                <BookOpen size={18} />
                                                <span className="font-semibold">{item.discussion_title || "Tanpa Modul"}</span>
                                            </div>

                                            {/* Body */}
                                            <div className="p-5 bg-gray-50 dark:bg-[#141427] transition-colors duration-500">
                                                {/* User Info */}
                                                <div className="flex items-center gap-3 mb-3">
                                                    <img
                                                        src={
                                                            item.user?.photo
                                                                ? item.user.photo.startsWith("http")
                                                                    ? item.user.photo
                                                                    : `${import.meta.env.VITE_API_URL}/storage/${item.user.photo}`
                                                                : noProfile
                                                        }
                                                        alt={item.user?.name || "User"}
                                                        className="w-10 h-10 rounded-full object-cover dark:border-2 dark:border-white"
                                                        onError={(e) => {
                                                            const target = e.currentTarget as HTMLImageElement;
                                                            target.onerror = null;
                                                            target.src = noProfile;
                                                        }}
                                                    />

                                                    <div className="text-sm text-gray-700 dark:text-white">
                                                        <span className="font-semibold">{item.user?.name || "Name"}</span>
                                                        <span className="mx-2 text-gray-400">•</span>
                                                        <span className="text-gray-500 dark:text-gray-300">{item.time_ago || "Baru saja"}</span>
                                                    </div>
                                                </div>

                                                <h3 className="font-bold text-gray-900 mb-1 dark:text-white">{item.discussion_title}</h3>
                                                <p
                                                    className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3 dark:text-gray-300"
                                                    dangerouslySetInnerHTML={{ __html: item.discussion_question }}
                                                ></p>

                                                {/* Tag */}
                                                {item.discussion_tags && item.discussion_tags.length > 0 && (
                                                    <div className="mb-4 flex flex-wrap gap-2">
                                                        {item.discussion_tags.map((tagWrapper, idx) => {
                                                            const tagName = tagWrapper?.tag?.name || "Tanpa Tag";
                                                            return (
                                                                <span
                                                                    key={idx}
                                                                    className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                                                                >
                                                                    #{tagName}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                <div className="flex items-center text-gray-600 text-sm font-medium mt-3 gap-3 dark:text-white">
                                                    {/* Jumlah Balasan */}
                                                    <div className="flex items-center gap-2">
                                                        <MessageCircleMore size={18} />
                                                        <span>{item.discussion_answers_count || 0} Balasan</span>
                                                    </div>

                                                    {/* Nama Modul (di samping Balasan) */}
                                                    <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
                                                        <BookText size={18} />
                                                        <span>{item.module?.title || "Tanpa Modul"}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center">
                                        <img
                                            src={empty}
                                            alt="Belum ada diskusi"
                                            className="w-auto h-56 object-contain"
                                        />
                                        <p className="text-gray-600 text-lg font-bold mb-5 dark:text-white">Tidak ada diskusi ditemukan.</p>
                                    </div>
                                )
                            }

                        {/* Pagination */}
                        <div className="flex justify-center mt-10">
                            <div className="flex items-center gap-3">
                                <motion.button
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    whileTap={{ scale: 0.9 }}
                                    className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === 1
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                                        : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
                                        }`}
                                >
                                    <ChevronsLeft />
                                </motion.button>

                                {Array.from({ length: totalPages }).map((_, index) => {
                                    const page = index + 1;
                                    const isActive = page === currentPage;
                                    return (
                                        <motion.button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            whileTap={{ scale: 0.9 }}
                                            animate={{
                                                scale: isActive ? 1.1 : 1,
                                                boxShadow: isActive
                                                    ? "0px 4px 10px rgba(147, 51, 234, 0.4)"
                                                    : "none",
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                            className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-300 ${isActive
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:border dark:border-purple-700 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                                                }`}
                                        >
                                            {page}
                                        </motion.button>
                                    );
                                })}

                                <motion.button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                                    }
                                    disabled={currentPage === totalPages}
                                    whileTap={{ scale: 0.9 }}
                                    className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === totalPages
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                                        : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
                                        }`}
                                >
                                    <ChevronsRight />
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-full lg:w-64 flex flex-col gap-5">
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center gap-2  transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                            hover:shadow-none active:translate-y-0.5 bg-purple-500 text-white font-bold text-md 
                            px-6 py-3 rounded-lg hover:text-black hover:bg-yellow-400">
                            <PlusCircle size={18} />
                            Buat Diskusi Baru
                        </button>

                        <div className="bg-white shadow rounded-lg p-5 h-fit dark:bg-[#0D0D1A] dark:border dark:border-white transition-colors duration-500">
                            <h3 className="text-md font-semibold text-start text-gray-800 mb-4 dark:text-white">
                                Filter Berdasarkan
                            </h3>

                            {/* Filter Berdasarkan */}
                            <div className="space-y-2 mb-6">
                                <label className="relative flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filterStatus.includes("answered")}
                                        className="peer appearance-none w-4 h-4 border-2 border-purple-600 rounded-xs
                                        bg-transparent cursor-pointer transition-all duration-300
                                        checked:bg-purple-600 checked:border-purple-600
                                        focus:outline-none focus:ring-0 dark:bg-[#141427]"
                                        onChange={() =>
                                            setFilterStatus(prev =>
                                                prev.includes("answered")
                                                    ? prev.filter(f => f !== "answered")
                                                    : [...prev, "answered"]
                                            )
                                        }
                                    />
                                    <svg
                                        className="absolute left-[0.5px] top-[3px] w-4 h-4 text-white opacity-0 
                                        peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Diskusi sudah selesai</span>
                                </label>
                                <label className="relative flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filterStatus.includes("unanswered")}
                                        className="peer appearance-none w-4 h-4 border-2 border-purple-600 rounded-xs
                                        bg-transparent cursor-pointer transition-all duration-300
                                        checked:bg-purple-600 checked:border-purple-600
                                        focus:outline-none focus:ring-0 dark:bg-[#141427]"
                                        onChange={() =>
                                            setFilterStatus(prev =>
                                                prev.includes("unanswered")
                                                    ? prev.filter(f => f !== "unanswered")
                                                    : [...prev, "unanswered"]
                                            )
                                        }
                                    />
                                    <svg
                                        className="absolute left-[0.5px] top-[3px] w-4 h-4 text-white opacity-0 
                                        peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Diskusi belum selesai</span>
                                </label>
                            </div>

                            <h3 className="text-md font-semibold text-start text-gray-800 mb-4 dark:text-white">
                                Urutkan Berdasarkan
                            </h3>

                            {/* Urutkan Berdasarkan */}
                            <div className="space-y-2 mb-6">
                                <label className="relative flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={sortOrder.includes("latest")}
                                        className="peer appearance-none w-4 h-4 border-2 border-purple-600 rounded-xs
                                        bg-transparent cursor-pointer transition-all duration-300
                                        checked:bg-purple-600 checked:border-purple-600
                                        focus:outline-none focus:ring-0 dark:bg-[#141427]"
                                        onChange={() =>
                                            setSortOrder(prev =>
                                                prev.includes("latest")
                                                    ? prev.filter(f => f !== "latest")
                                                    : [...prev, "latest"]
                                            )
                                        }
                                    />
                                    <svg
                                        className="absolute left-[0.5px] top-[3px] w-4 h-4 text-white opacity-0 
                                        peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Diskusi terbaru</span>
                                </label>
                                <label className="relative flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={sortOrder.includes("oldest")}
                                        className="peer appearance-none w-4 h-4 border-2 border-purple-600 rounded-xs
                                        bg-transparent cursor-pointer transition-all duration-300
                                        checked:bg-purple-600 checked:border-purple-600
                                        focus:outline-none focus:ring-0 dark:bg-[#141427]"
                                        onChange={() =>
                                            setSortOrder(prev =>
                                                prev.includes("oldest")
                                                    ? prev.filter(f => f !== "oldest")
                                                    : [...prev, "oldest"]
                                            )
                                        }
                                    />
                                    <svg
                                        className="absolute left-[0.5px] top-[3px] w-4 h-4 text-white opacity-0 
                                        peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Diskusi terlama</span>
                                </label>
                            </div>

                            <h4 className="text-md text-start font-semibold text-gray-800 mb-3 dark:text-white">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {tags.length > 0 ? (
                                    tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            onClick={() => handleTagClick(tag.name)}
                                            className={`px-3 py-1 rounded-lg text-sm cursor-pointer transition ${selectedTags.includes(tag.name)
                                                ? "bg-purple-600 text-white shadow border-2 border-purple-600"
                                                : " text-purple-700 hover:text-white hover:bg-purple-600 border-2 border-purple-600 bg-transparent"
                                                }`}
                                        >
                                            #{tag.name}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">Memuat tag...</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex text-start items-center justify-center z-50 px-10 sm:px-20">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden flex flex-col dark:bg-[#0D0D1A]">

                        {/* Header */}
                        <div className="bg-purple-600 rounded-b-xl text-white px-5 py-3 flex justify-center items-center">
                            <h2 className="font-semibold text-xl">Diskusi Baru</h2>
                        </div>

                        {/* Body dengan scroll */}
                        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto scrollbar-hide">
                            <div>
                                <label className="font-semibold text-gray-700 block mb-1 dark:text-white">Modul Belajar</label>
                                <DiscussionDropdown
                                    modules={modules}
                                    selectedModule={selectedModuleForNewDiscussion}
                                    onChange={(value) => setSelectedModuleForNewDiscussion(value)}
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700 block mb-1 dark:text-white">Judul Pertanyaan</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Tulis judul pertanyaan Anda dengan singkat"
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 dark:placeholder:text-gray-400 dark:bg-[#141427]"
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700 block mb-1 dark:text-white">Deskripsi Pertanyaan</label>
                                <TipTapEditor onChange={setDescription} />
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700 block mb-1 dark:text-white">
                                    Kata Kunci <span className="text-gray-500 text-sm dark:text-gray-400">(Ketik atau pilih)</span>
                                </label>

                                <CreatableSelect
                                    isMulti
                                    placeholder="Ketik atau pilih tag..."
                                    value={tagsInput.map(tag => ({ value: tag, label: tag }))}
                                    onChange={(selected) => {
                                        setTagsInput(selected ? selected.map(opt => opt.value) : []);
                                    }}
                                    onCreateOption={(inputValue) => {
                                        setTagsInput((prev) => [...prev, inputValue]);
                                    }}
                                    options={tags.map(tag => ({ value: tag.name, label: tag.name }))}
                                    className="text-sm dark:text-white scrollbar-hide"
                                    menuPosition="fixed"
                                    styles={{
                                        menuList: (base) => ({
                                            ...base,
                                            maxHeight: "200px",
                                            overflowY: "auto",
                                            scrollbarWidth: "none",
                                            msOverflowStyle: "none",
                                            "&::-webkit-scrollbar": {
                                                display: "none",
                                            },
                                        }),

                                        control: (base) => ({
                                            ...base,
                                            backgroundColor: document.documentElement.classList.contains("dark")
                                                ? "#141427"
                                                : "#ffffff",
                                            borderColor: "#d1d5db",
                                            boxShadow: "none",
                                            color: document.documentElement.classList.contains("dark")
                                                ? "#ffffff"
                                                : "#000000",
                                            "&:hover": { borderColor: "#a855f7" },
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            backgroundColor: document.documentElement.classList.contains("dark")
                                                ? "#1e1e2f"
                                                : "#ffffff",
                                            color: document.documentElement.classList.contains("dark")
                                                ? "#f9fafb"
                                                : "#000000",
                                            borderRadius: "0.5rem",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                            zIndex: 50,
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isFocused
                                                ? document.documentElement.classList.contains("dark")
                                                    ? "#3b0764"
                                                    : "#ede9fe"
                                                : "transparent",
                                            color: state.isFocused
                                                ? document.documentElement.classList.contains("dark")
                                                    ? "#c084fc"
                                                    : "#6b21a8"
                                                : document.documentElement.classList.contains("dark")
                                                    ? "#f9fafb"
                                                    : "#000000",
                                            cursor: "pointer",
                                            ":active": {
                                                backgroundColor: "#a855f7",
                                                color: "#ffffff",
                                            },
                                        }),
                                        input: (base) => ({
                                            ...base,
                                            color: document.documentElement.classList.contains("dark")
                                                ? "#ffffff"
                                                : "#000000",
                                        }),
                                        placeholder: (base) => ({
                                            ...base,
                                            color: document.documentElement.classList.contains("dark")
                                                ? "#9ca3af"
                                                : "#6b7280",
                                        }),
                                        singleValue: (base) => ({
                                            ...base,
                                            color: document.documentElement.classList.contains("dark")
                                                ? "#ffffff"
                                                : "#000000",
                                        }),
                                        multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: document.documentElement.classList.contains("dark")
                                                ? "#3b0764"
                                                : "#ede9fe",
                                            borderRadius: "8px",
                                            padding: "2px 6px",
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            color: document.documentElement.classList.contains("dark")
                                                ? "#c084fc"
                                                : "#6b21a8",
                                            fontWeight: "500",
                                        }),
                                        multiValueRemove: (base) => ({
                                            ...base,
                                            color: document.documentElement.classList.contains("dark")
                                                ? "#c084fc"
                                                : "#9333ea",
                                            cursor: "pointer",
                                            ":hover": {
                                                backgroundColor: "#a855f7",
                                                color: "white",
                                            },
                                        }),
                                    }}
                                />
                            </div>
                        </div>

                        {/* Footer tetap di bawah */}
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-3 rounded-full text-sm border-2 border-purple-600 text-purple-600 font-semibold hover:bg-gray-100  dark:hover:bg-[#141427]"
                            >
                                Nanti Saja
                            </button>
                            <button
                                onClick={handleSubmitDiscussion}
                                className="transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
            hover:shadow-none active:translate-y-0.5 bg-purple-500 text-white font-semibold text-sm 
            px-6 py-3 rounded-full hover:text-black hover:bg-yellow-400"
                            >
                                Kirim Diskusi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiscussionPage;