// @/components/pretest/PretestCard.tsx
import React from "react";
import { FileText, Edit3, Clock } from "lucide-react";
import type { PretestItem } from "@/data/pretestData";

interface PretestCardProps {
    item: PretestItem;
    onDetailClick?: (id: number) => void;
}

const PretestCard: React.FC<PretestCardProps> = ({ item, onDetailClick }) => {
    return (
        <div className="bg-white dark:bg-gradient-to-br dark:from-purple-900 dark:to-purple-800 rounded-xl p-6 border border-gray-200 dark:border-purple-700 hover:border-gray-300 dark:hover:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-purple-900/50">
            {/* Title */}
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-6">
                {item.title}
            </h3>

            {/* Info Items */}
            <div className="space-y-3 mb-6">
                {/* Essay Weight */}
                <div className="flex items-center gap-3 text-gray-700 dark:text-white/90">
                    <FileText className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">
                        Bobot Nilai Essay {item.essayWeight}%
                    </span>
                </div>

                {/* Essay Count */}
                <div className="flex items-center gap-3 text-gray-700 dark:text-white/90">
                    <Edit3 className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">
                        {item.essayCount} Soal Essay
                    </span>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-3 text-gray-700 dark:text-white/90">
                    <Clock className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">
                        {item.duration} Menit
                    </span>
                </div>
            </div>

            {/* Detail Button */}
            <button
                onClick={() => onDetailClick?.(item.id)}
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
            >
                Detail Ujian
            </button>
        </div>
    );
};

export default PretestCard;