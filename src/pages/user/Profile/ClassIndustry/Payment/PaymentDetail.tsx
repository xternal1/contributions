import { useState, useEffect } from 'react';
import { FiRefreshCw, FiCopy, FiDownload, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@components/public/auth/DashboardLayout';
import { generatePaymentInvoicePDF, createInvoiceData } from '@utils/invoiceClassIndustry';

import unpaidImg from '@assets/img/payment-status/unpaid.png';
import paidImg from '@assets/img/payment-status/paid.png';
import expiredImg from '@assets/img/payment-status/expired.png';
import canceledImg from '@assets/img/payment-status/canceled.png';
import { type PaymentMethod, getTestTransaction, paymentMethodMap, paymentSummary, instructions } from '@/data/paymentDummy';

// import types & centralized dummy data

const statusConfig = {
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

// Define UI flags for statuses (unchanged)
const paymentStatusData = {
    UNPAID: {
        showPaymentCode: true,
        showPaidTime: false,
        showSaveButton: false,
        showCheckStatus: true,
        showInstructions: true,
        showBackButton: true,
        showExpiredTime: true
    },
    PAID: {
        showPaymentCode: false,
        showPaidTime: true,
        showSaveButton: true,
        showCheckStatus: false,
        showInstructions: false,
        showBackButton: false,
        showExpiredTime: false
    },
    EXPIRED: {
        showPaymentCode: false,
        showPaidTime: false,
        showSaveButton: false,
        showCheckStatus: false,
        showInstructions: false,
        showBackButton: true,
        showExpiredTime: false
    },
    CANCELLED: {
        showPaymentCode: false,
        showPaidTime: false,
        showSaveButton: false,
        showCheckStatus: false,
        showInstructions: false,
        showBackButton: true,
        showExpiredTime: false
    }
};

const PaymentDetail = () => {
    const navigate = useNavigate();

    // state
    const [paymentStatus, setPaymentStatus] = useState<keyof typeof statusConfig>('UNPAID');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [openSection, setOpenSection] = useState<string | null>(null);

    // default transaction (fallback)
    const defaultTransaction = {
        reference: '03245',
        pay_code: 'SHPNHAJDUEN88K12JJ',
        created_time: Math.floor(Date.now() / 1000) - (2 * 24 * 60 * 60), // 2 days ago
        paid_time: null as number | null,
        expired_time: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours from now
    };

    const [transactionData, setTransactionData] = useState(defaultTransaction);

    // selectedPayment default: try loaded testTransaction -> fallback to map['gopay']
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(() => {
        const saved = getTestTransaction();
        if (saved && saved.paymentMethod) return saved.paymentMethod;
        return paymentMethodMap['gopay'] ?? Object.values(paymentMethodMap)[0];
    });

    // use centralized paymentSummary & instructions imported above
    // paymentSummary: imported
    // instructions: imported

    // on mount: if there's saved test transaction, populate transactionData and selectedPayment
    useEffect(() => {
        const saved = getTestTransaction();
        if (saved) {
            const created = saved.timestamp ? Math.floor(new Date(saved.timestamp).getTime() / 1000) : undefined;
            const payCode = (saved.reference || '').slice(-16).toUpperCase() || defaultTransaction.pay_code;

            setTransactionData(prev => ({
                ...prev,
                reference: saved.reference ?? prev.reference,
                pay_code: payCode,
                created_time: created ?? prev.created_time,
                // keep expired_time as default (or you can compute based on created)
            }));

            if (saved.paymentMethod) {
                setSelectedPayment(saved.paymentMethod);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handlers
    const handleCheckStatus = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setPaymentStatus('PAID');
            setTransactionData(prev => ({
                ...prev,
                paid_time: Math.floor(Date.now() / 1000)
            }));
        }, 1000);
    };

    const handleDownloadInvoice = () => {
        // guard: ensure selectedPayment exists
        const payment = selectedPayment ?? paymentMethodMap['gopay'];
        const invoiceData = createInvoiceData(transactionData, payment, paymentSummary);
        generatePaymentInvoicePDF(invoiceData);
        console.log('Invoice berhasil diunduh!');
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedText(text);
            setTimeout(() => setCopiedText(null), 1200);
        });
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const day = date.getDate();
        const month = date.toLocaleString("id-ID", { month: "long" });
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    };

    const currentStatus = paymentStatusData[paymentStatus];

    return (
        <DashboardLayout slug="payment-detail">
            <div className="min-h-screen bg-gray-50 dark:bg-[#141427] py-1 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header with title only */}
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
                        {/* Left Section - Payment Details */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white dark:bg-[#0D0D1A] border border-gray-300 dark:border-white rounded-md shadow-md p-6">
                                <h2 className="text-left text-md font-semibold text-gray-800 dark:text-white mb-2">
                                    Rincian Pembayaran
                                </h2>

                                {/* Amount to be Paid */}
                                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Nominal Yg Dibayar</span>
                                    <span className="text-sm font-bold text-[#9425FE] dark:text-[#9425FE]">
                                        Rp {paymentSummary.product_price.toLocaleString("id-ID")}
                                    </span>
                                </div>

                                {/* Admin Fee */}
                                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Biaya Admin</span>
                                    <span className="text-sm text-[#9425FE] dark:text-[#9425FE]">
                                        Rp {paymentSummary.fee_amount.toLocaleString("id-ID")}
                                    </span>
                                </div>

                                {/* Total Payment */}
                                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Pembayaran</span>
                                    <span className="text-lg font-bold text-[#9425FE] dark:text-[#9425FE]">
                                        Rp {paymentSummary.total_amount.toLocaleString("id-ID")}
                                    </span>
                                </div>

                                {/* Transaction Code */}
                                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Kode Transaksi</span>
                                    <span className="text-sm font-medium text-[#9425FE] dark:text-[#9425FE]">{transactionData.reference}</span>
                                </div>

                                {/* Order Created */}
                                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Pesanan Dibuat</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {formatTime(transactionData.created_time)}
                                    </span>
                                </div>

                                {/* Pay Before - Only appears for UNPAID status */}
                                {currentStatus.showExpiredTime && (
                                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Bayar Sebelum</span>
                                        <span className="text-sm font-semibold text-[#9425FE] dark:text-[#9425FE]">
                                            {formatTime(transactionData.expired_time)}
                                        </span>
                                    </div>
                                )}

                                {/* Payment Method */}
                                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Metode Pembayaran</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-17 h-13 rounded-sm flex items-center justify-center bg-white p-1">
                                            <img
                                                src={selectedPayment.icon}
                                                alt={selectedPayment.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Order Paid - Only appears for PAID status */}
                                {currentStatus.showPaidTime && transactionData.paid_time && (
                                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Pesanan Dibayar</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {formatTime(transactionData.paid_time)}
                                        </span>
                                    </div>
                                )}

                                {/* Payment Code (1x24 Hours) */}
                                {currentStatus.showPaymentCode && (
                                    <div className="py-3">
                                        <div className="text-left">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Kode Pembayaran (1 × 24 Jam)</span>
                                        </div>

                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-lg font-semibold text-[#9425FE] dark:text-[#9425FE]">
                                                {transactionData.pay_code}
                                            </span>

                                            <button
                                                onClick={() => handleCopy(transactionData.pay_code)}
                                                className="group bg-[#9425FE] text-white text-[10px] font-semibold py-1 px-8 rounded-sm flex items-center justify-center gap-2 transition-all duration-500 ease-in-out shadow-[4px_4px_0_#0A0082] hover:bg-yellow-400 hover:text-[#0A0082] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none cursor-pointer relative"
                                            >
                                                <FiCopy className="w-3 h-3" />
                                                Salin
                                                {copiedText === transactionData.pay_code && (
                                                    <span className="absolute -top-8 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                                                        Disalin!
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Save Payment Button - OUTSIDE COLUMN, only appears for PAID status */}
                            {currentStatus.showSaveButton && (
                                <div className="mt-4">
                                    <button
                                        onClick={handleDownloadInvoice}
                                        className="w-full group bg-[#9425FE] text-white text-sm font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-500 ease-in-out shadow-[4px_4px_0_#0A0082] hover:bg-yellow-400 hover:text-[#0A0082] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none cursor-pointer"
                                    >
                                        <FiDownload className="w-4 h-4" />
                                        Simpan Pembayaran
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Section - Payment Status */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Status Card */}
                            <div className="bg-white dark:bg-[#0D0D1A] border border-gray-300 dark:border-white rounded-md shadow-md p-6">
                                <h2 className="text-left text-md font-semibold text-gray-800 dark:text-white mb-6">
                                    Status Pembayaran
                                </h2>

                                <div className="flex flex-col items-center text-center">
                                    {/* Status Image & Text */}
                                    <img
                                        src={statusConfig[paymentStatus].img}
                                        alt="Payment Status"
                                        className="h-24 mb-4"
                                    />

                                    <h3 className="text-md font-bold text-gray-900 dark:text-white mb-2">
                                        {statusConfig[paymentStatus].title}
                                    </h3>

                                    <p className="text-xs text-[#9425FE] dark:text-purple-400 mb-6">
                                        {statusConfig[paymentStatus].message}
                                    </p>

                                    {/* Check Status Button - Only appears for UNPAID status */}
                                    {currentStatus.showCheckStatus && (
                                        <button
                                            onClick={handleCheckStatus}
                                            disabled={isLoading}
                                            className="w-full group bg-white dark:bg-[#0D0D1A] text-[#9425FE] dark:text-purple-400 text-xs font-semibold py-2 rounded-md flex items-center justify-center gap-2 transition-all duration-500 ease-in-out border border-[#9425FE] dark:border-purple-400 hover:bg-[#9425FE] hover:text-white dark:hover:bg-[#9425FE] dark:hover:text-white active:translate-x-[2px] active:translate-y-[2px] focus:outline-none cursor-pointer mb-3"
                                        >
                                            {isLoading ? (
                                                <FiRefreshCw className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <FiRefreshCw className="w-4 h-4" />
                                            )}
                                            Cek Status
                                        </button>
                                    )}

                                    {/* OK Button for status other than UNPAID */}
                                    {!currentStatus.showCheckStatus && (
                                        <button
                                            onClick={handleBack}
                                            className="w-full group bg-[#9425FE] text-white text-sm font-semibold py-2 rounded-md flex items-center justify-center transition-all duration-500 ease-in-out shadow-[4px_4px_0_#0A0082] hover:bg-yellow-400 hover:text-[#0A0082] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none cursor-pointer"
                                        >
                                            OK
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Instructions Card */}
                            {currentStatus.showInstructions && (
                                <div className="bg-white dark:bg-[#0D0D1A] rounded-md shadow-md p-6 border border-gray-300 dark:border-white">
                                    <h2 className="text-left text-md font-semibold text-gray-800 dark:text-white mb-4">
                                        Instruksi Pembayaran
                                    </h2>
                                    <div className="flex flex-col gap-2">
                                        {instructions.map((instruksi, idx) => (
                                            <div key={idx}>
                                                <button
                                                    onClick={() =>
                                                        setOpenSection(openSection === instruksi.title ? null : instruksi.title)
                                                    }
                                                    className={`w-full flex justify-between items-center px-3 py-3 text-left font-medium text-sm transition-all duration-300 rounded-lg ${openSection === instruksi.title
                                                        ? "bg-blue-50 dark:bg-[#0D0D1A] text-[#9425FE] dark:text-purple-400"
                                                        : "bg-white dark:bg-[#0D0D1A] hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-yellow-500 dark:hover:text-yellow-400"
                                                        }`}
                                                >
                                                    <span className="font-semibold">{instruksi.title}</span>
                                                    <FiChevronDown
                                                        className={`w-4 h-4 transition-transform duration-300 ${openSection === instruksi.title ? "rotate-180" : "rotate-0"
                                                            }`}
                                                    />
                                                </button>

                                                {openSection === instruksi.title && (
                                                    <div className="px-3 pb-3 text-xs text-black dark:text-gray-300 space-y-2 text-left mt-2">
                                                        {instruksi.steps.map((step: string, i: number) => (
                                                            <p key={i} className="leading-relaxed">
                                                                {i + 1}. {step}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Back Button - Always shown except for PAID status */}
                            {currentStatus.showBackButton && (
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleBack}
                                        className="w-full group bg-yellow-400 text-[#0A0082] text-sm font-semibold py-2 rounded-md flex items-center justify-center transition-all duration-500 ease-in-out shadow-[4px_4px_0_#0A0082] hover:bg-[#9425FE] hover:text-white hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none cursor-pointer"
                                    >
                                        <span className="flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
                                            Kembali
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PaymentDetail;
