import React from "react";

interface EventImageOverlayProps {
    loading: boolean;
    onImageClick: () => void;
}

const EventImageOverlay: React.FC<EventImageOverlayProps> = ({ loading, onImageClick }) => {
    return (
        <>
            {/* Gradient bawah */}
            {!loading && (
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-transparent to-transparent rounded-b-xl" />
            )}

            {/* Overlay hover */}
            <div
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold rounded-xl transition-opacity duration-300 cursor-pointer"
                onClick={onImageClick}
            >
                Klik untuk melihat ukuran penuh
            </div>
        </>
    );
};

export default EventImageOverlay;