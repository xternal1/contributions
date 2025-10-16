import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  ContentType as OriginalContentType,
  ContentBlock,
  QuizType,
  ModuleTaskType,
  CoursePostTest,
  UserQuizResult
} from "../../../features/module/_module";
import { motion, AnimatePresence } from "framer-motion";

// Simplified types for navigation
type ContentTypeEnum = 'SUBMODULE' | 'QUIZ' | 'TASK' | 'FINAL_AUDIT' | 'OVERVIEW';

interface ActiveContent {
  type: ContentTypeEnum;
  data: SubModuleDetailType | QuizType | ModuleTaskType[] | CoursePostTest | null;
  parsedContent?: OriginalContentType | null;
  userQuizResults?: UserQuizResult[];
}

interface LoadingState {
  modules: boolean;
  content: boolean;
  quizResults: boolean;
}

export default function CourseModulePage() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const courseSlug = params.courseSlug || params.slug || null;

  // Simplified state
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [openModules, setOpenModules] = useState<number[]>(() => {
    const saved = localStorage.getItem('course-open-modules');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeContent, setActiveContent] = useState<ActiveContent>({ 
    type: 'OVERVIEW', 
    data: null 
  });

  const [loading, setLoading] = useState<LoadingState>({
    modules: true,
    content: false,
    quizResults: false
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Refs
  const modulesRef = useRef<ModuleType[]>([]);
  const hasFetchedModulesRef = useRef(false);

  // Effects
  useEffect(() => {
    modulesRef.current = modules;
  }, [modules]);

  useEffect(() => {
    localStorage.setItem('course-open-modules', JSON.stringify(openModules));
  }, [openModules]);

  // Handlers
  const toggleModule = useCallback((idx: number) => {
    setOpenModules(prev => prev.includes(idx) 
      ? prev.filter(i => i !== idx) 
      : [...prev, idx]
    );
  }, []);

  const openModule = useCallback((idx: number) => {
    setOpenModules(prev => prev.includes(idx) ? prev : [...prev, idx]);
  }, []);

  // Content loaders
  const loadContent = useCallback(async (type: ContentTypeEnum, identifier?: string) => {
    if (!identifier && type !== 'FINAL_AUDIT') return;

    setLoading(prev => ({ ...prev, content: true }));
    setErrors({});

    try {
      switch (type) {
        case 'SUBMODULE': {
          const data = await fetchSubModule(identifier!);
          let parsedContent = null;
          try {
            parsedContent = JSON.parse(data.content || "{}") as OriginalContentType;
          } catch {
            // Ignore parse errors
          }
          
          // Find module index for auto-open
          const moduleIndex = modulesRef.current.findIndex(mod => 
            mod.sub_modules.some(sub => sub.slug === identifier)
          );
          if (moduleIndex !== -1) openModule(moduleIndex);

          setActiveContent({
            type: 'SUBMODULE',
            data,
            parsedContent
          });
          break;
        }

        case 'QUIZ': {
          const data = await fetchQuizDetail(identifier!);
          setLoading(prev => ({ ...prev, quizResults: true }));
          
          const userQuizResults = await fetchUserQuizResult(identifier!);
          setLoading(prev => ({ ...prev, quizResults: false }));

          // Find and open parent module
          const moduleIndex = modulesRef.current.findIndex(mod => 
            mod.quizzes.some(quiz => quiz.module_slug === identifier)
          );
          if (moduleIndex !== -1) openModule(moduleIndex);

          setActiveContent({
            type: 'QUIZ',
            data,
            userQuizResults
          });
          break;
        }

        case 'TASK': {
          const data = await fetchModuleTasks(identifier!);
          
          // Find and open parent module
          const moduleIndex = modulesRef.current.findIndex(mod => mod.id === identifier);
          if (moduleIndex !== -1) openModule(moduleIndex);

          setActiveContent({
            type: 'TASK',
            data
          });
          break;
        }

        case 'FINAL_AUDIT': {
          const courseTestId = modulesRef.current[0]?.course?.course_test_id;
          if (!courseTestId) return;
          
          const response = await fetchCoursePostTest(courseTestId);
          setActiveContent({
            type: 'FINAL_AUDIT',
            data: response.course_test
          });
          openModule(-1);
          break;
        }
      }
    } catch (error) {
      console.error(`Failed to load ${type}:`, error);
      setErrors({ [type.toLowerCase()]: `Gagal memuat ${type}` });
    } finally {
      setLoading(prev => ({ ...prev, content: false }));
    }
  }, [openModule]);

  // Navigation handlers
  const handleSidebarClick = useCallback((type: ContentTypeEnum, identifier?: string) => {
    if (!identifier && type !== 'FINAL_AUDIT') return;
    
    const basePath = `/course/${courseSlug}`;
    let url = basePath;
    
    switch (type) {
      case 'SUBMODULE':
        url = `${basePath}/submodule/${identifier}`;
        break;
      case 'QUIZ':
        url = `${basePath}/quiz/${identifier}`;
        break;
      case 'TASK':
        url = `${basePath}/task/${identifier}`;
        break;
      case 'FINAL_AUDIT':
        url = `${basePath}/final-audit`;
        break;
    }
    
    navigate(url);
    loadContent(type, identifier);
  }, [navigate, courseSlug, loadContent]);

  // Initial load
  useEffect(() => {
    if (!courseSlug || hasFetchedModulesRef.current) return;

    const loadInitialData = async () => {
      try {
        const data = await fetchModules(courseSlug);
        setModules(data);
        hasFetchedModulesRef.current = true;

        // Handle initial route
        const path = location.pathname;
        if (path.includes('/submodule/')) {
          handleSidebarClick('SUBMODULE', params.submoduleSlug);
        } else if (path.includes('/quiz/')) {
          handleSidebarClick('QUIZ', params.quizSlug);
        } else if (path.includes('/task/')) {
          handleSidebarClick('TASK', params.moduleId);
        } else if (path.includes('/final-audit')) {
          handleSidebarClick('FINAL_AUDIT');
        }
      } catch (error) {
        console.error("Failed to load modules:", error);
        setErrors({ modules: "Gagal memuat modul" });
      } finally {
        setLoading(prev => ({ ...prev, modules: false }));
      }
    };

    loadInitialData();
  }, [courseSlug, location.pathname, handleSidebarClick, params]);

  return (
    <div className="flex">
      <Sidebar
        modules={modules}
        openModules={openModules}
        activeContent={activeContent}
        loading={loading.modules}
        onToggleModule={toggleModule}
        onItemClick={handleSidebarClick}
      />

      <MainContent
        activeContent={activeContent}
        loading={loading}
        errors={errors}
      />
    </div>
  );
}

// Simplified Sidebar Component
interface SidebarProps {
  modules: ModuleType[];
  openModules: number[];
  activeContent: ActiveContent;
  loading: boolean;
  onToggleModule: (idx: number) => void;
  onItemClick: (type: ContentTypeEnum, identifier?: string) => void;
}

function Sidebar({
  modules,
  openModules,
  activeContent,
  loading,
  onToggleModule,
  onItemClick,
}: SidebarProps) {
  const hasFinalAudit = modules.length > 0 && modules[0].course?.course_test_id;

  const isActive = (type: ContentTypeEnum, identifier?: string): boolean => {
    if (!identifier || activeContent.type !== type) return false;
    
    switch (type) {
      case 'SUBMODULE':
        return (activeContent.data as SubModuleDetailType)?.slug === identifier;
      case 'QUIZ':
        return (activeContent.data as QuizType)?.module_slug === identifier;
      case 'TASK':
        return (activeContent.data as ModuleTaskType[])?.[0]?.module?.id === identifier;
      default:
        return false;
    }
  };

  if (loading) {
    return (
      <aside className="w-80 bg-white h-screen sticky top-0 overflow-y-auto">
        <div className="p-4">Loading modules...</div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-white h-screen sticky top-0 overflow-y-auto scrollbar-hide">
      <div className="pt-4">
        <h2 className="text-left text-base font-bold px-4 py-3 bg-gray-50 border-b border-gray-300">
          Konten Kursus
        </h2>

        <ul className="divide-y divide-gray-200">
          {modules.map((mod, idx) => {
            const isOpen = openModules.includes(idx);

            return (
              <li key={mod.id}>
                <button
                  onClick={() => onToggleModule(idx)}
                  className={`flex justify-between items-center w-full px-5 py-3 text-sm border-b border-gray-200
                    ${isOpen ? "text-purple-600" : "text-gray-800 hover:text-purple-600"}`}
                >
                  <span className="truncate">{mod.title}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <ul className="bg-gray-50">
                        {/* Submodules */}
                        {mod.sub_modules.map((sub) => (
                          <li key={sub.id}>
                            <button
                              onClick={() => onItemClick('SUBMODULE', sub.slug)}
                              className={`flex justify-between items-center w-full px-6 py-2 text-xs
                                ${isActive('SUBMODULE', sub.slug)
                                  ? "text-green-600 font-bold"
                                  : "text-gray-700 hover:bg-purple-50"
                                }`}
                            >
                              <span className="truncate">{sub.title}</span>
                            </button>
                          </li>
                        ))}

                        {/* Tasks */}
                        {mod.module_tasks.length > 0 && (
                          <li>
                            <button
                              onClick={() => onItemClick('TASK', mod.id)}
                              className={`flex justify-between items-center w-full px-6 py-2 text-xs 
                                ${isActive('TASK', mod.id)
                                  ? "font-bold text-green-600"
                                  : "text-gray-700 hover:bg-purple-50"
                                }`}
                            >
                              <span className="truncate">Tugas</span>
                              <span className="text-gray-500">{mod.module_tasks.length} Soal</span>
                            </button>
                          </li>
                        )}

                        {/* Quizzes */}
                        {mod.quizzes.map((quiz) => (
                          <li key={quiz.id}>
                            <button
                              onClick={() => onItemClick('QUIZ', quiz.module_slug)}
                              className={`flex justify-between items-center w-full px-6 py-2 text-xs
                                ${isActive('QUIZ', quiz.module_slug)
                                  ? "text-green-600 font-bold"
                                  : "text-gray-700 hover:bg-purple-50"
                                }`}
                            >
                              <span className="truncate">Quiz</span>
                              <span className="text-gray-500">{quiz.total_question} Soal</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Final Audit */}
        {hasFinalAudit && (
          <li>
            <button
              onClick={() => onToggleModule(-1)}
              className={`flex justify-between items-center w-full px-5 py-3 text-sm border-b border-gray-200
                ${openModules.includes(-1) ? "text-purple-600" : "text-gray-800 hover:text-purple-600"}`}
            >
              <span className="truncate">Final Audit</span>
              {openModules.includes(-1) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence initial={false}>
              {openModules.includes(-1) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <ul className="bg-gray-50">
                    <li>
                      <button
                        onClick={() => onItemClick('FINAL_AUDIT')}
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
      </div>
    </aside>
  );
}

// Simplified MainContent Component
interface MainContentProps {
  activeContent: ActiveContent;
  loading: LoadingState;
  errors: Record<string, string | null>;
}

function MainContent({
  activeContent,
  loading,
  errors,
}: MainContentProps) {
  if (loading.content) {
    return (
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  // Error state
  if (errors.modules) {
    return (
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="text-center text-red-500">{errors.modules}</div>
      </main>
    );
  }

  // Content rendering based on type
  switch (activeContent.type) {
    case 'SUBMODULE':
      return <SubmoduleContent 
        data={activeContent.data as SubModuleDetailType} 
        parsedContent={activeContent.parsedContent} 
      />;
    
    case 'QUIZ':
      return <QuizContent 
        data={activeContent.data as QuizType} 
        userQuizResults={activeContent.userQuizResults}
        loading={loading.quizResults}
        error={errors.quiz}
      />;
    
    case 'TASK':
      return <TaskContent 
        data={activeContent.data as ModuleTaskType[]} 
        error={errors.task}
      />;
    
    case 'FINAL_AUDIT':
      return <FinalAuditContent 
        data={activeContent.data as CoursePostTest} 
        error={errors.final_audit}
      />;
    
    default:
      return <OverviewContent />;
  }
}

// Content Components
interface SubmoduleContentProps {
  data: SubModuleDetailType;
  parsedContent?: OriginalContentType | null;
}

function SubmoduleContent({ data, parsedContent }: SubmoduleContentProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-purple-600 text-white px-10 py-3">
        <h1 className="text-[15px] font-medium text-justify mt-2">{data.course_title}</h1>
      </div>

      <div className="p-6">
        <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-lg text-left font-bold mb-2">{data.title}</h1>
          <p className="text-xs text-left text-gray-600 mb-4 border-b border-gray-300 pb-3">
            {data.sub_title}
          </p>

          <div className="prose prose-sm max-w-none leading-relaxed text-left space-y-4">
            {parsedContent?.blocks?.map((block: ContentBlock) => {
              if (block.type === "paragraph") {
                return <p key={block.id} className="text-sm leading-6" dangerouslySetInnerHTML={{ __html: block.data?.text || "" }} />;
              }
              if (block.type === "list") {
                const ListTag = block.data.style === "ordered" ? "ol" : "ul";
                return (
                  <ListTag key={block.id} className="list-inside space-y-1">
                    {block.data.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ListTag>
                );
              }
              if (block.type === "image") {
                return (
                  <figure key={block.id} className="my-8">
                    <img src={block.data.file.url} alt={block.data.caption || "content"} className="rounded-xl shadow-md mx-auto max-w-md" />
                    {block.data.caption && <figcaption className="text-center text-sm text-gray-500 mt-3">{block.data.caption}</figcaption>}
                  </figure>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

interface QuizContentProps {
  data: QuizType;
  userQuizResults?: UserQuizResult[];
  loading: boolean;
  error: string | null;
}

function QuizContent({ data, userQuizResults, loading, error }: QuizContentProps) {
  const navigate = useNavigate();
  
  const hasUserPassed = userQuizResults?.some((result: UserQuizResult) => 
    result.status === "Lulus" || parseFloat(result.score) >= (data.minimum_score || 0)
  );

  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-purple-600 text-white px-10 py-3">
        <h1 className="text-[15px] font-medium text-justify mt-2">Quiz: {data.module_title}</h1>
      </div>

      <div className="p-6">
        <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-lg text-left font-bold mb-2">Aturan</h1>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="text-sm text-gray-700 mb-6 prose prose-sm max-w-none text-left" dangerouslySetInnerHTML={{ __html: data.rules }} />
              
              <ul className="text-sm text-gray-800 space-y-1 mb-6 text-left">
                <li>Jumlah Soal: {data.total_question}</li>
                <li>Syarat Nilai Kelulusan: {data.minimum_score}</li>
                <li>Durasi Ujian: {data.duration} menit</li>
                <li>Waktu tunggu ujian ulang: {data.retry_delay} menit</li>
              </ul>

              {hasUserPassed ? (
                <div className="mt-10 text-right">
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p className="font-medium">🎉 Selamat! Anda sudah menyelesaikan quiz ini dengan nilai yang memuaskan.</p>
                  </div>
                </div>
              ) : (
                <div className="mt-10 text-right">
                  <button
                    onClick={() => navigate(`/quiz/${data.id}`)}
                    className="px-3 py-2 rounded-full font-semibold font-sans text-[13px] text-white
                      transition-all duration-200 ease-out w-full sm:w-auto text-center
                      bg-purple-600 shadow-[4px_4px_0px_0px_#0B1367]
                      hover:bg-[#FBBF24] hover:text-black hover:shadow-none
                      active:translate-y-0.5"
                  >
                    Mulai Quiz
                  </button>
                </div>
              )}

              {/* Quiz History Table */}
              {userQuizResults && userQuizResults.length > 0 && (
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

              {loading && (
                <div className="mt-8 text-center">
                  <p>Memuat riwayat quiz...</p>
                </div>
              )}

              {error && (
                <div className="mt-8 text-center text-red-500">
                  <p>{error}</p>
                </div>
              )}

              {!loading && userQuizResults && userQuizResults.length === 0 && !error && (
                <div className="mt-8 text-center text-gray-500">
                  <p>Belum ada riwayat quiz</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

interface TaskContentProps {
  data: ModuleTaskType[];
  error: string | null;
}

function TaskContent({ data, error }: TaskContentProps) {
  const navigate = useNavigate();

  const handleDownload = (taskId: string) => {
    console.log("Download task:", taskId);
    // Implement download logic here
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-purple-600 text-white px-10 py-3">
        <h1 className="text-[15px] font-medium text-justify mt-2">
          Tugas {data[0]?.module.title}
        </h1>
      </div>

      <div className="p-6">
        <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-lg font-bold mb-4 text-left">Aturan</h1>

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

          {error ? (
            <p className="text-red-500">{error}</p>
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
                    {data.map((task, idx) => (
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

                            <button
                              className="w-9 h-9 flex items-center justify-center rounded-xl text-white
                                bg-purple-600 shadow-[2px_2px_0px_0px_#0B1367]
                                hover:bg-[#FBBF24] hover:text-black hover:shadow-none
                                active:translate-y-0.5"
                              onClick={() => handleDownload(task.id)}
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
            </>
          )}
        </div>
      </div>
    </main>
  );
}

interface FinalAuditContentProps {
  data: CoursePostTest;
  error: string | null;
}

function FinalAuditContent({ data, error }: FinalAuditContentProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-purple-600 text-white px-10 py-3">
        <h1 className="text-[15px] font-medium text-justify mt-2">Final Audit: {data?.course.title}</h1>
      </div>

      <div className="p-6">
        <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-lg font-bold mb-2">Final Audit: {data?.course.title}</h1>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <ul className="text-sm text-gray-800 space-y-1 mb-6">
                <li>Jumlah Soal: {data?.total_question}</li>
                <li>Durasi Ujian: {data?.duration} menit</li>
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

function OverviewContent() {
  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-purple-100 shadow-md">
          <BookOpen className="w-12 h-12 text-purple-600" />
        </div>

        <h2 className="text-2xl font-bold text-purple-700 mb-2">Semangat Belajar! 🚀</h2>
        <p className="text-gray-600 text-lg max-w-md">
          Pilih modul di sidebar untuk memulai perjalanan belajarmu.
          <span className="font-medium text-purple-600"> Semangat mengerjakan materi! 💪</span>
        </p>
      </div>
    </main>
  );
}