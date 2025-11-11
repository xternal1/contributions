import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../../../components/public/auth/DashboardLayout';

// Import asset lokal
import GopayIcon from '../../../../../../public/images/payments/gopay.png';
import OvoIcon from '../../../../../../public/images/payments/ovo.png';
import DanaIcon from '../../../../../../public/images/payments/dana.jpg';
import LinkAjaIcon from '../../../../../../public/images/payments/link aja.jpg';
import BriIcon from '../../../../../../public/images/payments/bri.png';
import MandiriIcon from '../../../../../../public/images/payments/mandiri.png';
import BniIcon from '../../../../../../public/images/payments/bni.png';
import AlfamartIcon from '../../../../../../public/images/payments/alfamart.jpg';
import IndomaretIcon from '../../../../../../public/images/payments/indomaret.jpg';

// Define types
interface PaymentMethod {
    code: string;
    name: string;
    icon: string;
}

type OpenSection = 'va' | 'ewallet' | 'minimarket' | null;

const PaymentCheckout = () => {
    const navigate = useNavigate();

    // State untuk mengelola bagian yang terbuka
    const [openSection, setOpenSection] = useState<OpenSection>('ewallet');
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

    // Data dummy untuk metode pembayaran dengan asset lokal
    const virtualAccounts: PaymentMethod[] = [
        { code: 'bri', name: 'BRI', icon: BriIcon },
        { code: 'mandiri', name: 'Mandiri', icon: MandiriIcon },
        { code: 'bni', name: 'BNI', icon: BniIcon }
    ];

    const eWallets: PaymentMethod[] = [
        { code: 'gopay', name: 'Gopay', icon: GopayIcon },
        { code: 'ovo', name: 'OVO', icon: OvoIcon },
        { code: 'dana', name: 'Dana', icon: DanaIcon },
        { code: 'linkaja', name: 'LinkAja', icon: LinkAjaIcon }
    ];

    const convenienceStores: PaymentMethod[] = [
        { code: 'alfamart', name: 'Alfamart', icon: AlfamartIcon },
        { code: 'indomaret', name: 'Indomaret', icon: IndomaretIcon }
    ];

    // Data dummy untuk transaksi
    const orderAmount = 300000;
    const feeService = 10000;
    const totalAmount = orderAmount + feeService;

    const handleBuyNow = () => {
        if (!selectedPayment) {
            alert('Pilih metode pembayaran terlebih dahulu!');
            return;
        }

        // Generate reference untuk testing
        const reference = 'TRX-TEST-' + Date.now();

        // Simpan data ke localStorage untuk simulasi
        const testData = {
            reference: reference,
            paymentMethod: selectedPayment,
            amount: totalAmount,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('testPaymentData', JSON.stringify(testData));

        // Redirect ke halaman detail
        navigate(`/dashboard/user/payment-detail/${reference}`);
    };

    const handleBack = () => {
        navigate(-1); // Kembali ke halaman sebelumnya
    };

    return (
        <DashboardLayout slug="payment">
            <div className="min-h-screen bg-gray-50 dark:bg-[#141427] py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header dengan judul dan tombol kembali */}
                    <div className="mb-8 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-left">
                            Pilih Metode Pembayaran
                        </h1>
                        <button
                            onClick={handleBack}
                            className="mr-2 group bg-yellow-400 text-[#0A0082] text-xs md:text-xs lg:text-sm xl:text-xs 2xl:text-md 
                            font-semibold py-3 px-37 md:py-3 lg:py-3 xl:py-1 2xl:py-4 md:px-30 lg:px-32 xl:px-9 2xl:px-49
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

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Bagian Kiri - Pilihan Metode Pembayaran */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-white dark:bg-[#0D0D1A] shadow rounded-xl p-6 border border-gray-300 dark:border-white transition-colors duration-500">
                                {/* E-Wallet - Default Open */}
                                <div className="border-b border-gray-200 dark:border-white mb-4">
                                    <button
                                        onClick={() => setOpenSection(openSection === "ewallet" ? null : "ewallet")}
                                        className={`w-full flex justify-between items-center px-4 py-3 text-left font-medium text-base transition-colors duration-500 rounded-lg
                            ${openSection === "ewallet"
                                                ? "bg-blue-50 dark:bg-[#1B1B33] text-[#9425FE]"
                                                : "bg-white dark:bg-[#0D0D1A] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1E1E36] hover:text-yellow-500"
                                            }`}
                                    >
                                        <span className="font-semibold">E-Wallet</span>
                                        <FiChevronDown
                                            className={`w-5 h-5 transition-transform duration-500 ${openSection === "ewallet" ? "rotate-180" : "rotate-0"
                                                }`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {openSection === "ewallet" && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-3 space-y-2 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-[#2A2A40]">
                                                    <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs">Pembayaran lewat aplikasi dompet digital</p>

                                                    <div className="space-y-2">
                                                        {eWallets.map((method) => (
                                                            <label
                                                                key={method.code}
                                                                className="flex items-center gap-3 p-2 rounded border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1E1E36] transition-colors duration-200"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    className="accent-purple-600"
                                                                    checked={selectedPayment?.code === method.code}
                                                                    onChange={() => setSelectedPayment(method)}
                                                                />
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-12 h-8 rounded-sm flex items-center justify-center bg-white p-1">
                                                                        <img
                                                                            src={method.icon}
                                                                            alt={method.name}
                                                                            className="w-full h-full object-contain"
                                                                        />
                                                                    </div>
                                                                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{method.name}</span>
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Virtual Account */}
                                <div className="border-b border-gray-200 dark:border-white mb-4">
                                    <button
                                        onClick={() => setOpenSection(openSection === "va" ? null : "va")}
                                        className={`w-full flex justify-between items-center px-4 py-3 text-left font-medium text-base transition-colors duration-500 rounded-lg
                            ${openSection === "va"
                                                ? "bg-blue-50 dark:bg-[#1B1B33] text-[#9425FE]"
                                                : "bg-white dark:bg-[#0D0D1A] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1E1E36] hover:text-yellow-500"
                                            }`}
                                    >
                                        <span className="font-semibold">Virtual Account</span>
                                        <FiChevronDown
                                            className={`w-5 h-5 transition-transform duration-500 ${openSection === "va" ? "rotate-180" : "rotate-0"
                                                }`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {openSection === "va" && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-3 space-y-2 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-[#2A2A40]">
                                                    <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs">Pembayaran terhubung langsung dengan akun bank kamu</p>

                                                    <div className="space-y-2">
                                                        {virtualAccounts.map((method) => (
                                                            <label
                                                                key={method.code}
                                                                className="flex items-center gap-3 p-2 rounded border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1E1E36] transition-colors duration-200"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    className="accent-purple-600"
                                                                    checked={selectedPayment?.code === method.code}
                                                                    onChange={() => setSelectedPayment(method)}
                                                                />
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-12 h-8 rounded-sm flex items-center justify-center bg-white p-1">
                                                                        <img
                                                                            src={method.icon}
                                                                            alt={method.name}
                                                                            className="w-full h-full object-contain"
                                                                        />
                                                                    </div>
                                                                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{method.name}</span>
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Mini Market */}
                                <div>
                                    <button
                                        onClick={() =>
                                            setOpenSection(openSection === "minimarket" ? null : "minimarket")
                                        }
                                        className={`w-full flex justify-between items-center px-4 py-3 text-left font-medium text-base transition-colors duration-500 rounded-lg
                            ${openSection === "minimarket"
                                                ? "bg-blue-50 dark:bg-[#1B1B33] text-[#9425FE]"
                                                : "bg-white dark:bg-[#0D0D1A] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1E1E36] hover:text-yellow-500"
                                            }`}
                                    >
                                        <span className="font-semibold">Mini Market</span>
                                        <FiChevronDown
                                            className={`w-5 h-5 transition-transform duration-500 ${openSection === "minimarket" ? "rotate-180" : "rotate-0"
                                                }`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {openSection === "minimarket" && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-3 space-y-2 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-[#2A2A40]">
                                                    <p className="text-gray-500 dark:text-gray-400 mb-2 text-xs">Pembayaran bisa lewat mini market terdekat</p>

                                                    <div className="space-y-2">
                                                        {convenienceStores.map((method) => (
                                                            <label
                                                                key={method.code}
                                                                className="flex items-center gap-3 p-2 rounded border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1E1E36] transition-colors duration-200"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    className="accent-purple-600"
                                                                    checked={selectedPayment?.code === method.code}
                                                                    onChange={() => setSelectedPayment(method)}
                                                                />
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-12 h-8 rounded-sm flex items-center justify-center bg-white p-1">
                                                                        <img
                                                                            src={method.icon}
                                                                            alt={method.name}
                                                                            className="w-full h-full object-contain"
                                                                        />
                                                                    </div>
                                                                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{method.name}</span>
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Bagian Kanan - Ringkasan Pembayaran */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-[#0D0D1A] border border-gray-300 dark:border-white rounded-md shadow-md p-6">
                                <h2 className="text-left text-lg font-semibold text-gray-800 dark:text-white mb-6">
                                    Pembayaran
                                </h2>

                                {/* Ringkasan Pembayaran - Simplified */}
                                <div className="space-y-4 text-left text-gray-600 dark:text-gray-300 text-sm">
                                    {/* Nominal Yang Dibayar */}
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-600">
                                        <span className="text-sm font-medium">Nominal Yang Dibayar</span>
                                        <span className="text-sm font-semibold">Rp {orderAmount.toLocaleString("id-ID")}</span>
                                    </div>

                                    {/* Metode Pembayaran */}
                                    <AnimatePresence>
                                        {selectedPayment && (
                                            <motion.div
                                                key="payment-method"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-600">
                                                    <span className="text-sm font-medium">Metode Pembayaran</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-15 h-11 rounded-sm flex items-center justify-center bg-white p-1">
                                                            <img
                                                                src={selectedPayment.icon}
                                                                alt={selectedPayment.name}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Biaya Layanan */}
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-600">
                                        <span className="text-sm font-medium">Biaya Layanan</span>
                                        <span className="text-sm">Rp {feeService.toLocaleString("id-ID")}</span>
                                    </div>

                                    {/* Total Pembayaran */}
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-sm font-bold text-[#9425FE] dark:text-[#9425FE]">Total Pembayaran</span>
                                        <span className="text-lg font-bold text-[#9425FE]  dark:text-[#9425FE] ">Rp {totalAmount.toLocaleString("id-ID")}</span>
                                    </div>
                                </div>

                                {/* Button Bayar Sekarang */}
                                <button
                                    onClick={handleBuyNow}
                                    className="mt-8 w-full group bg-[#9425FE] text-white text-sm font-semibold py-2 rounded-md flex items-center justify-center transition-all duration-500 ease-in-out shadow-[4px_4px_0_#0A0082] hover:bg-yellow-400 hover:text-[#0A0082] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none cursor-pointer"
                                >
                                    <span className="relative z-10 group-hover:text-[#0A0082] transition-colors duration-500">
                                        Bayar Sekarang
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PaymentCheckout;