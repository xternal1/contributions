// @/components/journalteacher/AttendanceTable.tsx

import React, { useState } from "react";
import { Check } from "lucide-react";
import { AttendanceRow, type AttendanceStatus } from "./AttendanceRow";
import { type Student } from "@/data/journalData";

interface AttendanceTableProps {
    students: Student[];
    onAttendanceChange?: (studentId: number, status: AttendanceStatus) => void;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
    students,
    onAttendanceChange
}) => {
    const [attendanceMap, setAttendanceMap] = useState<Record<number, AttendanceStatus>>({});
    const [isAllPresent, setIsAllPresent] = useState(false);

    const handleToggleAll = () => {
        const newIsAllPresent = !isAllPresent;
        setIsAllPresent(newIsAllPresent);

        const newAttendanceMap: Record<number, AttendanceStatus> = {};
        students.forEach(student => {
            newAttendanceMap[student.id] = newIsAllPresent ? "hadir" : null;
            onAttendanceChange?.(student.id, newIsAllPresent ? "hadir" : null);
        });
        setAttendanceMap(newAttendanceMap);
    };

    const handleStudentAttendanceChange = (studentId: number, status: AttendanceStatus) => {
        setAttendanceMap(prev => ({
            ...prev,
            [studentId]: status
        }));

        // Check if all students are marked as "hadir"
        const allPresent = students.every(student =>
            student.id === studentId ? status === "hadir" : attendanceMap[student.id] === "hadir"
        );
        setIsAllPresent(allPresent);

        onAttendanceChange?.(studentId, status);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-purple-600 text-white">
                            <th className="px-6 py-4 text-center text-sm font-bold">No</th>
                            <th className="px-6 py-4 text-center text-sm font-bold">Nama Siswa</th>
                            <th className="px-6 py-4 text-center text-sm font-bold">Kelas</th>
                            <th className="px-6 py-4 text-center text-sm font-bold">
                                <div className="flex flex-col items-center gap-1">
                                    <span>Status Kehadiran</span>
                                    <label className="flex items-center gap-2 cursor-pointer font-normal">
                                        <div
                                            onClick={handleToggleAll}
                                            className={`
                                                w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all
                                                ${isAllPresent
                                                    ? 'bg-teal-500 border-teal-500'
                                                    : 'bg-purple-600 border-white hover:bg-purple-500'
                                                }
                                            `}
                                        >
                                            {isAllPresent && (
                                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                            )}
                                        </div>
                                        <span className="text-xs">Hadir Semua</span>
                                    </label>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <AttendanceRow
                                key={student.id}
                                no={index + 1}
                                name={student.name}
                                className={student.class}
                                selectedStatus={attendanceMap[student.id] || null}
                                onStatusChange={(status) => handleStudentAttendanceChange(student.id, status)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceTable;