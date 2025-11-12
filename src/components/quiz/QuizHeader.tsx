import React from "react";

interface QuizHeaderProps {
    courseTitle: string;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ courseTitle }) => {
    return (
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 py-6 px-6">
            <h1 className="text-white font-semibold text-left">Quiz - {courseTitle || "Tanpa Judul"}</h1>
        </div>
    );
};

export default QuizHeader;