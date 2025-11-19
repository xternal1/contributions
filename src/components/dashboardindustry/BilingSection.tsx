import { FaInfoCircle } from "react-icons/fa";
import type { BillingSectionProps } from "@/types/Dashboard";

const BillingSection: React.FC<BillingSectionProps> = ({ data, loading }) => {
    if (loading) {
        return (
            <section className="text-start">
                <div className="space-y-4 animate-pulse">
                    <div className="h-6 w-56 bg-gray-200 dark:bg-[#0D0D1A] rounded mb-3"></div>
                    <div className="h-[100px] bg-gray-200 dark:bg-[#0D0D1A] rounded-md"></div>
                    <div className="grid grid-cols-1 md:grid-cols-[0.9fr_0.7fr] gap-4">
                        <div className="h-[120px] bg-gray-200 dark:bg-[#0D0D1A] rounded-md"></div>
                        <div className="h-[120px] bg-gray-200 dark:bg-[#0D0D1A] rounded-md"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="text-start">
            <h3 className="text-lg text-start font-bold mb-3">
                Tagihan Cicilan Semester
            </h3>

            {/* Warning Message */}
            <div className="bg-orange-50 text-yellow-500 dark:bg-yellow-950 p-4 rounded-lg font-medium text-sm mb-3 flex items-center gap-4">
                <FaInfoCircle size={40} className="flex-shrink-0" />
                <span className="font-semibold italic leading-relaxed text-xl">
                    {data.warningMessage}
                </span>
            </div>

            {/* Billing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_0.7fr] gap-4 mb-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 dark:bg-[#0D0D1A]">
                    <div className="bg-purple-600 text-white px-4 py-2">
                        <h3 className="font-semibold text-lg">Tagihan Bulan</h3>
                    </div>
                    <div className="p-4">
                        <p className="text-sm font-semibold text-gray-500 leading-snug dark:text-white mb-3">
                            Bulan
                        </p>
                        <p className="text-3xl font-bold text-purple-600 mb-2">
                            {data.period}
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 dark:bg-[#0D0D1A]">
                    <div className="bg-purple-600 text-white px-4 py-2">
                        <h3 className="font-semibold text-lg">Total Tagihan</h3>
                    </div>
                    <div className="p-4">
                        <p className="text-sm font-semibold text-gray-500 leading-snug dark:text-white mb-3">
                            Tagihan Kelas Belum Di bayar
                        </p>
                        <p className="text-3xl font-bold text-purple-600 mb-2">
                            {data.totalAmount}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BillingSection;