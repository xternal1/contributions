import React from "react";

interface SuccessModalProps {
    show: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-sm w-full animate-fade-in">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Sukses</h2>
                <p className="text-gray-600 mb-6">Berhasil mengirim ujian.</p>
                <button
                    onClick={onClose}
                    className="bg-[#8B2CF5] hover:bg-[#7A1DE4] text-white px-6 py-2 rounded font-semibold"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;


