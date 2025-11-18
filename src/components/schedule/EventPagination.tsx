interface EventPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const EventPagination = ({ page, totalPages, onPageChange }: EventPaginationProps) => {
    return (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`w-8 h-8 sm:w-7 sm:h-7 rounded-full text-sm font-medium transition-all duration-200 border
                        ${num === page
                            ? "bg-[#9425FE] text-white border-[#9425FE] shadow-md"
                            : "bg-gray-200 text-[#9425FE] border-gray-300 hover:bg-[#EDE9FE] dark:bg-black dark:text-[#9425FE] dark:border-[#9425FE] dark:hover:bg-[#1E1E2A]"
                        }`}
                >
                    {num}
                </button>
            ))}
        </div>
    );
};

export default EventPagination;