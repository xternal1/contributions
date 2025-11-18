import React from "react";

interface EventLocationMapProps {
    location?: string | null;
}

const EventLocationMap: React.FC<EventLocationMapProps> = ({ location }) => {
    return (
        <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">Maps Lokasi:</h3>
            <div className="w-full rounded-xl overflow-hidden shadow">
                <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(location || "")}&output=embed`}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default EventLocationMap;


