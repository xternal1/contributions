import React from "react";

interface Question {
    id: string;
    question: string;
    option_a?: string;
    option_b?: string;
    option_c?: string;
    option_d?: string;
    option_e?: string;
}

interface QuestionDisplayProps {
    questionNumber: number;
    question: Question;
    selectedAnswer: string | undefined;
    onAnswerSelect: (questionId: string, option: string) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
    questionNumber,
    question,
    selectedAnswer,
    onAnswerSelect
}) => {
    return (
        <div className="flex items-start gap-2 mb-4">
            <span className="text-gray-800 font-semibold dark:text-white">{questionNumber}.</span>
            <div
                className="text-gray-800 font-semibold leading-relaxed dark:text-white"
                dangerouslySetInnerHTML={{ __html: question.question }}
            />
        </div>
    );
};

export default QuestionDisplay;