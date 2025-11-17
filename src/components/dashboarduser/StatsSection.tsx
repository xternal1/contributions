import { FaBookOpen } from "react-icons/fa";
import type { DashboardDataCourse } from "@features/user/models";

const StatsSection = ({ profile }: { profile: DashboardDataCourse }) => {
    const stats = [
        { label: "KURSUS DIMILIKI", value: profile.courses_count },
        { label: "KURSUS BELUM SELESAI", value: profile.incomplete_courses },
        { label: "KURSUS SELESAI", value: profile.completed_courses },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 label">
            {stats.map((item, i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 p-5 border rounded-lg shadow-md text-start 
                    bg-white cursor-pointer transform transition duration-300 dark:bg-[#2C004F]
                    hover:scale-105 hover:-translate-y-1 hover:shadow-md"
                >
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl">
                        <FaBookOpen />
                    </div>
                    <div>
                        <p className="text-xl font-bold">{item.value}</p>
                        <p className="text-gray-600 text-xs dark:text-white">{item.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsSection;