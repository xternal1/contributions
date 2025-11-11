import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { fetchQuizResult, checkCourseFinished } from "../../../../features/module/quiztes/_service/quiz_service";
import { fetchQuizDetail } from "../../../../features/module/_service/module_service";
import type { QuizResult, QuizResultResponse } from "../../../../features/module/quiztes/_quiz";
import type { CourseStatusResponse } from "../../../../features/module/quiztes/_quiz";
import type { QuizType } from "../../../../features/module/_module";
import imgBook from "../../../../assets/img/book.png";
import QuizResultSkeleton from "./QuizResultSkeleton";

const QuizResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [result, setResult] = useState<QuizResult | null>(null);
  const [quizDetail, setQuizDetail] = useState<QuizType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [headerMessage, setHeaderMessage] = useState<string>("");
  const [courseTitle, setCourseTitle] = useState<string>("");

  // Ambil detail quiz
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

  // Ambil hasil quiz dan status kelulusan
  const loadResult = useCallback(async () => {
    if (!id) {
      setError("ID quiz tidak valid");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch hasil quiz
      const response: QuizResultResponse = await fetchQuizResult(id);
      if (response.meta.code !== 200) throw new Error(response.meta.message);
      setResult(response.data);

      const courseStatus: CourseStatusResponse = await checkCourseFinished(id);
      const courseFinished = courseStatus?.data?.status === "finished";
      setCourseTitle(courseStatus?.data?.course?.title || "");

      // Tentukan pesan header berdasarkan hasil quiz
      if (response.data.status === "Lulus" || Number(response.data.score) >= 70 || courseFinished) {
        setHeaderMessage("🎉 Selamat, Anda berhasil menyelesaikan quiz!");
      } else {
        setHeaderMessage("😔 Maaf, kamu belum berhasil menyelesaikan quiz");
      }

      // Ambil detail quiz untuk navigasi
      if (response.data.module_slug) {
        await loadQuizDetail(response.data.module_slug);
      }
    } catch (err) {
      console.error("Gagal memuat hasil quiz:", err);
      setError("Gagal memuat hasil quiz.");
    } finally {
      setLoading(false);
    }
  }, [id, loadQuizDetail]);

  // Navigasi ke halaman quiz ulang
  const handleNavigateToQuiz = async () => {
    if (!quizDetail) {
      console.error("Detail quiz tidak tersedia");
      return;
    }

    try {
      setIsNavigating(true);
      navigate(`/course/${quizDetail.course_slug}/quiz/${quizDetail.module_slug}`);
    } catch (error) {
      console.error("Gagal navigasi:", error);
      setError("Gagal melakukan navigasi");
    } finally {
      setIsNavigating(false);
    }
  };

  const handleFallbackNavigation = () => {
    if (result?.module_slug) navigate(`/module/${result.module_slug}`);
    else navigate(-1);
  };

  useEffect(() => {
    loadResult();
  }, [loadResult]);

  if (loading) {
  return <QuizResultSkeleton />;
}

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#141427]">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#141427]">
        <p className="text-xl font-semibold text-gray-700">Data hasil tes tidak ditemukan.</p>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-100 pb-15 dark:bg-[#141427] transition-colors duration-500">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 py-6 px-6">
        <h1 className="text-white font-semibold text-left ml-13 2xl:ml-51 xl:ml-38 lg:ml-23 md:ml-32 sm:ml-15">
          Quiz - {courseTitle || "Tanpa Judul"}
        </h1>
      </div>

      <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md mx-auto mt-8">
        {/* Card Intro */}
        <div className="relative min-h-37 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row items-center md:items-center justify-between">
          <div className="text-left px-5 mb-4 md:mb-0 md:flex-1">
            <h3 className="text-xl font-semibold text-white">
              Test selesai
            </h3>
            <h2 className="text-2xl font-bold text-white">
              {headerMessage || "Selamat anda telah menyelesaikan test"}
            </h2>
            <p className="text-white mt-1 sm:text-base md:text-base">
              Hasil test anda akan tampilan dibawah ini
            </p>
          </div>
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <img
              src={imgBook}
              alt="Ilustrasi Ujian"
              className="w-80 sm:w-80 md:w-60 mx-8 mt-6 md:mt-0 2xl:absolute xl:absolute lg:absolute 2xl:right-2 2xl:-bottom-0 xl:right-2 xl:-bottom-0 lg:right-2 lg:-bottom-0"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-5xl md:max-w-2xl sm:max-w-xl max-w-md mx-auto mt-8 grid grid-cols-1 2xl:grid-cols-[0.7fr_2fr] xl:grid-cols-[0.7fr_2fr] lg:grid-cols-3 items-start gap-6">
          {/* Card Hasil (Kiri) */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 dark:bg-[#0D0D1A] dark:border-2 dark:border-white transition-colors duration-500">
              <h2 className="text-2xl font-semibold mb-4 text-start">Hasil Test</h2>

              <div className="text-sm text-black space-y-4 dark:text-white">
                <div className="text-start">
                  <span className="font-semibold mb-2 block">Tanggal Quiz</span>
                  <p className="text-purple-600 dark:text-purple-500">{date}</p>
                </div>
                <div className="grid grid-cols-[100px_20px_1fr] gap-x-2">
                  <span className="text-black font-semibold text-start dark:text-white">Jumlah Soal</span>
                  <span>:</span>
                  <span className="text-gray-600 text-end dark:text-white">{result.total_question} Soal</span>
                </div>

                <div className="grid grid-cols-[100px_20px_1fr] gap-x-2">
                  <span className="text-black font-semibold text-start dark:text-white">Soal Benar</span>
                  <span>:</span>
                  <span className="text-gray-600 text-end dark:text-white">{result.total_correct} Soal</span>
                </div>

                <div className="grid grid-cols-[100px_20px_1fr] gap-x-2">
                  <span className="text-black font-semibold text-start dark:text-white">Soal Salah</span>
                  <span>:</span>
                  <span className="text-gray-600 text-end dark:text-white">{result.total_fault} Soal</span>
                </div>
              </div>

              {/* Nilai Ujian */}
              <div className="text-center my-7">
                <p className="text-black font-semibold mb-3 dark:text-white">Nilai Quiz</p>
                <p className="text-6xl font-semibold text-purple-600 border-purple-200">{Math.round(Number(result.score))}</p>
              </div>

              {/* Status Lulus/Tidak Lulus */}
              <div className="mb-4">
                {result.status === "Lulus" ? (
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200">
                    Selamat Anda Lulus
                  </button>
                ) : (
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200">
                    Maaf Anda Tidak Lulus
                  </button>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <button
                onClick={quizDetail ? handleNavigateToQuiz : handleFallbackNavigation}
                disabled={isNavigating}
                className="w-full bg-yellow-400 shadow-[4px_4px_0px_0px_#0B1367] hover:bg-purple-600 hover:shadow-none active:translate-y-0.5 transition-all duration-200 ease-out text-white font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isNavigating ? "Memuat..." : "Selesai"}
              </button>
            </div>
          </div>

          {/* Card Hasil Soal (Kanan) */}
          <div className="space-y-6">
            {result.questions.map((q, idx) => {
              const isCorrect = q.correct;
              return (
                <div key={q.question + idx} className="bg-white rounded-lg shadow p-7 dark:bg-[#0D0D1A] dark:border-2 dark:border-white transition-colors duration-500">
                  {/* Header Soal dengan Layout yang Lebih Baik */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                    {/* Soal - Layout diperbaiki untuk teks panjang */}
                    <div className="text-start flex-1 min-w-0">
                      <h3 className="font-semibold flex items-start gap-2">
                        <span className="flex-shrink-0 mt-0.5">{idx + 1}.</span>
                        <span 
                          className="break-words overflow-hidden text-justify leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: q.question }} 
                        />
                      </h3>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-2 rounded-lg py-1 px-3 text-sm font-semibold flex-shrink-0 w-fit sm:w-auto
                                  ${isCorrect ? "bg-purple-100 text-purple-600 dark:bg-purple-950" : "bg-red-100 text-red-600 dark:bg-red-950"}`}
                    >
                      {isCorrect ? (
                        <>
                          <Check className="w-4 h-4 flex-shrink-0" />
                          <span>Benar</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 flex-shrink-0" />
                          <span>Salah</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Pilihan Jawaban dengan Layout yang Lebih Baik */}
                  <div className="mt-4 space-y-3 text-sm">
                    {["option_a", "option_b", "option_c", "option_d", "option_e"].map((opt) => {
                      const optionText = q[opt as keyof typeof q] as string;
                      const isUserAnswer = q.user_answer === opt;

                      if (!optionText) return null;

                      return (
                        <label
                          key={opt}
                          className={`flex items-start space-x-3 p-3 rounded-lg transition-colors duration-200 border
                                  ${isUserAnswer
                                      ? isCorrect
                                        ? "bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-200 font-semibold"
                                        : "bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 font-semibold"
                                      : "text-gray-700 dark:text-white border-gray-200 dark:border-gray-600"
                                  }`}
                        >
                          <input
                            type="radio"
                            disabled
                            checked={isUserAnswer}
                            className={`relative appearance-none w-5 h-5 rounded-full mt-0.5 flex-shrink-0
                                      border-2 border-purple-600 cursor-pointer
                                      transition-all duration-200
                                      before:content-[''] before:absolute before:inset-[3px] 
                                      before:rounded-full before:bg-transparent
                                      checked:before:bg-purple-600
                                      dark:border-purple-500 dark:checked:before:bg-purple-600`}
                          />
                          <span 
                            className="break-words overflow-hidden text-justify leading-relaxed flex-1"
                            dangerouslySetInnerHTML={{ __html: optionText }} 
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;