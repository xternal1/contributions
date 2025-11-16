import React from "react";
import EventBadge from "./EventBadge";
import EventMetadata from "./EventMetadata";
import EventDescription from "./EventDescription";
import type { Eventype } from "@features/event/_event";

interface EventInfoSectionProps {
    loading: boolean;
    event: Eventype | null;
    isOnline: boolean;
}

const EventInfoSection: React.FC<EventInfoSectionProps> = ({
    loading,
    event,
    isOnline,
}) => {
    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-80 bg-gray-200 rounded-md"></div>
                <div className="h-20 w-full bg-gray-200 rounded-md"></div>
            </div>
        );
    }

    return (
        <>
            <EventBadge />

            <h2 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900">
                {event?.title}
            </h2>

            <EventMetadata
                title={event?.title}
                isOnline={isOnline}
                capacityLeft={event?.capacity_left}
            />

            <div className="w-full border-t-2 border-gray-400 my-8"></div>

            <EventDescription description={event?.description} />
        </>
    );
};

export default EventInfoSection;


