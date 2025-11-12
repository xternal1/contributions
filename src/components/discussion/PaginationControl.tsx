import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onNextPage: () => void;
    onPrevPage: () => void;
}

const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
    onNextPage,
    onPrevPage
}: PaginationControlsProps) => {
    return (
        <div className="flex justify-center mt-10">
            <div className="flex items-center gap-3">
                <motion.button
                    onClick={onPrevPage}
                    disabled={currentPage === 1}
                    whileTap={{ scale: 0.9 }}
                    className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                        : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
                        }`}
                >
                    <ChevronsLeft />
                </motion.button>
                {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    const isActive = page === currentPage;
                    return (
                        <motion.button
                            key={page}
                            onClick={() => onPageChange(page)}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                scale: isActive ? 1.1 : 1,
                                boxShadow: isActive
                                    ? "0px 4px 10px rgba(147, 51, 234, 0.4)"
                                    : "none",
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-300 ${isActive
                                ? "bg-purple-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:border dark:border-purple-700 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                                }`}
                        >
                            {page}
                        </motion.button>
                    );
                })}
                <motion.button
                    onClick={onNextPage}
                    disabled={currentPage === totalPages}
                    whileTap={{ scale: 0.9 }}
                    className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                        : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
                        }`}
                >
                    <ChevronsRight />
                </motion.button>
            </div>
        </div>
    );
};

export default PaginationControls;