import React from "react";

interface SuccessSubmissionModalProps {
    userQuizId: string;
    onClose: () => void;
}

const SuccessSubmissionModal: React.FC<SuccessSubmissionModalProps> = ({
    userQuizId,
    onClose
}) => {
    const navigateToResult = () => {
        window.location.href = `/quiz-result/${userQuizId}`;
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 text-center max-w-sm w-full">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-green-600 font-bold">✓</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Sukses</h2>
                <p className="mb-4 dark:text-gray-300">Berhasil mengirim ujian.</p>
                <button
                    onClick={navigateToResult}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition-all"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default SuccessSubmissionModal;