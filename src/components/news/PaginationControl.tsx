// src/components/news/PaginationControls.tsx
import React from "react";
import { motion } from "framer-motion";
import { ChevronsRight, ChevronsLeft } from "lucide-react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const generatePageButtons = () => {
        const pageButtons: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pageButtons.push(i);
        } else {
            const showLeftEllipsis = currentPage > 4;
            const showRightEllipsis = currentPage < totalPages - 3;

            pageButtons.push(1);
            if (showLeftEllipsis) pageButtons.push("...");

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) pageButtons.push(i);

            if (showRightEllipsis) pageButtons.push("...");
            pageButtons.push(totalPages);
        }

        return pageButtons;
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="flex items-center gap-3">
                <motion.button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    whileTap={{ scale: 0.9 }}
                    className={`px-1 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${currentPage === 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:text-gray-500 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                            : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:hover:bg-[#141427] dark:bg-[#0D0D1A] dark:border dark:border-white"
                        }`}
                >
                    <ChevronsLeft />
                </motion.button>

                {generatePageButtons().map((page, index) =>
                    typeof page === "number" ? (
                        <motion.button
                            key={page}
                            onClick={() => onPageChange(page)}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                scale: page === currentPage ? 1.1 : 1,
                                boxShadow:
                                    page === currentPage
                                        ? "0px 4px 10px rgba(147, 51, 234, 0.4)"
                                        : "none",
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-300 ${page === currentPage
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:text-white dark:border dark:border-purple-700 dark:hover:bg-[#141427] dark:bg-[#0D0D1A]"
                                }`}
                        >
                            {page}
                        </motion.button>
                    ) : (
                        <span key={`ellipsis-${index}`} className="text-gray-500 dark:text-white">
                            ...
                        </span>
                    )
                )}

                <motion.button
                    onClick={handleNext}
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


