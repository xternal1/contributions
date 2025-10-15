import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizResult } from "../../../../features/module/quiztes/_service/quiz_service";
import { fetchQuizDetail } from "../../../../features/module/_service/module_service"; // Import service baru
import type { QuizResult, QuizResultResponse } from "../../../../features/module/quiztes/_quiz";
import type { QuizType } from "../../../../features/module/_module";

const QuizResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [result, setResult] = useState<QuizResult | null>(null);
  const [quizDetail, setQuizDetail] = useState<QuizType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Fungsi untuk mendapatkan detail quiz berdasarkan module_slug
  const loadQuizDetail = useCallback(async (moduleSlug: string) => {
    try {
      const detail: QuizType = await fetchQuizDetail(moduleSlug);
      setQuizDetail(detail);
      return detail;
    } catch (error) {
      console.error("Gagal memuat detail quiz:", error);
      return null;
    }
  }, []);

  const loadResult = useCallback(async () => {
    if (!id) {
      setError("ID quiz tidak valid");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response: QuizResultResponse = await fetchQuizResult(id);
      
      if (response.meta.code !== 200) {
        throw new Error(response.meta.message);
      }
      
      setResult(response.data);
      
      // Load detail quiz untuk mendapatkan course_slug dan quiz_slug
      if (response.data.module_slug) {
        await loadQuizDetail(response.data.module_slug);
      }
    } finally {
      setLoading(false);
    }
  }, [id, loadQuizDetail]);

  // Fungsi untuk handle navigasi ke halaman quiz
  const handleNavigateToQuiz = async () => {
    if (!quizDetail) {
      console.error("Detail quiz tidak tersedia");
      return;
    }

    try {
      setIsNavigating(true);
      
      // Navigasi ke route: /course/:courseSlug/quiz/:quizSlug
      navigate(`/course/${quizDetail.course_slug}/quiz/${quizDetail.module_slug}`);
    } catch (error) {
      console.error("Gagal navigasi:", error);
      setError("Gagal melakukan navigasi");
    } finally {
      setIsNavigating(false);
    }
  };

  // Fallback navigation jika quizDetail tidak tersedia
  const handleFallbackNavigation = () => {
    if (result?.module_slug) {
      navigate(`/module/${result.module_slug}`);
    } else {
      navigate(-1); // Kembali ke halaman sebelumnya
    }
  };

  useEffect(() => {
    loadResult();
  }, [loadResult]);

  if (loading)
    return <div className="p-6 text-center text-gray-600">Memuat hasil quiz...</div>;
  if (error)
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Kembali
        </button>
      </div>
    );
  if (!result) 
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">Data hasil quiz tidak ditemukan.</p>
        <button 
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Kembali
        </button>
      </div>
    );

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
            {quizDetail && (
              <>
                <p><strong>Course :</strong> {quizDetail.course_title}</p>
                <p><strong>Module :</strong> {quizDetail.module_title}</p>
              </>
            )}
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

            {/* Tombol Navigasi yang Diupdate */}
            <button
              onClick={quizDetail ? handleNavigateToQuiz : handleFallbackNavigation}
              disabled={isNavigating}
              className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-gray-800 font-medium py-2 rounded border-b-4 border-yellow-700 transition-colors"
            >
              {isNavigating ? "Memuat..." : "Kembali ke Quiz"}
            </button>

            {/* Tombol alternatif untuk kembali ke course */}
            {quizDetail && (
              <button
                onClick={() => navigate(`/course/${quizDetail.course_slug}`)}
                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded transition-colors"
              >
                Kembali ke Course
              </button>
            )}
          </div>
        </div>

        {/* Panel Kanan - Question List */}
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
              <div className="space-y-2 mt-2">
                {["a", "b", "c", "d", "e"].map((key) => {
                  const optionKey = `option_${key}` as keyof typeof q;
                  const value = q[optionKey];
                  const isUserAnswer = q.user_answer === `option_${key}`;
                  const isCorrectAnswer = q.correct_answer === `option_${key}`;

                  if (!value) return null;

                  return (
                    <div
                      key={key}
                      className={`p-3 rounded-md border transition-colors ${
                        isCorrectAnswer
                          ? "bg-green-50 border-green-500 text-green-800"
                          : isUserAnswer && !isCorrectAnswer
                          ? "bg-red-50 border-red-500 text-red-800"
                          : "bg-gray-50 border-gray-200 text-gray-700"
                      }`}
                    >
                      <div className="flex items-start">
                        <span className="font-medium mr-2">{key.toUpperCase()}.</span>
                        <div dangerouslySetInnerHTML={{ __html: String(value) }} />
                      </div>
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