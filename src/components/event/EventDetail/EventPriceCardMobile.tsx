import React from "react";
import type { Eventype } from "@features/event/_event";
import EventPriceCard from "../../public/CardEvent/EventPriceCard";

interface EventPriceCardMobileProps {
    loading: boolean;
    event: Eventype | null;
    eventIsOver: boolean;
    isOnline: boolean;
}

const EventPriceCardMobile: React.FC<EventPriceCardMobileProps> = ({
    loading,
    event,
    eventIsOver,
    isOnline,
}) => {
    return (
        <div className={`lg:hidden space-y-6 ${isOnline ? "pb-1" : "pb-0"}`}>
            {!loading && (
                <>
                    <EventPriceCard event={event!} eventIsOver={eventIsOver} />
                </>
            )}
        </div>
    );
};

export default EventPriceCardMobile;


