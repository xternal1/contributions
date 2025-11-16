import { X } from "lucide-react";

const DiscussionActiveFilter = () => {
    return (
        <div className="mb-9 mt-9 text-start font-semibold flex items-center flex-wrap gap-2">
            <h2 className="text-lg text-gray-800">Diskusi berdasarkan :</h2>

            {/* Tag Filter */}
            <div className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md text-sm shadow cursor-pointer hover:bg-purple-700 transition">
                <span>Nama Modul Lorem Ipsum</span>
                <X size={16} className="cursor-pointer hover:text-gray-200" />
            </div>
        </div>
    );
};

export default DiscussionActiveFilter;