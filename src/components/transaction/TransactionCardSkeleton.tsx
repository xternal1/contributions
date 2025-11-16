export const TransactionCardSkeleton = () => (
    <div className="border rounded-xl shadow-md overflow-hidden mb-6 animate-pulse dark:bg-[#0D0D1A]">
        <div className="flex flex-wrap items-center gap-6 p-6">
            <div className="w-60 h-40 bg-gray-200 rounded-lg dark:bg-[#141427]" />
            <div className="flex-1 space-y-3">
                <div className="w-32 h-4 bg-gray-200 rounded dark:bg-[#141427]" />
                <div className="w-64 h-5 bg-gray-300 rounded dark:bg-[#141427]" />
                <div className="w-48 h-4 bg-gray-200 rounded dark:bg-[#141427]" />
                <div className="w-full h-3 bg-gray-100 rounded dark:bg-[#141427]" />
            </div>
        </div>
        <div className="border-t px-6 py-4 flex justify-between">
            <div className="w-48 h-4 bg-gray-200 rounded dark:bg-[#141427]" />
            <div className="w-32 h-4 bg-gray-300 rounded dark:bg-[#141427]" />
        </div>
    </div>
);
export default TransactionCardSkeleton;