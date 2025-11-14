import { X } from "lucide-react";

interface TagFilterProps {
    selectedTags: string[];
    onTagClick: (tagName: string) => void;
}

const TagFilter = ({ selectedTags, onTagClick }: TagFilterProps) => {
    return (
        <div className="mb-9 mt-9 text-start font-semibold flex items-center flex-wrap gap-2">
            <h2 className="text-md text-gray-800 dark:text-white">Diskusi berdasarkan :</h2>
            {selectedTags.length > 0 && selectedTags.map(tagName => (
                <div
                    key={tagName}
                    className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-md text-xs shadow cursor-pointer hover:bg-purple-700 transition"
                >
                    <span>#{tagName}</span>
                    <X
                        size={16}
                        onClick={() => onTagClick(tagName)}
                        className="cursor-pointer hover:text-gray-200"
                    />
                </div>
            ))}
        </div>
    );
};

export default TagFilter;