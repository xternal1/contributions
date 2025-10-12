import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, ChevronDown, ChevronUp, Download } from "lucide-react";
import {
  fetchModules,
  fetchSubModule,
  fetchQuizDetail,
  fetchModuleTasks,
  fetchCoursePostTest,
  fetchUserQuizResult
} from "../../../features/module/_service/module_service";
import type {
  ModuleType,
  SubModuleDetailType,
  ContentType,
  ContentBlock,
  QuizType,
  ModuleTaskType,
  CoursePostTest,
  UserQuizResult
} from "../../../features/module/_module";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseModulePage() {
  const { slug } = useParams<{ slug: string }>();

  /** ================== STATE ================== **/
  const [userQuizResults, setUserQuizResults] = useState<UserQuizResult[]>([]);
  const [loadingUserQuizResults, setLoadingUserQuizResults] = useState(false);
  const [errorUserQuizResults, setErrorUserQuizResults] = useState<string | null>(null);

  const [modules, setModules] = useState<ModuleType[]>([]);
  const [openModules, setOpenModules] = useState<number[]>([]);

  const [activeSub, setActiveSub] = useState<SubModuleDetailType | null>(null);
  const [parsedContent, setParsedContent] = useState<ContentType | null>(null);

  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [tasks, setTasks] = useState<ModuleTaskType[]>([]);
  const [postTest, setPostTest] = useState<CoursePostTest | null>(null);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  /** ================== NAVIGATION STATE ================== */
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number | null>(null);
  const [currentSubModuleIndex, setCurrentSubModuleIndex] = useState<number | null>(null);

  /** ================== LOADING & ERROR STATE ================== */
  const [loadingModules, setLoadingModules] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);

  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [errorQuiz, setErrorQuiz] = useState<string | null>(null);

  const [loadingTask, setLoadingTask] = useState(false);
  const [errorTask, setErrorTask] = useState<string | null>(null);

  const [loadingPostTest, setLoadingPostTest] = useState(false);
  const [errorPostTest, setErrorPostTest] = useState<string | null>(null);

  /** ================== EFFECT: Ambil semua modul ================== */
  useEffect(() => {
    if (!slug) return;
    const loadModules = async () => {
      try {
        const data = await fetchModules(slug);
        setModules(data);
      } catch (err) {
        console.error("❌ Gagal fetch modules:", err);
      } finally {
        setLoadingModules(false);
      }
    };
    loadModules();
  }, [slug]);
  /** ================== NAVIGATION FUNCTIONS ================== */
  const getCurrentIndices = (subSlug: string) => {
    for (let i = 0; i < modules.length; i++) {
      for (let j = 0; j < modules[i].sub_modules.length; j++) {
        if (modules[i].sub_modules[j].slug === subSlug) {
          return { moduleIndex: i, subModuleIndex: j };
        }
      }
    }
    return { moduleIndex: null, subModuleIndex: null };
  };

  const navigateToQuizOrTask = () => {
    if (currentModuleIndex === null) return;
    const currentModule = modules[currentModuleIndex];

    if (currentModule.quizzes.length > 0) {
      loadQuiz(currentModule.quizzes[0].module_slug, currentModule.quizzes[0].id);
    } else if (currentModule.module_tasks.length > 0) {
      loadTask(currentModule.id, currentModule.module_tasks[0].id);
    }
  };

  const navigateToNextModule = () => {
    if (currentModuleIndex === null || currentModuleIndex >= modules.length - 1) return;

    const nextModuleIndex = currentModuleIndex + 1;
    const nextModule = modules[nextModuleIndex];
    toggleModule(nextModuleIndex);

    if (nextModule.sub_modules.length > 0) {
      loadSubmodule(nextModule.sub_modules[0].slug);
    } else if (nextModule.quizzes.length > 0) {
      loadQuiz(nextModule.quizzes[0].module_slug, nextModule.quizzes[0].id);
    } else if (nextModule.module_tasks.length > 0) {
      loadTask(nextModule.id, nextModule.module_tasks[0].id);
    }
  };

  /** ================== HANDLER ================== */

  /** ================== FUNGSI UNTUK AMBIL USER QUIZ RESULTS ================== */
  const loadUserQuizResults = async (quizSlug: string) => {
    setLoadingUserQuizResults(true);
    setErrorUserQuizResults(null);
    try {
      const results = await fetchUserQuizResult(quizSlug);
      setUserQuizResults(results);
    } catch (err) {
      console.error("❌ Gagal fetch user quiz results:", err);
      setErrorUserQuizResults("Gagal memuat riwayat quiz");
      setUserQuizResults([]);
    } finally {
      setLoadingUserQuizResults(false);
    }
  };
  const toggleModule = (idx: number) => {
    setOpenModules((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const loadSubmodule = async (subSlug: string) => {
    setLoadingContent(true);
    try {
      const data = await fetchSubModule(subSlug);
      setActiveSub(data);

      try {
        const parsed: ContentType = JSON.parse(data.content || "{}");
        setParsedContent(parsed);
      } catch (err) {
        console.error("⚠️ Gagal parse content:", err);
        setParsedContent(null);
      }

      const indices = getCurrentIndices(subSlug);
      setCurrentModuleIndex(indices.moduleIndex);
      setCurrentSubModuleIndex(indices.subModuleIndex);

      // Reset state lain
      setActiveTaskId(null);
      setActiveQuizId(null);
      setQuiz(null);
      setTasks([]);
      setPostTest(null);
    } catch (err) {
      console.error("❌ Gagal fetch submodule:", err);
    } finally {
      setLoadingContent(false);
    }
  };

  const loadQuiz = async (quizSlug: string, quizId?: string) => {
    setLoadingQuiz(true);
    try {
      const data = await fetchQuizDetail(quizSlug);
      setQuiz(data);
      setActiveQuizId(quizId ?? null);

      // RESET USER QUIZ RESULTS SEBELUM LOAD YANG BARU
      setUserQuizResults([]);
      setErrorUserQuizResults(null);

      // LOAD USER QUIZ RESULTS DARI ENDPOINT BARU
      await loadUserQuizResults(quizSlug);

      setActiveTaskId(null);
      setActiveSub(null);
      setTasks([]);
      setPostTest(null);
      setErrorQuiz(null);
    } catch (err) {
      console.error("❌ Gagal fetch quiz:", err);
      setErrorQuiz("Gagal memuat quiz");
    } finally {
      setLoadingQuiz(false);
    }
  };

  const loadTask = async (moduleId: string, taskId?: string) => {
    setLoadingTask(true);
    try {
      const data = await fetchModuleTasks(moduleId);
      setTasks(data);
      setActiveTaskId(taskId ?? moduleId);

      setActiveQuizId(null);
      setActiveSub(null);
      setQuiz(null);
      setPostTest(null);
      setErrorTask(null);
    } catch (err) {
      console.error("❌ Gagal fetch tugas:", err);
      setErrorTask("Gagal memuat tugas");
    } finally {
      setLoadingTask(false);
    }
  };

  const loadPostTest = async (courseTestId: string) => {
    setLoadingPostTest(true);
    try {
      const data = await fetchCoursePostTest(courseTestId);
      setPostTest(data.course_test);

      setActiveSub(null);
      setQuiz(null);
      setTasks([]);
      setActiveQuizId(null);
      setErrorPostTest(null);
      setCurrentModuleIndex(-1); // -1 = post test
    } catch (err) {
      console.error("❌ Gagal fetch Final Audit:", err);
      setErrorPostTest("Gagal memuat Final Audit");
    } finally {
      setLoadingPostTest(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        modules={modules}
        openModules={openModules}
        activeSub={activeSub}
        postTest={postTest}
        loadingModules={loadingModules}
        toggleModule={toggleModule}
        loadSubmodule={loadSubmodule}
        loadTask={loadTask}
        loadQuiz={loadQuiz}
        loadPostTest={loadPostTest}
        activeQuizId={activeQuizId}
        activeTaskId={activeTaskId}
        setActiveTaskId={setActiveTaskId}
      />

      {/* Main Content */}
      <MainContent
        activeSub={activeSub}
        parsedContent={parsedContent}
        quiz={quiz}
        tasks={tasks}
        postTest={postTest}
        loadingContent={loadingContent}
        loadingQuiz={loadingQuiz}
        errorQuiz={errorQuiz}
        loadingTask={loadingTask}
        errorTask={errorTask}
        loadingPostTest={loadingPostTest}
        errorPostTest={errorPostTest}
        // TAMBAHKAN PROPS BARU
        userQuizResults={userQuizResults}
        loadingUserQuizResults={loadingUserQuizResults}
        errorUserQuizResults={errorUserQuizResults}
        loadSubmodule={loadSubmodule}
        navigateToQuizOrTask={navigateToQuizOrTask}
        navigateToNextModule={navigateToNextModule}
        currentModuleIndex={currentModuleIndex}
        currentSubModuleIndex={currentSubModuleIndex}
        modules={modules}
      />
    </div>
  );
}
/** ================== SIDEBAR COMPONENT ================== */
type SidebarProps = {
  modules: ModuleType[];
  openModules: number[];
  activeSub: SubModuleDetailType | null;
  postTest: CoursePostTest | null;
  loadingModules: boolean;
  toggleModule: (idx: number) => void;
  loadSubmodule: (subSlug: string) => void;
  loadPostTest: (courseTestId: string) => void;
  loadQuiz: (quizSlug: string, quizId?: string) => void;
  activeQuizId: string | null;
  loadTask: (moduleId: string, taskId?: string) => void;
  activeTaskId: string | null;
  setActiveTaskId: (id: string | null) => void;
};

function Sidebar({
  activeQuizId,
  activeTaskId,
  setActiveTaskId,
  modules,
  openModules,
  activeSub,
  loadingModules,
  toggleModule,
  loadSubmodule,
  loadTask,
  loadQuiz,
  loadPostTest,
}: SidebarProps) {
  // Cek apakah course memiliki Final Audit
  const hasFinalAudit = modules.length > 0 && modules[0].course?.course_test_id;

  return (
    <aside className="w-80 bg-white h-screen sticky top-0 overflow-y-auto scrollbar-hide">
      <div className="pt-4">
        <h2 className="text-left text-base font-bold px-4 py-3 bg-gray-50 border-b border-gray-300">
          Konten Kursus
        </h2>

        {loadingModules ? (
          <p className="px-4">Loading modules...</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {modules.map((mod: ModuleType, idx: number) => {
                const isOpen = openModules.includes(idx);

                return (
                  <li key={mod.id}>
                    {/* Header modul */}
                    <button
                      onClick={() => toggleModule(idx)}
                      className={`flex justify-between items-center w-full px-5 py-3 text-sm font-sans transition-colors border-b border-gray-200
                        ${isOpen ? "text-purple-600" : "text-gray-800 hover:text-purple-600"}`}
                    >
                      <span className="truncate">{mod.title}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {/* Isi modul */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <ul className="bg-gray-50">
                            {/* Submodules */}
                            {mod.sub_modules.map((sub) => {
                              const isActive = activeSub?.id === sub.id;

                              return (
                                <li key={sub.id}>
                                  <button
                                    onClick={() => loadSubmodule(sub.slug)}
                                    className={`flex justify-between items-center w-full px-6 py-2 text-xs
                                      ${isActive
                                        ? "text-green-600 font-bold"
                                        : "text-gray-700 hover:bg-purple-50"
                                      }`}
                                  >
                                    <span className="truncate">{sub.title}</span>
                                  </button>
                                </li>
                              );
                            })}

                            {/* Tugas */}
                            {mod.module_tasks.length > 0 && (
                              <li>
                                <button
                                  onClick={() => {
                                    loadTask(mod.id, mod.module_tasks[0].id);
                                    setActiveTaskId(mod.module_tasks[0].id);
                                  }}
                                  className={`flex justify-between items-center w-full px-6 py-2 text-xs ${activeTaskId === mod.module_tasks[0].id
                                    ? "font-bold text-green-600"
                                    : "text-gray-700 hover:bg-purple-50"
                                    }`}
                                >
                                  <span className="truncate">Tugas</span>
                                  <span className="text-gray-500">{mod.module_tasks.length} Soal</span>
                                </button>
                              </li>
                            )}


                            {/* Quiz */}
                            {mod.quizzes.map((quiz) => {
                              const isActiveQuiz = activeQuizId === quiz.id;

                              return (
                                <li key={quiz.id}>
                                  <button
                                    onClick={() => loadQuiz(quiz.module_slug, quiz.id)}
                                    className={`flex justify-between items-center w-full px-6 py-2 text-xs
          ${isActiveQuiz
                                        ? "text-green-600 font-bold"
                                        : "text-gray-700 hover:bg-purple-50"}`}
                                  >
                                    <span className="truncate">Quiz</span>
                                    <span className="text-gray-500">{quiz.total_question} Soal</span>
                                  </button>
                                </li>
                              );
                            })}

                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            {/* Final Audit / Post Test */}
            {hasFinalAudit && (
              <li>
                <button
                  onClick={() => toggleModule(-1)}
                  className={`flex justify-between items-center w-full px-5 py-3 text-sm font-sans transition-colors border-b border-gray-200
                    ${openModules.includes(-1) ? "text-purple-600" : "text-gray-800 hover:text-purple-600"}`}
                >
                  <span className="truncate">Final Audit</span>
                  {openModules.includes(-1) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {openModules.includes(-1) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="bg-gray-50">
                        <li>
                          <button
                            onClick={() => loadPostTest(modules[0].course.course_test_id!)}
                            className="flex justify-between items-center w-full px-6 py-2 text-xs text-gray-700 hover:bg-purple-50"
                          >
                            <span className="truncate">Tugas Akhir</span>
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )}
          </>
        )}
      </div>
    </aside>
  );
}

/** ================== MAIN CONTENT COMPONENT ================== */
type MainContentProps = {
  activeSub: SubModuleDetailType | null;
  parsedContent: ContentType | null;
  quiz: QuizType | null;
  tasks: ModuleTaskType[];
  postTest: CoursePostTest | null;
  loadingContent: boolean;
  loadingQuiz: boolean;
  errorQuiz: string | null;
  loadingTask: boolean;
  errorTask: string | null;
  loadingPostTest: boolean;
  errorPostTest: string | null;
  // TAMBAHKAN PROPS BARU
  userQuizResults: UserQuizResult[];
  loadingUserQuizResults: boolean;
  errorUserQuizResults: string | null;
  loadSubmodule: (subSlug: string) => void;
  navigateToQuizOrTask: () => void;
  navigateToNextModule: () => void;
  currentModuleIndex: number | null;
  currentSubModuleIndex: number | null;
  modules: ModuleType[];
};

function MainContent({
  activeSub,
  parsedContent,
  quiz,
  tasks,
  postTest,
  loadingContent,
  loadingQuiz,
  errorQuiz,
  loadingTask,
  errorTask,
  loadingPostTest,
  errorPostTest,
  // TAMBAHKAN PARAMETER BARU
  userQuizResults,
  loadingUserQuizResults,
  errorUserQuizResults,
  loadSubmodule,
  navigateToQuizOrTask,
  navigateToNextModule,
  currentModuleIndex,
  currentSubModuleIndex,
  modules,
}: MainContentProps) {
  // ... kode yang lain tetap sama
  const navigate = useNavigate();

  if (loadingContent) {
    return (
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  /** Konten Final Audit */
  if (postTest) {
    return (
      <main className="flex-1 overflow-y-auto bg-gray-100">
        {/* Banner Judul Kursus */}
        <div className="bg-purple-600 text-white px-10 py-3">
          <h1 className="text-[15px] font-medium font-sans text-justify mt-2">
            Final Audit: {postTest.course.title}
          </h1>
        </div>

        <div className="p-6">
          <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-lg font-bold mb-2">
              Final Audit: {postTest.course.title}
            </h1>

            {loadingPostTest ? (
              <p>Loading Final Audit...</p>
            ) : errorPostTest ? (
              <p className="text-red-500">{errorPostTest}</p>
            ) : (
              <>
                <ul className="text-sm text-gray-800 space-y-1 mb-6">
                  <li>Jumlah Soal: {postTest.total_question}</li>
                  <li>Durasi Ujian: {postTest.duration} menit</li>
                </ul>

                <div className="mt-6">
                  <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                    Mulai Final Audit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    );
  }

  /** Konten Submodule */
  if (activeSub) {
    return (
      <main className="flex-1 overflow-y-auto bg-gray-100">
        {/* Banner Judul Kursus */}
        <div className="bg-purple-600 text-white px-10 py-3">
          <h1 className="text-[15px] font-medium font-sans text-justify mt-2">{activeSub.course_title}</h1>
        </div>

        <div className="p-6">
          <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-lg text-left font-bold mb-2">{activeSub.title}</h1>
            <p className="text-xs text-left text-gray-600 mb-4 border-b border-gray-300 pb-3">
              {activeSub.sub_title}
            </p>

            {/* Konten */}
            <div className="prose prose-sm max-w-none leading-relaxed text-left space-y-4">
              {parsedContent?.blocks?.map((block: ContentBlock) => {
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={block.id}
                      className="text-sm leading-6"
                      dangerouslySetInnerHTML={{
                        __html: (block.data && block.data.text) || "",
                      }}
                    />
                  );
                }
                if (block.type === "list") {
                  return block.data.style === "ordered" ? (
                    <ol
                      key={block.id}
                      className="list-decimal list-inside space-y-1"
                    >
                      {block.data.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul
                      key={block.id}
                      className="list-disc list-inside space-y-1"
                    >
                      {block.data.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "image") {
                  return (
                    <figure key={block.id} className="my-8">
                      <img
                        src={block.data.file.url}
                        alt={block.data.caption || "content"}
                        className="rounded-xl shadow-md mx-auto max-w-md"
                      />
                      {block.data.caption && (
                        <figcaption className="text-center text-sm text-gray-500 mt-3">
                          {block.data.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                return null;
              })}
            </div>

            {/* Navigasi */}
            <div className="flex justify-between mt-10">
              {activeSub.prev ? (
                <button
                  onClick={() => loadSubmodule(activeSub.prev!)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  ← Sebelumnya
                </button>
              ) : (
                <span />
              )}

              <div className="flex gap-2">
                {currentModuleIndex !== null && currentSubModuleIndex !== null &&
                  modules[currentModuleIndex].sub_modules.length === currentSubModuleIndex + 1 && (
                    <button
                      onClick={navigateToQuizOrTask}
                      className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                    >
                      selanjutnya
                    </button>
                  )}

                {activeSub.next ? (
                  <button
                    onClick={() => loadSubmodule(activeSub.next!)}
                    className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    Selanjutnya →
                  </button>
                ) : (
                  <span />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /** Konten Quiz */
  if (quiz) {
    return (
      <main className="flex-1 overflow-y-auto bg-gray-100">
        {/* Banner Judul Kursus */}
        <div className="bg-purple-600 text-white px-10 py-3">
          <h1 className="text-[15px] font-medium font-sans text-justify mt-2">
            Quiz: {quiz.module_title}
          </h1>
        </div>

        <div className="p-6">
          <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-lg text-left font-bold mb-2">Aturan</h1>

            {loadingQuiz ? (
              <p>Loading quiz...</p>
            ) : errorQuiz ? (
              <p className="text-red-500">{errorQuiz}</p>
            ) : (
              <>
                {/* Aturan */}
                <div
                  className="text-sm text-gray-700 mb-6 prose prose-sm max-w-none text-left"
                  dangerouslySetInnerHTML={{ __html: quiz.rules }}
                />

                {/* Info tambahan */}
                <ul className="text-sm text-gray-800 space-y-1 mb-6 text-left">
                  <li>Jumlah Soal: {quiz.total_question}</li>
                  <li>Syarat Nilai Kelulusan: {quiz.minimum_score}</li>
                  <li>Durasi Ujian: {quiz.duration} menit</li>
                  <li>Waktu tunggu ujian ulang: {quiz.retry_delay} menit</li>
                </ul>

                <div className="mt-10 text-right">
                  <button
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                    className="px-3 py-2 rounded-full font-semibold font-sans text-[13px] text-white
  transition-all duration-200 ease-out w-full sm:w-auto text-center
  bg-purple-600 shadow-[4px_4px_0px_0px_#0B1367]
  hover:bg-[#FBBF24] hover:text-black hover:shadow-none
  active:translate-y-0.5"
                  >
                    Mulai Quiz
                  </button>

                </div>

                {/* GANTI BAGIAN INI */}
                {userQuizResults.length > 0 && (
                  <div className="mt-8">
                    <div className="overflow-x-auto rounded-lg shadow">
                      <table className="w-full text-sm border border-gray-800 border-separate border-spacing-0 rounded-lg overflow-hidden">
                        <thead className="bg-purple-600 text-white">
                          <tr>
                            <th className="border border-gray-800 px-4 py-2 text-center">Tanggal</th>
                            <th className="border border-gray-800 px-4 py-2 text-center">Nilai</th>
                            <th className="border border-gray-800 px-4 py-2 text-center">Status</th>
                            <th className="border border-gray-800 px-4 py-2 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userQuizResults.map((history) => (
                            <tr key={history.id} className="hover:bg-gray-50">
                              <td className="border border-gray-800 px-4 py-2 text-center">
                                {history.updated}
                              </td>
                              <td className="border border-gray-800 px-4 py-2 text-center">
                                {history.score}
                              </td>
                              <td className="border border-gray-800 px-4 py-2 text-center">
                                {history.status === "Lulus" ? (
                                  <span className="text-green-600 font-semibold">Lulus</span>
                                ) : (
                                  <span className="text-red-500 font-semibold">Tidak Lulus</span>
                                )}
                              </td>
                              <td className="border border-gray-800 px-4 py-2 text-center">
                                <button
                                  onClick={() => navigate(`/quiz-result/${history.id}`)}
                                  className="px-3 py-1 rounded-full font-semibold font-sans text-white
  transition-all duration-200 ease-out text-center
  bg-purple-600 shadow-[3px_3px_0px_0px_#0B1367]
  hover:bg-[#FBBF24] hover:text-black hover:shadow-none
  active:translate-y-0.5"
                                >
                                  Lihat Detail
                                </button>

                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAMBAHKAN LOADING STATE */}
                {loadingUserQuizResults && (
                  <div className="mt-8 text-center">
                    <p>Memuat riwayat quiz...</p>
                  </div>
                )}

                {/* TAMBAHKAN ERROR STATE */}
                {errorUserQuizResults && (
                  <div className="mt-8 text-center text-red-500">
                    <p>{errorUserQuizResults}</p>
                  </div>
                )}

                {/* TAMBAHKAN STATE JIKA TIDAK ADA DATA */}
                {!loadingUserQuizResults && userQuizResults.length === 0 && !errorUserQuizResults && (
                  <div className="mt-8 text-center text-gray-500">
                    <p>Belum ada riwayat quiz</p>
                  </div>
                )}

                {/* Navigasi */}
                <div className="flex justify-between mt-25">
                  <button
                    onClick={() => {
                      // Kembali ke submodul terakhir dari modul ini
                      if (currentModuleIndex !== null) {
                        const module = modules[currentModuleIndex];
                        if (module.sub_modules.length > 0) {
                          loadSubmodule(
                            module.sub_modules[module.sub_modules.length - 1].slug
                          );
                        }
                      }
                    }}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    ← Kembali
                  </button>

                  {/* Tombol untuk lanjut ke modul berikutnya */}
                  <button
                    onClick={navigateToNextModule}
                    className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    selanjutnya
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    );
  }

  /** Konten Tugas */
  if (tasks.length > 0) {
    return (
      <main className="flex-1 overflow-y-auto bg-gray-100">
        {/* Header Ungu */}
        <div className="bg-purple-600 text-white px-10 py-3">
          <h1 className="text-[15px] font-medium font-sans text-justify mt-2">
            Tugas {tasks[0]?.module.title}
          </h1>
        </div>

        <div className="p-6">
          <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-lg font-bold mb-4 text-left">Aturan</h1>

            {/* Aturan Tugas */}
            <div className="mb-7">
              <ul className="list-decimal list-inside text-left text-sm text-gray-700 space-y-2">
                <li>Dikerjakan secara individu</li>
                <li>File yang dikumpulkan berupa .zip, maksimal ukuran 5 MB</li>
                <li>Jangan sampai melebihi deadline yang telah diberikan</li>
                <li>
                  Apabila tugas pada materi ini belum dikumpulkan semua, maka kamu
                  tidak bisa lanjut ke materi berikutnya
                </li>
              </ul>
            </div>

            {loadingTask ? (
              <p>Loading tugas...</p>
            ) : errorTask ? (
              <p className="text-red-500">{errorTask}</p>
            ) : (
              <>
                <div className="overflow-x-auto rounded-lg shadow">
                  <table className="w-full text-sm border border-gray-800 border-separate border-spacing-0 rounded-lg overflow-hidden">
                    <thead className="bg-purple-600 text-white">
                      <tr>
                        <th className="border border-gray-800 px-4 py-2 text-center">No</th>
                        <th className="border border-gray-800 px-4 py-2 text-center">Tugas</th>
                        <th className="border border-gray-800 px-4 py-2 text-center">Status</th>
                        <th className="border border-gray-800 px-4 py-2 text-center">Nilai</th>
                        <th className="border border-gray-800 px-4 py-2 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, idx) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                          <td className="border border-gray-800 px-4 py-2 text-center">{idx + 1}</td>
                          <td className="border border-gray-800 px-4 py-2 font-medium">{task.question}</td>
                          <td className="border border-gray-800 px-4 py-2 text-center">
                            {task.is_finish ? (
                              <span className="text-green-600 font-semibold">Sudah Dikumpulkan</span>
                            ) : (
                              <span className="text-gray-500">Belum</span>
                            )}
                          </td>
                          <td className="border border-gray-800 px-4 py-2 text-center">
                            {task.average_score ?? "-"}
                          </td>
                          <td className="border border-gray-800 px-4 py-2 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {/* Tombol Detail */}
                              <button
                                className="px-4 py-1.5 rounded-xl font-medium font-sans text-white
    transition-all duration-200 ease-out
    bg-purple-600 shadow-[2px_2px_0px_0px_#0B1367]
    hover:bg-[#FBBF24] hover:text-black hover:shadow-none
    active:translate-y-0.5"
                                onClick={() => navigate(`/tasks/${task.module.id}`)}
                              >
                                Detail
                              </button>

                              {/* Tombol Download */}
                              <button
                                className="w-9 h-9 flex items-center justify-center rounded-xl text-white
      bg-purple-600 shadow-[2px_2px_0px_0px_#0B1367]
      hover:bg-[#FBBF24] hover:text-black hover:shadow-none
      active:translate-y-0.5"
                                onClick={() => console.log("Download task:", task.id)}
                              >
                                <Download size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>


                {/* Navigasi */}
                <div className="flex justify-between mt-25">
                  <button
                    onClick={() => {
                      // Kembali ke submodul terakhir dari modul ini
                      if (currentModuleIndex !== null) {
                        const module = modules[currentModuleIndex];
                        if (module.sub_modules.length > 0) {
                          loadSubmodule(module.sub_modules[module.sub_modules.length - 1].slug);
                        }
                      }
                    }}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    ← Kembali
                  </button>

                  {/* Tombol untuk lanjut ke modul berikutnya */}
                  <button
                    onClick={navigateToNextModule}
                    className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    selanjutnya
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    );
  }

  /** Default */
  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        {/* Icon semangat */}
        <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-purple-100 shadow-md">
          <BookOpen className="w-12 h-12 text-purple-600" />
        </div>

        {/* Teks motivasi */}
        <h2 className="text-2xl font-bold text-purple-700 mb-2">
          Semangat Belajar! 🚀
        </h2>
        <p className="text-gray-600 text-lg max-w-md">
          Pilih modul di sidebar untuk memulai perjalanan belajarmu.
          <span className="font-medium text-purple-600"> Semangat mengerjakan materi! 💪</span>
        </p>
      </div>
    </main>
  );

}