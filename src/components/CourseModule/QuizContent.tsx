import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationControlsComponent from "@/components/CourseModule/NavigationControls";
import type { QuizType, UserQuizResult } from "@features/module/_module";

interface QuizContentProps {
  data: QuizType;
  userQuizResults?: UserQuizResult[];
  error: string | null;
  currentNavIndex: number;
  totalNavItems: number;
  currentSlug?: string | null;
  onNext: () => void;
  onPrevious: () => void;
  onDiscussion: () => void;
}

const QuizContent: React.FC<QuizContentProps> = ({
  data,
  userQuizResults,
  error,
  currentNavIndex,
  totalNavItems,
  currentSlug,
  onNext,
  onPrevious,
  onDiscussion,
}) => {
  const navigate = useNavigate();

  const hasUserPassed = userQuizResults?.some(
    (result) =>
      result.status === "Lulus" ||
      parseFloat(result.score) >= (data.minimum_score || 0)
  );

  const buttonClass = `
    font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
    flex items-center justify-center transition-all duration-300 ease-in-out
    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
    hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]
    active:translate-y-0.5 border
    bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white 
    hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black 
    dark:bg-gradient-to-r dark:from-purple-600 dark:to-purple-700 dark:border-purple-600
    dark:hover:from-yellow-400 dark:hover:to-yellow-500 dark:hover:border-yellow-600 dark:hover:text-black
  `;

  const detailButtonClass = `
    font-sans font-medium text-xs py-1.5 px-3 rounded-full 
    flex items-center justify-center transition-all duration-300 ease-in-out
    shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]
    hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]
    active:translate-y-0.5 border
    bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white 
    hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black 
    dark:bg-gradient-to-r dark:from-purple-600 dark:to-purple-700 dark:border-purple-600
    dark:hover:from-yellow-400 dark:hover:to-yellow-500 dark:hover:border-yellow-600 dark:hover:text-black
    w-fit min-w-[100px]
  `;

  return (
    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 min-h-screen transition-colors duration-500">
      <div className="bg-purple-600 dark:bg-purple-800 text-white px-4 md:px-10 py-3 transition-colors duration-500">
        <h1 className="text-sm md:text-[15px] font-medium text-justify mt-2 line-clamp-2">
          Quiz {data.module_title}
        </h1>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto bg-white dark:bg-gray-900 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-colors duration-500">
          <h1 className="text-base md:text-lg font-bold mb-4 text-left text-purple-700 dark:text-purple-400">
            Aturan Quiz
          </h1>

          {error ? (
            <p className="text-red-500 dark:text-red-400 text-center">{error}</p>
          ) : (
            <>
              <div className="mb-3">
                <ol className="list-decimal list-inside text-left text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  {data.rules
                    ?.split(/\r?\n|<\/p>|<br\s*\/?>/)
                    .filter(
                      (rule) => rule.replace(/<[^>]*>/g, "").trim() !== ""
                    )
                    .map((rule, index) => (
                      <li key={index} className="text-xs md:text-sm">
                        {rule.replace(/<([^>]+)>/gi, "").trim()}
                      </li>
                    ))}
                </ol>
              </div>

              <div className="rounded-lg p-3 mb-6 text-sm text-left bg-gray-50 dark:bg-gray-700 transition-colors duration-500">
                <ul className="space-y-1 md:space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:font-bold text-xs md:text-sm">
                    <span className="font-semibold">Jumlah Soal:</span>{" "}
                    {data.total_question}
                  </li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:font-bold text-xs md:text-sm">
                    <span className="font-semibold">Syarat Nilai Kelulusan:</span>{" "}
                    {data.minimum_score}
                  </li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:font-bold text-xs md:text-sm">
                    <span className="font-semibold">Durasi Ujian:</span>{" "}
                    {data.duration} menit
                  </li>
                  <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:font-bold text-xs md:text-sm">
                    <span className="font-semibold">Waktu Tunggu Ujian Ulang:</span>{" "}
                    {data.retry_delay} menit
                  </li>
                </ul>
              </div>

              {hasUserPassed ? (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-800 dark:text-green-300 px-4 py-3 md:px-5 md:py-4 rounded-lg mb-6 text-sm text-center transition-colors duration-500">
                  🎉 <span className="font-semibold">Selamat!</span> Anda telah
                  menyelesaikan quiz ini dengan nilai yang memuaskan.
                </div>
              ) : (
                <div className="flex justify-end mb-6 md:mb-8">
                  <button
                    onClick={() => navigate(`/quiz/${data.id}`)}
                    className={buttonClass}
                  >
                    Mulai Quiz
                  </button>
                </div>
              )}

              <h2 className="text-left text-base md:text-lg font-bold mb-3 text-purple-700 dark:text-purple-400">
                Hasil Quiz
              </h2>

              {userQuizResults && userQuizResults.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow">
                  <table className="w-full text-xs md:text-sm border border-gray-800 dark:border-gray-500 border-separate border-spacing-0 rounded-lg overflow-hidden">
                    <thead className="bg-purple-600 dark:bg-purple-700 text-white">
                      <tr>
                        <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">
                          Tanggal
                        </th>
                        <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">
                          Nilai
                        </th>
                        <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">
                          Status
                        </th>
                        <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      {userQuizResults.map((history) => (
                        <tr key={history.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                          <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center whitespace-nowrap text-gray-700 dark:text-gray-300">
                            {history.updated}
                          </td>
                          <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">
                            {history.score}
                          </td>
                          <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">
                            {history.status === "Lulus" ? (
                              <span className="text-green-200 border bg-green-700 dark:text-green-100 dark:bg-green-800 px-1 md:px-3 py-1 rounded-md font-semibold">
                                Lulus
                              </span>
                            ) : (
                              <span className="text-red-200 border bg-red-700 dark:text-red-100 dark:bg-red-800 px-1 md:px-3 py-1 rounded-md font-semibold">
                                Tidak Lulus
                              </span>
                            )}
                          </td>
                          <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">
                            <div className="flex justify-center">
                              <button
                                onClick={() =>
                                  navigate(`/quiz-result/${history.id}`)
                                }
                                className={detailButtonClass}
                              >
                                Lihat Detail
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                  Semangat Mengerjakan Quiz, Kamu Pasti Bisa!
                </p>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="bg-gray-100 dark:bg-purple-600 rounded-md p-2">
                  <NavigationControlsComponent
                    currentNavIndex={currentNavIndex}
                    totalNavItems={totalNavItems}
                    currentSlug={currentSlug}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    onDiscussion={onDiscussion}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default QuizContent;
