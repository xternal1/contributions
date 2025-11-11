import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/public/auth/DashboardLayout";
import { FaStar } from "react-icons/fa";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import empty from "../../../assets/img/no-data/empty.svg";
import DefaultImg from "../../../assets/Default-Img.png";
import { motion } from "framer-motion";

import { fetchUserTransactions, cancelTransaction } from "../../../features/user/user_service";
import type { CourseTransaction } from "../../../features/user/models";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TransactionPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Semua");
    const [transactions, setTransactions] = useState<CourseTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const cleanHTML = (html: string) => html.replace(/style="[^"]*"/g, "");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const tabs = ["Semua", "Menunggu Pembayaran", "Selesai"];
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                setLoading(true);
                const data = await fetchUserTransactions(1);
                setTransactions(data);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat data transaksi");
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []);

    const filteredTransactions =
        activeTab === "Semua"
            ? transactions
            : transactions.filter((t) => {
                if (activeTab === "Menunggu Pembayaran")
                    return t.invoice_status === "unpaid";
                if (activeTab === "Selesai")
                    return t.invoice_status === "paid";
                return true;
            });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "unpaid":
            case "pending":
                return "text-yellow-500";
            case "paid":
                return "text-green-500";
            case "expired":
                return "text-gray-700 dark:text-gray-400";
            case "canceled":
                return "text-red-500";
            default:
                return "text-gray-600";
        }
    };

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

    const headlePriceSubmit = (id: string) => {
        navigate(`/transaction/detail/${id}`);
    };

    const headlePriceCancel = async (id: string) => {
        const result = await MySwal.fire({
            title: "Batalkan Pesanan?",
            text: "Apakah kamu yakin ingin membatalkan pesanan ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Batalkan!",
            cancelButtonText: "Tidak",
            reverseButtons: true,
            buttonsStyling: false,
            customClass: {
                popup: "my-swal-popup",
                title: "my-swal-title",
                htmlContainer: "my-swal-text",
                confirmButton: "my-swal-confirm",
                cancelButton: "my-swal-cancel",
                icon: "my-swal-icon swal2-warning",
            },
        });

        if (result.isConfirmed) {
            try {
                setLoading(true);
                await cancelTransaction(id);

                setTransactions((prev) =>
                    prev.map((t) =>
                        t.id === id ? { ...t, invoice_status: "canceled" } : t
                    )
                );

                await MySwal.fire({
                    title: "Pesanan Dibatalkan!",
                    text: "Pesanan kamu telah berhasil dibatalkan.",
                    icon: "success",
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        popup: "my-swal-popup",
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        confirmButton: "my-swal-confirm",
                        icon: "my-swal-icon swal2-success",
                    },
                });
            } catch (err) {
                console.error("Gagal membatalkan transaksi:", err);
                setError("Gagal membatalkan pesanan.");

                MySwal.fire({
                    title: "Gagal!",
                    text: "Terjadi kesalahan saat membatalkan pesanan.",
                    icon: "error",
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        popup: "my-swal-popup",
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        confirmButton: "my-swal-confirm",
                        icon: "my-swal-icon swal2-error",
                    },
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const SkeletonCard = () => (
        <div className="border rounded-xl shadow-md overflow-hidden mb-6 animate-pulse dark:bg-[#0D0D1A]">
            <div className="flex flex-wrap items-center gap-6 p-6">
                <div className="w-60 h-40 bg-gray-200 rounded-lg dark:bg-[#141427]" />
                <div className="flex-1 space-y-3">
                    <div className="w-32 h-4 bg-gray-200 rounded dark:bg-[#141427]" />
                    <div className="w-64 h-5 bg-gray-300 rounded dark:bg-[#141427]" />
                    <div className="w-48 h-4 bg-gray-200 rounded dark:bg-[#141427]" />
                    <div className="w-full h-3 bg-gray-100 rounded dark:bg-[#141427]" />
                </div>
            </div>
            <div className="border-t px-6 py-4 flex justify-between">
                <div className="w-48 h-4 bg-gray-200 rounded dark:bg-[#141427]" />
                <div className="w-32 h-4 bg-gray-300 rounded dark:bg-[#141427]" />
            </div>
        </div>
    );

    return (
        <DashboardLayout slug="transaction">
            <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
                <section className="text-start">
                    {loading ? (
                        <div className="animate-pulse space-y-6 mb-6">
                            {/* Title skeleton */}
                            <div className="h-8 w-40 bg-gray-200 rounded-lg dark:bg-[#0D0D1A]" />

                            {/* Tabs skeleton */}
                            <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 justify-center sm:justify-start">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-10 w-40 bg-gray-200 rounded-full dark:bg-[#0D0D1A]"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold mb-5">Riwayat Transaksi</h2>

                            {/* Tabs */}
                            <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 mb-6 justify-center sm:justify-start">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            setActiveTab(tab);
                                            setCurrentPage(1);
                                        }}
                                        className={`px-5 py-3 rounded-full font-bold transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                                                hover:shadow-none active:translate-y-0.5 ${activeTab === tab
                                                ? "bg-purple-600 text-sm text-white hover:bg-yellow-400 hover:text-gray-950 dark:bg-purple-600 dark:text-white"
                                                : "bg-gray-200 text-sm text-gray-600 dark:border dark:border-purple-600 dark:text-white dark:bg-[#141427]"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {error && !loading && (
                        <p className="text-center text-red-500 font-semibold py-10">{error}</p>
                    )}

                    {/* Empty State */}
                    {!loading && filteredTransactions.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <img className="w-64" src={empty} alt="no-data" />
                            <p className="text-gray-600 text-lg font-bold mt-4 dark:text-white">
                                Belum ada riwayat transaksi.
                            </p>
                        </div>
                    )}

                    {/* Transaction List */}
                    {!loading &&
                        currentTransactions.map((item) => (
                            <div key={item.id} className="border rounded-xl shadow-md overflow-hidden mb-6 dark:border-white dark:bg-[#0D0D1A]">
                                <div className="flex flex-wrap items-center gap-6 p-6">
                                    <img
                                        className="w-60 h-40 border-2 border-gray-200 rounded-lg object-cover"
                                        src={item.product.photo || DefaultImg}
                                        alt={item.product.title}
                                        onError={(e) => {
                                            const target = e.currentTarget as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = DefaultImg;
                                        }}
                                    />

                                    <div className="flex-1 min-w-auto">
                                        <span className="bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 dark:text-white dark:bg-purple-950">
                                            {item.product.category}
                                        </span>
                                        <h3 className="text-lg font-bold mt-2">{item.product.title}</h3>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1 dark:text-gray-300">
                                            <FaStar className="text-yellow-500" />
                                            <span>
                                                ({parseFloat(item.product.rating || "0").toFixed(1)} Reviews)
                                            </span>
                                        </div>
                                        <p
                                            className="text-gray-500 text-sm mt-2 line-clamp-2 dark:text-gray-300"
                                            dangerouslySetInnerHTML={{ __html: cleanHTML(item.product.description || "") }}
                                        ></p>

                                    </div>
                                </div>

                                <div className="border-t px-6 py-4 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:border-gray-400">
                                    <p className="font-semibold text-gray-700 dark:text-white">
                                        Status Pesanan:{" "}
                                        <span className={`${getStatusColor(item.invoice_status)} capitalize`}>
                                            {item.invoice_status === "unpaid"
                                                ? "Menunggu Pembayaran"
                                                : item.invoice_status === "paid"
                                                    ? "Selesai"
                                                    : item.invoice_status === "expired"
                                                        ? "Kedaluarsa"
                                                        : item.invoice_status === "canceled"
                                                            ? "Dibatalkan"
                                                            : "Pending"}
                                        </span>
                                    </p>
                                    <p className="font-semibold text-gray-800 dark:text-white">
                                        Total Harga:{" "}
                                        <span className="text-purple-700 text-lg font-bold">
                                            Rp. {item.paid_amount.toLocaleString("id-ID")}
                                        </span>
                                    </p>
                                </div>

                                {(item.invoice_status === "pending" || item.invoice_status === "unpaid") && (
                                    <div className="px-6 py-4 flex flex-col sm:flex-row flex-wrap gap-3 justify-end">
                                        <button
                                            onClick={() => headlePriceCancel(item.id)}
                                            className="border-2 border-red-500 text-red-600 text-sm font-semibold px-5 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                                        >
                                            Batalkan Pesanan
                                        </button>
                                        <button
                                            onClick={() => headlePriceSubmit(item.id)}
                                            className="bg-purple-600 text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
                                        >
                                            Bayar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                    {/* Pagination */}
                    {!loading && filteredTransactions.length > 0 && (
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
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
                    )}
                </section>
            </main>
        </DashboardLayout>
    );
};

export default TransactionPage;
