import React from "react";

interface QuestionNumberGridProps {
    questions: Array<{ id: string }>;
    currentIndex: number;
    userAnswers: Record<string, string>;
    onQuestionSelect: (index: number) => void;
}

const QuestionNumberGrid: React.FC<QuestionNumberGridProps> = ({
    questions,
    currentIndex,
    userAnswers,
    onQuestionSelect
}) => {
    return (
        <div className="grid grid-cols-5 gap-2 mb-4">
            {questions.map((_, i) => {
                const isActive = currentIndex === i;
                const isAnswered = userAnswers[questions[i].id] !== undefined;
                return (
                    <button
                        key={i}
                        onClick={() => onQuestionSelect(i)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all ${isActive
                                ? "bg-purple-700 text-white shadow-md transform scale-105"
                                : isAnswered
                                    ? "bg-purple-300 text-purple-800 hover:bg-purple-400"
                                    : "border border-purple-700 text-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                            }`}
                    >
                        {i + 1}
                    </button>
                );
            })}
        </div>
    );
};

export default QuestionNumberGrid;