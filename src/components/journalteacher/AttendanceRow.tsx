import React, { useState } from "react";
import { Check } from "lucide-react";

export type AttendanceStatus = "hadir" | "izin" | "sakit" | "alpha" | null;

export interface AttendanceRowProps {
    no: number;
    name: string;
    className: string;
    selectedStatus?: AttendanceStatus;
    onStatusChange?: (status: AttendanceStatus) => void;
}

interface CustomCheckboxProps {
    checked: boolean;
    onChange: () => void;
    label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, label }) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer group">
            <div
                onClick={onChange}
                className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all
                    ${checked
                        ? 'bg-teal-500 border-teal-500'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 group-hover:border-teal-400'
                    }
                `}
            >
                {checked && (
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                )}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300 select-none">{label}</span>
        </label>
    );
};

export const AttendanceRow: React.FC<AttendanceRowProps> = ({
    no,
    name,
    className,
    selectedStatus: externalStatus,
    onStatusChange
}) => {
    const [internalStatus, setInternalStatus] = useState<AttendanceStatus>(null);
    const selectedStatus = externalStatus !== undefined ? externalStatus : internalStatus;

    const handleStatusChange = (status: Exclude<AttendanceStatus, null>) => {
        const newStatus = selectedStatus === status ? null : status;
        if (externalStatus === undefined) {
            setInternalStatus(newStatus);
        }
        onStatusChange?.(newStatus);
    };

    const statuses: Array<{ value: Exclude<AttendanceStatus, null>; label: string }> = [
        { value: "hadir", label: "Hadir" },
        { value: "izin", label: "Izin" },
        { value: "sakit", label: "Sakit" },
        { value: "alpha", label: "Alpha" }
    ];

    return (
        <tr className="border-b border-gray-100 dark:border-gray-700">
            <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">{no}</td>
            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{name}</td>
            <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">{className}</td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-8">
                    {statuses.map(({ value, label }) => (
                        <CustomCheckbox
                            key={value}
                            checked={selectedStatus === value}
                            onChange={() => handleStatusChange(value)}
                            label={label}
                        />
                    ))}
                </div>
            </td>
        </tr>
    );
};

export default AttendanceRow;