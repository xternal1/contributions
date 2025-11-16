import React from "react";
import type { QuizResult } from "../../../features/module/quiztes/_quiz";

interface ResultSummaryProps {
    result: QuizResult;
    date: string;
    onFinish: () => void;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ result, date, onFinish }) => {
    return (
        <div className="md:w-1/3 border-r p-6">
            <h3 className="font-semibold text-gray-700 mb-2">Hasil Test</h3>
            <div className="text-sm space-y-1 text-gray-600">
                <p>
                    <strong>Tanggal Ujian</strong><br />
                    <span className="text-blue-600">{date}</span>
                </p>
                <p><strong>Jumlah Soal :</strong> {result.total_question}</p>
                <p><strong>Soal Benar :</strong> {result.total_correct}</p>
                <p><strong>Soal Salah :</strong> {result.total_fault}</p>
            </div>

            <div className="mt-6 text-center">
                <p className="font-semibold text-gray-700">Nilai Ujian</p>
                <p className="text-4xl font-bold text-purple-700 mt-1">{result.score}</p>

                <div className="mt-4 border-t pt-4">
                    {result.status === "Lulus" ? (
                        <button className="w-full bg-green-600 text-white font-medium py-2 rounded">
                            Selamat Anda Lulus
                        </button>
                    ) : (
                        <button className="w-full bg-red-600 text-white font-medium py-2 rounded">
                            Maaf Anda Tidak Lulus
                        </button>
                    )}
                </div>

                <button
                    onClick={onFinish}
                    className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 rounded border-b-4 border-yellow-700"
                >
                    Selesai
                </button>
            </div>
        </div>
    );
};

export default ResultSummary;