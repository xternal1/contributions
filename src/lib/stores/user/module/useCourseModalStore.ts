// src/lib/stores/user/module/useCourseModuleStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  ModuleType, 
  SubModuleDetailType, 
  QuizType, 
  ModuleTaskType, 
  CoursePostTest,
  UserQuizResult,
  ModuleDetailType
} from "../../../../features/module/_module";
import { 
  fetchModules, 
  fetchSubModule, 
  fetchQuizDetail, 
  fetchModuleTasks, 
  fetchCoursePostTest, 
  fetchUserQuizResult, 
  fetchModuleBySlug
} from "../../../../features/module/_service/module_service";
import type { NavigateFunction } from 'react-router-dom';

export type ContentTypeEnum = 'MODULE' | 'SUBMODULE' | 'QUIZ' | 'TASK' | 'FINAL_AUDIT' | 'OVERVIEW';

export interface ActiveContent {
  type: ContentTypeEnum;
  data: SubModuleDetailType | QuizType | ModuleTaskType[] | CoursePostTest | ModuleDetailType | null;
  parsedContent?: any | null;
  userQuizResults?: UserQuizResult[];
}

export interface NavigationItem {
  type: ContentTypeEnum;
  identifier?: string;
  title: string;
  moduleIndex: number;
  itemIndex: number;
}

interface CourseModuleState {
  // Course data
  courseSlug: string | null;
  modules: ModuleType[];
  loadingModules: boolean;
  errors: Record<string, string | null>;
  
  // UI state
  openModules: number[];
  activeContent: ActiveContent;
  navigationItems: NavigationItem[];
  currentNavIndex: number;
  
  // Navigation functions (will be injected)
  navigate: NavigateFunction | null;
  
  // Actions
  initializeCourse: (courseSlug: string, navigate: NavigateFunction) => Promise<void>;
  loadContent: (type: ContentTypeEnum, identifier?: string) => Promise<void>;
  toggleModule: (idx: number) => void;
  openModule: (idx: number) => void;
  setCurrentNavIndex: (index: number) => void;
  buildNavigationItems: (modules: ModuleType[]) => void;
  updateCurrentNavIndex: () => void;
  clearErrors: () => void;
  getCurrentSlug: () => string | null;
  navigateNext: () => void;
  navigatePrevious: () => void;
  handleOpenLink: (url: string) => void;
}

