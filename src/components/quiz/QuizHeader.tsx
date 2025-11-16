import React from "react";

interface QuizHeaderProps {
    courseTitle: string;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ courseTitle }) => {
    return (
        <div className="bg-[#8B2CF5] text-white py-3 px-4 font-semibold">
            {courseTitle}
        </div>
    );
};

export default QuizHeader;