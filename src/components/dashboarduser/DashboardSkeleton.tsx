const DashboardSkeleton = () => {
    return (
        <>
            {/* Skeleton Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 p-5 rounded-lg shadow-sm bg-gray-100 dark:bg-[#0D0D1A] animate-pulse"
                    >
                        <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-[#141427]"></div>
                        <div className="flex-1">
                            <div className="h-5 bg-gray-300 dark:bg-[#141427] rounded w-16 mb-2"></div>
                            <div className="h-3 bg-gray-300 dark:bg-[#141427] rounded w-24"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Skeleton Courses */}
            <section className="mb-10">
                <div className="h-6 bg-gray-300 dark:bg-[#141427] rounded w-48 mb-5 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse rounded-xl border border-gray-200 shadow-md p-4 dark:border-[#0D0D1A] dark:bg-[#0D0D1A]"
                        >
                            <div className="h-40 bg-gray-200 rounded-lg mb-4 dark:bg-[#141427]"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 dark:bg-[#141427]"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 dark:bg-[#141427]"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3 dark:bg-[#141427]"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skeleton Event */}
            <section>
                <div className="h-6 bg-gray-300 dark:bg-[#141427] rounded w-48 mb-5 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-64 bg-gray-200 dark:bg-[#0D0D1A] rounded-lg animate-pulse"
                        ></div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default DashboardSkeleton;