import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Search, PlusCircle, X, BookOpen, MessageCircle } from "lucide-react";

const DiscussionPage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

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
                    <h1 className="text-white font-semibold text-left text-lg">Kembali</h1>
                </div>

                {/* Card Intro */}
                <div className="relative min-h-37 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-left px-5 mb-4 md:mb-0 md:flex-1">
                        <h5 className="text-xl font-semibold text-white">Forum Diskusi</h5>
                        <h2 className="text-2xl font-bold text-white">
                            Selamat Datang, User Di Forum Diskusi
                        </h2>
                        <p className="text-white mt-1 sm:text-base md:text-base">
                            Konsultasi seputar materi belajar Anda
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-end w-full md:w-auto">
                        <img
                            src="/src/assets/img/book.png"
                            alt="Ilustrasi Ujian"
                            className="w-80 sm:w-80 md:w-60 mx-8 mt-6 md:mt-0 2xl:absolute xl:absolute lg:absolute 2xl:right-2 2xl:-bottom-0 xl:right-2 xl:-bottom-0 lg:right-2 lg:-bottom-0"
                        />
                    </div>
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

                        <div className="bg-white shadow rounded-lg p-5 h-fit">
                            <h3 className="text-lg font-semibold text-start text-gray-800 mb-4">
                                Urutkan Berdasarkan
                            </h3>

                            <div className="space-y-2 mb-6">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="sort" defaultChecked />
                                    <span>Diskusi Terbaru</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="sort" />
                                    <span>Diskusi Populer</span>
                                </label>
                            </div>

                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Topik</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Ujian", "Materi", "Konsultasi", "Klinik"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-purple-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex text-start items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-purple-600 text-white px-5 py-3 flex justify-between items-center">
                            <h2 className="font-semibold text-lg">Diskusi Baru</h2>
                            <button onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="font-semibold text-gray-700 block mb-1">Modul Belajar</label>
                                <select className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500">
                                    <option>Rangkuman dari Sub-modul Pendahuluan</option>
                                </select>
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700 block mb-1">Judul Pertanyaan</label>
                                <input
                                    type="text"
                                    placeholder="Tulis judul pertanyaan Anda dengan singkat"
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700 block mb-1">Deskripsi Pertanyaan</label>
                                <textarea
                                    placeholder="Uraikan pertanyaan Anda lebih panjang dan jelas pada bagian ini."
                                    rows={5}
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-1">
                                    Anda dapat menambahkan potongan kode, gambar atau video untuk memperjelas pertanyaan.
                                </p>
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700 block mb-1">Kata Kunci</label>
                                <input
                                    type="text"
                                    placeholder="Tulis kata kunci pertanyaan, pisahkan dengan koma"
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Maksimal 6 kata kunci. Contoh: android, intents, material design
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2 rounded-lg text-purple-600 font-semibold hover:bg-gray-100"
                            >
                                Nanti Saja
                            </button>
                            <button className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                                Kirim Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default DiscussionPage