import React from "react";
import { GraduationCap } from "lucide-react";
import StatusIndicator from "../../public/CardEvent/StatusIndicator";

interface EventMetadataProps {
    title?: string;
    isOnline: boolean;
    capacityLeft?: number;
}

const EventMetadata: React.FC<EventMetadataProps> = ({ title, isOnline, capacityLeft }) => {
    return (
        <div className="flex flex-wrap items-center gap-2 mt-3 text-gray-600 text-sm">
            <img
                src="/src/assets/img/logo/get-skill/logo.png"
                alt={title}
                className="w-8 h-8 rounded-full"
            />

            <span>
                By <a href="#" className="font-normal font-sans">GetSkills</a>
            </span>

            <span className="text-gray-400">•</span>

            <StatusIndicator isOnline={isOnline} />

            <span className="text-gray-400">•</span>

            <span className="flex items-center gap-1">
                <GraduationCap /> {capacityLeft} Peserta
            </span>
        </div>
    );
};

export default EventMetadata;