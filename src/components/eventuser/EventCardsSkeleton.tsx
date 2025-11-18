const EventCardsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="animate-pulse rounded-xl border border-gray-200 shadow-md p-4 dark:border-[#141427] dark:bg-[#0D0D1A]"
                >
                    <div className="h-40 bg-gray-200 rounded-lg mb-4 dark:bg-[#141427]"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 dark:bg-[#141427]"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 dark:bg-[#141427]"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 dark:bg-[#141427]"></div>
                </div>
            ))}
        </div>
    );
};

export default EventCardsSkeleton;