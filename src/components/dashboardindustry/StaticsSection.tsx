import { FaCheck, FaTimes } from "react-icons/fa";
import { HiClipboardList } from "react-icons/hi";
import { IoExtensionPuzzle } from "react-icons/io5";
import type { StatisticsSectionProps, StatisticItem as StatisticItemType, StatisticCategory, StatisticStatus } from "@/types/Dashboard";
import type { IconType } from "react-icons";

type StatisticType = "tugas" | "tantangan";

const iconMap: Record<StatisticType, IconType> = {
    tugas: IoExtensionPuzzle,
    tantangan: HiClipboardList,
};

interface StatusIconProps {
    status: StatisticStatus;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
    if (status === "completed") return null;

    const Icon = status === "pending" ? FaCheck : FaTimes;
    return (
        <Icon className="absolute -bottom-1 right-1 bg-purple-50 p-1 rounded-full text-purple-600 text-lg" />
    );
};

interface StatisticItemComponentProps {
    item: StatisticItemType;
    IconComponent: IconType;
}

const StatisticItemComponent: React.FC<StatisticItemComponentProps> = ({ item, IconComponent }) => (
    <div className="flex justify-between items-center bg-purple-50 dark:bg-[#2C004F] p-5 rounded-xl">
        <div>
            <p className="text-3xl font-bold text-purple-600 leading-none">
                {item.value}
            </p>
            <p className="text-gray-500 dark:text-white text-sm mt-1">
                {item.label}
            </p>
        </div>
        <div className="relative">
            <IconComponent size={40} className="text-purple-600" />
            <StatusIcon status={item.status} />
        </div>
    </div>
);

interface StatisticCardProps {
    type: StatisticType;
    data: StatisticCategory;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ type, data }) => {
    const IconComponent = iconMap[type];

    return (
        <div className="bg-white border dark:bg-[#0D0D1A] dark:border-white rounded-2xl shadow p-5">
            <h4 className="font-semibold text-2xl text-black dark:text-white mb-1">
                {data.title}
            </h4>
            <p className="text-gray-600 dark:text-white mb-5">{data.subtitle}</p>
            <div className="space-y-4">
                {data.items.map((item, idx) => (
                    <StatisticItemComponent key={idx} item={item} IconComponent={IconComponent} />
                ))}
            </div>
        </div>
    );
};

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ data, loading }) => {
    if (loading) {
        return (
            <section className="text-start">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 w-48 bg-gray-200 dark:bg-[#0D0D1A] rounded mb-3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-[320px] bg-gray-200 dark:bg-[#0D0D1A] rounded-2xl"></div>
                        <div className="h-[320px] bg-gray-200 dark:bg-[#0D0D1A] rounded-2xl"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="text-start">
            <h3 className="text-lg font-bold mb-3">Statistik Kamu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatisticCard type="tugas" data={data.tugas} />
                <StatisticCard type="tantangan" data={data.tantangan} />
            </div>
        </section>
    );
};

export default StatisticsSection;