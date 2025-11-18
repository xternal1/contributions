import { FaSearch, FaBook } from "react-icons/fa";

interface Material {
    id: number;
    title: string;
    class: string;
    totalChapter: number;
    description: string;
}

interface MaterialGridProps {
    currentMaterials: Material[];
    filteredMaterials: Material[];
    searchMaterialQuery: string;
    onSearchChange: (value: string) => void;
}

const MaterialGrid = ({
    currentMaterials,
    filteredMaterials,
    searchMaterialQuery,
    onSearchChange,
}: MaterialGridProps) => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-fit">
                    <FaSearch className="absolute top-3.5 left-3 text-gray-400 dark:text-gray-500 transition-colors duration-500" />
                    <input
                        type="text"
                        placeholder="Cari materi..."
                        value={searchMaterialQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-72 border border-gray-300 dark:border-gray-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 bg-white dark:bg-[#0D0D1A] text-gray-800 dark:text-white transition-colors duration-500"
                    />
                </div>
            </div>

            {/* Daftar Materi */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 mt-2 max-w-6xl mx-auto">
                {currentMaterials.map((mat) => (
                    <div
                        key={mat.id}
                        className="bg-white dark:bg-[#0D0D1A] border border-gray-100 dark:border-gray-200 rounded-2xl shadow-md p-5 flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:border-purple-200 dark:hover:border-purple-500"
                    >
                        <div className="flex text-left gap-3 mb-3">
                            <div className="p-2">
                                <FaBook className="text-purple-600 dark:text-purple-400 text-lg transition-colors duration-500" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white text-[13px] transition-colors duration-500">
                                    {mat.title}
                                </h4>
                                <p className="mt-1 text-[13px] text-gray-600 dark:text-gray-400 transition-colors duration-500">{mat.class}</p>
                            </div>
                        </div>

                        <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1 flex-grow text-left transition-colors duration-500">
                            {mat.description}
                        </p>

                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-500">
                            <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-md font-medium transition-colors duration-500">
                                {mat.totalChapter} Bab
                            </span>
                            <button className="w-fit relative group overflow-hidden font-sans font-semibold text-xs py-1 px-4 rounded-lg flex items-center justify-center gap-2 border transition-all duration-500 ease-in-out shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 bg-white dark:bg-purple-600 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-100 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-700">
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                <span className="relative z-10">Detail</span>
                            </button>
                        </div>
                    </div>
                ))}

                {filteredMaterials.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400 transition-colors duration-500">
                        Tidak ada materi yang ditemukan
                    </div>
                )}
            </div>
        </>
    );
};

export default MaterialGrid;