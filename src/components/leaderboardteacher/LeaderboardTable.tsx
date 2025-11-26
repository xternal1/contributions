import React from "react";
import type { LeaderboardEntry } from "@/data/leaderboardData";

interface LeaderboardTableProps {
    data: LeaderboardEntry[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            No
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Nama
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Sekolah
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Kelas
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Jumlah Point
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => (
                        <tr
                            key={entry.id}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1A1A2E] transition-colors"
                        >
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white text-left">
                                {entry.rank}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white text-left">
                                {entry.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
                                {entry.school}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
                                {entry.class}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium text-left">
                                {entry.points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardTable;
