import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchQuizWorking,
  submitQuizAnswers,
} from "../../../../features/module/quiztes/_service/quiz_service";
import type {
  QuizWorkingResponse,
  QuizQuestion,
  QuizSubmitRequest,
  QuizData,
} from "../../../../features/module/quiztes/_quiz";

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userQuizId, setUserQuizId] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ==========================
  // 🔹 Ambil Data Quiz
  // ==========================
  const loadQuiz = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const firstResponse: QuizWorkingResponse = await fetchQuizWorking(id);
      const totalPages = firstResponse.data.paginate.last_page;

      const allQuestions = [...firstResponse.data.data];
      for (let page = 2; page <= totalPages; page++) {
        const nextResponse: QuizWorkingResponse = await fetchQuizWorking(`${id}?page=${page}`);
        allQuestions.push(...nextResponse.data.data);
      }

      setQuiz(firstResponse.data.quiz);
      setQuestions(allQuestions);
      setUserQuizId(firstResponse.data.user_quiz.id);
      setTimeLeft(firstResponse.data.quiz.duration * 60);
    } catch {
      setError("Gagal memuat quiz.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  // ==========================
  // 🔹 Submit Jawaban
  // ==========================
  const handleSubmit = useCallback(
    async (autoSubmit = false) => {
      if (!userQuizId) return;
      try {
        setSubmitting(true);

        const submitData: QuizSubmitRequest = {
          user_quiz_id: userQuizId,
          answers: questions.map((q) => ({
            quiz_question_id: q.id,
            answer: answers[q.id] || "",
          })),
        };

        const response = await submitQuizAnswers(submitData);
        if (response.success) {
          setShowSuccessModal(true);
          setTimeout(() => {
            navigate(`/quiz-result/${userQuizId}`, { replace: true });
          }, 2000);
        } else {
          alert("Gagal mengirim jawaban quiz.");
        }
      } catch {
        if (!autoSubmit) alert("Terjadi kesalahan saat mengirim jawaban.");
      } finally {
        setSubmitting(false);
      }
    },
    [userQuizId, answers, questions, navigate]
  );

  // ==========================
  // 🔹 Timer
  // ==========================
  useEffect(() => {
    if (timeLeft <= 0 || submitting) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitting, handleSubmit]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#141427]">
        <p className="text-xl font-semibold text-gray-700 dark:text-white">Memuat ujian...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#141427]">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#141427]">
        <p className="text-xl font-semibold text-gray-700">Data ujian tidak ditemukan.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#141427] transition-colors duration-500">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 py-6 px-6">
        <h1 className="text-white font-semibold text-left ml-13 2xl:ml-51 xl:ml-38 lg:ml-23 md:ml-32 sm:ml-15">
          Quiz - {quiz.course_title || "Tanpa Judul"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md mx-auto mt-8">
        {/* Card Intro */}
        <div className="relative min-h-5 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow p-6 mb-6 flex justify-between">
          <div className="text-left px-5 mt-1">
            <h2 className="text-xl font-bold text-white">
              {currentIndex + 1} Dikerjakan dari {questions.length} soal
            </h2>
          </div>
          <div className="text-left px-5">
            <p className="text-purple-700 bg-white py-2 px-4 rounded-lg font-semibold  dark:text-purple-500">
              {formatTime(timeLeft)} Sisa waktu
            </p>
          </div>
        </div>

        {/* Card Exam */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-20">
          <div className="lg:col-span-3 space-y-6">
            {/* Kolom kiri (Soal Ujian) */}
            <div className="bg-white rounded-lg shadow p-8 flex flex-col dark:bg-[#0D0D1A] dark:border-2 dark:border-white">
              <div className="flex items-start gap-2 mb-4">
                <span className="text-gray-800 font-semibold dark:text-white">{currentIndex + 1}.</span>
                <div
                  className="text-gray-800 font-semibold leading-relaxed dark:text-white"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
                />
              </div>

              {/* Opsi Jawaban */}
              <div className="space-y-5 md-5 px-5 mb-5">
                {(["a", "b", "c", "d", "e"] as const).map((key) => {
                  const option = currentQuestion[`option_${key}` as keyof QuizQuestion];
                  if (!option) return null;
                  const isSelected = answers[currentQuestion.id] === key;

                  return (
                    <label
                      key={key}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={key}
                        checked={isSelected}
                        onChange={() => handleSelectAnswer(currentQuestion.id, key)}
                        className={`relative appearance-none w-5 h-5 rounded-full 
                                border-2 border-purple-600 cursor-pointer
                                transition-all duration-200
                                before:content-[''] before:absolute before:inset-[3px] before:w-3
                                before:rounded-full before:bg-transparent
                                checked:before:bg-purple-600
                                hover:shadow-[0_0_10px_2px_rgba(168,85,247,0.6)]
                                dark:border-purple-500 dark:checked:before:bg-purple-600`}
                      />
                      <span
                        className="text-gray-800 dark:text-white"
                        dangerouslySetInnerHTML={{ __html: option }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Navigasi */}
            <div className="bg-white shadow p-3 flex justify-between dark:bg-purple-950">
              {currentIndex > 0 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className={`
        px-4 py-2 rounded-full border font-sans font-semibold text-sm
        transition-all duration-200 ease-in-out
        border-gray-300 bg-gray-100
        hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]
        dark:border-purple-500 dark:bg-purple-700 dark:text-white
        dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
        active:translate-y-0.5
      `}
                >
                  ← Kembali
                </button>
              ) : (
                <div></div>
              )}

              {currentIndex < questions.length - 1 && (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className={`
        px-4 py-2 rounded-full border font-sans font-semibold text-sm
        transition-all duration-200 ease-in-out
        bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white
        hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]
        hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600
        dark:from-purple-600 dark:to-purple-700 dark:border-purple-500
        dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
        active:translate-y-0.5
      `}
                >
                  Selanjutnya →
                </button>
              )}
            </div>

          </div>

          {/* Kolom kanan (Sidebar) */}
          <div className="bg-white rounded-lg shadow p-8 flex flex-col justify-between self-start dark:bg-[#0D0D1A] dark:border-2 dark:border-white">
            <div>
              <h3 className="text-lg text-start font-semibold text-gray-800 mb-2 dark:text-white">Soal Ujian</h3>

              {/* Nomor soal */}
              <div className="grid grid-cols-7 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-10 2xl:gap-2 xl:gap-2 lg:gap-3 mb-6">
                {questions.map((_, i) => {
                  const isActive = currentIndex === i;
                  const isAnswered = answers[questions[i].id] !== undefined;

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 font-semibold
                              ${isActive
                          ? "bg-purple-700 text-white border-purple-700"
                          : isAnswered
                            ? "bg-purple-300 text-white border-purple-700"
                            : "text-purple-700 border-purple-700 hover:text-white hover:bg-purple-700"
                        }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <div>
                <p className="text-xs text-start text-gray-600 mb-5 dark:text-gray-300">
                  Anda bisa menyelesaikan ujian ketika waktu ujian sisa 5 menit
                </p>
              </div>
            </div>

            {/* Tombol selesai ujian */}
            <button
              onClick={() => handleSubmit(false)}
              disabled={submitting}
              className={`
    w-full py-2 rounded-lg font-semibold text-white bg-yellow-400
    shadow-[4px_4px_0px_0px_#0B1367] 
    dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]
    hover:shadow-[2px_2px_0px_0px_#0B1367]
    dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]
    active:translate-y-0.5
    transition-all duration-200 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
            >
              {submitting ? "Mengirim..." : "Selesai Quiz"}
            </button>

          </div>
        </div>
      </div>

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50 transition-colors duration-500">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 text-center max-w-sm w-full transition-colors duration-500">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center transition-colors duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-green-500 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-500">Sukses</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-500">Berhasil mengirim ujian.</p>
            <button
              onClick={() => navigate(`/quiz-result/${userQuizId}`, { replace: true })}
              className="bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;