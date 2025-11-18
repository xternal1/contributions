import calendarIcon from "@assets/img/icons/calendar.png";
import clockIcon from "@assets/img/icons/32.png";
import mapPinIcon from "@assets/img/icons/library.svg";

interface Event {
    title: string;
    desc?: string;
    link?: string;
    date?: string;
    time?: string;
    location?: string;
}

interface EventCardProps {
    event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
    return (
        <div className="border-b border-gray-300 dark:border-white pb-4 last:border-none">
            <h4 className="text-[15px] font-semibold text-gray-800 dark:text-white mb-1">
                {event.title}
            </h4>

            {event.desc && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
                    {event.desc}
                </p>
            )}

            {event.link && (
                <a
                    href={event.link}
                    className="text-xs text-blue-500 underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {event.link}
                </a>
            )}

            {event.date && (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <img src={calendarIcon} alt="calendar" className="w-3.5 h-3.5" />
                    {event.date}
                </div>
            )}

            {event.time && (
                <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {event.time.split("\n").map((time, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <img src={clockIcon} alt="clock" className="w-3.5 h-3.5" />
                            <span>{time}</span>
                        </div>
                    ))}
                </div>
            )}

            {event.location && (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <img src={mapPinIcon} alt="map" className="w-3.5 h-3.5" />
                    {event.location}
                </div>
            )}
        </div>
    );
};

export default EventCard;