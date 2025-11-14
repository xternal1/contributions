// src/pages/user/module/quiztes/QuizPage.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuizStore } from "../../../../lib/stores/user/module/useQuizStore";
import QuizHeader from "../../../../components/quiz/QuizHeader";
import QuestionDisplay from "../../../../components/quiz/QuestionDisplay";
import AnswerOptions from "../../../../components/quiz/AnswerOption";
import NavigationControls from "../../../../components/quiz/NavigationControl";
import QuestionNumberGrid from "../../../../components/quiz/QuestionNumberGrid";
import QuizTimer from "../../../../components/quiz/QuizTimer";
import SuccessSubmissionModal from "../../../../components/quiz/SuccessSubmissionModal";

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    quiz,
    questions,
    answers,
    currentIndex,
    userQuizId,
    timeLeft,
    loading,
    submitting,
    error,
    showSuccessModal,
    loadQuiz,
    setCurrentIndex,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    decrementTime,
    setShowSuccessModal,
    resetQuiz,
  } = useQuizStore();

  useEffect(() => {
    if (!id) return;
    loadQuiz(id);
    return () => {
      resetQuiz();
    };
  }, [id, loadQuiz, resetQuiz]);

  // timer: call decrementTime every second
  useEffect(() => {
    if (timeLeft <= 0 || submitting) return;
    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    // Auto submit when time runs out
    if (timeLeft === 0) {
      handleSubmit(true);
    }

    return () => clearInterval(timer);
  }, [timeLeft, submitting, decrementTime]);

  const handleSubmit = async (auto = false) => {
    if (submitting) return;
    const ok = await submitQuiz(auto);
    if (ok) {
      // showSuccessModal already set in store; navigate after small delay
      setTimeout(() => {
        navigate(`/quiz-result/${userQuizId}`, { replace: true });
      }, 2000);
    }
  };

  const handleSelectAnswer = (questionId: string, option: string) => {
    selectAnswer(questionId, option);
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentIndex(index);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
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
      <QuizHeader courseTitle={quiz.course_title || "Tanpa Judul"} />

      {/* Main */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow p-8 dark:bg-[#0D0D1A]">
          <QuestionDisplay
            questionNumber={currentIndex + 1}
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswerSelect={handleSelectAnswer}
          />

          <AnswerOptions
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswerSelect={handleSelectAnswer}
          />

          <NavigationControls
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onPrevious={handlePrevQuestion}
            onNext={handleNextQuestion}
            onSubmit={() => handleSubmit(false)}
            isSubmitting={submitting}
          />
        </div>

        {/* Sidebar kecil bawah (nomor soal + selesai) */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow dark:bg-[#0D0D1A]">
          <QuestionNumberGrid
            questions={questions}
            currentIndex={currentIndex}
            userAnswers={answers}
            onQuestionSelect={handleQuestionSelect}
          />

          <QuizTimer
            timeLeft={timeLeft}
            onSubmit={() => handleSubmit(true)}
            isSubmitting={submitting}
          />
        </div>
      </div>

      {/* Modal sukses */}
      {showSuccessModal && (
        <SuccessSubmissionModal
          userQuizId={userQuizId || ""}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default QuizPage;