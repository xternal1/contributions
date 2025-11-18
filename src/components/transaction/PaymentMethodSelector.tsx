import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { PaymentChannel } from "@features/Payment/payment-channel";

interface PaymentMethodSelectorProps {
    openSection: string | null;
    setOpenSection: (section: string | null) => void;
    virtualAccounts: PaymentChannel[];
    eWallets: PaymentChannel[];
    convenienceStores: PaymentChannel[];
    selectedPayment: PaymentChannel | null;
    setSelectedPayment: (method: PaymentChannel | null) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
    openSection,
    setOpenSection,
    virtualAccounts,
    eWallets,
    convenienceStores,
    selectedPayment,
    setSelectedPayment,
}) => {
    return (
        <div className="bg-white dark:bg-[#0D0D1A] shadow rounded-xl p-4 border border-gray-300 dark:border-white transition-colors duration-500">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Pilih Metode Pembayaran</h3>

            {/* Virtual Account */}
            <div className="border-b border-gray-200 dark:white">
                <button
                    onClick={() => setOpenSection(openSection === "va" ? null : "va")}
                    className={`w-full flex justify-between items-center px-3 py-2 text-left font-medium text-sm transition-colors duration-500
                            ${openSection === "va" ? "bg-blue-50 dark:bg-[#1B1B33] text-[#9425FE]" : "bg-white dark:bg-[#0D0D1A] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1E1E36] hover:text-yellow-500"
                        }`}
                >
                    <span>Virtual Account</span>
                    <ChevronDown
                        className={`w-5 h-5 transition-transform duration-500 ${openSection === "va" ? "rotate-180" : "rotate-0"}`}
                    />
                </button>

                <AnimatePresence>
                    {openSection === "va" && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <div className="p-3 space-y-3 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-[#2A2A40]">
                                <p>Pembayaran terhubung langsung dengan akun bank kamu</p>

                                <div className="flex items-center gap-6 flex-wrap">
                                    {virtualAccounts.map((method) => (
                                        <label key={method.code} className="flex flex-col items-center gap-1 cursor-pointer">
                                            <input type="radio" name="payment" className="accent-purple-600" checked={selectedPayment?.code === method.code} onChange={() => setSelectedPayment(method)} />
                                            <div className="bg-transparent dark:bg-white p-2 rounded-lg dark:shadow-md flex items-center justify-center">
                                                <img src={method.icon_url} alt={method.name} className="w-9 h-6 scale-115 object-contain" />
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* E-Wallet */}
            <div className="border-b border-gray-200 dark:border-white">
                <button
                    onClick={() => setOpenSection(openSection === "ewallet" ? null : "ewallet")}
                    className={`w-full flex justify-between items-center px-3 py-2 text-left font-medium text-sm transition-colors duration-500
                            ${openSection === "ewallet" ? "bg-blue-50 dark:bg-[#1B1B33] text-[#9425FE]" : "bg-white dark:bg-[#0D0D1A] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1E1E36] hover:text-yellow-500"
                        }`}
                >
                    <span>E-Wallet</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openSection === "ewallet" ? "rotate-180" : "rotate-0"}`} />
                </button>

                <AnimatePresence>
                    {openSection === "ewallet" && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <div className="p-3 space-y-3 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-[#2A2A40]">
                                <p>Pembayaran lewat aplikasi dompet digital</p>

                                <div className="flex items-center gap-6 flex-wrap">
                                    {eWallets.map((method) => (
                                        <label key={method.code} className="flex flex-col items-center gap-1 cursor-pointer">
                                            <input type="radio" name="payment" className="accent-purple-600" checked={selectedPayment?.code === method.code} onChange={() => setSelectedPayment(method)} />
                                            <div className="bg-transparent dark:bg-white p-2 rounded-lg dark:shadow-md flex items-center justify-center">
                                                <img src={method.icon_url} alt={method.name} className="w-9 h-6 scale-115 object-contain" />
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
                    onClick={() => setOpenSection(openSection === "minimarket" ? null : "minimarket")}
                    className={`w-full flex justify-between items-center px-3 py-2 text-left font-medium text-sm transition-colors duration-500
                            ${openSection === "minimarket" ? "bg-blue-50 dark:bg-[#1B1B33] text-[#9425FE]" : "bg-white dark:bg-[#0D0D1A] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1E1E36] hover:text-yellow-500"
                        }`}
                >
                    <span>Mini Market</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openSection === "minimarket" ? "rotate-180" : "rotate-0"}`} />
                </button>

                <AnimatePresence>
                    {openSection === "minimarket" && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <div className="p-3 space-y-3 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-[#2A2A40]">
                                <p>Pembayaran bisa lewat mini market terdekat</p>

                                <div className="flex items-center gap-6 flex-wrap">
                                    {convenienceStores.map((method) => (
                                        <label key={method.code} className="flex flex-col items-center gap-1 cursor-pointer">
                                            <input type="radio" name="payment" className="accent-purple-600" checked={selectedPayment?.code === method.code} onChange={() => setSelectedPayment(method)} />
                                            <div className="bg-transparent dark:bg-white p-2 rounded-lg dark:shadow-md flex items-center justify-center">
                                                <img src={method.icon_url} alt={method.name} className="w-9 h-6 scale-115 object-contain" />
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
    );
};

export default PaymentMethodSelector;