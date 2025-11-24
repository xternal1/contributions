import React from 'react';
import { HiBookOpen } from 'react-icons/hi';

interface StatCardProps {
    icon?: React.ReactNode;
    count: number;
    label: string;
}

const StatCard: React.FC<StatCardProps> = ({
    icon = <HiBookOpen className="w-6 h-6" />,
    count,
    label
}) => {
    return (
        <div className="bg-white dark:bg-[#0D0D1A] rounded-xl p-6 shadow-lg border border-gray-100 dark:border-[#1A1A2E] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-purple-200 dark:hover:border-purple-800">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    {icon}
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {count}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;