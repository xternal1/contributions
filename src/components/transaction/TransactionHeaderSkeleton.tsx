// src/components/transaction/TransactionSkeleton.tsx

export const TransactionHeaderSkeleton = () => (
    <div className="animate-pulse space-y-6 mb-6">
        {/* Title skeleton */}
        <div className="h-8 w-40 bg-gray-200 rounded-lg dark:bg-[#0D0D1A]" />

        {/* Tabs skeleton */}
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 justify-center sm:justify-start">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="h-10 w-40 bg-gray-200 rounded-full dark:bg-[#0D0D1A]"
                ></div>
            ))}
        </div>
    </div>
);

export default TransactionHeaderSkeleton;