import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizResult } from "@features/module/quiztes/_service/quiz_service";
import type { QuizResult, QuizResultResponse } from "@features/module/quiztes/_quiz";
import { ResultHeader, ResultSummary, QuestionsReview } from "@components/quiz/Index";

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
      <ResultHeader />

      {/* Main Content */}
      <div className="bg-white shadow-md w-[95%] md:w-[80%] rounded-b-lg flex flex-col md:flex-row">
        {/* Panel Kiri */}
        <ResultSummary
          result={result}
          date={date}
          onFinish={() => navigate(`/module/${result.module_slug}`)}
        />

        {/* Panel Kanan */}
        <QuestionsReview questions={result.questions} />
      </div>
    </main>
  );
};

export default QuizResultPage;


