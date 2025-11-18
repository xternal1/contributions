import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { generateInvoicePDF } from "@utils/invoiceService";
import unpaidImg from "@assets/img/payment-status/unpaid.png";
import paidImg from "@assets/img/payment-status/paid.png";
import expiredImg from "@assets/img/payment-status/expired.png";
import canceledImg from "@assets/img/payment-status/canceled.png";
import { useTransactionDetailStore } from "@lib/stores/user/transaction/useTransactionDetailStore";
import { DownloadInvoiceButton, InstructionsSection, PaymentDetailsSection, StatusCardSection } from "@/components/transaction/transactionDetail/Index";


const MySwal = withReactContent(Swal);

const statusConfig: Record<
    "UNPAID" | "PAID" | "EXPIRED" | "CANCELLED",
    { img: string; title?: string; message?: string }
> = {
    UNPAID: {
        img: unpaidImg,
        title: "Belum Terbayar",
        message: "Silakan menyelesaikan pembayaran",
    },
    PAID: {
        img: paidImg,
        title: "Pembayaran Berhasil",
        message: "Terima kasih, pembayaran Anda telah berhasil",
    },
    EXPIRED: {
        img: expiredImg,
        title: "Transaksi Kedaluarsa",
        message: "Mohon maaf transaksi Anda telah kedaluarsa",
    },
    CANCELLED: {
        img: canceledImg,
        title: "Pembayaran Dibatalkan",
        message: "Transaksi Anda berhasil dibatalkan",
    },
};

