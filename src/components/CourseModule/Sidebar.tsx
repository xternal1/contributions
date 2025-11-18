import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ModuleType, SubModuleDetailType, QuizType, ModuleTaskType, ModuleDetailType } from '@features/module/_module';

type ContentTypeEnum = 'MODULE' | 'SUBMODULE' | 'QUIZ' | 'TASK' | 'FINAL_AUDIT' | 'OVERVIEW';

interface SidebarProps {
  modules: ModuleType[];
  openModules: number[];
  activeContent: any;
  onToggleModule: (idx: number) => void;
  onItemClick: (type: ContentTypeEnum, identifier?: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  modules,
  openModules,
  activeContent,
  onToggleModule,
  onItemClick,
}) => {
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
                      animate={{ height: 'auto', opacity: 1 }}
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
                  animate={{ height: 'auto', opacity: 1 }}
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
};

export default Sidebar;
