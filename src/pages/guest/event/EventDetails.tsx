import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEventDetail } from "@features/event/_services/eventService";
import type { Eventype } from "@features/event/_event";
import { DetailEventHeader, EventImageSection, EventInfoSection, EventRundownTable, EventLocationMap, EventOverWarning, EventPriceCardMobile } from "@components/event/EventDetail";

const DetailEvent: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [event, setEvent] = useState<Eventype | null>(null);
    const [loading, setLoading] = useState(true);
    const eventIsOver =
        event?.start_in === "selesai" ||
        (!!event?.end_date_raw && new Date(event.end_date_raw) < new Date());

    useEffect(() => {
        const loadEvent = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const eventData = await fetchEventDetail(slug);
                setEvent(eventData);
            } catch (error) {
                console.error("Gagal memuat detail event:", error);
                setEvent(null);
            } finally {
                setLoading(false);
            }
        };
        loadEvent();
    }, [slug]);

    if (!event && !loading) {
        return <div className="text-center py-20 text-gray-500">Event tidak ditemukan</div>;
    }

    const isOnline = Boolean(event?.is_online);

    return (
        <div className="bg-white min-h-screen text-left">
            <DetailEventHeader title={event?.title} />

            <div
                className={`max-w-7xl mx-auto px-4 sm:px-20 md:px-30 lg:px-30 xl:px-10 2xl:px-10 pt-20 ${isOnline ? "pb-10 xl:pb-28 lg:pb-28" : "pb-10 xl:pb-28 lg:pb-28"
                    }`}
            >
                {eventIsOver && <EventOverWarning />}

                <EventImageSection
                    loading={loading}
                    event={event}
                    eventIsOver={eventIsOver}
                />

                <div className="mt-12 grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 w-full xl:max-w-3xl lg:max-w-xl gap-8">
                    <div className="lg:col-span-2">
                        <EventInfoSection
                            loading={loading}
                            event={event}
                            isOnline={isOnline}
                        />

                        {!loading && <EventRundownTable event={event} />}

                        {!isOnline && !loading && (
                            <EventLocationMap location={event?.location} />
                        )}
                    </div>

                    <EventPriceCardMobile
                        loading={loading}
                        event={event}
                        eventIsOver={eventIsOver}
                        isOnline={isOnline}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailEvent;


