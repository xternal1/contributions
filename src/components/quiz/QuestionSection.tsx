import React from "react";
import type { QuizQuestion } from "../../features/module/quiztes/_quiz";

interface QuestionSectionProps {
    currentIndex: number;
    currentQuestion: QuizQuestion;
    answers: Record<string, string>;
    onSelectAnswer: (questionId: string, option: string) => void;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
    currentIndex,
    currentQuestion,
    answers,
    onSelectAnswer,
}) => {
    return (
        <div className="p-6">
            <p
                className="mb-4 text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{
                    __html: `${currentIndex + 1}. ${currentQuestion.question}`,
                }}
            />

            <div className="space-y-3">
                {(["a", "b", "c", "d", "e"] as const).map((key) => {
                    const option = currentQuestion[`option_${key}` as keyof QuizQuestion];
                    if (!option) return null;
                    return (
                        <label
                            key={key}
                            className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${answers[currentQuestion.id] === key
                                    ? "border-[#8B2CF5] bg-purple-50"
                                    : "border-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name={currentQuestion.id}
                                value={key}
                                checked={answers[currentQuestion.id] === key}
                                onChange={() => onSelectAnswer(currentQuestion.id, key)}
                                className="text-[#8B2CF5]"
                            />
                            <span dangerouslySetInnerHTML={{ __html: option }} />
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionSection;