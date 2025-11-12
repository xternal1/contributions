import empty from "../../../../assets/img/no-data/empty.svg";

interface EmptyStateProps {
    message?: string;
    imageSrc?: string;
    className?: string;
}

const EmptyState = ({
    message = "Tidak ada diskusi ditemukan.",
    imageSrc = empty,
    className = ""
}: EmptyStateProps) => {
    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <img
                src={imageSrc}
                alt="Belum ada data"
                className="w-auto h-56 object-contain"
            />
            <p className="text-gray-600 text-lg font-bold mb-5 dark:text-white">{message}</p>
        </div>
    );
};

export default EmptyState;