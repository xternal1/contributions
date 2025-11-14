import React from "react";

interface QuizTimerProps {
    timeLeft: number;
    onSubmit: () => void;
    isSubmitting: boolean;
}

const QuizTimer: React.FC<QuizTimerProps> = ({
    timeLeft,
    onSubmit,
    isSubmitting
}) => {
    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-gray-600 dark:text-white">
                Sisa waktu: <span className={timeLeft < 60 ? "text-red-500 font-bold" : ""}>{formatTime(timeLeft)}</span>
            </div>
            <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-lg ${isSubmitting
                        ? "bg-yellow-300 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-500"
                    } text-white font-medium transition-all`}
            >
                {isSubmitting ? "Mengirim..." : "Selesai Quiz"}
            </button>
        </div>
    );
};

export default QuizTimer;