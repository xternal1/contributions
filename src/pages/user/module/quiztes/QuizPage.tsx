import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation, QuestionSection, QuizHeader, SuccessModal, QuizSidebar, QuizTopBar } from "../../../../components/quiz/Index";
import { useQuizStore } from "../../../../lib/stores/user/module/useQuizStore";

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Zustand store
  const {
    showSuccessModal,
    quiz,
    questions,
    currentIndex,
    answers,
    userQuizId,
    loading,
    submitting,
    error,
    timeLeft,
    loadQuiz,
    setCurrentIndex,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    decrementTime,
  } = useQuizStore();

  // ===== Fetch Quiz =====
  useEffect(() => {
    if (id) {
      loadQuiz(id);
    }
  }, [id, loadQuiz]);

  // ===== Submit Handler =====
  const handleSubmit = async (autoSubmit = false) => {
    const success = await submitQuiz(autoSubmit);
    if (success) {
      // ✅ Tampilkan modal sukses dulu
      // Tunggu 2 detik sebelum redirect
      setTimeout(() => {
        navigate(`/quiz-result/${userQuizId}`, { replace: true });
      }, 2000);
    }
  };

  // ===== Timer =====
  useEffect(() => {
    if (timeLeft <= 0 || submitting) return;

    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitting, decrementTime]);

  // ===== Watch for timer expiration and auto-submit =====
  useEffect(() => {
    if (timeLeft === 0 && !submitting && userQuizId) {
      handleSubmit(true);
    }
  }, [timeLeft, submitting, userQuizId]);

  // ✅ Format time function
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) return <div className="p-6 text-center">Memuat quiz...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!quiz) return null;

  const currentQuestion = questions[currentIndex];

  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <QuizHeader courseTitle={quiz.course_title} />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row p-6 gap-6 max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="flex-1 bg-white rounded shadow">
          {/* Top Bar */}
          <QuizTopBar
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            timeLeft={timeLeft}
            formatTime={formatTime}
          />

          {/* Question Section */}
          <QuestionSection
            currentIndex={currentIndex}
            currentQuestion={currentQuestion}
            answers={answers}
            onSelectAnswer={selectAnswer}
          />

          {/* Navigation Buttons */}
          <Navigation
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onPrev={prevQuestion}
            onNext={nextQuestion}
            onSubmit={() => handleSubmit(false)}
          />
        </div>

        {/* Right Column */}
        <QuizSidebar
          questions={questions}
          currentIndex={currentIndex}
          answers={answers}
          onQuestionClick={setCurrentIndex}
          onSubmit={() => handleSubmit(false)}
        />
      </div>

      {/* Modal Sukses */}
      <SuccessModal
        show={showSuccessModal}
        onClose={() => navigate(`/quiz-result/${userQuizId}`, { replace: true })}
      />
    </main>
  );
};

export default QuizPage;