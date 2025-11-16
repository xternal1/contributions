// src/components/transaction/TransactionTabs.tsx

type Tab = "Semua" | "Menunggu Pembayaran" | "Selesai";

interface TransactionTabsProps {
    tabs: Tab[];
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const TransactionTabs = ({ tabs, activeTab, onTabChange }: TransactionTabsProps) => {
    return (
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 mb-6 justify-center sm:justify-start">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-5 py-3 rounded-full font-bold transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                        hover:shadow-none active:translate-y-0.5 ${activeTab === tab
                            ? "bg-purple-600 text-sm text-white hover:bg-yellow-400 hover:text-gray-950 dark:bg-purple-600 dark:text-white"
                            : "bg-gray-200 text-sm text-gray-600 dark:border dark:border-purple-600 dark:text-white dark:bg-[#141427]"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TransactionTabs;


