import { useNavigate } from "react-router-dom";
import empty from "@assets/img/no-data/empty.svg";

const EventEmptyState = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <img
                src={empty}
                alt="Belum ada event"
                className="w-auto h-56 object-contain"
            />
            <p className="text-gray-600 text-lg font-bold mb-5 dark:text-white">
                Belum Ada Event
            </p>
            <button
                onClick={() => navigate("/event")}
                className="px-4 py-3 text-sm bg-purple-600 shadow-[5px_6px_0_#4c1d95] 
              text-white rounded-full hover:shadow hover:bg-yellow-400 hover:text-gray-950 
              transition-all duration-300 font-semibold active:translate-y-0.5"
            >
                Lihat Event Disini
            </button>
        </div>
    );
};

export default EventEmptyState;