import { Search } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const DiscussionSearchBar = ({ value, onChange, placeholder = "Cari topik diskusi..." }: SearchBarProps) => {
    return (
        <div className="flex items-center gap-2 w-full md:w-1/2 bg-white px-3 py-2 rounded-lg shadow dark:bg-[#141427] dark:border dark:border-white transition-colors duration-500">
            <Search className="text-purple-500 dark:text-white" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full outline-none text-sm text-gray-500 dark:placeholder:text-gray-400 dark:text-white"
            />
        </div>
    );
};

export default DiscussionSearchBar;


