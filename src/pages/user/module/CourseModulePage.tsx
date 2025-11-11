import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, ChevronDown, ChevronUp, Download, ExternalLink, MessageCircle } from "lucide-react";
import { fetchModules, fetchSubModule, fetchQuizDetail, fetchModuleTasks, fetchCoursePostTest, fetchUserQuizResult, downloadSubmissionTask, fetchModuleBySlug } from "../../../features/module/_service/module_service";
import type { ModuleType, SubModuleDetailType, ContentType as OriginalContentType, ContentBlock, QuizType, ModuleTaskType, CoursePostTest, UserQuizResult, SubmissionTaskType, SubmissionType, ModuleDetailType } from "../../../features/module/_module";
import { motion, AnimatePresence } from "framer-motion";

// ========== TYPES ==========
type ContentTypeEnum = 'MODULE' | 'SUBMODULE' | 'QUIZ' | 'TASK' | 'FINAL_AUDIT' | 'OVERVIEW';

interface ActiveContent {
  type: ContentTypeEnum;
  data: SubModuleDetailType | QuizType | ModuleTaskType[] | CoursePostTest | ModuleDetailType | null;
  parsedContent?: OriginalContentType | null;
  userQuizResults?: UserQuizResult[];
}

interface NavigationItem {
  type: ContentTypeEnum;
  identifier?: string;
  title: string;
  moduleIndex: number;
  itemIndex: number;
}

interface SidebarProps {
  modules: ModuleType[];
  openModules: number[];
  activeContent: ActiveContent;
  onToggleModule: (idx: number) => void;
  onItemClick: (type: ContentTypeEnum, identifier?: string) => void;
}

interface MainContentProps {
  activeContent: ActiveContent;
  errors: Record<string, string | null>;
  currentNavIndex: number;
  totalNavItems: number;
  currentSlug?: string | null;
  onNext: () => void;
  onPrevious: () => void;
  onDiscussion: () => void;
}

interface NavigationControlsProps {
  currentNavIndex: number;
  totalNavItems: number;
  currentSlug?: string | null;
  onNext: () => void;
  onPrevious: () => void;
  onDiscussion: () => void;
}

