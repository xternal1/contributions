import React from "react";

interface Question {
    id: string;
    option_a?: string;
    option_b?: string;
    option_c?: string;
    option_d?: string;
    option_e?: string;
}

interface AnswerOptionsProps {
    question: Question;
    selectedAnswer: string | undefined;
    onAnswerSelect: (questionId: string, option: string) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
    question,
    selectedAnswer,
    onAnswerSelect
}) => {
    return (
        <div className="space-y-5 mb-5">
            {(["a", "b", "c", "d", "e"] as const).map((key) => {
                const option = question[`option_${key}` as keyof typeof question] as string | undefined;
                if (!option) return null;
                const isSelected = selectedAnswer === key;
                return (
                    <label key={key} className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name={question.id}
                            value={key}
                            checked={isSelected}
                            onChange={() => onAnswerSelect(question.id, key)}
                            className="appearance-none w-5 h-5 rounded-full border-2 border-purple-600 checked:bg-purple-600"
                        />
                        <span
                            className="text-gray-800 dark:text-white"
                            dangerouslySetInnerHTML={{ __html: option }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default AnswerOptions;