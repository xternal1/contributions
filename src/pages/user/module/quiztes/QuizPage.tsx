import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const questions = [
    {
      id: 1,
      question:
        "Didalam Framework Laravel menggunakan struktur MVC, MVC merupakan kepanjangan dari...",
      options: [
        "Model View Controller",
        "Model Value Controller",
        "Modul View Controller",
        "Model View Control",
        "Model View C++",
      ],
    },
    {
      id: 2,
      question:
        "Bagian yang menyajikan tampilan informasi pengguna merupakan konsep MVC bagian...",
      options: ["Model", "View", "Controller", "PHP", "Artisan"],
    },
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      navigate(`/quiz-result/${id}`);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-purple-700 text-white px-6 py-3 text-sm font-semibold">
        Pemrograman Web menggunakan Framework LARAVEL
      </header>

      <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl shadow">
        <div className="flex justify-between items-center px-6 py-3 bg-purple-600 text-white rounded-t-xl">
          <h2 className="font-bold text-lg">
            {currentQuestion} dari {questions.length} soal
          </h2>
          <div className="bg-yellow-300 text-purple-800 px-3 py-1 rounded text-sm font-semibold">
            00.09.49 Sisa waktu
          </div>
        </div>

        <div className="p-6">
          <p className="font-medium mb-4">
            {currentQuestion}. {questions[currentQuestion - 1].question}
          </p>
          <div className="space-y-2">
            {questions[currentQuestion - 1].options.map((opt, idx) => (
              <label
                key={idx}
                className="block border border-gray-200 p-2 rounded-md hover:bg-purple-50 cursor-pointer"
              >
                <input type="radio" name={`q${currentQuestion}`} className="mr-2" />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center px-6 py-3 border-t">
          {currentQuestion > 1 ? (
            <button
              onClick={handleBack}
              className="text-purple-600 font-semibold flex items-center"
            >
              ← Kembali
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleNext}
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            {currentQuestion === questions.length ? "Selesai" : "Selanjutnya →"}
          </button>
        </div>
      </div>

      <aside className="max-w-5xl mx-auto mt-4 flex justify-end">
        <div className="bg-white p-4 shadow rounded-lg w-64">
          <h3 className="font-bold text-lg mb-3">Soal Ujian</h3>
          <div className="flex gap-2 mb-4">
            {questions.map((q) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(q.id)}
                className={`w-8 h-8 rounded border ${
                  currentQuestion === q.id
                    ? "bg-purple-600 text-white"
                    : "border-purple-400"
                }`}
              >
                {q.id}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate(`/quiz-result/${id}`)}
            className="bg-yellow-400 w-full py-2 rounded font-semibold"
          >
            Selesai Ujian
          </button>
        </div>
      </aside>
    </div>
  );
}
