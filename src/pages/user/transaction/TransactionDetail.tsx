import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiRefreshCw, FiCopy, FiDownload } from "react-icons/fi";
import { QRCodeCanvas } from "qrcode.react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { generateInvoicePDF } from "../../../utils/invoiceService";
import type { TransactionDetail } from "../../../features/transactionDetail/transactionDetail";
import { getTransactionDetail } from "../../../features/transactionDetail/services/transactionDetailService";
import type { TransactionFullDetail } from "../../../features/transactionDetail/transactionFullDetail";
import { getTransactionFullDetail } from "../../../features/transactionDetail/services/transactionFullDetailService";
import { cancelTransaction } from "../../../features/transactionDetail/services/transactionDetailService";
import { getPaymentChannels } from "../../../features/Payment/_service/payment-channel_service";
import type { PaymentChannel } from "../../../features/Payment/payment-channel";
//Status Payment
import unpaidImg from "../../../assets/img/payment-status/unpaid.png";
import paidImg from "../../../assets/img/payment-status/paid.png";
import expiredImg from "../../../assets/img/payment-status/expired.png";
import canceledImg from "../../../assets/img/payment-status/canceled.png";

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
    const [paymentChannels, setPaymentChannels] = useState<PaymentChannel[]>([]);
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [transaction, setTransaction] = useState<TransactionDetail | null>(null);
    const [fullTransaction, setFullTransaction] = useState<TransactionFullDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState<"UNPAID" | "PAID" | "EXPIRED" | "CANCELLED" | null>(null);
    const [openSection, setOpenSection] = useState<string | null>(null);

    useEffect(() => {
        if (reference) {
            setIsLoading(true);
            Promise.all([
                getTransactionDetail(reference),
                getTransactionFullDetail(reference),
                getPaymentChannels(),
            ])
                .then(([statusRes, fullRes, channelRes]) => {
                    setTransaction(statusRes);
                    setFullTransaction(fullRes);

                    setPaymentChannels([
                        ...channelRes.data.virtual_account,
                        ...channelRes.data.convenience_store,
                        ...channelRes.data.e_wallet,
                    ]);

                    const invoiceStatus = fullRes?.invoice_status?.toUpperCase().trim();

                    if (invoiceStatus === "UNPAID") {
                        setPaymentStatus("UNPAID");
                    } else if (invoiceStatus === "PAID") {
                        setPaymentStatus("PAID");
                    } else if (invoiceStatus === "EXPIRED") {
                        setPaymentStatus("EXPIRED");
                    } else if (invoiceStatus === "CANCELLED" || invoiceStatus === "CANCELED") {
                        setPaymentStatus("CANCELLED");
                    } else {
                        setPaymentStatus(null);
                    }
                })
                .catch(console.error)
                .finally(() => setIsLoading(false));
        }
    }, [reference]);

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

    const handleCheckStatus = async () => {
        if (!reference) return;
        setIsLoading(true);
        try {
            const [statusRes, fullRes] = await Promise.all([
                getTransactionDetail(reference),
                getTransactionFullDetail(reference),
            ]);

            setTransaction(statusRes);
            setFullTransaction(fullRes);

            const invoiceStatus = fullRes?.invoice_status?.toUpperCase();
            if (
                invoiceStatus === "UNPAID" ||
                invoiceStatus === "PAID" ||
                invoiceStatus === "EXPIRED" ||
                invoiceStatus === "CANCELLED"
            ) {
                setPaymentStatus(invoiceStatus as
                    "UNPAID" | "PAID" | "EXPIRED" | "CANCELLED");
            } else {
                setPaymentStatus(null);
            }
        } catch (error) {
            console.error("Gagal cek status:", error);
        } finally {
            setIsLoading(false);
        }
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

        setIsLoading(true);
        try {
            const res = await cancelTransaction(reference);

            if (res?.message?.toLowerCase().includes("dibatalkan")) {
                setPaymentStatus("CANCELLED");
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
        } finally {
            setIsLoading(false);
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
                    <h2 className="text-left text-sm md:text-md font-semibold text-gray-800 dark:text-white mb-4">
                        Rincian Pembayaran
                    </h2>

                    <div className="mb-0">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Produk yang dibeli</p>
                        </div>
                        <h3 className="flex justify-between items-center text-[12px] md:text-lg font-semibold text-gray-600 dark:text-gray-200">
                            <p className="max-w-[60%] lg:max-w-[70%] text-left break-words">{fullTransaction?.product?.title}</p>
                            <span className="text-purple-600 dark:text-purple-400 font-semibold text-xs md:text-[15px] lg:text-md">
                                {fullTransaction?.product?.promotional_price ? (
                                    <div className="flex flex-col items-end">
                                        <span className="text-gray-400 dark:text-gray-500 line-through text-xs">
                                            Rp {fullTransaction.product.price.toLocaleString("id-ID")}
                                        </span>
                                        <span>
                                            Rp {fullTransaction.product.promotional_price.toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                ) : (
                                    <p>Rp {fullTransaction?.product?.price?.toLocaleString("id-ID") || "0"}</p>
                                )}
                            </span>
                        </h3>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-white">
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                            Biaya Layanan
                        </p>
                        <h3 className="text-xs md:text-sm font-medium text-purple-600 dark:text-purple-400">
                            Rp {fullTransaction?.fee_amount?.toLocaleString("id-ID") || "0"}
                        </h3>
                    </div>

                    <div className="flex justify-between items-center py-3 border-t border-gray-200 dark:border-white">
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                            Voucher Diskon
                        </p>
                        <h3 className="text-xs md:text-sm font-medium text-purple-600 dark:text-purple-400">
                            {fullTransaction?.course_voucher && fullTransaction.course_voucher > 0 ? (
                                `- Rp ${fullTransaction.course_voucher.toLocaleString("id-ID")}`
                            ) : (
                                "Rp 0"
                            )}
                        </h3>
                    </div>

                    <div className="flex justify-between py-3 border-t border-b border-gray-200 dark:border-white">
                        <p className="mt-0 md:mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-300">Total Pembayaran</p>
                        <h3 className="text-sm md:text-lg lg:text-md xl:text-lg 2xl:text-lg font-bold text-purple-600 dark:text-purple-400">
                            <p>
                                Rp{" "}
                                {fullTransaction?.paid_amount
                                    ? fullTransaction.paid_amount.toLocaleString("id-ID")
                                    : "0"}
                            </p>
                        </h3>
                    </div>

                    <div className="mb-4 border-b border-gray-200 dark:border-white">
                        <div className="flex justify-between items-center">
                            <p className="mt-2 lg:mt-1 text-left text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-2">Metode Pembayaran</p>
                            <div className="flex items-center mt-2 mb-2">
                                {logo && (
                                    <img
                                        src={logo}
                                        alt={displayTransaction?.payment_name}
                                        className="max-h-7 md:max-h-9 lg:max-h-8 xl:max-h-9 2xl:max-h-10 object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {displayTransaction?.pay_code && (
                        <div className="mb-3">
                            <div className="flex justify-between items-center">
                                <p className="max-w-[35%] sm:max-w-none text-left text-xs md:text-sm text-gray-600 dark:text-gray-300">
                                    Kode Pembayaran (1 × 24 Jam)
                                </p>
                                <div className="flex items-center gap-2 relative">
                                    <p className="text-xs md:text-xl font-mono text-purple-600 dark:text-purple-400 font-bold">
                                        {displayTransaction.pay_code}
                                    </p>
                                    <button
                                        onClick={() =>
                                            (displayTransaction?.pay_code) && handleCopy(displayTransaction.pay_code)
                                        }
                                        className="p-0.5 md:p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                                    >
                                        <FiCopy />
                                    </button>
                                    {copiedText === displayTransaction?.pay_code && (
                                        <span
                                            className="absolute top-[-25px] right-0 bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-[10px] md:text-xs px-2 py-1 rounded-md"
                                        >
                                            Berhasil disalin!
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mb-3">
                        <div className="flex justify-between items-center">
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Kode Transaksi</p>
                            <p className="text-xs md:text-sm font-mono text-gray-600 dark:text-gray-300">{transaction?.reference}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        {paymentStatus !== "CANCELLED" && paymentStatus !== "PAID" && (
                            <div className="flex justify-between items-center">
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Bayar Sebelum</p>
                                <p className="text-[10px] md:text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    {transaction?.expired_time
                                        ? (() => {
                                            const date = new Date(transaction.expired_time * 1000);
                                            const day = date.getDate();
                                            const month = date.toLocaleString("id-ID", { month: "long" });
                                            const year = date.getFullYear();
                                            const hours = String(date.getHours()).padStart(2, "0");
                                            const minutes = String(date.getMinutes()).padStart(2, "0");
                                            return `${day} ${month} ${year} - ${hours}:${minutes}`;
                                        })()
                                        : "-"}
                                </p>
                            </div>
                        )}
                        {paymentStatus === "PAID" && (
                            <div className="flex justify-center mt-10">
                                <button
                                    onClick={handleDownloadInvoice}
                                    className="group bg-[#9425FE] text-white text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-md 
                                    font-semibold py-3 md:py-3 lg:py-3 xl:py-3 2xl:py-4 w-[320px] md:w-[560px] lg:w-[600px] xl:w-[680px] 2xl:w-[860px]
                                    rounded-md flex items-center justify-center gap-2
                                    transition-all duration-500 ease-in-out
                                    shadow-[4px_4px_0_#0A0082] 
                                    hover:bg-yellow-400 hover:text-[#0A0082] hover:shadow-none
                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                    focus:outline-none cursor-pointer"
                                >
                                    <FiDownload className="w-4 h-4" />
                                    Simpan Pembayaran
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Status & Instructions */}
                <div className="col-span-2 lg:col-span-1 space-y-6">
                    {/* Status Card */}
                    <div className="bg-white dark:bg-[#1A1A2E] rounded-md shadow-md p-3 border border-gray-300 dark:border-white">
                        <h2 className="text-left text-sm md:text-md font-semibold text-gray-800 dark:text-white mb-4">
                            Status Pembayaran
                        </h2>
                        <div className="flex flex-col items-center text-center">
                            {paymentStatus && transaction?.payment_name?.includes("QRIS") ? (
                                <>
                                    {/* UNPAID dengan QR Code */}
                                    {paymentStatus === "UNPAID" && (
                                        <div className="flex flex-col items-center text-center">
                                            <QRCodeCanvas
                                                value={transaction?.pay_code || transaction?.checkout_url || ""}
                                                size={200}
                                                includeMargin={true}
                                            />

                                            {/* Title & Message */}
                                            <h3 className="text-sm md:text-md font-bold text-black dark:text-white">
                                                QR Code Pembayaran
                                            </h3>
                                            <p className="text-[10px] md:text-xs text-[#9425FE] dark:text-purple-400 mt-1 mb-3">
                                                Menunggu pembayaran
                                            </p>

                                            <button
                                                onClick={() => {
                                                    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
                                                    const url = canvas.toDataURL("image/png");
                                                    const link = document.createElement("a");
                                                    link.href = url;
                                                    link.download = "qris.png";
                                                    link.click();
                                                }}
                                                className="mt-2 group bg-white dark:bg-[#1A1A2E] text-[#9425FE] dark:text-purple-400 text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-md 
                                                font-semibold py-3 md:py-3 lg:py-3 xl:py-3 2xl:py-4 w-[310px] md:w-[290px] lg:w-[280px] xl:w-[310px] 2xl:w-[390px]
                                                rounded-md flex items-center justify-center mx-auto md:mx-0 gap-2
                                                transition-all duration-500 ease-in-out
                                                border border-[#9425FE] dark:border-purple-400 hover:text-yellow-500 dark:hover:text-yellow-400 
                                                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                                focus:outline-none cursor-pointer"
                                            >
                                                Unduh Kode QR
                                            </button>
                                        </div>
                                    )}

                                    {/* PAID & EXPIRED */}
                                    {paymentStatus !== "UNPAID" && (
                                        <div className="flex flex-col items-center text-center mt-3">
                                            <img
                                                src={statusConfig[paymentStatus].img}
                                                alt="Payment Status"
                                                className="h-40 mb-2"
                                            />

                                            <h3 className="text-sm md:text-md font-bold text-black dark:text-white mt-3">
                                                {statusConfig[paymentStatus].title}
                                            </h3>
                                            {statusConfig[paymentStatus].message && (
                                                <p className="text-[10px] md:text-xs mt-1 mb-3 text-[#9425FE] dark:text-purple-400">
                                                    {statusConfig[paymentStatus].message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                // Except QRIS
                                paymentStatus && (
                                    <div className="flex flex-col items-center text-center">
                                        <img
                                            src={statusConfig[paymentStatus].img}
                                            alt="Payment Status"
                                            className="h-40 object-contain mb-2"
                                        />

                                        <h3 className="text-sm md:text-md font-bold text-black dark:text-white mt-3">
                                            {statusConfig[paymentStatus].title}
                                        </h3>
                                        {statusConfig[paymentStatus].message && (
                                            <p className="text-[10px] md:text-xs mt-1 mb-3 text-[#9425FE] dark:text-purple-400">
                                                {statusConfig[paymentStatus].message}
                                            </p>
                                        )}
                                    </div>
                                )
                            )}
                            {paymentStatus && paymentStatus !== "PAID" && paymentStatus !== "CANCELLED" && (
                                <button
                                    onClick={handleCheckStatus}
                                    className="mt-2 group bg-white dark:bg-[#1A1A2E] text-[#9425FE] dark:text-purple-400 text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-md 
                                    font-semibold py-3 md:py-3 lg:py-3 xl:py-3 2xl:py-4 w-[310px] md:w-[290px] lg:w-[280px] xl:w-[310px] 2xl:w-[390px]
                                    rounded-md flex items-center justify-center mx-auto md:mx-0 gap-2
                                    transition-all duration-500 ease-in-out
                                    border border-[#9425FE] dark:border-purple-400 hover:text-yellow-400 
                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                    focus:outline-none cursor-pointer"
                                >
                                    <span className="flex items-center gap-2 transition-colors duration-500 group-hover:text-yellow-400">
                                        <FiRefreshCw />
                                        Cek Status
                                    </span>
                                </button>
                            )}
                            {paymentStatus === "UNPAID" && (
                                <button
                                    onClick={handleCancelPayment}
                                    className="mt-2 group bg-[#9425FE] text-white text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-md 
                                    font-semibold py-3 md:py-3 lg:py-3 xl:py-3 2xl:py-4 w-[310px] md:w-[290px] lg:w-[280px] xl:w-[310px] 2xl:w-[390px]
                                    rounded-md flex items-center justify-center mx-auto md:mx-0 gap-2
                                    transition-all duration-500 ease-in-out
                                    shadow-[4px_4px_0_#0A0082] 
                                    hover:bg-yellow-400 hover:text-[#0A0082] hover:shadow-none
                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                    focus:outline-none cursor-pointer"
                                >
                                    Batalkan Pembayaran
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Instructions Card */}
                    {paymentStatus && paymentStatus !== "PAID" && paymentStatus !== "CANCELLED" && (
                        <div className="bg-white dark:bg-[#1A1A2E] rounded-md shadow-md p-3 border border-gray-300 dark:border-white">
                            <h2 className="text-left text-sm md:text-md font-semibold text-gray-800 dark:text-white mb-4">
                                Instruksi Pembayaran
                            </h2>
                            <div className="flex flex-col gap-2">
                                {transaction?.instructions?.map((instruksi, idx) => (
                                    <div key={idx}>
                                        <button
                                            onClick={() =>
                                                setOpenSection(openSection === instruksi.title ? null : instruksi.title)
                                            }
                                            className={`w-full flex justify-between items-center px-3 py-2 text-left font-medium text-xs md:text-sm transition ${openSection === instruksi.title
                                                ? "bg-blue-50 dark:bg-purple-900/30 text-[#9425FE] dark:text-purple-400"
                                                : "bg-white dark:bg-[#1A1A2E] hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-yellow-500 dark:hover:text-yellow-400"
                                                }`}
                                        >
                                            <span>{instruksi.title}</span>
                                            <ChevronDownIcon
                                                className={`w-3 h-3 md:w-5 md:h-5 transition-transform duration-300 stroke-[1.5] ${openSection === instruksi.title ? "rotate-180" : "rotate-0"
                                                    }`}
                                            />
                                        </button>

                                        {openSection === instruksi.title && (
                                            <div className="px-3 pb-3 text-[13px] text-black dark:text-gray-300 space-y-1 text-left">
                                                {instruksi.steps.map((step: string, i: number) => (
                                                    <p key={i} dangerouslySetInnerHTML={{ __html: `${i + 1}. ${step}` }} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
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