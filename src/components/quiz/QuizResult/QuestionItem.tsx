import React from "react";

interface QuestionItemProps {
    question: any;
    index: number;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question: q, index }) => {
    return (
        <div className="relative p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Status Benar / Salah */}
            <div
                className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${q.correct
                        ? "bg-purple-100 text-purple-700 border border-purple-300"
                        : "bg-red-100 text-red-600 border border-red-300"
                    }`}
            >
                {q.correct ? "✓ Benar" : "✗ Salah"}
            </div>

            {/* Soal */}
            <p
                className="font-medium text-gray-800 mb-3"
                dangerouslySetInnerHTML={{ __html: `${index + 1}. ${q.question}` }}
            />

            {/* Pilihan */}
            <div className="space-y-2 mt-2">
                {["a", "b", "c", "d", "e"].map((key) => {
                    const value = q[`option_${key}` as keyof typeof q];
                    const isUserAnswer = q.user_answer === `option_${key}`;
                    const isCorrectAnswer = q.correct_answer === `option_${key}`;

                    return (
                        <div
                            key={key}
                            className={`p-2 rounded-md border ${isCorrectAnswer
                                    ? "bg-green-100 border-green-500"
                                    : isUserAnswer
                                        ? "bg-red-100 border-red-500"
                                        : "bg-gray-50 border-gray-200"
                                }`}
                        >
                            <div dangerouslySetInnerHTML={{ __html: String(value ?? "") }} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionItem;