const TransactionDetailPage: React.FC = () => {
    const { reference } = useParams<{ reference: string }>();
    const navigate = useNavigate();
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [openSection, setOpenSection] = useState<string | null>(null);

    // Zustand store connection
    const {
        transaction,
        fullTransaction,
        paymentChannels,
        isLoading,
        paymentStatus,
        loadTransaction,
        checkStatus,
        cancelPayment,
        reset
    } = useTransactionDetailStore();

    useEffect(() => {
        if (reference) {
            loadTransaction(reference);
            return () => reset();
        }
    }, [reference, loadTransaction, reset]);

    const displayTransaction = transaction;
    const displayFullTransaction = fullTransaction;

    const transactionPayment = (
        displayFullTransaction?.payment_method ||
        displayFullTransaction?.payment_channel
    );

    const matchedChannel = paymentChannels.find((ch) => {
        if (!transactionPayment) return false;

        const channelName = ch.name.toLowerCase().trim();
        const channelCode = ch.code.toLowerCase().trim();
        const searchTerm = transactionPayment.toLowerCase().trim();

        return (
            channelName === searchTerm ||
            channelCode === searchTerm ||
            channelName.includes(searchTerm) ||
            channelCode.includes(searchTerm)
        );
    });

    const logo = matchedChannel?.icon_url;

    const handleCheckStatus = () => {
        if (reference) checkStatus(reference);
    };

    const handleCancelPayment = async () => {
        if (!reference) return;

        const result = await MySwal.fire({
            title: "Batalkan Pembayaran?",
            text: "Apakah Anda yakin ingin membatalkan transaksi ini?",
            icon: "warning",
            width: "420px",
            showCancelButton: true,
            confirmButtonText: "Ya, Batalkan",
            cancelButtonText: "Tidak",
            buttonsStyling: false,
            customClass: {
                popup: "my-swal-popup dark:bg-[#141427] dark:text-white",
                title: "my-swal-title dark:text-white",
                icon: "my-swal-icon",
                htmlContainer: "my-swal-text dark:text-gray-300",
                confirmButton: "my-swal-confirm",
                cancelButton: "my-swal-cancel dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700",
            },
        });

        if (!result.isConfirmed) return;

        try {
            const res = await cancelPayment(reference);

            if (res?.message?.toLowerCase().includes("dibatalkan")) {
                // Status will be updated by the store automatically
                const failedData = {
                    status: "FAILED",
                    voucher: displayTransaction?.voucher || "Rp 0",
                    amount_received: displayTransaction?.amount_received || 0,
                    amount: displayTransaction?.amount || 0,
                    payment_name: displayTransaction?.payment_name || "-",
                    course: displayTransaction?.course || {},
                };
                localStorage.setItem(`failed_${reference}`, JSON.stringify(failedData));
            }

            await MySwal.fire({
                title: "Berhasil!",
                text: res.message || "Transaksi berhasil dibatalkan.",
                icon: "success",
                width: "420px",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "my-swal-popup dark:bg-[#141427] dark:text-white",
                    title: "my-swal-title dark:text-white",
                    icon: "my-swal-icon",
                    htmlContainer: "my-swal-text dark:text-gray-300",
                    confirmButton: "my-swal-confirm",
                },
            });
        } catch (error) {
            console.error("Gagal membatalkan transaksi:", error);
            MySwal.fire({
                title: "Gagal!",
                text: "Terjadi kesalahan saat membatalkan transaksi.",
                icon: "error",
                width: "420px",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "my-swal-popup dark:bg-[#141427] dark:text-white",
                    title: "my-swal-title dark:text-white",
                    icon: "my-swal-icon",
                    htmlContainer: "my-swal-text dark:text-gray-300",
                    confirmButton: "my-swal-confirm",
                },
            });
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedText(text);
            setTimeout(() => setCopiedText(null), 1200);
        });
    };

    const handleDownloadInvoice = () => {
        if (transaction && fullTransaction) {
            generateInvoicePDF(transaction, fullTransaction);
        }
    };

    const handleBack = () => {
        navigate('/dashboard/user/transaction');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#141427] py-8 px-8 md:px-26 lg:px-29 xl:px-29 2xl:px-34 animate-pulse">
                <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Skeleton detail transaction */}
                    <div className="col-span-2 bg-white dark:bg-[#1A1A2E] border border-gray-300 dark:border-gray-700 rounded-md shadow-md p-3 space-y-4">
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>

                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>

                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>

                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>

                        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
                    </div>

                    {/* Skeleton */}
                    <div className="col-span-2 lg:col-span-1 space-y-6">

                        {/* Skeleton Status */}
                        <div className="bg-white dark:bg-[#1A1A2E] border border-gray-300 dark:border-gray-700 rounded-md shadow-md p-3 space-y-3">
                            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                            <div className="h-28 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
                        </div>

                        <div className="bg-white dark:bg-[#1A1A2E] border border-gray-300 dark:border-gray-700 rounded-md shadow-md p-3 space-y-3">
                            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                        </div>

                        <div className="flex justify-center">
                            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#141427] py-8 px-8 md:px-26 lg:px-29 xl:px-29 2xl:px-34">
            <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Transaction Details */}
                <div className="col-span-2 bg-white dark:bg-[#1A1A2E] border border-gray-300 dark:border-white rounded-md shadow-md p-3">
                    <PaymentDetailsSection
                        fullTransaction={fullTransaction}
                        displayTransaction={displayTransaction}
                        copiedText={copiedText}
                        handleCopy={handleCopy}
                        logo={logo}
                    />

                    <DownloadInvoiceButton
                        paymentStatus={paymentStatus}
                        onDownload={handleDownloadInvoice}
                    />
                </div>

                {/* Right Column - Status & Instructions */}
                <div className="col-span-2 lg:col-span-1 space-y-6">
                    {/* Status Card */}
                    <div className="bg-white dark:bg-[#1A1A2E] rounded-md shadow-md p-3 border border-gray-300 dark:border-white">
                        <StatusCardSection
                            paymentStatus={paymentStatus}
                            transaction={transaction}
                            statusConfig={statusConfig}
                            handleCheckStatus={handleCheckStatus}
                            handleCancelPayment={handleCancelPayment}
                        />
                    </div>

                    {/* Instructions Card */}
                    {paymentStatus && paymentStatus !== "PAID" && paymentStatus !== "CANCELLED" && (
                        <div className="bg-white dark:bg-[#1A1A2E] rounded-md shadow-md p-3 border border-gray-300 dark:border-white">
                            <InstructionsSection
                                transaction={transaction}
                                openSection={openSection}
                                setOpenSection={setOpenSection}
                                paymentStatus={paymentStatus}
                            />
                        </div>
                    )}

                    {/* Back Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleBack}
                            className="group bg-yellow-400 text-[#0A0082] text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-md 
                            font-semibold py-3 px-37 md:py-3 lg:py-3 xl:py-3 2xl:py-4 md:px-30 lg:px-32 xl:px-37 2xl:px-49
                            rounded-md flex items-center justify-center gap-2
                            transition-all duration-500 ease-in-out
                            shadow-[4px_4px_0_#0A0082] 
                            hover:bg-[#9425FE] hover:text-white hover:shadow-none
                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                            focus:outline-none cursor-pointer"
                        >
                            <span className="flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
                                Kembali
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TransactionDetailPage;