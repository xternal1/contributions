import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizResult } from "../../../../features/module/quiztes/_service/quiz_service";
import type { QuizResult, QuizResultResponse } from "../../../../features/module/quiztes/_quiz";

const QuizResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResult = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response: QuizResultResponse = await fetchQuizResult(id);
      setResult(response.data);
    } catch {
      setError("Gagal memuat hasil quiz.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadResult();
  }, [loadResult]);

  if (loading)
    return <div className="p-6 text-center text-gray-600">Memuat hasil quiz...</div>;
  if (error)
    return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!result) return null;

  const date = new Date(result.updated_at).toLocaleString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <main className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      {/* Header */}
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

      {/* Main Content */}
      <div className="bg-white shadow-md w-[95%] md:w-[80%] rounded-b-lg flex flex-col md:flex-row">
        {/* Panel Kiri */}
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
  onClick={() => navigate(`/module/${result.module_slug}`)}
  className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 rounded border-b-4 border-yellow-700"
>
  Selesai
</button>

          </div>
        </div>

        {/* Panel Kanan */}
        <div className="md:w-2/3 p-6 space-y-5 bg-gray-50">
          {result.questions.map((q, index) => (
            <div
              key={index}
              className="relative p-5 rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              {/* Status Benar / Salah */}
              <div
                className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                  q.correct
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
              {/* Pilihan */}
<div className="space-y-2 mt-2">
  {["a", "b", "c", "d", "e"].map((key) => {
    const value = q[`option_${key}` as keyof typeof q];
    const isUserAnswer = q.user_answer === `option_${key}`;
    const isCorrectAnswer = q.correct_answer === `option_${key}`;

    return (
      <div
        key={key}
        className={`p-2 rounded-md border ${
          isCorrectAnswer
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
          ))}
        </div>
      </div>
    </main>
  );
};

export default QuizResultPage;
