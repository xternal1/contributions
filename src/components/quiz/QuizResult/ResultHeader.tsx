import React from "react";

const ResultHeader: React.FC = () => {
    return (
        <div className="bg-purple-700 text-white rounded-t-lg w-[95%] md:w-[80%] p-6 flex items-center justify-between shadow">
            <div>
                <h2 className="text-sm uppercase opacity-80">Test Selesai</h2>
                <h1 className="text-xl font-bold">Selamat anda telah menyelesaikan test</h1>
                <p className="text-xs opacity-90 mt-1">
                    Hasil test anda akan ditampilkan di bawah ini
                </p>
            </div>
            <img
                src="/assets/quiz-result-illustration.svg"
                alt="quiz"
                className="hidden md:block w-40"
            />
        </div>
    );
};

export default ResultHeader;