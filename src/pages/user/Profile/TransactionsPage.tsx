import { useState } from "react";
import DashboardLayout from "../../../components/public/auth/DashboardLayout";

const TransactionPage = () => {
    const [activeTab, setActiveTab] = useState("Semua");
    const tabs = ["Semua", "Menunggu Pembayaran", "Selesai"];

    return (
        <DashboardLayout slug="transaction">
            <main className="flex-1 bg-white ml-8 p-7 rounded-xl shadow-xl border-3 border-purple-200 ">
                {/* Aktivitas Belajar */}
                <section className="text-start">
                    <h2 className="text-xl font-bold mb-5">Riwayat Transaksi</h2>
                    <div className="flex items-center gap-4 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-sm rounded-full font-semibold transition-all duration-300 ${activeTab === tab
                                    ? "bg-purple-600 text-white shadow-[5px_6px_0_#4c1d95] hover:bg-yellow-400 hover:text-gray-950"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <img className="w-80" src="/src/assets/img/no-data/empty.svg" alt="no-data" />
                        <p className="text-black text-xl font-bold">Data Kosong</p>
                    </div>
                </section>
            </main>
        </DashboardLayout>
    )
};

export default TransactionPage