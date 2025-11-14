import React from "react";

interface NavigationControlsProps {
    currentIndex: number;
    totalQuestions: number;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
    currentIndex,
    totalQuestions,
    onPrevious,
    onNext,
    onSubmit,
    isSubmitting
}) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                {currentIndex > 0 ? (
                    <button
                        onClick={onPrevious}
                        className="px-4 py-2 rounded-full border bg-gray-100 transition-all hover:bg-gray-200"
                    >
                        ← Kembali
                    </button>
                ) : <div />}
            </div>

            <div>
                {currentIndex < totalQuestions - 1 ? (
                    <button
                        onClick={onNext}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white transition-all hover:from-purple-700 hover:to-purple-800"
                    >
                        Selanjutnya →
                    </button>
                ) : (
                    <button
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        className={`px-4 py-2 rounded-full ${isSubmitting
                                ? "bg-yellow-300 cursor-not-allowed"
                                : "bg-yellow-400 hover:bg-yellow-500"
                            } text-white transition-all`}
                    >
                        {isSubmitting ? "Mengirim..." : "Selesai Quiz"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavigationControls;