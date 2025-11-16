import React from "react";
import QuestionItem from "./QuestionItem";

interface QuestionsReviewProps {
    questions: any[];
}

const QuestionsReview: React.FC<QuestionsReviewProps> = ({ questions }) => {
    return (
        <div className="md:w-2/3 p-6 space-y-5 bg-gray-50">
            {questions.map((q, index) => (
                <QuestionItem key={index} question={q} index={index} />
            ))}
        </div>
    );
};

export default QuestionsReview;