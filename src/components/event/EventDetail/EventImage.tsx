import React from "react";

interface EventImageProps {
    loading: boolean;
    image?: string;
    title?: string;
    onImageClick: () => void;
}

const EventImage: React.FC<EventImageProps> = ({ loading, image, title, onImageClick }) => {
    if (loading) {
        return <div className="animate-pulse w-full h-80 bg-gray-200 rounded-xl"></div>;
    }

    if (image) {
        return (
            <img
                src={image}
                alt={title}
                className="w-full h-130 object-cover rounded-xl cursor-pointer"
                onClick={onImageClick}
                onError={(e) => {
                    e.currentTarget.src = "/src/assets/Default-Img.png";
                }}
            />
        );
    }

    return (
        <img
            src="/src/assets/Default-Img.png"
            alt="Default"
            className="h-40 w-full object-cover rounded-xl"
        />
    );
};

export default EventImage;