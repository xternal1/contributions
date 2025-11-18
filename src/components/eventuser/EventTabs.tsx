interface EventTabsProps {
    filter: "pending" | "joined" | "history";
    setFilter: (filter: "pending" | "joined" | "history") => void;
}

const EventTabs = ({ filter, setFilter }: EventTabsProps) => {
    return (
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 mb-6 justify-center md:justify-start">
            <button
                onClick={() => setFilter("pending")}
                className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
        hover:shadow-none active:translate-y-0.5 ${filter === "pending"
                        ? "bg-yellow-400 text-black dark:bg-purple-600 dark:text-white"
                        : "bg-purple-600 text-white hover:bg-yellow-400 hover:text-black dark:bg-[#141427] dark:border dark:border-purple-600 dark:hover:text-white"
                    }`}
            >
                Menunggu Konfirmasi
            </button>

            <button
                onClick={() => setFilter("joined")}
                className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
        hover:shadow-none active:translate-y-0.5 ${filter === "joined"
                        ? "bg-yellow-400 text-black dark:bg-purple-600 dark:text-white"
                        : "bg-purple-600 text-white hover:bg-yellow-400 hover:text-black dark:bg-[#141427] dark:border dark:border-purple-600 dark:hover:text-white"
                    }`}
            >
                Event Diikuti
            </button>

            <button
                onClick={() => setFilter("history")}
                className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
        hover:shadow-none active:translate-y-0.5 ${filter === "history"
                        ? "bg-yellow-400 text-black dark:bg-purple-600 dark:text-white"
                        : "bg-purple-600 text-white hover:bg-yellow-400 hover:text-black dark:bg-[#141427] dark:border dark:border-purple-600 dark:hover:text-white"
                    }`}
            >
                Riwayat Pengajuan
            </button>
        </div>
    );
};

export default EventTabs;