import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizWorking, submitQuizAnswers } from "../../../../features/module/quiztes/_service/quiz_service";
import type {
  QuizWorkingResponse,
  QuizQuestion,
  QuizSubmitRequest,
  QuizData,
} from "../../../../features/module/quiztes/_quiz";

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userQuizId, setUserQuizId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // ===== Fetch Quiz =====
  const loadQuiz = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const firstResponse: QuizWorkingResponse = await fetchQuizWorking(id);
      const allQuestions = [...firstResponse.data.data];
      const totalPages = firstResponse.data.paginate.last_page;

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

  // ===== Submit =====
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
          // ✅ Tampilkan modal sukses dulu
          setShowSuccessModal(true);
          // Tunggu 2 detik sebelum redirect
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

  // ===== Timer =====
  useEffect(() => {
    if (timeLeft <= 0 || submitting) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true); // ✅ sekarang handleSubmit sudah terdefinisi di atas
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitting, handleSubmit]);

  // ✅ Tambahkan fungsi ini
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  const handleSelectAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  if (loading) return <div className="p-6 text-center">Memuat quiz...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!quiz) return null;

  const currentQuestion = questions[currentIndex];

  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <div className="bg-[#8B2CF5] text-white py-3 px-4 font-semibold">
        {quiz.course_title}
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row p-6 gap-6 max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="flex-1 bg-white rounded shadow">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-[#8B2CF5] text-white px-6 py-3 rounded-t">
            <span className="font-bold text-lg">
              {currentIndex + 1} dari {questions.length} soal
            </span>
            <div className="bg-yellow-300 text-[#6B21A8] px-4 py-1 rounded font-semibold text-sm">
              00:{formatTime(timeLeft)} Sisa waktu
            </div>
          </div>

          {/* Question Section */}
          <div className="p-6">
            <p
              className="mb-4 text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: `${currentIndex + 1}. ${currentQuestion.question}`,
              }}
            />


            <div className="space-y-3">
              {(["a", "b", "c", "d", "e"] as const).map((key) => {
                const option = currentQuestion[`option_${key}` as keyof QuizQuestion];
                if (!option) return null;
                return (
                  <label
                    key={key}
                    className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${answers[currentQuestion.id] === key
                        ? "border-[#8B2CF5] bg-purple-50"
                        : "border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={key}
                      checked={answers[currentQuestion.id] === key}
                      onChange={() => handleSelectAnswer(currentQuestion.id, key)}
                      className="text-[#8B2CF5]"
                    />
                    <span dangerouslySetInnerHTML={{ __html: option }} />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center border-t px-6 py-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="text-sm flex items-center gap-1 text-gray-700 hover:text-[#8B2CF5] disabled:opacity-50"
            >
              ← Kembali
            </button>
            <button
              onClick={
                currentIndex === questions.length - 1
                  ? () => handleSubmit(false)
                  : handleNext
              }
              className="bg-[#8B2CF5] hover:bg-[#7A1DE4] text-white px-6 py-2 rounded"
            >
              {currentIndex === questions.length - 1 ? "Selesai" : "Selanjutnya →"}
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-64 bg-white rounded shadow p-5">
          <h3 className="font-bold text-lg mb-3 text-gray-800">Soal Ujian</h3>
          <div className="grid grid-cols-5 gap-2 mb-5">
            {questions.map((q, i) => {
              const isAnswered = !!answers[q.id]; // ✅ sudah dijawab atau belum
              const isActive = currentIndex === i;

              return (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`border rounded-md w-10 h-10 text-sm font-semibold transition-all duration-200
        ${isActive
                      ? "bg-[#8B2CF5] text-white" // 🔹 soal yang sedang dibuka
                      : isAnswered
                        ? "bg-[#E9D5FF] text-[#6B21A8] border-[#8B2CF5]" // 🟣 soal yang sudah dijawab
                        : "bg-purple-50 hover:bg-purple-100 text-[#6B21A8]" // ⚪ belum dijawab
                    }`}
                >
                  {i + 1}
                </button>
              );
            })}

          </div>

          <p className="text-sm text-gray-500 mb-4">
            Anda bisa menyelesaikan ujian ketika waktu ujian sisa 5 menit
          </p>

          <button
            onClick={() => handleSubmit(false)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#6B21A8] font-semibold py-2 rounded"
          >
            Selesai Ujian
          </button>
        </div>
      </div>
      {/* Modal Sukses */}
      {showSuccessModal && (
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
              onClick={() => navigate(`/quiz-result/${userQuizId}`, { replace: true })}
              className="bg-[#8B2CF5] hover:bg-[#7A1DE4] text-white px-6 py-2 rounded font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
};



export default QuizPage;
