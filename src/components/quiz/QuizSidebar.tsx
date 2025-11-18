import React from "react";
import type { QuizQuestion } from "../../features/module/quiztes/_quiz";
import QuestionGrid from "./QuestionGrid";

interface QuizSidebarProps {
    questions: QuizQuestion[];
    currentIndex: number;
    answers: Record<string, string>;
    onQuestionClick: (index: number) => void;
    onSubmit: () => void;
}

const QuizSidebar: React.FC<QuizSidebarProps> = ({
    questions,
    currentIndex,
    answers,
    onQuestionClick,
    onSubmit,
}) => {
    return (
        <div className="w-full lg:w-64 bg-white rounded shadow p-5">
            <h3 className="font-bold text-lg mb-3 text-gray-800">Soal Ujian</h3>
            <QuestionGrid
                questions={questions}
                currentIndex={currentIndex}
                answers={answers}
                onQuestionClick={onQuestionClick}
            />

            <p className="text-sm text-gray-500 mb-4">
                Anda bisa menyelesaikan ujian ketika waktu ujian sisa 5 menit
            </p>

            <button
                onClick={onSubmit}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#6B21A8] font-semibold py-2 rounded"
            >
                Selesai Ujian
            </button>
        </div>
    );
};

export default QuizSidebar;


