import { motion, AnimatePresence } from 'framer-motion';

interface PaymentMethod {
    code: string;
    name: string;
    icon: string;
}

interface PaymentSummaryProps {
    orderAmount: number;
    feeService: number;
    totalAmount: number;
    selectedPayment: PaymentMethod | null;
}

const PaymentSummary = ({
    orderAmount,
    feeService,
    totalAmount,
    selectedPayment,
}: PaymentSummaryProps) => {
    return (
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
        </div>
    );
};

export default PaymentSummary;