import React, { type ReactNode } from 'react';

// Generic Table Types
export interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => ReactNode;
    className?: string;
    headerClassName?: string;
    align?: 'left' | 'center' | 'right';
}

export interface Action<T> {
    icon: ReactNode;
    onClick: (item: T) => void;
    className?: string;
    label?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: Action<T>[];
    emptyMessage?: string;
    keyExtractor: (item: T) => string | number;
    rowClassName?: string;
    headerClassName?: string;
    containerClassName?: string;
}

export function DataTable<T>({
    data,
    columns,
    actions,
    emptyMessage = 'Tidak ada data yang ditemukan',
    keyExtractor,
    rowClassName = 'hover:bg-gray-50 dark:hover:bg-[#0F0F19] transition-colors',
    headerClassName = 'bg-gray-50 dark:bg-[#0F0F19] border-b border-gray-200 dark:border-[#171725]',
    containerClassName = 'overflow-x-auto'
}: DataTableProps<T>) {
    const getAlignment = (align?: 'left' | 'center' | 'right') => {
        switch (align) {
            case 'center': return 'text-center';
            case 'right': return 'text-right';
            default: return 'text-left';
        }
    };

    return (
        <div className={containerClassName}>
            <table className="w-full">
                <thead className={headerClassName}>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white ${getAlignment(column.align)} ${column.headerClassName || ''}`}
                            >
                                {column.header}
                            </th>
                        ))}
                        {actions && actions.length > 0 && (
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                                Aksi
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#171725]">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={keyExtractor(item)} className={rowClassName}>
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`px-6 py-4 ${getAlignment(column.align)} text-gray-700 dark:text-gray-300 ${column.className || ''}`}
                                    >
                                        {column.render
                                            ? column.render(item)
                                            : (item as any)[column.key]
                                        }
                                    </td>
                                ))}
                                {actions && actions.length > 0 && (
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            {actions.map((action, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => action.onClick(item)}
                                                    className={action.className || 'w-8 h-8 rounded-lg bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center transition-colors'}
                                                    aria-label={action.label}
                                                >
                                                    {action.icon}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length + (actions ? 1 : 0)}
                                className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

// ==========================================
// STUDENT TABLE - Using the Reusable Table
// ==========================================

import { useState } from 'react';
import { VscEye } from 'react-icons/vsc';
import { type Student } from '@/data/classData';
import { StudentDetailModal } from '@/components/classteacher/StudentDetailModal';

interface StudentTableProps {
    students: Student[];
}

export const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const handleViewStudent = (student: Student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    const columns: Column<Student>[] = [
        {
            key: 'name',
            header: 'Nama Siswa',
            className: 'px-9',
            headerClassName: 'px-10',
            render: (student) => (
                <div className="flex items-center gap-3">
                    <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {student.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {student.class}
                        </p>
                    </div>
                </div>
            )
        },
        {
            key: 'gender',
            header: 'Jenis Kelamin',
            align: 'left'
        },
        {
            key: 'nisn',
            header: 'NISN',
            align: 'left'
        }
    ];

    const actions: Action<Student>[] = [
        {
            icon: <VscEye size={16} />,
            onClick: handleViewStudent,
            label: 'View student details'
        }
    ];

    return (
        <>
            <DataTable
                data={students}
                columns={columns}
                actions={actions}
                keyExtractor={(student) => student.id}
                emptyMessage="Tidak ada siswa yang ditemukan"
            />

            {selectedStudent && (
                <StudentDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    student={selectedStudent}
                />
            )}
        </>
    );
};
export default StudentTable;