import React from "react";
import type { Eventype } from "@features/event/_event";
import EventPriceCard from "../../public/CardEvent/EventPriceCard";

interface EventPriceCardDesktopProps {
    loading: boolean;
    event: Eventype | null;
    eventIsOver: boolean;
}

const EventPriceCardDesktop: React.FC<EventPriceCardDesktopProps> = ({
    loading,
    event,
    eventIsOver,
}) => {
    return (
        <div className="absolute right-8 top-[70%] translate-y-[3%] w-85 hidden lg:block space-y-6">
            {loading ? (
                <div className="animate-pulse space-y-4">
                    <div className="h-32 bg-gray-200 rounded-xl"></div>
                    <div className="h-32 bg-gray-200 rounded-xl"></div>
                </div>
            ) : (
                <>
                    <EventPriceCard event={event!} eventIsOver={eventIsOver} />
                </>
            )}
        </div>
    );
};

export default EventPriceCardDesktop;


