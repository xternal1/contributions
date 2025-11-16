import React from "react";
import type { QuizQuestion } from "../../features/module/quiztes/_quiz";

interface QuestionGridProps {
    questions: QuizQuestion[];
    currentIndex: number;
    answers: Record<string, string>;
    onQuestionClick: (index: number) => void;
}

const QuestionGrid: React.FC<QuestionGridProps> = ({
    questions,
    currentIndex,
    answers,
    onQuestionClick,
}) => {
    return (
        <div className="grid grid-cols-5 gap-2 mb-5">
            {questions.map((q, i) => {
                const isAnswered = !!answers[q.id];
                const isActive = currentIndex === i;

                return (
                    <button
                        key={i}
                        onClick={() => onQuestionClick(i)}
                        className={`border rounded-md w-10 h-10 text-sm font-semibold transition-all duration-200 ${isActive
                                ? "bg-[#8B2CF5] text-white"
                                : isAnswered
                                    ? "bg-[#E9D5FF] text-[#6B21A8] border-[#8B2CF5]"
                                    : "bg-purple-50 hover:bg-purple-100 text-[#6B21A8]"
                            }`}
                    >
                        {i + 1}
                    </button>
                );
            })}
        </div>
    );
};

export default QuestionGrid;