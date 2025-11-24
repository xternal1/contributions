import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    return (
        <div className="p-6 flex justify-end items-center gap-2">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`min-w-[40px] h-10 px-3 rounded-md text-sm font-medium transition-all ${currentPage === i + 1
                            ? "bg-blue-500 text-white shadow-md"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#171725]"
                        }`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                Next
            </button>
        </div>
    );
};
export default Pagination;