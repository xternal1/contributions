import { Card } from "flowbite-react";

type EventCardGridProps = {
  is_online: boolean;
  location?: string;
  platform?: string;
};

const EventLocationCard: React.FC<EventCardGridProps> = ({ is_online, location, platform }) => {
  return (
    <Card className="shadow-lg border border-gray-200 overflow-hidden z-10 rounded-2xl">
      <div className="p-5 text-sm text-gray-700">
        <h1 className="text-lg font-semibold mb-2">
          {is_online ? "Platform" : "Lokasi"}
        </h1>
        {is_online ? (
          <span>
            LIVE at{" "}
            <a
              href={
                platform?.toLowerCase() === "zoom"
                  ? "https://zoom.us/j/123456789"
                  : "https://youtube.com"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline font-medium"
            >
              {platform}
            </a>
          </span>
        ) : (
          <>
            <span className="text-gray-700 block mb-2">{location}</span>
            <iframe
              title="map-location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(location || "")}&output=embed`}
              className="w-full h-40 rounded-lg border"
              allowFullScreen
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default EventLocationCard;
