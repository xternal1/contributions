import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface StudentPaginationProps {
    currentStudentPage: number;
    totalStudentPages: number;
    onPageChange: (page: number) => void;
}

const StudentPagination = ({
    currentStudentPage,
    totalStudentPages,
    onPageChange,
}: StudentPaginationProps) => {
    if (totalStudentPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(Math.max(currentStudentPage - 1, 1))}
                disabled={currentStudentPage === 1}
                className={`p-2 rounded-lg border transition-colors duration-300 ${currentStudentPage === 1
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-600"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                    }`}
            >
                <FaChevronLeft size={14} />
            </button>

            {Array.from({ length: totalStudentPages }, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-300 ${currentStudentPage === page
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(currentStudentPage + 1, totalStudentPages))}
                disabled={currentStudentPage === totalStudentPages}
                className={`p-2 rounded-lg border transition-colors duration-300 ${currentStudentPage === totalStudentPages
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-600"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                    }`}
            >
                <FaChevronRight size={14} />
            </button>
        </div>
    );
};

export default StudentPagination;