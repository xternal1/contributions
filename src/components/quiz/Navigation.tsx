import React from "react";

interface NavigationButtonsProps {
    currentIndex: number;
    totalQuestions: number;
    onPrev: () => void;
    onNext: () => void;
    onSubmit: () => void;
}

const Navigation: React.FC<NavigationButtonsProps> = ({
    currentIndex,
    totalQuestions,
    onPrev,
    onNext,
    onSubmit,
}) => {
    return (
        <div className="flex justify-between items-center border-t px-6 py-4">
            <button
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="text-sm flex items-center gap-1 text-gray-700 hover:text-[#8B2CF5] disabled:opacity-50"
            >
                ← Kembali
            </button>
            <button
                onClick={currentIndex === totalQuestions - 1 ? onSubmit : onNext}
                className="bg-[#8B2CF5] hover:bg-[#7A1DE4] text-white px-6 py-2 rounded"
            >
                {currentIndex === totalQuestions - 1 ? "Selesai" : "Selanjutnya →"}
            </button>
        </div>
    );
};

export default Navigation;


