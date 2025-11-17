import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentMethod {
    code: string;
    name: string;
    icon_url: string;
}

interface PaymentSummaryProps {
    voucher: string;
    setVoucher: (value: string) => void;
    handleVoucherCheck: (e: React.FormEvent) => void;
    selectedPayment: PaymentMethod | null;
    orderAmount: number;
    discountAmount: number;
    feeService: number;
    totalAmount: number;
    handleBuyNow: () => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
    voucher,
    setVoucher,
    handleVoucherCheck,
    selectedPayment,
    orderAmount,
    discountAmount,
    feeService,
    totalAmount,
    handleBuyNow,
}) => {
    return (
        <div className="bg-white dark:bg-[#0D0D1A] shadow rounded-xl p-4 text-left border border-gray-300 dark:border-white transition-colors duration-500">
            <h3 className="text-lg font-semibold mb-5 text-gray-800 dark:text-gray-100">Pembayaran</h3>

            <form onSubmit={handleVoucherCheck} className="flex gap-2 mb-6">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 dark:border-[#2C2C44] rounded-lg px-3 py-2 text-sm
                        bg-white dark:bg-[#2C004F] text-gray-800 dark:text-gray-200
                        focus:outline-none focus:ring-1 focus:ring-[#9425FE]
                        transition-colors duration-500 placeholder-gray-400 dark:placeholder-gray-300
                        hover:border-[#9425FE]"
                    placeholder="Kode Voucher"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                />
                <button
                    type="submit"
                    className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium text-sm py-1.5 px-3
                        rounded-md flex items-center justify-center gap-2 border border-black dark:border-transparent
                        transition-all duration-500 ease-in-out shadow-[2px_2px_0px_rgba(0,0,0,0.6)]
                        hover:bg-yellow-400 hover:text-black hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)]
                        active:translate-y-0.5"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    <span className="relative z-10 text-[14px] group-hover:text-black transition-colors duration-500">Cek</span>
                </button>
            </form>

            <div className="border-t border-gray-300 dark:border-white pt-7 mt-7 space-y-4 text-left text-gray-600 dark:text-gray-300 text-sm">
                <AnimatePresence>
                    {selectedPayment && (
                        <motion.div key="payment-method" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                            <div className="grid grid-cols-[150px_1fr] gap-y-1 text-sm">
                                <span className="whitespace-nowrap">Metode Pembayaran</span>
                                <span className="font-medium text-right break-words text-gray-800 dark:text-gray-200">{selectedPayment.name}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between">
                    <span>Harga Pesanan</span>
                    <span>Rp {orderAmount.toLocaleString("id-ID")}</span>
                </div>

                {discountAmount > 0 && (
                    <div className="flex justify-between">
                        <span>Diskon Voucher</span>
                        <span className="text-purple-600 dark:text-purple-400">- Rp {discountAmount.toLocaleString("id-ID")}</span>
                    </div>
                )}

                <div className="flex justify-between">
                    <span>Biaya Layanan</span>
                    <span>Rp {feeService.toLocaleString("id-ID")}</span>
                </div>

                <div className="border-t border-gray-300 dark:border-white pt-7 mt-10 flex justify-between font-semibold text-gray-800 dark:text-gray-100">
                    <span>Total Pesanan</span>
                    <span className="text-base">Rp {totalAmount.toLocaleString("id-ID")}</span>
                </div>

                {discountAmount > 0 && (
                    <div className="flex justify-end gap-2 text-purple-600 dark:text-purple-400 font-medium text-sm">
                        <span>Hemat</span>
                        <span>Rp {discountAmount.toLocaleString("id-ID")}</span>
                    </div>
                )}
            </div>

            <button
                onClick={handleBuyNow}
                className="my-6 w-full relative group overflow-hidden text-black dark:text-white font-sans font-semibold text-sm py-3 px-4
                    rounded-lg flex items-center justify-center gap-2 border border-black dark:border-transparent transition-all duration-500
                    ease-in-out
                    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)]
                    dark:shadow-[3px_3px_0px_0px_rgba(148,37,254,0.6)] dark:hover:shadow-[1px_1px_0px_0px_rgba(148,37,254,0.3)]
                    active:translate-y-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:text-white"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10 text-[14px] group-hover:text-black transition-colors duration-500">Beli Sekarang</span>
            </button>
        </div>
    );
};

export default PaymentSummary;