export const useCourseModuleStore = create<CourseModuleState>()(
  persist(
    (set, get) => ({
      courseSlug: null,
      modules: [],
      loadingModules: false,
      errors: {},
      openModules: [],
      activeContent: {
        type: 'OVERVIEW',
        data: null
      },
      navigationItems: [],
      currentNavIndex: -1,
      navigate: null,
      
      initializeCourse: async (courseSlug: string, navigate: NavigateFunction) => {
        set({ courseSlug, loadingModules: true, errors: {}, navigate });
        try {
          const modules = await fetchModules(courseSlug);
          set({ modules, loadingModules: false });
          get().buildNavigationItems(modules);
        } catch (error) {
          console.error("Failed to load modules:", error);
          set({ 
            errors: { modules: "Gagal memuat modul" },
            loadingModules: false 
          });
        }
      },
      
      loadContent: async (type: ContentTypeEnum, identifier?: string) => {
        const { openModule: openModuleAction, modules, courseSlug, navigate } = get();
        if (!identifier && type !== 'FINAL_AUDIT' && type !== 'MODULE') return;
        
        set({ errors: {} });
        
        try {
          let contentData: SubModuleDetailType | QuizType | ModuleTaskType[] | CoursePostTest | ModuleDetailType | null = null;
          let parsedContent = null;
          let userResults: UserQuizResult[] | undefined;
          
          switch (type) {
            case 'MODULE': {
              contentData = await fetchModuleBySlug(identifier!);
              set({ 
                activeContent: { 
                  type: 'MODULE', 
                  data: contentData 
                } 
              });
              break;
            }
            case 'SUBMODULE': {
              contentData = await fetchSubModule(identifier!);
              try {
                parsedContent = JSON.parse(contentData.content || "{}");
              } catch {
                // Ignore parse errors
              }
              
              // Find which module contains this submodule and open it
              const moduleIndex = modules.findIndex(mod =>
                mod.sub_modules.some(sub => sub.slug === identifier)
              );
              if (moduleIndex !== -1) openModuleAction(moduleIndex);
              
              set({ 
                activeContent: { 
                  type: 'SUBMODULE', 
                  data: contentData, 
                  parsedContent 
                } 
              });
              break;
            }
            case 'QUIZ': {
              contentData = await fetchQuizDetail(identifier!);
              userResults = await fetchUserQuizResult(identifier!);
              
              // Find which module contains this quiz and open it
              const moduleIndex = modules.findIndex(mod =>
                mod.quizzes.some(quiz => quiz.module_slug === identifier)
              );
              if (moduleIndex !== -1) openModuleAction(moduleIndex);
              
              set({ 
                activeContent: { 
                  type: 'QUIZ', 
                  data: contentData, 
                  userQuizResults: userResults 
                } 
              });
              break;
            }
            case 'TASK': {
              const moduleData = await fetchModuleBySlug(identifier!);
              const moduleId = moduleData.id;
              contentData = await fetchModuleTasks(moduleId);
              
              // Find which module contains these tasks and open it
              const moduleIndex = modules.findIndex(mod => mod.slug === identifier);
              if (moduleIndex !== -1) openModuleAction(moduleIndex);
              
              set({ 
                activeContent: { 
                  type: 'TASK', 
                  data: contentData 
                } 
              });
              break;
            }
            case 'FINAL_AUDIT': {
              if (modules.length === 0) return;
              const courseTestId = modules[0]?.course?.course_test_id;
              if (!courseTestId) return;
              
              const auditData = await fetchCoursePostTest(courseTestId);
              contentData = auditData.course_test;
              openModuleAction(-1);
              
              set({ 
                activeContent: { 
                  type: 'FINAL_AUDIT', 
                  data: contentData 
                } 
              });
              break;
            }
          }
          
          // Update navigation index
          get().updateCurrentNavIndex();
          
          // Update URL
          if (courseSlug && navigate) {
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
            
            navigate(url, { replace: true });
          }
          
        } catch (error) {
          console.error(`Failed to load ${type}:`, error);
          set({ errors: { [type.toLowerCase()]: `Gagal memuat ${type}` } });
        }
      },
      
      toggleModule: (idx: number) => {
        set(state => {
          const isOpen = state.openModules.includes(idx);
          return {
            openModules: isOpen 
              ? state.openModules.filter(i => i !== idx) 
              : [...state.openModules, idx]
          };
        });
      },
      
      openModule: (idx: number) => {
        set(state => {
          if (state.openModules.includes(idx)) return state;
          return { openModules: [...state.openModules, idx] };
        });
      },
      
      setCurrentNavIndex: (index: number) => {
        set({ currentNavIndex: index });
      },
      
      buildNavigationItems: (modules: ModuleType[]) => {
        const items: NavigationItem[] = [];
        
        modules.forEach((module, moduleIndex) => {
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
              itemIndex: module.sub_modules.length + 1
            });
          }
          
          // Add quizzes
          module.quizzes.forEach((quiz, quizIndex) => {
            items.push({
              type: 'QUIZ',
              identifier: quiz.module_slug,
              title: `Quiz ${module.title}`,
              moduleIndex,
              itemIndex: quizIndex + module.sub_modules.length + (module.module_tasks.length > 0 ? 1 : 0) + 1
            });
          });
        });
        
        // Add final audit
        if (modules.length > 0 && modules[0]?.course?.course_test_id) {
          items.push({
            type: 'FINAL_AUDIT',
            title: 'Final Audit',
            moduleIndex: -1,
            itemIndex: 0
          });
        }
        
        set({ navigationItems: items });
      },
      
      updateCurrentNavIndex: () => {
        const { navigationItems, activeContent } = get();
        
        if (navigationItems.length === 0 || activeContent.type === 'OVERVIEW') {
          set({ currentNavIndex: -1 });
          return;
        }
        
        const newIndex = navigationItems.findIndex(item => {
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
        
        set({ currentNavIndex: newIndex });
      },
      
      clearErrors: () => {
        set({ errors: {} });
      },
      
      getCurrentSlug: () => {
        const { activeContent } = get();
        
        switch (activeContent.type) {
          case 'MODULE':
            return (activeContent.data as ModuleDetailType)?.slug || null;
          case 'SUBMODULE': {
            const sub = activeContent.data as SubModuleDetailType;
            return sub?.course_slug || sub?.slug || null;
          }
          case 'QUIZ':
            return (activeContent.data as QuizType)?.module_slug || null;
          case 'TASK':
            return (activeContent.data as ModuleTaskType[])?.[0]?.module?.slug || null;
          case 'FINAL_AUDIT':
            return 'final-audit';
          default:
            return null;
        }
      },
      
      navigateNext: () => {
        const { currentNavIndex, navigationItems, loadContent } = get();
        if (currentNavIndex < navigationItems.length - 1) {
          const nextItem = navigationItems[currentNavIndex + 1];
          if (nextItem.identifier) {
            loadContent(nextItem.type, nextItem.identifier);
          } else {
            loadContent(nextItem.type);
          }
        }
      },
      
      navigatePrevious: () => {
        const { currentNavIndex, navigationItems, loadContent } = get();
        if (currentNavIndex > 0) {
          const prevItem = navigationItems[currentNavIndex - 1];
          if (prevItem.identifier) {
            loadContent(prevItem.type, prevItem.identifier);
          } else {
            loadContent(prevItem.type);
          }
        }
      },
      
      handleOpenLink: (url: string) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'https://' + url;
        }
        window.open(url, '_blank', 'noopener,noreferrer');
      },
    }),
    {
      name: 'course-module-storage',
      partialize: (state) => ({
        openModules: state.openModules,
        courseSlug: state.courseSlug
      }),
    }
  )
);