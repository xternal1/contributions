// src/pages/public/Rating.tsx
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import DashboardLayout from "../../../../components/public/auth/DashboardLayout";

const Rating = () => {
    const [search, setSearch] = useState("");

    const students = Array(10)
        .fill(0)
        .map((_, i) => ({
            id: i + 1,
            name: "Alhan Kopling lorem ipsum dolor",
            school: "SMK Negeri 1 Kepanjen",
            class: "XI RPL A",
            point: 2600,
        }));

    return (
        <DashboardLayout slug="rating">
            <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8 pb-10  min-h-screen transition-colors duration-500">
                {/* Header */}
                <div className="mb-8 text-left">
                    <h2 className="text-xl font-bold mb-2 dark:text-white transition-colors duration-500">Peringkat</h2>
                    <p className="text-gray-500 dark:text-gray-400 transition-colors duration-500">Daftar Siswa Dengan Point Tertinggi!</p>
                </div>

                {/* Top 3 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 justify-items-center">
                    {[1, 2, 3].map((rank) => (
                        <div
                            key={rank}
                            className="bg-white dark:bg-[#0D0D1A] shadow-md rounded-2xl max-w-sm w-full p-5 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-200 transition-colors duration-500"
                        >
                            {/* Flex: gambar kiri, teks kanan */}
                            <div className="flex items-center gap-x-4 relative">
                                {/* Foto + Badge Medal */}
                                <div className="relative w-16 h-16">
                                    <img
                                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=user${rank}`}
                                        alt="avatar"
                                        className="w-16 h-16 rounded-full border-4 border-indigo-500 dark:border-indigo-400"
                                    />

                                    {/* Badge Medal */}
                                    <div
                                        className="
                absolute -bottom-2 left-1/2 -translate-x-1/2 
                bg-white dark:bg-[#111] w-7 h-7 
                flex items-center justify-center 
                rounded-full text-lg shadow-md
            "
                                    >
                                        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm transition-colors duration-500">
                                        Alfian Fahrul Rifai
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-500">
                                        SMKN 1 Kepanjen
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-500">
                                        XI RPL A
                                    </p>
                                    <p className="font-bold text-indigo-600 dark:text-indigo-400 mt-1 text-sm transition-colors duration-500">
                                        2000 Point
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Ranking Table */}
                <div className="bg-white dark:bg-[#0D0D1A] shadow-md rounded-2xl p-6 border border-gray-100 dark:border-gray-200 transition-colors duration-500">
                    {/* User Ranking Info and Search */}
                    <div className="flex flex-col mb-6">
                        {/* Bagian Informasi Ranking */}
                        <div className="mb-6 space-y-2">
                            <p className="text-xs text-gray-700 dark:text-gray-300 text-left transition-colors duration-500">
                                <span className="font-semibold text-gray-500 dark:text-gray-400 transition-colors duration-500">Peringkat Anda</span>
                            </p>

                            <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 flex items-center gap-2 mt-3 transition-colors duration-500">
                                <img
                                    src="/images/icon/tropi.png"
                                    alt="Champion Icon"
                                    className="w-5 h-5 object-contain dark:invert"
                                />
                                <span className="font-bold text-black dark:text-white transition-colors duration-500">
                                    OLIVIA RAHMADANI
                                </span>
                                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
                                    berada pada ranking 585
                                </span>
                            </p>

                        </div>

                        {/* Kotak Pencarian dan Filter Sekolah */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full mt-2">
                            {/* Input Search */}
                            <div className="relative w-full sm:w-72">
                                <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 dark:text-gray-500 transition-colors duration-500" />
                                <input
                                    type="text"
                                    placeholder="Cari siswa..."
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-purple-400 dark:focus:border-purple-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* Dropdown Filter Sekolah */}
                            <div className="relative w-full sm:w-48">
                                <select
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 pl-10 pr-4 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-purple-400 dark:focus:border-purple-500 appearance-none bg-white dark:bg-gray-700 transition-colors duration-500"
                                    defaultValue=""
                                >
                                    <option value="" disabled className="dark:bg-gray-700">
                                        Sekolah
                                    </option>
                                    <option value="smkn1" className="dark:bg-gray-700">SMKN 1 Kepanjen</option>
                                    <option value="smkn2" className="dark:bg-gray-700">SMKN 2 Malang</option>
                                    <option value="smkn3" className="dark:bg-gray-700">SMKN 3 Blitar</option>
                                </select>

                                {/* Ikon filter di kiri */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors duration-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2l-6 7v6l-4 2v-8L3 6V4z" />
                                </svg>
                            </div>
                        </div>

                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-purple-900 text-gray-600 dark:text-gray-300 text-sm transition-colors duration-500 border border-gray-200 dark:border-gray-400">
                                    <th className="py-3 px-4 text-left ">No</th>
                                    <th className="py-3 px-4 text-left">Nama</th>
                                    <th className="py-3 px-4 text-left">Sekolah</th>
                                    <th className="py-3 px-4 text-left">Kelas</th>
                                    <th className="py-3 px-4 text-left ">Point</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, i) => (
                                    <tr
                                        key={i}
                                        className={`border-b border-gray-200 dark:border-gray-400 transition-all text-gray-700 dark:text-gray-100 ${i % 2 === 0
                                                ? "bg-gray-50 dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900"
                                                : "bg-white dark:bg-purple-900 hover:bg-gray-50 dark:hover:bg-purple-800"
                                            } transition-colors duration-300`}
                                    >
                                        {/* Kolom No: gunakan flex + lebar tetap agar emoji dan angka sejajar */}
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-center">
                                                <span className="inline-block w-8 text-center text-md leading-none">
                                                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-4 text-md">{student.name}</td>
                                        <td className="py-3 px-4 text-md">{student.school}</td>
                                        <td className="py-3 px-4 text-md">{student.class}</td>
                                        <td className="py-3 px-4 text-md text-indigo-600 dark:text-white transition-colors duration-300">
                                            {student.point}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>


                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {[1, 2, 3, 4].map((page) => (
                            <button
                                key={page}
                                className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${page === 1
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default Rating;