import React from "react";
import { IoIosAlert } from "react-icons/io";

const EventOverWarning: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto pb-5">
            <div className="bg-orange-100 border border-orange-100 px-10 py-4 rounded-lg flex items-center gap-3">
                <IoIosAlert size={30} className="text-amber-500" />
                <span className="font-extrabold italic text-xl text-amber-500">
                    Event Ini telah Berakhir
                </span>
            </div>
        </div>
    );
};

export default EventOverWarning;



