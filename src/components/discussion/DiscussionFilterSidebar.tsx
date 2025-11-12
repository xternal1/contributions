import { PlusCircle } from "lucide-react";
// import DiscussionDropdown from "../../../../components/public/DiscussionDropdown";

interface Tag {
    id: number;
    name: string;
}

interface DiscussionFilterSidebarProps {
    modules: any[];
    filterStatus: string[];
    sortOrder: string[];
    tags: Tag[];
    selectedTags: string[];
    onCreateDiscussion: () => void;
    onFilterStatusChange: (newStatus: string[]) => void;
    onSortOrderChange: (newOrder: string[]) => void;
    onTagClick: (tagName: string) => void;
}

const DiscussionFilterSidebar = ({
    modules,
    filterStatus,
    sortOrder,
    tags,
    selectedTags,
    onCreateDiscussion,
    onFilterStatusChange,
    onSortOrderChange,
    onTagClick
}: DiscussionFilterSidebarProps) => {
    return (
        <div className="w-full lg:w-64 flex flex-col gap-5">
            <button
                onClick={onCreateDiscussion}
                className="flex items-center justify-center gap-2 transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
        hover:shadow-none active:translate-y-0.5 bg-purple-500 text-white font-bold text-md 
        px-6 py-3 rounded-lg hover:text-black hover:bg-yellow-400">
                <PlusCircle size={18} />
                Buat Diskusi Baru
            </button>
            <div className="bg-white shadow rounded-lg p-5 h-fit dark:bg-[#0D0D1A] dark:border dark:border-white transition-colors duration-500">
                <h3 className="text-md font-semibold text-start text-gray-800 mb-4 dark:text-white">
                    Filter Berdasarkan
                </h3>
                {/* Filter Status */}
                <div className="space-y-2 mb-6">
                    <label className="relative flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={filterStatus.includes("answered")}
                            className="peer appearance-none w-4 h-4 border-2 border-purple-600 rounded-xs
              bg-transparent cursor-pointer transition-all duration-300
              checked:bg-purple-600 checked:border-purple-600
              focus:outline-none focus:ring-0 dark:bg-[#141427]"
                            onChange={(e) => {
                                const newStatus = e.target.checked
                                    ? [...filterStatus, "answered"]
                                    : filterStatus.filter(f => f !== "answered");
                                onFilterStatusChange(newStatus);
                            }}
                        />
                        <svg
                            className="absolute left-[0.5px] top-[3px] w-4 h-4 text-white opacity-0 
              peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Diskusi sudah selesai</span>
                    </label>
                    <label className="relative flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={filterStatus.includes("unanswered")}
                            className="peer appearance-none w-4 h-4 border-2 border-purple-600 rounded-xs
              bg-transparent cursor-pointer transition-all duration-300
              checked:bg-purple-600 checked:border-purple-600
              focus:outline-none focus:ring-0 dark:bg-[#141427]"
                            onChange={(e) => {
                                const newStatus = e.target.checked
                                    ? [...filterStatus, "unanswered"]
                                    : filterStatus.filter(f => f !== "unanswered");
                                onFilterStatusChange(newStatus);
                            }}
                        />
                        <svg
                            className="absolute left-[0.5px] top-[3px] w-4 h-4 text-white opacity-0 
              peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Diskusi belum selesai</span>
                    </label>
                </div>

                {/* Sort Order */}
                <h3 className="text-md font-semibold text-start text-gray-800 mb-4 dark:text-white">
                    Urutkan Berdasarkan
                </h3>
                <div className="space-y-2 mb-6">
                    <label className="relative flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={sortOrder.includes("latest")}
                            className="peer appearance-none w-4 h-4 border-2 border-purple-600 rounded-xs
              bg-transparent cursor-pointer transition-all duration-300
              checked:bg-purple-600 checked:border-purple-600
              focus:outline-none focus:ring-0 dark:bg-[#141427]"
                            onChange={(e) => {
                                const newOrder = e.target.checked
                                    ? [...sortOrder, "latest"]
                                    : sortOrder.filter(f => f !== "latest");
                                onSortOrderChange(newOrder);
                            }}
                        />
                        <svg
                            className="absolute left-[0.5px] top-[3px] w-4 h-4 text-white opacity-0 
              peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Diskusi terbaru</span>
                    </label>
                    <label className="relative flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={sortOrder.includes("oldest")}
                            className="peer appearance-none w-4 h-4 border-2 border-purple-600 rounded-xs
              bg-transparent cursor-pointer transition-all duration-300
              checked:bg-purple-600 checked:border-purple-600
              focus:outline-none focus:ring-0 dark:bg-[#141427]"
                            onChange={(e) => {
                                const newOrder = e.target.checked
                                    ? [...sortOrder, "oldest"]
                                    : sortOrder.filter(f => f !== "oldest");
                                onSortOrderChange(newOrder);
                            }}
                        />
                        <svg
                            className="absolute left-[0.5px] top-[3px] w-4 h-4 text-white opacity-0 
              peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Diskusi terlama</span>
                    </label>
                </div>

                {/* Tags */}
                <h4 className="text-md text-start font-semibold text-gray-800 mb-3 dark:text-white">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {tags.length > 0 ? (
                        tags.map((tag) => (
                            <span
                                key={tag.id}
                                onClick={() => onTagClick(tag.name)}
                                className={`px-3 py-1 rounded-lg text-sm cursor-pointer transition ${selectedTags.includes(tag.name)
                                    ? "bg-purple-600 text-white shadow border-2 border-purple-600"
                                    : " text-purple-700 hover:text-white hover:bg-purple-600 border-2 border-purple-600 bg-transparent"
                                    }`}
                            >
                                #{tag.name}
                            </span>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">Memuat tag...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiscussionFilterSidebar;