import React from "react";
import { useNavigate } from "react-router-dom";

interface ClassCardProps {
    title: string;
    category: string;
    division: string;
    teacherName: string;
    teacherTitle: string;
    teacherAvatar: string;
    classId?: string;
    onViewClass?: (classId?: string | number) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
    title,
    category,
    division,
    teacherName,
    teacherTitle,
    teacherAvatar,
    classId,
}) => {
    const navigate = useNavigate();

    const handleView = () => {
        if (classId) {
            navigate(`/teacher/class/${classId}`);
        } else {
            navigate("/teacher/classlist");
        }
    };

    return (
        <div className="bg-white dark:bg-[#0D0D1A] rounded-xl p-6 shadow-lg border border-gray-100 dark:border-[#1A1A2E] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-purple-200 dark:hover:border-purple-800">
            {/* Header */}
            <div className="mb-4 text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{category}</p>
            </div>

            {/* Division Badge */}
            <div className="mb-4 text-left">
                <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    {division}
                </span>
            </div>

            {/* Teacher Info & Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={teacherAvatar} alt={teacherName} className="w-10 h-10 rounded-full object-cover" />
                    <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{teacherName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{teacherTitle}</p>
                    </div>
                </div>
                <button
                    onClick={handleView}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                    Lihat Kelas
                </button>
            </div>
        </div>
    );
};

export default ClassCard;
