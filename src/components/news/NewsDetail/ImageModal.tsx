// src/components/news/ImageModal.tsx
import React from "react";
import { FiX } from "react-icons/fi";
import defaultImg from "../../../assets/Default-Img.png";

interface ImageModalProps {
    isOpen: boolean;
    imageUrl: string;
    altText: string;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, altText, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-2"
            onClick={onClose}
        >
            <div className="relative rounded-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="absolute top-3 right-3 text-white hover:text-gray-300 text-2xl"
                >
                    <FiX />
                </button>
                <img
                    src={imageUrl}
                    alt={altText}
                    className="w-full max-h-[90vh] object-contain rounded-lg"
                    onError={(e) => {
                        e.currentTarget.src = defaultImg;
                    }}
                />
            </div>
        </div>
    );
};

export default ImageModal;