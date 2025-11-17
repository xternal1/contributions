const EventHeaderSkeleton = () => {
    return (
        <div className="animate-pulse space-y-6">
            {/* Title skeleton */}
            <div className="h-8 w-40 bg-gray-200 rounded-lg dark:bg-[#0D0D1A]"></div>

            {/* Tabs skeleton */}
            <div className="flex flex-wrap md:flex-nowrap gap-3 justify-center md:justify-start">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="h-10 w-40 bg-gray-200 rounded-full dark:bg-[#0D0D1A]"
                    ></div>
                ))}
            </div>

            {/* Search + Dropdown skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                <div className="h-8 w-40 bg-gray-200 rounded-lg dark:bg-[#0D0D1A]"></div>
                <div className="h-8 w-40 bg-gray-200 rounded-lg dark:bg-[#0D0D1A]"></div>
            </div>
        </div>
    );
};

export default EventHeaderSkeleton;