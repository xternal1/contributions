import { useState, useEffect } from "react";
import { FaBookOpen, FaTrophy, FaInfoCircle, FaVideo, FaCalendarAlt, FaClock, FaCheck, FaTimes } from "react-icons/fa";
import { HiClipboardList } from "react-icons/hi";
import { IoExtensionPuzzle, IoLibrary } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { motion } from "framer-motion";
import DashboardLayout from "../../../../components/public/auth/DashboardLayout";

import user1 from "../../../../assets/img/user1.png";
import user2 from "../../../../assets/img/user2.png";

const DashboardIndustry = ({ name = "User", gender = "male" }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const summaryCards = [
        { title: "Jumlah Tugas", value: 26, icon: <FaBookOpen className="text-purple-600 text-3xl" /> },
        { title: "Jumlah Materi", value: 26, icon: <IoLibrary className="text-purple-600 text-3xl" /> },
        { title: "Jumlah Tantangan", value: 26, icon: <IoExtensionPuzzle className="text-purple-600 text-3xl" /> },
        { title: "Jumlah Event", value: 26, icon: <MdEvent className="text-purple-600 text-3xl" /> },
        { title: "Jumlah Point", value: 26, icon: <FaTrophy className="text-purple-600 text-3xl" /> },
    ];

    const zoomSchedule = [
        {
            title: "Zoom Designer Blasasib Lorem Ipsum osdhfsiuhdfibsifisdgfis dsibudbsus usubhf",
            date: "20 Maret 2025",
            time: "10:00 WIB - 11:00 WIB",
            button: "Mulai Zoom",
        },
        {
            title: "JavaScript",
            date: "20 Maret 2025",
            time: "13:00 WIB - 14:00 WIB",
            button: "Mulai Zoom",
        },
        {
            title: "Evaluasi",
            date: "20 Maret 2025",
            time: "07:00 WIB - 07:30 WIB",
            button: "Selesai",
        },
    ];

    return (
        <DashboardLayout slug="dashboardIndustri">
            <main className="space-y-6 flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
                {/* Header */}
                <section className="relative bg-white rounded-md w-full h-40 shadow border flex items-center justify-start overflow-hidden dark:bg-[#2C004F]">
                    {loading ? (
                        <div className="flex items-center w-full h-full p-6 animate-pulse gap-6">
                            <div className="h-28 w-28 bg-gray-200 dark:bg-[#0D0D1A] rounded-full"></div>
                            <div className="flex flex-col justify-center flex-1 space-y-3">
                                <div className="h-6 bg-gray-200 dark:bg-[#0D0D1A] rounded w-1/3"></div>
                                <div className="h-4 bg-gray-200 dark:bg-[#0D0D1A] rounded w-2/3"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <img
                                src={gender === "female" ? user2 : user1}
                                alt="avatar"
                                className="h-35 w-auto object-cover mt-5"
                            />
                            <div className="p-6 -mt-6">
                                <h2 className="text-3xl font-semibold text-start text-purple-600">Hola, {name}!</h2>
                                <p className="text-gray-600 font-semibold dark:text-white">Selamat Datang di Kelas Industri Hummatech</p>
                            </div>
                            <div className="absolute bottom-0 right-0">
                                <div className="w-23 h-23 bg-purple-400  opacity-60 rounded-full absolute -bottom-9 right-2"></div>
                                <div className="w-23 h-23 bg-purple-400  opacity-60 rounded-full absolute -bottom-1 -right-10"></div>
                            </div>
                        </>
                    )}
                </section>


                {/* Summary Cards */}
                <section className="w-full max-w-[840px] mx-auto flex gap-5 overflow-x-auto pb-2 scroll-smooth">
                    {loading
                        ? [...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="min-w-[266px] h-[150px] bg-gray-200 dark:bg-[#0D0D1A] rounded-md animate-pulse flex-shrink-0"
                            ></div>
                        ))
                        : summaryCards.map((card, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="min-w-[266px] bg-white dark:bg-[#0D0D1A] dark:border-white border rounded-md shadow-sm p-5 text-center flex flex-col items-center justify-center flex-shrink-0"
                            >
                                <div className="text-purple-600 text-3xl p-3  bg-purple-100 dark:bg-[#2C004F] rounded-md">{card.icon}</div>
                                <p className="text-2xl font-bold text-dark mt-2">{card.value}</p>
                                <h3 className="font-medium text-gray-700 mt-1 dark:text-white">{card.title}</h3>
                            </motion.div>
                        ))}
                </section>

                {/* Tagihan Section */}
                <section className="text-start">
                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            <div className="h-6 w-56 bg-gray-200 dark:bg-[#0D0D1A] rounded mb-3"></div>

                            <div className="h-[100px] bg-gray-200 dark:bg-[#0D0D1A] rounded-md"></div>

                            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_0.7fr] gap-4">
                                <div className="h-[120px] bg-gray-200 dark:bg-[#0D0D1A] rounded-md"></div>
                                <div className="h-[120px] bg-gray-200 dark:bg-[#0D0D1A] rounded-md"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-lg text-start font-bold mb-3">Tagihan Cicilan Semester</h3>
                            <div className="bg-orange-50 text-yellow-500 dark:bg-yellow-950 dark:text- p-4 rounded-lg font-medium text-sm mb-3 flex items-center gap-4">
                                <FaInfoCircle size={40} className="flex-shrink-0" />
                                <span className="font-semibold italic leading-relaxed text-xl">
                                    Selesaikan pembayaran sampai bulan ini ya, supaya fitur Kelas Industri tidak terkunci.
                                    Nominal yang harus kamu bayar tertera di bawah.
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_0.7fr] gap-4 mb-8">
                                {/* === Tagihan Bulan === */}
                                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 dark:bg-[#0D0D1A]">
                                    <div className="bg-purple-600 text-white px-4 py-2">
                                        <h3 className="font-semibold text-lg">Tagihan Bulan</h3>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-sm font-semibold text-gray-500 leading-snug dark:text-white mb-3">
                                            Bulan
                                        </p>
                                        <p className="text-3xl font-bold text-purple-600 mb-2">Jan 2025 - Mar 2025</p>
                                    </div>
                                </div>

                                {/* === Total Tagihan === */}
                                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 dark:bg-[#0D0D1A]">
                                    <div className="bg-purple-600 text-white px-4 py-2">
                                        <h3 className="font-semibold text-lg">Total Tagihan</h3>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-sm font-semibold text-gray-500 leading-snug dark:text-white mb-3">
                                            Tagihan Kelas Belum Di bayar
                                        </p>
                                        <p className="text-3xl font-bold text-purple-600 mb-2">Jan 2025 - Mar 2025</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>

                {/* Jadwal Zoom Hari Ini */}
                <section className="text-start">
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-6 w-52 bg-gray-200 dark:bg-[#0D0D1A] rounded mb-3"></div>

                            <div className="w-full max-w-[840px] mx-auto flex gap-5 overflow-x-auto pb-2 scroll-smooth">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-sm h-[200px] bg-gray-200 dark:bg-[#0D0D1A] rounded-xl flex-shrink-0"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-lg font-bold mb-3">Jadwal Zoom Hari Ini</h3>
                            <div className="w-full max-w-[840px] mx-auto flex gap-5 overflow-x-auto pb-2 scroll-smooth">
                                {zoomSchedule.map((z, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05 }}
                                        className="w-sm h-sm bg-white dark:bg-[#0D0D1A] border dark:border-white rounded-xl shadow-sm p-5 flex flex-col justify-between flex-shrink-0"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2.5 bg-purple-100 dark:bg-[#2C004F] rounded-xl flex-shrink-0">
                                                <div className="bg-purple-600 rounded-full p-3 flex items-center justify-center">
                                                    <FaVideo className="text-white text-xl dark:text-[#2C004F]" />
                                                </div>
                                            </div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-md leading-snug line-clamp-2 break-words mt-1">
                                                {z.title}
                                            </h4>
                                        </div>

                                        <div className="flex justify-between mt-4 text-sm">
                                            <div>
                                                <div className="flex items-center gap-1 text-gray-400 font-medium">
                                                    <FaCalendarAlt className="text-red-500 text-xs" />
                                                    <span className="dark:text-white">Tanggal</span>
                                                </div>
                                                <p className="font-semibold text-gray-800 dark:text-white mt-1">{z.date}</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1 text-gray-400 font-medium">
                                                    <FaClock className="text-yellow-500 text-xs" />
                                                    <span className="dark:text-white">Waktu</span>
                                                </div>
                                                <p className="font-semibold text-gray-800 dark:text-white mt-1">{z.time}</p>
                                            </div>
                                        </div>

                                        <button
                                            className={`mt-5 w-full py-2.5 rounded-xl font-semibold  ${z.button === "Mulai Zoom"
                                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                                : "bg-green-100 text-green-600 dark:bg-green-950"
                                                }`}
                                        >
                                            {z.button}
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </section>

                {/* Statistik Kamu */}
                <section className="text-start">
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            {/* skeleton title */}
                            <div className="h-6 w-48 bg-gray-200 dark:bg-[#0D0D1A] rounded mb-3"></div>

                            {/* statistik box */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="h-[320px] bg-gray-200 dark:bg-[#0D0D1A] rounded-2xl"></div>
                                <div className="h-[320px] bg-gray-200 dark:bg-[#0D0D1A] rounded-2xl"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-lg font-bold mb-3">Statistik Kamu</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-[#0D0D1A] dark:border-white border rounded-2xl shadow p-5">
                                    <h4 className="font-semibold text-2xl text-black dark:text-white mb-1">Tugas</h4>
                                    <p className="text-gray-600 mb-5 dark:text-white">
                                        Statistik Tugas
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-purple-50 dark:bg-[#2C004F] p-5 rounded-xl">
                                            <div>
                                                <p className="text-3xl font-bold text-purple-600 leading-none">20</p>
                                                <p className="text-gray-500 dark:text-white text-sm mt-1">Sudah Dikerjakan</p>
                                            </div>
                                            <div className="relative">
                                                <div>
                                                    <IoExtensionPuzzle size={40} className="text-purple-600" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center bg-purple-50 dark:bg-[#2C004F] p-5 rounded-xl">
                                            <div>
                                                <p className="text-3xl font-bold text-purple-600 leading-none">20</p>
                                                <p className="text-gray-500 dark:text-white text-sm mt-1">Belum Dikerjakan</p>
                                            </div>
                                            <div className="relative">
                                                <div>
                                                    <IoExtensionPuzzle size={40} className="text-purple-600" />
                                                    <FaCheck className="absolute -bottom-1 right-1 bg-purple-50 p-1 rounded-full text-purple-600 text-lg" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center bg-purple-50 dark:bg-[#2C004F] p-5 rounded-xl">
                                            <div>
                                                <p className="text-3xl font-bold text-purple-600 leading-none">20</p>
                                                <p className="text-gray-500 dark:text-white text-sm mt-1">Tidak Dikerjakan</p>
                                            </div>
                                            <div className="relative">
                                                <div>
                                                    <IoExtensionPuzzle size={40} className="text-purple-600" />
                                                    <FaTimes className="absolute -bottom-1 right-1 bg-purple-50 p-1 rounded-full text-purple-600 text-lg" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border dark:bg-[#0D0D1A] dark:border-white rounded-2xl shadow p-5">
                                    <h4 className="font-semibold text-2xl text-black dark:text-white mb-1">Tantangan</h4>
                                    <p className="text-gray-600 dark:text-white mb-5">
                                        Statistik Tantangan
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-purple-50 dark:bg-[#2C004F] p-5 rounded-xl">
                                            <div>
                                                <p className="text-3xl font-bold text-purple-600 leading-none">20</p>
                                                <p className="text-gray-500 dark:text-white text-sm mt-1">Sudah Dikerjakan</p>
                                            </div>
                                            <div className="relative">
                                                <div>
                                                    <HiClipboardList size={40} className="text-purple-600" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center bg-purple-50 dark:bg-[#2C004F] p-5 rounded-xl">
                                            <div>
                                                <p className="text-3xl font-bold text-purple-600 leading-none">20</p>
                                                <p className="text-gray-500 dark:text-white text-sm mt-1">Belum Dikerjakan</p>
                                            </div>
                                            <div className="relative">
                                                <div>
                                                    <HiClipboardList size={40} className="text-purple-600" />
                                                    <FaCheck className="absolute -bottom-1 right-1 bg-purple-50 p-1 rounded-full text-purple-600 text-lg" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center bg-purple-50 dark:bg-[#2C004F] p-5 rounded-xl">
                                            <div>
                                                <p className="text-3xl font-bold text-purple-600 leading-none">20</p>
                                                <p className="text-gray-500 dark:text-white text-sm mt-1">Tidak Dikerjakan</p>
                                            </div>
                                            <div className="relative">
                                                <div>
                                                    <HiClipboardList size={40} className="text-purple-600" />
                                                    <FaTimes className="absolute -bottom-1 right-1 bg-purple-50 p-1 rounded-full text-purple-600 text-lg" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </DashboardLayout>
    );
};

export default DashboardIndustry;
