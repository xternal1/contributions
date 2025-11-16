import React, { useState } from "react";
import EventImage from "./EventImage";
import EventImageOverlay from "./EventImageOverlay";
import EventPriceCardDesktop from "./EventPriceCardDesktop";
import EventImageModal from "./EventImageModal";
import type { Eventype } from "../../../features/event/_event";

interface EventImageSectionProps {
    loading: boolean;
    event: Eventype | null;
    eventIsOver: boolean;
}

const EventImageSection: React.FC<EventImageSectionProps> = ({
    loading,
    event,
    eventIsOver,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="relative group">
                <EventImage
                    loading={loading}
                    image={event?.image}
                    title={event?.title}
                    onImageClick={() => setIsOpen(true)}
                />

                <EventImageOverlay
                    loading={loading}
                    onImageClick={() => setIsOpen(true)}
                />

                <EventPriceCardDesktop
                    loading={loading}
                    event={event}
                    eventIsOver={eventIsOver}
                />
            </div>

            <EventImageModal
                isOpen={isOpen}
                image={event?.image}
                title={event?.title}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};

export default EventImageSection;