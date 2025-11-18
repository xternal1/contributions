import React from "react";

interface EventDescriptionProps {
    description?: string;
}

const EventDescription: React.FC<EventDescriptionProps> = ({ description }) => {
    return (
        <p
            className="mt-4 text-gray-700 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description || "" }}
        />
    );
};

export default EventDescription;


