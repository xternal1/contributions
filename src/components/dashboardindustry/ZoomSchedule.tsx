import { motion } from "framer-motion";
import { FaVideo, FaCalendarAlt, FaClock } from "react-icons/fa";
import type { ZoomScheduleProps, ZoomScheduleItem } from "@/types/Dashboard";

interface ZoomCardProps {
    zoom: ZoomScheduleItem;
}

const ZoomCard: React.FC<ZoomCardProps> = ({ zoom }) => {
    const isCompleted = zoom.status === "completed";

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-sm h-sm bg-white dark:bg-[#0D0D1A] border dark:border-white rounded-xl shadow-sm p-5 flex flex-col justify-between flex-shrink-0"
        >
            <div className="flex items-start gap-3">
                <div className="p-2.5 bg-purple-100 dark:bg-[#2C004F] rounded-xl flex-shrink-0">
                    <div className="bg-purple-600 rounded-full p-3 flex items-center justify-center">
                        <FaVideo className="text-white text-xl dark:text-[#2C004F]" />
                    </div>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-md leading-snug line-clamp-2 break-words mt-1">
                    {zoom.title}
                </h4>
            </div>

            <div className="flex justify-between mt-4 text-sm">
                <div>
                    <div className="flex items-center gap-1 text-gray-400 font-medium">
                        <FaCalendarAlt className="text-red-500 text-xs" />
                        <span className="dark:text-white">Tanggal</span>
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-white mt-1">
                        {zoom.date}
                    </p>
                </div>
                <div>
                    <div className="flex items-center gap-1 text-gray-400 font-medium">
                        <FaClock className="text-yellow-500 text-xs" />
                        <span className="dark:text-white">Waktu</span>
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-white mt-1">
                        {zoom.time}
                    </p>
                </div>
            </div>

            <button
                className={`mt-5 w-full py-2.5 rounded-xl font-semibold ${isCompleted
                        ? "bg-green-100 text-green-600 dark:bg-green-950"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
            >
                {isCompleted ? "Selesai" : "Mulai Zoom"}
            </button>
        </motion.div>
    );
};

const ZoomSchedule: React.FC<ZoomScheduleProps> = ({ schedule, loading }) => {
    if (loading) {
        return (
            <section className="text-start">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 w-52 bg-gray-200 dark:bg-[#0D0D1A] rounded mb-3"></div>
                    <div className="w-full max-w-[840px] mx-auto flex gap-5 overflow-x-auto pb-2 scroll-smooth">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="w-sm h-[200px] bg-gray-200 dark:bg-[#0D0D1A] rounded-xl flex-shrink-0"
                            ></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="text-start">
            <h3 className="text-lg font-bold mb-3">Jadwal Zoom Hari Ini</h3>
            <div className="w-full max-w-[840px] mx-auto flex gap-5 overflow-x-auto pb-2 scroll-smooth">
                {schedule.map((zoom) => (
                    <ZoomCard key={zoom.id} zoom={zoom} />
                ))}
            </div>
        </section>
    );
};

export default ZoomSchedule;