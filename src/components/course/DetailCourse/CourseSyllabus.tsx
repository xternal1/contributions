import { useState } from "react";
import { ChevronDown, ChevronUp, Trophy, BookOpen } from "lucide-react";
import type { DetailCourse, Module, SubModule, Quiz } from "../../../features/course/_course";

interface CourseSyllabusProps {
  courseData: DetailCourse;
}

export default function CourseSyllabus({ courseData }: CourseSyllabusProps) {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  // Render daftar sub-modul
  const renderSubModules = (subModules: SubModule[] = []) =>
    subModules.length > 0 ? (
      subModules.map((subModule: SubModule, i: number) => (
        <li
          key={`sub-${i}`}
          className="flex items-center gap-3 pl-4 pr-4 py-3 border-b border-gray-200 dark:border-gray-600 last:border-b-0 group bg-gray-50 dark:bg-[#141427] hover:bg-gray-100 dark:hover:bg-[#1a1a2e] transition-colors duration-200"
        >
          <BookOpen size={14} className="text-purple-600 dark:text-purple-400" />
          <span className="flex-1 text-left dark:text-white">{subModule.title || "Tanpa Judul"}</span>
        </li>
      ))
    ) : (
      <li className="pl-4 pr-4 py-3 text-gray-400 dark:text-gray-500 italic">Belum ada sub-modul</li>
    );

  // Render daftar quiz
  const renderQuizzes = (quizzes: Quiz[] = []) =>
    quizzes.length > 0 ? (
      quizzes.map((quiz: Quiz, i: number) => (
        <li
          key={`quiz-${i}`}
          className="relative flex items-start pl-9 pr-4 py-3 border-b border-gray-200 dark:border-gray-600 last:border-b-0 group bg-gray-50 dark:bg-[#141427] hover:bg-gray-100 dark:hover:bg-[#1a1a2e] transition-colors duration-200"
        >
          <span className="absolute left-4 top-4 text-yellow-500">Quiz</span>
          <span className="flex-1 text-right text-yellow-500">
            {quiz.total_question || 0} Soal
          </span>
        </li>
      ))
    ) : (
      <li className="pl-4 pr-4 py-3 text-gray-400 dark:text-gray-500 italic">Belum ada kuis</li>
    );

  return (
    <section className="space-y-5 font-sans">
      {courseData.modules && courseData.modules.length > 0 ? (
        courseData.modules.map((module: Module, index: number) => {
          const isOpen = openModuleIndex === index;

          return (
            <div
              key={index}
              className="bg-gray-100 dark:bg-[#0D0D1A] border border-gray-200 dark:border-white rounded-lg overflow-hidden transition-all hover:shadow-sm"
            >
              {/* Header Modul */}
              <div
                className="flex items-start justify-between p-5 cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <div className="flex gap-4 w-full">
                  {/* Nomor bulat */}
                  <div className="bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>

                  {/* Judul Modul */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-black dark:text-white text-lg text-left">
                          {module.title || "Tanpa Judul"}
                        </h3>

                        {/* Tambahkan subtitle di bawah judul */}
                        {module.sub_title && (
                          <p className="text-gray-500 dark:text-gray-300 text-sm mt-3 text-left">
                            {module.sub_title}
                          </p>
                        )}
                      </div>

                      <button className="text-gray-500 dark:text-white">
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-5 mt-5 text-sm text-gray-500 dark:text-gray-300">
                      {module.sub_module_count > 0 && (
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} className="text-purple-500" />
                          {module.sub_module_count} Modul
                        </span>
                      )}
                      {module.quizz_count > 0 && (
                        <span className="flex items-center gap-1">
                          <Trophy size={12} className="text-yellow-500" />
                          {module.quizz_count} Kuis
                        </span>
                      )}
                      {module.module_task_count > 0 && (
                        <span className="flex items-center gap-1">📝 {module.module_task_count} Tugas</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Konten Expand */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] pb-4 px-5" : "max-h-0"
                  }`}
              >
                <ul className="mt-3 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden text-[13px] text-gray-600 dark:text-gray-300">
                  {renderSubModules(module.sub_modules)}
                  {renderQuizzes(module.quizzes)}
                </ul>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-400 dark:text-gray-500 italic py-10">
          Belum ada modul untuk kursus ini
        </div>
      )}
    </section>
  );
}