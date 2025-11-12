import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface DiscussionHeaderProps {
    onBack: () => void;
    title?: string;
}

const DiscussionHeader = ({ onBack, title = "Kembali" }: DiscussionHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center bg-gradient-to-br from-purple-500 to-purple-700 py-3 px-4 mb-6">
            <button
                onClick={onBack}
                className="text-white text-2xl flex items-center justify-center mr-2"
            >
                <FiChevronLeft size={24} className="p-0.5 rounded-full bg-purple-400 text-white" />
            </button>
            <h1 className="text-white font-semibold text-left text-lg">{title}</h1>
        </div>
    );
};

export default DiscussionHeader;