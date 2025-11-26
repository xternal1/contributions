import React from "react";
import type { Student } from "@/data/raportData";

interface StudentTableProps {
    students: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Nama Siswa
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                            Nilai
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {students.map(student => (
                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-[#1A1A2E] transition-colors">
                            <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={student.photo}
                                        alt={student.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {student.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
                                            {student.class}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-4 text-right">
                                <span className="text-sm text-gray-900 dark:text-white">
                                    {student.grade ?? "-"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
