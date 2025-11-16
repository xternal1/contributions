import React from "react";

interface QuizTopBarProps {
  currentIndex: number;
  totalQuestions: number;
  timeLeft: number;
  formatTime: (seconds: number) => string;
}

const QuizTopBar: React.FC<QuizTopBarProps> = ({
  currentIndex,
  totalQuestions,
  timeLeft,
  formatTime,
}) => {
  return (
    <div className="flex justify-between items-center bg-[#8B2CF5] text-white px-6 py-3 rounded-t">
      <span className="font-bold text-lg">
        {currentIndex + 1} dari {totalQuestions} soal
      </span>
      <div className="bg-yellow-300 text-[#6B21A8] px-4 py-1 rounded font-semibold text-sm">
        00:{formatTime(timeLeft)} Sisa waktu
      </div>
    </div>
  );
};

export default QuizTopBar;


