import React from "react";
import type { Eventype } from "@features/event/_event";

interface EventRundownTableProps {
    event: Eventype | null;
}

const EventRundownTable: React.FC<EventRundownTableProps> = ({ event }) => {
    const formatTime = (time: string) => time.slice(0, 5);

    return (
        <>
            <h3 className="mt-8 text-lg font-semibold">Rundown Acara :</h3>
            <div className="overflow-x-auto mt-4 w-full">
                {event?.event_details?.length ? (
                    <table className="w-full border border-gray-300 rounded-lg text-sm text-left border-collapse min-w-full">
                        <thead className="bg-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-2 border border-gray-300 text-center whitespace-nowrap">
                                    Time
                                </th>
                                <th className="px-4 py-2 border border-gray-300 text-center">
                                    Session
                                </th>
                                <th className="px-4 py-2 border border-gray-300 text-center">
                                    Speaker
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {event.event_details.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="px-6 py-2 border border-gray-300 text-center whitespace-nowrap">
                                            {formatTime(item.start)} - {formatTime(item.end)}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {item.session}
                                        </td>
                                        <td className="px-4 py-2 border font-bold border-gray-300 whitespace-nowrap">
                                            {item.user}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">Rundown belum tersedia.</p>
                )}
            </div>
        </>
    );
};

export default EventRundownTable;


