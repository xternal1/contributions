// src/pages/user/Transaction/TransactionPage.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DashboardLayout from "@components/public/auth/DashboardLayout";
import useTransactionStore from "@lib/stores/user/transaction/useTransactionStore";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TransactionCard, TransactionCardSkeleton, TransactionEmpty, TransactionHeaderSkeleton, TransactionPagination, TransactionTabs } from "@/components/transaction/Index";

type Tab = "Semua" | "Menunggu Pembayaran" | "Selesai";

const TransactionPage = () => {
    const navigate = useNavigate();
    const tabs: Tab[] = ["Semua", "Menunggu Pembayaran", "Selesai"];
    const MySwal = withReactContent(Swal);

    const {
        transactions,
        loading,
        error,
        activeTab,
        currentPage,
        itemsPerPage,
        loadTransactions,
        cancelTransaction,
        setActiveTab,
        setCurrentPage,
        setError,
    } = useTransactionStore((s) => ({
        transactions: s.transactions,
        loading: s.loading,
        error: s.error,
        activeTab: s.activeTab,
        currentPage: s.currentPage,
        itemsPerPage: s.itemsPerPage,
        loadTransactions: s.loadTransactions,
        cancelTransaction: s.cancelTransaction,
        setActiveTab: s.setActiveTab,
        setCurrentPage: s.setCurrentPage,
        setError: s.setError,
    }));

    useEffect(() => {
        loadTransactions(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Filter transactions based on active tab
    const filteredTransactions =
        activeTab === "Semua"
            ? transactions
            : transactions.filter((t) => {
                if (activeTab === "Menunggu Pembayaran") return t.invoice_status === "unpaid";
                if (activeTab === "Selesai") return t.invoice_status === "paid";
                return true;
            });

    // Calculate pagination
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handlePayment = (id: string) => {
        navigate(`/transaction/detail/${id}`);
    };

    const handleCancel = async (id: string) => {
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

        if (!result.isConfirmed) return;

        try {
            await cancelTransaction(id);

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
        }
    };

    return (
        <DashboardLayout slug="transaction">
            <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
                <section className="text-start">
                    {loading ? (
                        <TransactionHeaderSkeleton />
                    ) : (
                        <>
                            <h2 className="text-xl font-bold mb-5">Riwayat Transaksi</h2>
                            <TransactionTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                onTabChange={handleTabChange}
                            />
                        </>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <TransactionCardSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <p className="text-center text-red-500 font-semibold py-10">{error}</p>
                    )}

                    {/* Empty State */}
                    {!loading && filteredTransactions.length === 0 && <TransactionEmpty />}

                    {/* Transaction List */}
                    {!loading &&
                        currentTransactions.map((item) => (
                            <TransactionCard
                                key={item.id}
                                transaction={item}
                                onPayment={handlePayment}
                                onCancel={handleCancel}
                            />
                        ))}

                    {/* Pagination */}
                    {!loading && filteredTransactions.length > 0 && (
                        <TransactionPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </section>
            </main>
        </DashboardLayout>
    );
};

export default TransactionPage;


