import { useParams, useNavigate } from "react-router-dom";

export default function QuizResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const results = {
    date: "Selasa, 07 Oktober 2025, 11.03.48",
    total: 5,
    correct: 1,
    wrong: 4,
    score: 20,
  };

  const answers = [
    {
      question:
        "Salah satu komponen inti MVC yang berfungsi sebagai penghubung antara request user (view) ke model yang nantinya akan dikembalikan lagi ke view dalam bentuk response disebut...",
      answer: "Controller",
      correct: true,
    },
    {
      question:
        "Bagian yang menyajikan tampilan informasi pengguna merupakan konsep MVC bagian...",
      answer: "Controller",
      correct: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto mt-8 bg-white rounded-xl shadow">
        <div className="bg-purple-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">Test Selesai</h2>
            <p className="text-sm">Selamat anda telah menyelesaikan test</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-bold text-lg mb-3">Hasil Test</h3>
            <p><b>Tanggal Ujian:</b> {results.date}</p>
            <p><b>Jumlah Soal:</b> {results.total} Soal</p>
            <p><b>Soal Benar:</b> {results.correct} Soal</p>
            <p><b>Soal Salah:</b> {results.wrong} Soal</p>
            <p className="mt-2 font-bold text-purple-700 text-xl">
              Nilai Ujian: {results.score}
            </p>

            <button
              onClick={() => navigate(`/quiz/${id}`)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded"
            >
              Maaf Anda Tidak Lulus
            </button>

            <button
              onClick={() => navigate("/")}
              className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold w-full py-2 rounded"
            >
              Selesai
            </button>
          </div>

          <div className="col-span-2 space-y-6">
            {answers.map((a, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 bg-gray-50 relative"
              >
                <p className="font-medium mb-2">
                  {i + 1}. {a.question}
                </p>
                <div
                  className={`absolute top-3 right-3 text-sm font-semibold px-2 py-1 rounded ${
                    a.correct ? "bg-purple-100 text-purple-700" : "bg-red-100 text-red-600"
                  }`}
                >
                  {a.correct ? "Benar" : "Salah"}
                </div>
                <p className="text-gray-700">Jawaban Anda: {a.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
