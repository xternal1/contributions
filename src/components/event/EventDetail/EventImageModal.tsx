import React from "react";
import { FiX } from "react-icons/fi";

interface EventImageModalProps {
    isOpen: boolean;
    image?: string;
    title?: string;
    onClose: () => void;
}

const EventImageModal: React.FC<EventImageModalProps> = ({ isOpen, image, title, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2">
            <div className="relative rounded-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white hover:text-gray-300 text-2xl"
                >
                    <FiX />
                </button>
                <img
                    src={image}
                    alt={title}
                    className="w-full max-h-[90vh] object-contain rounded-lg"
                />
            </div>
        </div>
    );
};

export default EventImageModal;


