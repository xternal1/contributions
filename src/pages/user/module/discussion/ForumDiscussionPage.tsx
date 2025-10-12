import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Search, X, BookOpen, MessageCircle } from "lucide-react";

const ForumDiscussionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 mb-15">
            {/* Header */}
            <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md mx-auto mt-8">
                {/* Header kecil */}
                <div className="flex items-center bg-gradient-to-br from-purple-500 to-purple-700 py-3 px-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white text-2xl flex items-center justify-center mr-2"
                    >
                        <FiChevronLeft size={24} />
                    </button>
                    <h1 className="text-white font-semibold text-left text-lg">Forum Diskusi (nama modul)</h1>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto mt-8 flex flex-col lg:flex-row gap-8">
                    {/* Left Section - Discussions */}
                    <div className="flex-1 space-y-4 bg-white rounded-xl p-7 shadow">
                        {/* Search & Filter */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2 w-full md:w-1/2 bg-white px-3 py-2 rounded-lg shadow">
                                <Search className="text-purple-500" />
                                <input
                                    type="text"
                                    placeholder="Cari topik diskusi..."
                                    className="w-full outline-none text-sm"
                                />
                            </div>
                            <div className="w-full md:w-1/3">
                                <select
                                    className="w-full bg-white border border-gray-300 rounded-lg shadow px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Pilih Modul
                                    </option>
                                    <option value="semua">Semua</option>
                                    <option value="ujian">Ujian</option>
                                    <option value="materi">Materi</option>
                                    <option value="konsultasi">Konsultasi</option>
                                    <option value="klinik">Klinik</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-9 mt-9 text-start font-semibold flex items-center flex-wrap gap-2">
                            <h2 className="text-lg text-gray-800">Diskusi berdasarkan :</h2>

                            {/* Tag Filter */}
                            <div className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md text-sm shadow cursor-pointer hover:bg-purple-700 transition">
                                <span>Nama Modul Lorem Ipsum</span>
                                <X size={16} className="cursor-pointer hover:text-gray-200" />
                            </div>
                        </div>

                        {/* Discussion List */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="bg-white text-start shadow rounded-lg overflow-hidden border border-gray-200"
                            >
                                {/* Header Ungu */}
                                <div className="bg-purple-600 text-white px-4 py-2 flex items-center gap-2">
                                    <BookOpen size={18} />
                                    <span className="font-semibold">Nama Modul Lorem Ipsum</span>
                                </div>

                                {/* Body */}
                                <div className="p-5 bg-gray-50">
                                    {/* User Info */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src="https://i.pravatar.cc/40"
                                            alt="User"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="text-sm text-gray-700">
                                            <span className="font-semibold">Alfian Ban Dalam</span>
                                            <span className="mx-2 text-gray-400">•</span>
                                            <span className="text-gray-500">1 Tahun yang lalu</span>
                                        </div>
                                    </div>

                                    {/* Judul & Deskripsi */}
                                    <h3 className="font-bold text-gray-900 mb-1">
                                        Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                        Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida.
                                        Risus commodo viverra maecenas
                                    </p>

                                    {/* Tag */}
                                    <div className="mb-4">
                                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs font-medium">
                                            #loremipsum
                                        </span>
                                    </div>

                                    {/* Balasan */}
                                    <div className="flex items-center text-gray-600 gap-2 text-sm font-medium">
                                        <MessageCircle size={18} />
                                        <span>10 Balasan</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        <div className="flex justify-center mt-6 gap-2">
                            {[1, 2, 3].map((p) => (
                                <button
                                    key={p}
                                    className={`w-8 h-8 rounded-full ${p === 1
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-200 hover:bg-purple-200 text-gray-700"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default ForumDiscussionPage