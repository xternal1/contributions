interface TabSwitcherProps {
    activeTab: "siswa" | "materi";
    onTabChange: (tab: "siswa" | "materi") => void;
}

const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => {
    return (
        <div className="flex gap-3 mt-6">
            <button
                onClick={() => onTabChange("siswa")}
                className={`
                    font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
                    flex items-center justify-center transition-all duration-150 ease-in-out
                    active:translate-y-0.5 border
                    ${activeTab === "siswa"
                        ? `
                            shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] 
                            dark:shadow-blue-950
                            bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white
                            dark:from-purple-600 dark:to-purple-700 dark:border-purple-600
                        `
                        : `
                            bg-gray-200 dark:bg-[#0D0D1A] border-gray-300 dark:border-purple-600 text-gray-700 dark:text-gray-200
                            hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:border-purple-700 hover:text-white
                            hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]
                            dark:shadow-blue-950
                            dark:hover:from-purple-600 dark:hover:to-purple-600 dark:hover:border-purple-600
                        `
                    }
                `}
            >
                Siswa
            </button>
            <button
                onClick={() => onTabChange("materi")}
                className={`
                    font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
                    flex items-center justify-center transition-all duration-150 ease-in-out
                    active:translate-y-0.5 border
                    ${activeTab === "materi"
                        ? `
                            shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] 
                            dark:shadow-blue-950
                            bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white
                            dark:from-purple-600 dark:to-purple-700 dark:border-purple-500
                        `
                        : `
                            bg-gray-200 dark:bg-[#0D0D1A] border-gray-300 dark:border-purple-600 text-gray-700 dark:text-gray-200
                            hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:border-purple-700 hover:text-white
                            hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]
                            dark:shadow-blue-950
                            dark:hover:from-purple-600 dark:hover:to-purple-700 dark:hover:border-purple-500
                        `
                    }
                `}
            >
                Materi
            </button>
        </div>
    );
};

export default TabSwitcher;