// ========== MAIN COMPONENT ==========
export default function CourseModulePage() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const courseSlug = params.courseSlug || params.slug || null;

  // State management
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [openModules, setOpenModules] = useState<number[]>(() => {
    const saved = localStorage.getItem('course-open-modules');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeContent, setActiveContent] = useState<ActiveContent>({
    type: 'OVERVIEW',
    data: null
  });
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [currentNavIndex, setCurrentNavIndex] = useState<number>(-1);

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Refs
  const modulesRef = useRef<ModuleType[]>([]);
  const hasFetchedModulesRef = useRef(false);
  const navigationItemsRef = useRef<NavigationItem[]>([]);

  // ========== EFFECTS ==========
  useEffect(() => {
    modulesRef.current = modules;
  }, [modules]);

  useEffect(() => {
    localStorage.setItem('course-open-modules', JSON.stringify(openModules));
  }, [openModules]);

  useEffect(() => {
    navigationItemsRef.current = navigationItems;
  }, [navigationItems]);

  // ========== NAVIGATION BUILDER ==========
  const buildNavigationItems = useCallback((modulesData: ModuleType[]) => {
    const items: NavigationItem[] = [];

    modulesData.forEach((module, moduleIndex) => {
      // Add module overview
      items.push({
        type: 'MODULE',
        identifier: module.slug,
        title: module.title,
        moduleIndex,
        itemIndex: 0
      });

      // Add submodules
      module.sub_modules.forEach((submodule, subIndex) => {
        items.push({
          type: 'SUBMODULE',
          identifier: submodule.slug,
          title: submodule.title,
          moduleIndex,
          itemIndex: subIndex + 1
        });
      });

      // Add tasks
      if (module.module_tasks.length > 0) {
        items.push({
          type: 'TASK',
          identifier: module.slug,
          title: `Tugas ${module.title}`,
          moduleIndex,
          itemIndex: module.module_tasks.length + module.sub_modules.length + 1
        });
      }

      // Add quizzes
      module.quizzes.forEach((quiz, quizIndex) => {
        items.push({
          type: 'QUIZ',
          identifier: quiz.module_slug,
          title: `Quiz ${module.title}`,
          moduleIndex,
          itemIndex: quizIndex + module.sub_modules.length + module.module_tasks.length + 1
        });
      });
    });

    // Add final audit
    if (modulesData.length > 0 && modulesData[0].course?.course_test_id) {
      items.push({
        type: 'FINAL_AUDIT',
        title: 'Final Audit',
        moduleIndex: -1,
        itemIndex: 0
      });
    }

    return items;
  }, []);

  // ========== CONTENT HANDLERS ==========
  const findCurrentNavIndex = useCallback((items: NavigationItem[], activeContent: ActiveContent) => {
    if (activeContent.type === 'OVERVIEW') return -1;

    return items.findIndex(item => {
      if (item.type !== activeContent.type) return false;

      switch (activeContent.type) {
        case 'MODULE':
          return (activeContent.data as ModuleDetailType)?.slug === item.identifier;
        case 'SUBMODULE':
          return (activeContent.data as SubModuleDetailType)?.slug === item.identifier;
        case 'QUIZ':
          return (activeContent.data as QuizType)?.module_slug === item.identifier;
        case 'TASK':
          return (activeContent.data as ModuleTaskType[])?.[0]?.module?.slug === item.identifier;
        case 'FINAL_AUDIT':
          return true;
        default:
          return false;
      }
    });
  }, []);

  const getCurrentSlug = useCallback(() => {
    switch (activeContent.type) {
      case 'MODULE':
        return (activeContent.data as ModuleDetailType)?.slug;
      case 'SUBMODULE': {
        const sub = activeContent.data as SubModuleDetailType;
        return sub?.course_slug || sub?.slug || null;
      }
      case 'QUIZ':
        return (activeContent.data as QuizType)?.module_slug;
      case 'TASK':
        return (activeContent.data as ModuleTaskType[])?.[0]?.module?.slug;
      case 'FINAL_AUDIT':
        return 'final-audit';
      default:
        return null;
    }
  }, [activeContent]);

  // ========== UI HANDLERS ==========
  const toggleModule = useCallback((idx: number) => {
    setOpenModules(prev => prev.includes(idx)
      ? prev.filter(i => i !== idx)
      : [...prev, idx]
    );
  }, []);

  const openModule = useCallback((idx: number) => {
    setOpenModules(prev => prev.includes(idx) ? prev : [...prev, idx]);
  }, []);

  // ========== CONTENT LOADER ==========
  const loadContent = useCallback(async (type: ContentTypeEnum, identifier?: string) => {
    if (!identifier && type !== 'FINAL_AUDIT' && type !== 'MODULE') return;

    setErrors({});

    try {
      switch (type) {
        case 'MODULE': {
          const moduleData = await fetchModuleBySlug(identifier!);
          setActiveContent({ type: 'MODULE', data: moduleData });
          break;
        }

        case 'SUBMODULE': {
          const data = await fetchSubModule(identifier!);
          let parsedContent = null;
          try {
            parsedContent = JSON.parse(data.content || "{}") as OriginalContentType;
          } catch {
            // Ignore parse errors
          }

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

          const userQuizResults = await fetchUserQuizResult(identifier!);

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
          const moduleData = await fetchModuleBySlug(identifier!);
          const moduleId = moduleData.id;
          const data = await fetchModuleTasks(moduleId);

          const moduleIndex = modulesRef.current.findIndex(mod => mod.slug === identifier);
          if (moduleIndex !== -1) openModule(moduleIndex);

          setActiveContent({ type: 'TASK', data });
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
    }
  }, [openModule]);

  // ========== NAVIGATION HANDLERS ==========
  const handleSidebarClick = useCallback((type: ContentTypeEnum, identifier?: string) => {
    if (!identifier && type !== 'FINAL_AUDIT' && type !== 'MODULE') return;

    const basePath = `/course/${courseSlug}`;
    let url = basePath;

    switch (type) {
      case 'MODULE':
        url = `/module/${identifier}`;
        break;
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

  const navigateToContent = useCallback((index: number) => {
    const items = navigationItemsRef.current;
    if (index < 0 || index >= items.length) return;

    const item = items[index];
    setCurrentNavIndex(index);
    handleSidebarClick(item.type, item.identifier);
  }, [handleSidebarClick]);

  const handleNext = useCallback(() => {
    navigateToContent(currentNavIndex + 1);
  }, [currentNavIndex, navigateToContent]);

  const handlePrevious = useCallback(() => {
    navigateToContent(currentNavIndex - 1);
  }, [currentNavIndex, navigateToContent]);

  const handleDiscussion = useCallback(() => {
    const slug = getCurrentSlug();
    if (slug) {
      navigate(`/module/discussion/${slug}`);
    }
  }, [getCurrentSlug, navigate]);

  // ========== INITIAL LOAD ==========
  useEffect(() => {
    if (!courseSlug || hasFetchedModulesRef.current) return;

    const loadInitialData = async () => {
      try {
        const data = await fetchModules(courseSlug);
        setModules(data);

        const navItems = buildNavigationItems(data);
        setNavigationItems(navItems);
        hasFetchedModulesRef.current = true;

        // Handle initial route
        const path = location.pathname;
        if (path.includes('/submodule/')) {
          handleSidebarClick('SUBMODULE', params.submoduleSlug);
        } else if (path.includes('/quiz/')) {
          handleSidebarClick('QUIZ', params.quizSlug);
        } else if (path.includes('/task/')) {
          handleSidebarClick('TASK', params.moduleSlug);
        } else if (path.includes('/final-audit')) {
          handleSidebarClick('FINAL_AUDIT');
        } else if (path.includes('/module/')) {
          handleSidebarClick('MODULE', params.slug);
        }
      } catch (error) {
        console.error("Failed to load modules:", error);
        setErrors({ modules: "Gagal memuat modul" });
      }
    };

    loadInitialData();
  }, [
    courseSlug,
    location.pathname,
    handleSidebarClick,
    params.submoduleSlug,
    params.quizSlug,
    params.moduleSlug,
    params.slug,
    buildNavigationItems
  ]);

  // Update current navigation index
  useEffect(() => {
    if (navigationItems.length > 0) {
      const newIndex = findCurrentNavIndex(navigationItems, activeContent);
      setCurrentNavIndex(newIndex);
    }
  }, [navigationItems, activeContent, findCurrentNavIndex]);

  // ========== RENDER ==========
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 dark:bg-[#160d1a] transition-colors duration-500">
      {/* Mobile Layout - Sidebar di atas, Content di bawah */}
      <div className="md:hidden">
        <div className="bg-white dark:bg-gray-800 h-auto max-h-[40vh] overflow-y-auto scrollbar-hide transition-colors duration-500">
          <Sidebar
            modules={modules}
            openModules={openModules}
            activeContent={activeContent}
            onToggleModule={toggleModule}
            onItemClick={handleSidebarClick}
          />
        </div>

        <div className="flex-1 min-h-[60vh]">
          <MainContent
            activeContent={activeContent}
            errors={errors}
            currentNavIndex={currentNavIndex}
            totalNavItems={navigationItems.length}
            currentSlug={getCurrentSlug()}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onDiscussion={handleDiscussion}
          />
        </div>
      </div>

      {/* Desktop Layout - Sidebar dan Content bersebelahan */}
      <div className="hidden md:flex w-full h-screen">
        {/* Sidebar - tanpa scrollbar, height penuh */}
        <div className="bg-white dark:bg-gray-800 h-full w-76 lg:w-80 overflow-hidden transition-colors duration-500 flex-shrink-0">
          <Sidebar
            modules={modules}
            openModules={openModules}
            activeContent={activeContent}
            onToggleModule={toggleModule}
            onItemClick={handleSidebarClick}
          />
        </div>

        {/* Main Content - Flexible width, full height TANPA SCROLLBAR */}
        <div className="flex-1 min-h-full overflow-y-auto scrollbar-hide">
          <MainContent
            activeContent={activeContent}
            errors={errors}
            currentNavIndex={currentNavIndex}
            totalNavItems={navigationItems.length}
            currentSlug={getCurrentSlug()}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onDiscussion={handleDiscussion}
          />
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  modules,
  openModules,
  activeContent,
  onToggleModule,
  onItemClick,
}: SidebarProps) {
  const hasFinalAudit = modules.length > 0 && modules[0].course?.course_test_id;

  const isActive = (type: ContentTypeEnum, identifier?: string): boolean => {
    if (!identifier || activeContent.type !== type) return false;

    switch (type) {
      case 'MODULE':
        return (activeContent.data as ModuleDetailType)?.slug === identifier;
      case 'SUBMODULE':
        return (activeContent.data as SubModuleDetailType)?.slug === identifier;
      case 'QUIZ':
        return (activeContent.data as QuizType)?.module_slug === identifier;
      case 'TASK':
        return (activeContent.data as ModuleTaskType[])?.[0]?.module?.slug === identifier;
      default:
        return false;
    }
  };

  return (
    <aside className="w-full h-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Header yang sticky */}
      <div className="flex-shrink-0">
        <h2 className="text-left text-base font-bold px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-600 transition-colors duration-500">
          Konten Kursus
        </h2>
      </div>

      {/* Content area yang scrollable TANPA SCROLLBAR */}
      <div className="flex-1 overflow-y-auto scrollbar-hide smooth-scroll">
        <ul className="divide-y divide-gray-200 dark:divide-gray-600">
          {modules.map((mod, idx) => {
            const isOpen = openModules.includes(idx);

            return (
              <li key={mod.id}>
                <button
                  onClick={() => onToggleModule(idx)}
                  className={`flex justify-between items-center w-full px-4 py-3 text-sm border-b border-gray-200 dark:border-gray-600
                    ${isOpen
                      ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-gray-900"
                      : "text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                    transition-colors duration-200`}
                >
                  <span className="truncate text-left pr-2">{mod.title}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
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
                      {/* Sub modul area TANPA SCROLLBAR - PERBAIKAN DI SINI */}
                      <div className="bg-gray-200 dark:bg-gray-900 transition-colors duration-500 max-h-64 overflow-y-auto scrollbar-hide">
                        <ul>
                          {/* Submodules */}
                          {mod.sub_modules.map((sub) => (
                            <li key={sub.id}>
                              <button
                                onClick={() => onItemClick('SUBMODULE', sub.slug)}
                                className={`flex justify-between items-center w-full px-4 sm:px-6 py-2 text-xs
                                  ${isActive('SUBMODULE', sub.slug)
                                    ? "text-white dark:text-white font-bold bg-purple-600 dark:bg-purple-500"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-purple-300 dark:hover:bg-purple-900/20 hover:text-gray-900 dark:hover:text-white"
                                  }
                                  transition-colors duration-200`}
                              >
                                <span className="truncate text-left pr-2">{sub.title}</span>
                              </button>
                            </li>
                          ))}

                          {/* Tasks */}
                          {mod.module_tasks.length > 0 && (
                            <li>
                              <button
                                onClick={() => onItemClick('TASK', mod.slug)}
                                className={`flex justify-between items-center w-full px-4 sm:px-6 py-2 text-xs 
                                  ${isActive('TASK', mod.slug)
                                    ? "text-white dark:text-white font-bold bg-purple-600 dark:bg-purple-500"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-purple-300 dark:hover:bg-purple-900/20 hover:text-gray-900 dark:hover:text-white"
                                  }
                                  transition-colors duration-200`}
                              >
                                <span className="truncate text-left pr-2">Tugas</span>
                                <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded-full min-w-6 text-center transition-colors duration-200">
                                  {mod.module_tasks.length}
                                </span>
                              </button>
                            </li>
                          )}

                          {/* Quizzes */}
                          {mod.quizzes.map((quiz) => (
                            <li key={quiz.id}>
                              <button
                                onClick={() => onItemClick('QUIZ', quiz.module_slug)}
                                className={`flex justify-between items-center w-full px-4 sm:px-6 py-2 text-xs
                                  ${isActive('QUIZ', quiz.module_slug)
                                    ? "text-white dark:text-white font-bold bg-purple-600 dark:bg-purple-500"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-purple-300 dark:hover:bg-purple-900/20 hover:text-gray-900 dark:hover:text-white"
                                  }
                                  transition-colors duration-200`}
                              >
                                <span className="truncate text-left pr-2">Quiz</span>
                                <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded-full min-w-6 text-center transition-colors duration-200">
                                  {quiz.total_question}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Final Audit */}
        {hasFinalAudit && (
          <div className="border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={() => onToggleModule(-1)}
              className={`flex justify-between items-center w-full px-4 py-3 text-sm border-b border-gray-200 dark:border-gray-600
                ${openModules.includes(-1)
                  ? "text-white dark:text-white font-bold bg-purple-600 dark:bg-purple-500"
                  : "text-gray-700 dark:text-gray-300 hover:bg-purple-300 dark:hover:bg-purple-900/20 hover:text-gray-900 dark:hover:text-white"
                }
                transition-colors duration-200`}
            >
              <span className="truncate text-left pr-2">Final Audit</span>
              {openModules.includes(-1) ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
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
                  <div className="bg-gray-50 dark:bg-gray-700 transition-colors duration-500 max-h-32 overflow-y-auto scrollbar-hide">
                    <ul>
                      <li>
                        <button
                          onClick={() => onItemClick('FINAL_AUDIT')}
                          className={`flex justify-between items-center w-full px-4 sm:px-6 py-2 text-xs hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-gray-900 dark:hover:text-white transition-colors duration-200
                            text-gray-700 dark:text-gray-300`}
                        >
                          <span className="truncate text-left pr-2">Tugas Akhir</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </aside>
  );
}
// ========== MAIN CONTENT COMPONENT ==========
function MainContent({
  activeContent,
  errors,
  currentNavIndex,
  totalNavItems,
  currentSlug,
  onNext,
  onPrevious,
  onDiscussion,
}: MainContentProps) {

  if (errors.modules) {
    return (
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center transition-colors duration-500">
        <div className="text-center text-red-500 dark:text-red-400 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm max-w-md w-full transition-colors duration-500">
          <div className="text-lg font-semibold mb-2">Terjadi Kesalahan</div>
          <div>{errors.modules}</div>
        </div>
      </main>
    );
  }

  switch (activeContent.type) {
    case 'MODULE':
      return <ModuleContent
        data={activeContent.data as ModuleDetailType}
        currentNavIndex={currentNavIndex}
        totalNavItems={totalNavItems}
        currentSlug={currentSlug}
        onNext={onNext}
        onPrevious={onPrevious}
        onDiscussion={onDiscussion}
      />;
    case 'SUBMODULE':
      return <SubmoduleContent
        data={activeContent.data as SubModuleDetailType}
        parsedContent={activeContent.parsedContent}
        currentNavIndex={currentNavIndex}
        totalNavItems={totalNavItems}
        currentSlug={currentSlug}
        onNext={onNext}
        onPrevious={onPrevious}
        onDiscussion={onDiscussion}
      />;
    case 'QUIZ':
      return <QuizContent
        data={activeContent.data as QuizType}
        userQuizResults={activeContent.userQuizResults}
        error={errors.quiz}
        currentNavIndex={currentNavIndex}
        totalNavItems={totalNavItems}
        currentSlug={currentSlug}
        onNext={onNext}
        onPrevious={onPrevious}
        onDiscussion={onDiscussion}
      />;
    case 'TASK':
      return <TaskContent
        data={activeContent.data as ModuleTaskType[]}
        error={errors.task}
        currentNavIndex={currentNavIndex}
        totalNavItems={totalNavItems}
        currentSlug={currentSlug}
        onNext={onNext}
        onPrevious={onPrevious}
        onDiscussion={onDiscussion}
      />;
    case 'FINAL_AUDIT':
      return <FinalAuditContent
        data={activeContent.data as CoursePostTest}
        error={errors.final_audit}
        currentNavIndex={currentNavIndex}
        totalNavItems={totalNavItems}
        currentSlug={currentSlug}
        onNext={onNext}
        onPrevious={onPrevious}
        onDiscussion={onDiscussion}
      />;
    default:
      return <OverviewContent />;
  }
}

// ========== NAVIGATION CONTROLS COMPONENT ==========
function NavigationControls({
  currentNavIndex,
  totalNavItems,
  currentSlug,
  onNext,
  onPrevious,
  onDiscussion
}: NavigationControlsProps) {
  const canGoPrevious = currentNavIndex > 0;
  const canGoNext = currentNavIndex < totalNavItems - 1;

  const baseButton =
    "flex items-center justify-center gap-2 px-4 sm:px-5 h-10 sm:h-7 rounded-lg font-sans font-semibold text-[12px] sm:text-[13px] transition-all duration-300 ease-in-out";

  const circleBase =
    "w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center text-[16px] sm:text-[18px] font-bold transition-all duration-300 ease-in-out";

  return (
    <div className="flex flex-row justify-between items-center gap-3 sm:gap-4 transition-colors duration-500">

      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`${baseButton} ${canGoPrevious
            ? "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
            : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
          }`}
      >
        <div
          className={`${circleBase} ${canGoPrevious
              ? "border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:border-purple-600 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              : "border-gray-400 dark:border-gray-600 text-gray-400 dark:text-gray-600"
            }`}
        >
          ←
        </div>
        <span>Sebelumnya</span>
      </button>

      {/* Discussion Button */}
      <button
        onClick={onDiscussion}
        disabled={!currentSlug}
        className={`${baseButton} ${currentSlug
            ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
          }`}
      >
        <MessageCircle size={18} className="mr-0.5 sm:mr-1" />
        <span>Diskusi</span>
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`${baseButton} ${canGoNext
            ? "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
            : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
          }`}
      >
        <span>Selanjutnya</span>
        <div
          className={`${circleBase} ${canGoNext
              ? "border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:border-purple-600 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              : "border-gray-400 dark:border-gray-600 text-gray-400 dark:text-gray-600"
            }`}
        >
          →
        </div>
      </button>
    </div>
  );
}


// ========== CONTENT COMPONENTS ==========
interface ModuleContentProps extends NavigationControlsProps {
  data: ModuleDetailType;
}

function ModuleContent({ data, ...navProps }: ModuleContentProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <div className="bg-purple-600 dark:bg-purple-800 text-white px-4 md:px-10 py-3 transition-colors duration-500">
        <h1 className="text-sm md:text-[15px] font-medium text-justify mt-2 line-clamp-2">
          {data.course?.title}
        </h1>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm transition-colors duration-500">
          <h1 className="text-base md:text-lg text-left font-bold mb-2 text-gray-800 dark:text-white">{data.title}</h1>
          <p className="text-xs text-left text-gray-600 dark:text-gray-300 mb-4 border-b border-gray-300 dark:border-gray-600 pb-3 transition-colors duration-500">
            {data.sub_title}
          </p>

          <div className="prose prose-sm max-w-none leading-relaxed text-left space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-sm leading-6">
              Selamat datang di modul <strong>{data.title}</strong>. Modul ini berisi:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>{data.sub_module_count} Sub-modul</strong> pembelajaran</li>
              {data.module_task_count > 0 && (
                <li><strong>{data.module_task_count} Tugas</strong> yang harus diselesaikan</li>
              )}
              {data.quizz_count > 0 && (
                <li><strong>{data.quizz_count} Quiz</strong> untuk menguji pemahaman</li>
              )}
            </ul>

            <p className="text-sm leading-6">
              Silakan pilih sub-modul di sidebar untuk mulai belajar, atau langsung mengerjakan tugas dan quiz yang tersedia.
            </p>
          </div>

          <div className="mt-8 pt-6">
            <div className="bg-gray-100 dark:bg-purple-600 rounded-md p-2">
              <NavigationControls {...navProps} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

interface SubmoduleContentProps extends NavigationControlsProps {
  data: SubModuleDetailType;
  parsedContent?: OriginalContentType | null;
}

function SubmoduleContent({ data, parsedContent, ...navProps }: SubmoduleContentProps) {
  return (
    <main className=" flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 min-h-screen transition-colors duration-500">
      <div className="bg-purple-600 dark:bg-purple-800 text-white px-4 md:px-10 py-3 transition-colors duration-500">
        <h1 className="text-sm md:text-[15px] font-medium text-justify mt-2 line-clamp-2">{data.course_title}</h1>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto bg-white dark:bg-gray-900 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm transition-colors duration-500">
          <h1 className="text-base md:text-lg text-left font-bold mb-2 text-gray-800 dark:text-white">{data.title}</h1>
          <p className="text-xs text-left text-gray-600 dark:text-gray-300 mb-4 border-b border-gray-300 dark:border-gray-600 pb-3 transition-colors duration-500">
            {data.sub_title}
          </p>

          <div className="prose prose-sm max-w-none leading-relaxed text-left space-y-4 text-gray-700 dark:text-gray-300">
            {parsedContent?.blocks?.map((block: ContentBlock) => {
              if (block.type === "paragraph") {
                return <p key={block.id} className="text-sm leading-6" dangerouslySetInnerHTML={{ __html: block.data?.text || "" }} />;
              }
              if (block.type === "list") {
                const ListTag = block.data.style === "ordered" ? "ol" : "ul";
                return (
                  <ListTag key={block.id} className="list-inside space-y-1 ml-4">
                    {block.data.items.map((item, i) => <li key={i} className="text-sm">{item}</li>)}
                  </ListTag>
                );
              }
              if (block.type === "image") {
                return (
                  <figure key={block.id} className="my-4 md:my-8">
                    <img
                      src={block.data.file.url}
                      alt={block.data.caption || "content"}
                      className="rounded-xl shadow-md mx-auto w-full max-w-md"
                      loading="lazy"
                    />
                    {block.data.caption && <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-3 transition-colors duration-500">{block.data.caption}</figcaption>}
                  </figure>
                );
              }
              return null;
            })}
          </div>

          <div className="mt-8 pt-6">
            <div className="bg-gray-100 dark:bg-purple-600 rounded-md p-2">
              <NavigationControls {...navProps} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

interface QuizContentProps extends NavigationControlsProps {
  data: QuizType;
  userQuizResults?: UserQuizResult[];
  error: string | null;
}

function QuizContent({ data, userQuizResults, error, ...navProps }: QuizContentProps) {
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
                  <NavigationControls {...navProps} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

interface TaskContentProps extends NavigationControlsProps {
  data: ModuleTaskType[];
  error: string | null;
}

function TaskContent({ data, error, ...navProps }: TaskContentProps) {
  const navigate = useNavigate();

  const buttonClass = `
    font-sans font-medium text-xs md:text-sm py-1.5 px-3 md:px-4 rounded-full 
    flex items-center justify-center transition-all duration-300 ease-in-out
    shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]
    hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]
    active:translate-y-0.5 border
    bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white 
    hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black 
    dark:bg-gradient-to-r dark:from-purple-600 dark:to-purple-700 dark:border-purple-600
    dark:hover:from-yellow-400 dark:hover:to-yellow-500 dark:hover:border-yellow-600 dark:hover:text-black
  `;

  const iconButtonClass = `
    w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-white
    transition-all duration-300 ease-in-out
    shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]
    hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]
    active:translate-y-0.5 border
    bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 
    hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black 
    dark:bg-gradient-to-r dark:from-purple-600 dark:to-purple-700 dark:border-purple-600
    dark:hover:from-yellow-400 dark:hover:to-yellow-500 dark:hover:border-yellow-600 dark:hover:text-black
  `;

  const getSubmissionType = (task: ModuleTaskType): SubmissionType => {
    if (!task.submission_task || task.submission_task.length === 0) {
      return 'none';
    }

    const latestSubmission = task.submission_task[0];
    const hasFile = !!latestSubmission.file;
    const hasAnswer = !!latestSubmission.answer;

    if (hasFile) {
      return 'file';
    } else if (hasAnswer) {
      return 'link';
    }

    return 'none';
  };

  const getLatestSubmission = (task: ModuleTaskType): SubmissionTaskType | null => {
    if (!task.submission_task || task.submission_task.length === 0) {
      return null;
    }
    return task.submission_task[0];
  };

  const handleDownload = async (task: ModuleTaskType) => {
    try {
      const submission = getLatestSubmission(task);
      if (!submission) {
        alert('Tidak ada file yang dapat diunduh');
        return;
      }

      await downloadSubmissionTask(submission.id);
    } catch (error) {
      console.error('Gagal mengunduh file:', error);
      alert('Gagal mengunduh file. Silakan coba lagi.');
    }
  };

  const handleOpenLink = (task: ModuleTaskType) => {
    const submission = getLatestSubmission(task);
    if (!submission?.answer) {
      alert('Tidak ada link yang dapat dibuka');
      return;
    }

    let url = submission.answer;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderActionButtons = (task: ModuleTaskType) => {
    const submissionType = getSubmissionType(task);
    const submission = getLatestSubmission(task);

    if (!task.is_finish) {
      return (
        <button
          className={buttonClass}
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          Kerjakan
        </button>
      );
    }

    if (!submission || submissionType === 'none') {
      return (
        <button
          className={buttonClass}
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          Detail
        </button>
      );
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <button
          className={buttonClass}
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          Detail
        </button>

        {submissionType === 'file' && (
          <button
            className={iconButtonClass}
            onClick={() => handleDownload(task)}
            title="Download File"
          >
            <Download size={16} />
          </button>
        )}

        {submissionType === 'link' && (
          <button
            className={iconButtonClass}
            onClick={() => handleOpenLink(task)}
            title="Buka Link Repository"
          >
            <ExternalLink size={16} />
          </button>
        )}
      </div>
    );
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <div className="bg-purple-600 dark:bg-purple-800 text-white px-4 md:px-10 py-3 transition-colors duration-500">
        <h1 className="text-sm md:text-[15px] font-medium text-justify mt-2 line-clamp-2">
          Tugas {data[0]?.module.title}
        </h1>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm transition-colors duration-500">
          <h1 className="text-base md:text-lg font-bold mb-4 text-left text-gray-800 dark:text-white">Aturan</h1>

          <div className="mb-6 md:mb-7">
            <ul className="list-decimal list-inside text-left text-xs md:text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Dikerjakan secara individu</li>
              <li>File yang dikumpulkan berupa .zip, maksimal ukuran 5 MB</li>
              <li>Atau bisa mengumpulkan link repository GitHub</li>
              <li>Jangan sampai melebihi deadline yang telah diberikan</li>
              <li>
                Apabila tugas pada materi ini belum dikumpulkan semua, maka kamu
                tidak bisa lanjut ke materi berikutnya
              </li>
            </ul>
          </div>

          {error ? (
            <p className="text-red-500 dark:text-red-400 text-center">{error}</p>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full text-xs md:text-sm border border-gray-800 dark:border-gray-500 border-separate border-spacing-0 rounded-lg overflow-hidden">
                  <thead className="bg-purple-600 dark:bg-purple-700 text-white">
                    <tr>
                      <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">No</th>
                      <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">Tugas</th>
                      <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">Status</th>
                      <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">Nilai</th>
                      <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800">
                    {data.map((task, idx) => (
                      <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center text-gray-700 dark:text-gray-300">{idx + 1}</td>
                        <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 font-medium text-center min-w-[150px] text-gray-700 dark:text-gray-300">
                          {task.question}
                        </td>
                        <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">
                          {task.is_finish ? (
                            <span className="text-green-200 border bg-green-700 dark:text-green-100 dark:bg-green-800 px-1 md:px-3 py-1 rounded-md font-semibold whitespace-nowrap">Sudah Dikumpulkan</span>
                          ) : (
                            <span className="text-red-200 border bg-red-700 dark:text-red-100 dark:bg-red-800 px-1 md:px-3 py-1 rounded-md font-semibold whitespace-nowrap">Belum</span>
                          )}
                        </td>
                        <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center text-gray-700 dark:text-gray-300">
                          {task.average_score ?? "-"}
                        </td>
                        <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">
                          {renderActionButtons(task)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 pt-6">
                <div className="bg-gray-100 dark:bg-purple-600 rounded-md p-2">
                  <NavigationControls {...navProps} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

interface FinalAuditContentProps extends NavigationControlsProps {
  data: CoursePostTest;
  error: string | null;
}

function FinalAuditContent({ data, error, ...navProps }: FinalAuditContentProps) {
  const buttonClass = `
    font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
    flex items-center justify-center transition-all duration-300 ease-in-out
    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
    hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]
    active:translate-y-0.5 border
    bg-gradient-to-r from-blue-600 to-blue-700 border-blue-700 text-white 
    hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black 
    dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-700 dark:border-blue-600
    dark:hover:from-yellow-400 dark:hover:to-yellow-500 dark:hover:border-yellow-600 dark:hover:text-black
  `;

  return (
    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <div className="bg-purple-600 dark:bg-purple-800 text-white px-4 md:px-10 py-3 transition-colors duration-500">
        <h1 className="text-sm md:text-[15px] font-medium text-justify mt-2 line-clamp-2">
          Final Audit: {data?.course.title}
        </h1>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm transition-colors duration-500">
          <h1 className="text-base md:text-lg font-bold mb-2 text-gray-800 dark:text-white">Final Audit: {data?.course.title}</h1>

          {error ? (
            <p className="text-red-500 dark:text-red-400 text-center">{error}</p>
          ) : (
            <>
              <ul className="text-xs md:text-sm text-gray-800 dark:text-gray-300 space-y-1 mb-6">
                <li>Jumlah Soal: {data?.total_question}</li>
                <li>Durasi Ujian: {data?.duration} menit</li>
              </ul>

              <div className="mt-6 text-center md:text-left">
                <button className={buttonClass}>
                  Mulai Final Audit
                </button>
              </div>

              <div className="mt-8 pt-6">
                <div className="bg-gray-100 dark:bg-purple-600 rounded-md p-2">
                  <NavigationControls {...navProps} />
                </div>
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
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center transition-colors duration-500">
      <div className="text-center px-4 py-8 w-full max-w-md mx-auto">
        <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 shadow-md mx-auto transition-colors duration-500">
          <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-purple-600 dark:text-purple-400" />
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-400 mb-2">Semangat Belajar! 🚀</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg max-w-md text-center mx-auto">
          Mulai perjalanan belajarmu.
          <span className="font-medium text-purple-600 dark:text-purple-400 block mt-1"> Semangat mengerjakan materi! 💪</span>
        </p>
      </div>
    </main>
  );
}