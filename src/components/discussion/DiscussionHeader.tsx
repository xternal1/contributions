import { FiChevronLeft } from "react-icons/fi";

interface DiscussionHeaderProps {
    onBack: () => void;
}

const DiscussionHeader = ({ onBack }: DiscussionHeaderProps) => {
    return (
        <div className="flex items-center bg-gradient-to-br from-purple-500 to-purple-700 py-3 px-4 mb-6">
            <button
                onClick={onBack}
                className="text-white text-2xl flex items-center justify-center mr-2"
            >
                <FiChevronLeft size={24} />
            </button>
            <h1 className="text-white font-semibold text-left text-lg">Kembali</h1>
        </div>
    );
};

export default DiscussionHeader;