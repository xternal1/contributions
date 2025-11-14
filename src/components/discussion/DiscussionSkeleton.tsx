const DiscussionSkeleton = () => {
    return (
        <div className="space-y-4 animate-pulse">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-[#0D0D1A] rounded-lg border border-gray-200 p-5 shadow"
                >
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/5"></div>
                        </div>
                    </div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="flex gap-3 mt-4">
                        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DiscussionSkeleton;