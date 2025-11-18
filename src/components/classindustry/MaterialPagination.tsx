import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface MaterialPaginationProps {
    currentMaterialPage: number;
    totalMaterialPages: number;
    onPageChange: (page: number) => void;
}

const MaterialPagination = ({
    currentMaterialPage,
    totalMaterialPages,
    onPageChange,
}: MaterialPaginationProps) => {
    if (totalMaterialPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(Math.max(currentMaterialPage - 1, 1))}
                disabled={currentMaterialPage === 1}
                className={`p-2 rounded-lg border transition-colors duration-300 ${currentMaterialPage === 1
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-600"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                    }`}
            >
                <FaChevronLeft size={14} />
            </button>

            {Array.from({ length: totalMaterialPages }, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-300 ${currentMaterialPage === page
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(currentMaterialPage + 1, totalMaterialPages))}
                disabled={currentMaterialPage === totalMaterialPages}
                className={`p-2 rounded-lg border transition-colors duration-300 ${currentMaterialPage === totalMaterialPages
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-600"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                    }`}
            >
                <FaChevronRight size={14} />
            </button>
        </div>
    );
};

export default MaterialPagination;