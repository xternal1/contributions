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
  ContentType,
  ContentBlock,
  QuizType,
  ModuleTaskType,
  CoursePostTest,
  UserQuizResult
} from "../../../features/module/_module";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseModulePage() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  /** ================== DETEKSI ROUTE TYPE YANG STABIL ================== **/
  const getRouteType = useCallback(() => {
    const path = location.pathname;
    
    if (path.includes('/submodule/')) return 'SUBMODULE';
    if (path.includes('/quiz/')) return 'QUIZ';
    if (path.includes('/task/')) return 'TASK';
    if (path.includes('/final-audit')) return 'FINAL_AUDIT';
    if (path.includes('/module/') && params.moduleIndex) return 'MODULE_OVERVIEW';
    return 'LEGACY'; // Route lama /module/:slug
  }, [location.pathname, params.moduleIndex]);

  const [routeType, setRouteType] = useState(getRouteType());

  /** ================== STATE ================== **/
  const [userQuizResults, setUserQuizResults] = useState<UserQuizResult[]>([]);
  const [loadingUserQuizResults, setLoadingUserQuizResults] = useState(false);
  const [errorUserQuizResults, setErrorUserQuizResults] = useState<string | null>(null);

  const [modules, setModules] = useState<ModuleType[]>([]);
  
  // ✅ PERBAIKAN: Gunakan localStorage untuk persist openModules
  const [openModules, setOpenModules] = useState<number[]>(() => {
    // Ambil dari localStorage saat initial render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('course-open-modules');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

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

  // PERBAIKAN: Handle undefined case untuk courseSlug
  const courseSlug = 
    params.courseSlug || 
    (routeType === 'LEGACY' ? params.slug : null) || 
    null;

  /** ================== USE REF UNTUK BREAK CIRCULAR DEPENDENCIES ================== */
  const modulesRef = useRef<ModuleType[]>([]);
  const courseSlugRef = useRef<string | null>(null);
  const hasFetchedModulesRef = useRef(false);

  // Update refs ketika state berubah
  useEffect(() => {
    modulesRef.current = modules;
  }, [modules]);

  useEffect(() => {
    courseSlugRef.current = courseSlug;
  }, [courseSlug]);

  // ✅ PERBAIKAN: Simpan openModules ke localStorage setiap kali berubah
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('course-open-modules', JSON.stringify(openModules));
    }
  }, [openModules]);

  // ✅ Update routeType ketika location berubah
  useEffect(() => {
    setRouteType(getRouteType());
  }, [getRouteType]);

  /** ================== URL GENERATOR FUNCTIONS ================== */
  const generateSubmoduleUrl = useCallback((submoduleSlug: string) => {
    if (!courseSlug) return '#';
    return `/course/${courseSlug}/submodule/${submoduleSlug}`;
  }, [courseSlug]);

  const generateQuizUrl = useCallback((quizSlug: string) => {
    if (!courseSlug) return '#';
    return `/course/${courseSlug}/quiz/${quizSlug}`;
  }, [courseSlug]);

  const generateTaskUrl = useCallback((moduleId: string) => {
    if (!courseSlug) return '#';
    return `/course/${courseSlug}/task/${moduleId}`;
  }, [courseSlug]);

  const generateFinalAuditUrl = useCallback(() => {
    if (!courseSlug) return '#';
    return `/course/${courseSlug}/final-audit`;
  }, [courseSlug]);

  /** ================== HANDLER FUNCTIONS (WRAPPED IN useCallback) ================== */

  const loadUserQuizResults = useCallback(async (quizSlug: string) => {
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
  }, []);

  // ✅ PERBAIKAN: toggleModule dengan auto-open module yang aktif
  const toggleModule = useCallback((idx: number) => {
    setOpenModules((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  }, []);

  // ✅ FUNGSI BARU: Untuk membuka module secara otomatis tanpa toggle
  const openModule = useCallback((idx: number) => {
    setOpenModules((prev) =>
      prev.includes(idx) ? prev : [...prev, idx]
    );
  }, []);

  /** ================== HELPER FUNCTIONS ================== **/
  const findModuleIndexBySubmoduleSlug = useCallback((modulesData: ModuleType[], submoduleSlug: string): number => {
    for (let i = 0; i < modulesData.length; i++) {
      const found = modulesData[i].sub_modules.find(sub => sub.slug === submoduleSlug);
      if (found) return i;
    }
    return -1;
  }, []);

  const findModuleIndexByQuizSlug = useCallback((modulesData: ModuleType[], quizSlug: string): number => {
    for (let i = 0; i < modulesData.length; i++) {
      const found = modulesData[i].quizzes.find(quiz => quiz.module_slug === quizSlug);
      if (found) return i;
    }
    return -1;
  }, []);

  const findModuleIndexById = useCallback((modulesData: ModuleType[], moduleId: string): number => {
    return modulesData.findIndex(module => module.id === moduleId);
  }, []);

  /** ================== PERBAIKI LOADSUBMODULE - HAPUS DEPENDENCY modules ================== */
  const loadSubmodule = useCallback(async (subSlug: string) => {
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

      // Gunakan modulesRef.current daripada modules state
      let moduleIndex: number | null = null;
      let subModuleIndex: number | null = null;
      
      for (let i = 0; i < modulesRef.current.length; i++) {
        for (let j = 0; j < modulesRef.current[i].sub_modules.length; j++) {
          if (modulesRef.current[i].sub_modules[j].slug === subSlug) {
            moduleIndex = i;
            subModuleIndex = j;
            break;
          }
        }
        if (moduleIndex !== null) break;
      }

      setCurrentModuleIndex(moduleIndex);
      setCurrentSubModuleIndex(subModuleIndex);

      // ✅ PERBAIKAN: Auto-open parent module ketika submodule aktif
      if (moduleIndex !== null) {
        openModule(moduleIndex);
      }

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
  }, [openModule]);

  const loadQuiz = useCallback(async (quizSlug: string) => {
    setLoadingQuiz(true);
    try {
      const data = await fetchQuizDetail(quizSlug);
      setQuiz(data);
      setActiveQuizId(data.id ?? null);

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

      // ✅ PERBAIKAN: Auto-open parent module ketika quiz aktif
      const moduleIndex = findModuleIndexByQuizSlug(modulesRef.current, quizSlug);
      if (moduleIndex !== -1) {
        openModule(moduleIndex);
      }
    } catch (err) {
      console.error("❌ Gagal fetch quiz:", err);
      setErrorQuiz("Gagal memuat quiz");
    } finally {
      setLoadingQuiz(false);
    }
  }, [loadUserQuizResults, openModule, findModuleIndexByQuizSlug]); // ✅ TAMBAHKAN findModuleIndexByQuizSlug

  const loadTask = useCallback(async (moduleId: string) => {
    setLoadingTask(true);
    try {
      const data = await fetchModuleTasks(moduleId);
      setTasks(data);
      setActiveTaskId(moduleId);

      setActiveQuizId(null);
      setActiveSub(null);
      setQuiz(null);
      setPostTest(null);
      setErrorTask(null);

      // ✅ PERBAIKAN: Auto-open parent module ketika task aktif
      const moduleIndex = findModuleIndexById(modulesRef.current, moduleId);
      if (moduleIndex !== -1) {
        openModule(moduleIndex);
      }
    } catch (err) {
      console.error("❌ Gagal fetch tugas:", err);
      setErrorTask("Gagal memuat tugas");
    } finally {
      setLoadingTask(false);
    }
  }, [openModule, findModuleIndexById]); // ✅ TAMBAHKAN findModuleIndexById

  /** ================== PERBAIKI LOADPOSTTEST - HAPUS DEPENDENCY modules ================== */
  const loadPostTest = useCallback(async () => {
    const courseTestId = modulesRef.current[0]?.course?.course_test_id;
    if (!courseTestId) return;

    setLoadingPostTest(true);
    try {
      const data = await fetchCoursePostTest(courseTestId);
      setPostTest(data.course_test);

      setActiveSub(null);
      setQuiz(null);
      setTasks([]);
      setActiveQuizId(null);
      setErrorPostTest(null);
      setCurrentModuleIndex(-1);

      // ✅ PERBAIKAN: Auto-open final audit section
      openModule(-1);
    } catch (err) {
      console.error("❌ Gagal fetch Final Audit:", err);
      setErrorPostTest("Gagal memuat Final Audit");
    } finally {
      setLoadingPostTest(false);
    }
  }, [openModule]);

  /** ================== PERBAIKI NAVIGATETOQUIZORTASK - HAPUS DEPENDENCIES ================== */
  const navigateToQuizOrTask = useCallback(() => {
    if (currentModuleIndex === null || !courseSlugRef.current) return;
    
    const currentModule = modulesRef.current[currentModuleIndex];

    if (currentModule.quizzes.length > 0) {
      navigate(`/course/${courseSlugRef.current}/quiz/${currentModule.quizzes[0].module_slug}`);
    } else if (currentModule.module_tasks.length > 0) {
      navigate(`/course/${courseSlugRef.current}/task/${currentModule.id}`);
    }
  }, [currentModuleIndex, navigate]);

  /** ================== HANDLEROUTEAUTONAVIGATION UNTUK INITIAL LOAD ================== */
  const handleRouteAutoNavigation = useCallback((modulesData: ModuleType[]) => {
    if (!modulesData.length) return;

    let submoduleSlug: string | undefined;
    let quizSlug: string | undefined;
    let moduleId: string | undefined;
    let moduleIndex: number;
    let courseTestId: string | undefined;

    switch (routeType) {
      case 'SUBMODULE':
        submoduleSlug = params.submoduleSlug;
        if (submoduleSlug) {
          loadSubmodule(submoduleSlug);
          const foundModuleIndex = findModuleIndexBySubmoduleSlug(modulesData, submoduleSlug);
          if (foundModuleIndex !== -1) {
            openModule(foundModuleIndex); // ✅ Ganti toggleModule dengan openModule
          }
        }
        break;
        
      case 'QUIZ':
        quizSlug = params.quizSlug;
        if (quizSlug) {
          loadQuiz(quizSlug);
          const foundModuleIndex = findModuleIndexByQuizSlug(modulesData, quizSlug);
          if (foundModuleIndex !== -1) {
            openModule(foundModuleIndex); // ✅ Ganti toggleModule dengan openModule
          }
        }
        break;
        
      case 'TASK':
        moduleId = params.moduleId;
        if (moduleId) {
          loadTask(moduleId);
          const foundModuleIndex = findModuleIndexById(modulesData, moduleId);
          if (foundModuleIndex !== -1) {
            openModule(foundModuleIndex); // ✅ Ganti toggleModule dengan openModule
          }
        }
        break;
        
      case 'FINAL_AUDIT':
        courseTestId = modulesData[0]?.course?.course_test_id;
        if (courseTestId) {
          loadPostTest();
          openModule(-1); // ✅ Ganti setOpenModules dengan openModule
        }
        break;
        
      case 'MODULE_OVERVIEW':
        moduleIndex = parseInt(params.moduleIndex || '0');
        if (!isNaN(moduleIndex) && modulesData[moduleIndex]) {
          openModule(moduleIndex); // ✅ Ganti toggleModule dengan openModule
          if (modulesData[moduleIndex].sub_modules.length > 0) {
            loadSubmodule(modulesData[moduleIndex].sub_modules[0].slug);
          }
        }
        break;
        
      case 'LEGACY':
        if (modulesData.length > 0) {
          openModule(0); // ✅ Ganti toggleModule dengan openModule
          if (modulesData[0].sub_modules.length > 0) {
            loadSubmodule(modulesData[0].sub_modules[0].slug);
          }
        }
        break;
    }
  }, [
    routeType, 
    params.submoduleSlug, 
    params.quizSlug, 
    params.moduleId, 
    params.moduleIndex,
    findModuleIndexBySubmoduleSlug,
    findModuleIndexByQuizSlug,
    findModuleIndexById,
    loadSubmodule,
    loadQuiz,
    loadTask,
    loadPostTest,
    openModule // ✅ Ganti toggleModule dengan openModule
  ]);

  /** ================== EFFECT: AMBIL MODULES HANYA SEKALI ================== */
  useEffect(() => {
    if (!courseSlug || hasFetchedModulesRef.current) return;
    
    const loadModules = async () => {
      try {
        const data = await fetchModules(courseSlug);
        setModules(data);
        hasFetchedModulesRef.current = true;
        
        handleRouteAutoNavigation(data);
      } catch (err) {
        console.error("❌ Gagal fetch modules:", err);
      } finally {
        setLoadingModules(false);
      }
    };
    
    loadModules();
  }, [courseSlug, handleRouteAutoNavigation]);

  /** ================== EFFECT: HANDLE ROUTE CHANGES UNTUK NAVIGASI KONTEN ================== */
  const handleRouteNavigation = useCallback(() => {
    if (modules.length === 0) return;
    
    const path = location.pathname;
    
    if (path.includes('/submodule/')) {
      const subSlug = params.submoduleSlug;
      if (subSlug) {
        loadSubmodule(subSlug);
        const foundModuleIndex = findModuleIndexBySubmoduleSlug(modules, subSlug);
        if (foundModuleIndex !== -1) {
          openModule(foundModuleIndex); // ✅ Ganti toggleModule dengan openModule
        }
      }
    } else if (path.includes('/quiz/')) {
      const quizSlug = params.quizSlug;
      if (quizSlug) {
        loadQuiz(quizSlug);
        const foundModuleIndex = findModuleIndexByQuizSlug(modules, quizSlug);
        if (foundModuleIndex !== -1) {
          openModule(foundModuleIndex); // ✅ Ganti toggleModule dengan openModule
        }
      }
    } else if (path.includes('/task/')) {
      const moduleId = params.moduleId;
      if (moduleId) {
        loadTask(moduleId);
        const foundModuleIndex = findModuleIndexById(modules, moduleId);
        if (foundModuleIndex !== -1) {
          openModule(foundModuleIndex); // ✅ Ganti toggleModule dengan openModule
        }
      }
    } else if (path.includes('/final-audit')) {
      loadPostTest();
      openModule(-1); // ✅ Ganti setOpenModules dengan openModule
    } else if (path.includes('/module/') && params.moduleIndex) {
      const index = parseInt(params.moduleIndex || '0');
      if (!isNaN(index) && modules[index]) {
        openModule(index); // ✅ Ganti toggleModule dengan openModule
        const firstSub = modules[index]?.sub_modules[0];
        if (firstSub) loadSubmodule(firstSub.slug);
      }
    } else if (routeType === 'LEGACY' && modules.length > 0) {
      openModule(0); // ✅ Ganti toggleModule dengan openModule
      if (modules[0].sub_modules.length > 0) {
        loadSubmodule(modules[0].sub_modules[0].slug);
      }
    }
  }, [
    location.pathname,
    modules,
    params.submoduleSlug,
    params.quizSlug,
    params.moduleId,
    params.moduleIndex,
    routeType,
    findModuleIndexBySubmoduleSlug,
    findModuleIndexByQuizSlug,
    findModuleIndexById,
    loadSubmodule,
    loadQuiz,
    loadTask,
    loadPostTest,
    openModule // ✅ Ganti toggleModule dengan openModule
  ]);

  useEffect(() => {
    handleRouteNavigation();
  }, [handleRouteNavigation]);

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
        activeQuizId={activeQuizId}
        activeTaskId={activeTaskId}
        setActiveTaskId={setActiveTaskId}
        generateSubmoduleUrl={generateSubmoduleUrl}
        generateQuizUrl={generateQuizUrl}
        generateTaskUrl={generateTaskUrl}
        generateFinalAuditUrl={generateFinalAuditUrl}
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
        userQuizResults={userQuizResults}
        loadingUserQuizResults={loadingUserQuizResults}
        errorUserQuizResults={errorUserQuizResults}
        navigateToQuizOrTask={navigateToQuizOrTask}
        currentModuleIndex={currentModuleIndex}
        currentSubModuleIndex={currentSubModuleIndex}
        modules={modules}
        generateSubmoduleUrl={generateSubmoduleUrl}
        generateFinalAuditUrl={generateFinalAuditUrl}
      />
    </div>
  );
}
/** ================== UPDATED SIDEBAR COMPONENT ================== */
type SidebarProps = {
  modules: ModuleType[];
  openModules: number[];
  activeSub: SubModuleDetailType | null;
  postTest: CoursePostTest | null;
  loadingModules: boolean;
  toggleModule: (idx: number) => void;
  activeQuizId: string | null;
  activeTaskId: string | null;
  setActiveTaskId: (id: string | null) => void;
  generateSubmoduleUrl: (subSlug: string) => string;
  generateQuizUrl: (quizSlug: string) => string;
  generateTaskUrl: (moduleId: string) => string;
  generateFinalAuditUrl: () => string;
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
  generateSubmoduleUrl,
  generateQuizUrl,
  generateTaskUrl,
  generateFinalAuditUrl,
}: SidebarProps) {
  const navigate = useNavigate();
  
  const hasFinalAudit = modules.length > 0 && modules[0].course?.course_test_id;

  const handleSubmoduleClick = (subSlug: string) => {
    navigate(generateSubmoduleUrl(subSlug));
  };

  const handleQuizClick = (quizSlug: string) => {
    navigate(generateQuizUrl(quizSlug));
  };

  const handleTaskClick = (moduleId: string) => {
    navigate(generateTaskUrl(moduleId));
  };

  const handleFinalAuditClick = () => {
    navigate(generateFinalAuditUrl());
  };

  const handleModuleClick = (idx: number) => {
    toggleModule(idx);
  };

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
                    <button
                      onClick={() => handleModuleClick(idx)}
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
                            {mod.sub_modules.map((sub) => {
                              const isActive = activeSub?.id === sub.id;

                              return (
                                <li key={sub.id}>
                                  <button
                                    onClick={() => handleSubmoduleClick(sub.slug)}
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

                            {mod.module_tasks.length > 0 && (
                              <li>
                                <button
                                  onClick={() => {
                                    handleTaskClick(mod.id);
                                    setActiveTaskId(mod.id);
                                  }}
                                  className={`flex justify-between items-center w-full px-6 py-2 text-xs ${activeTaskId === mod.id
                                    ? "font-bold text-green-600"
                                    : "text-gray-700 hover:bg-purple-50"
                                    }`}
                                >
                                  <span className="truncate">Tugas</span>
                                  <span className="text-gray-500">{mod.module_tasks.length} Soal</span>
                                </button>
                              </li>
                            )}

                            {mod.quizzes.map((quiz) => {
                              const isActiveQuiz = activeQuizId === quiz.id;

                              return (
                                <li key={quiz.id}>
                                  <button
                                    onClick={() => handleQuizClick(quiz.module_slug)}
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
                            onClick={handleFinalAuditClick}
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

/** ================== UPDATED MAIN CONTENT COMPONENT ================== */
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
  userQuizResults: UserQuizResult[];
  loadingUserQuizResults: boolean;
  errorUserQuizResults: string | null;
  navigateToQuizOrTask: () => void;
  currentModuleIndex: number | null;
  currentSubModuleIndex: number | null;
  modules: ModuleType[];
  generateSubmoduleUrl: (subSlug: string) => string;
  generateFinalAuditUrl: () => string;
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
  userQuizResults,
  loadingUserQuizResults,
  errorUserQuizResults,
  navigateToQuizOrTask,
  currentModuleIndex,
  currentSubModuleIndex,
  modules,
  generateSubmoduleUrl,
  generateFinalAuditUrl,
}: MainContentProps) {
  const navigate = useNavigate();

  const handleNextSubmodule = () => {
    if (activeSub?.next) {
      navigate(generateSubmoduleUrl(activeSub.next));
    }
  };

  const handlePrevSubmodule = () => {
    if (activeSub?.prev) {
      navigate(generateSubmoduleUrl(activeSub.prev));
    }
  };

  const handleBackToLastSubmodule = () => {
    if (currentModuleIndex !== null) {
      const module = modules[currentModuleIndex];
      if (module.sub_modules.length > 0) {
        const lastSubmodule = module.sub_modules[module.sub_modules.length - 1];
        navigate(generateSubmoduleUrl(lastSubmodule.slug));
      }
    }
  };

  const handleNavigateToNextModule = () => {
    if (currentModuleIndex !== null && currentModuleIndex < modules.length - 1) {
      // Navigasi ke submodule pertama dari modul berikutnya
      const nextModule = modules[currentModuleIndex + 1];
      if (nextModule.sub_modules.length > 0) {
        navigate(generateSubmoduleUrl(nextModule.sub_modules[0].slug));
      }
    } else if (currentModuleIndex === modules.length - 1) {
      navigate(generateFinalAuditUrl());
    }
  };

  if (loadingContent) {
    return (
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  if (postTest) {
    return (
      <main className="flex-1 overflow-y-auto bg-gray-100">
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

  if (activeSub) {
    return (
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="bg-purple-600 text-white px-10 py-3">
          <h1 className="text-[15px] font-medium font-sans text-justify mt-2">{activeSub.course_title}</h1>
        </div>

        <div className="p-6">
          <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-lg text-left font-bold mb-2">{activeSub.title}</h1>
            <p className="text-xs text-left text-gray-600 mb-4 border-b border-gray-300 pb-3">
              {activeSub.sub_title}
            </p>

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

            <div className="flex justify-between mt-10">
              {activeSub.prev ? (
                <button
                  onClick={handlePrevSubmodule}
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
                      Selanjutnya
                    </button>
                  )}

                {activeSub.next ? (
                  <button
                    onClick={handleNextSubmodule}
                    className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    Selanjutnya →
                  </button>
                ) : (
                  currentModuleIndex !== null && 
                  currentSubModuleIndex !== null &&
                  modules[currentModuleIndex].sub_modules.length === currentSubModuleIndex + 1 && (
                    <button
                      onClick={handleNavigateToNextModule}
                      className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                    >
                      Lanjut ke Modul Berikutnya →
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (quiz) {
    return (
      <main className="flex-1 overflow-y-auto bg-gray-100">
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
                <div
                  className="text-sm text-gray-700 mb-6 prose prose-sm max-w-none text-left"
                  dangerouslySetInnerHTML={{ __html: quiz.rules }}
                />

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

                {loadingUserQuizResults && (
                  <div className="mt-8 text-center">
                    <p>Memuat riwayat quiz...</p>
                  </div>
                )}

                {errorUserQuizResults && (
                  <div className="mt-8 text-center text-red-500">
                    <p>{errorUserQuizResults}</p>
                  </div>
                )}

                {!loadingUserQuizResults && userQuizResults.length === 0 && !errorUserQuizResults && (
                  <div className="mt-8 text-center text-gray-500">
                    <p>Belum ada riwayat quiz</p>
                  </div>
                )}

                <div className="flex justify-between mt-25">
                  <button
                    onClick={handleBackToLastSubmodule}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    ← Kembali
                  </button>

                  <button
                    onClick={handleNavigateToNextModule}
                    className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    Lanjut ke Modul Berikutnya
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (tasks.length > 0) {
    return (
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="bg-purple-600 text-white px-10 py-3">
          <h1 className="text-[15px] font-medium font-sans text-justify mt-2">
            Tugas {tasks[0]?.module.title}
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

                <div className="flex justify-between mt-25">
                  <button
                    onClick={handleBackToLastSubmodule}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    ← Kembali
                  </button>

                  <button
                    onClick={handleNavigateToNextModule}
                    className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    Lanjut ke Modul Berikutnya
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-purple-100 shadow-md">
          <BookOpen className="w-12 h-12 text-purple-600" />
        </div>

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