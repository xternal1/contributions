// src/utils/courseNavigation.ts
import type { ModuleType } from "../features/module/_module";

/**
 * Utility functions untuk navigasi course yang konsisten
 */

export const courseNavigation = {
  // Navigasi ke overview module tertentu
  toModule: (courseSlug: string, moduleIndex: number) => 
    `/course/${courseSlug}/module/${moduleIndex}`,
  
  // Navigasi ke submodule spesifik
  toSubmodule: (courseSlug: string, submoduleSlug: string) => 
    `/course/${courseSlug}/submodule/${submoduleSlug}`,
  
  // Navigasi ke quiz spesifik
  toQuiz: (courseSlug: string, quizSlug: string) => 
    `/course/${courseSlug}/quiz/${quizSlug}`,
  
  // Navigasi ke task module
  toTask: (courseSlug: string, moduleId: string) => 
    `/course/${courseSlug}/task/${moduleId}`,
  
  // Navigasi ke final audit
  toFinalAudit: (courseSlug: string) => 
    `/course/${courseSlug}/final-audit`,
  
  // Navigasi legacy (fallback)
  toLegacy: (courseSlug: string) => 
    `/module/${courseSlug}`
};

/**
 * Helper untuk mendapatkan navigasi berikutnya
 */
export const getNextNavigation = (
  currentModuleIndex: number,
  currentSubModuleIndex: number,
  modules: ModuleType[],
  courseSlug: string
) => {
  if (!modules.length || currentModuleIndex === null) return null;

  const currentModule = modules[currentModuleIndex];
  
  // Cek apakah ada submodule berikutnya di module yang sama
  if (currentSubModuleIndex !== null && 
      currentSubModuleIndex < currentModule.sub_modules.length - 1) {
    const nextSubmodule = currentModule.sub_modules[currentSubModuleIndex + 1];
    return {
      type: 'SUBMODULE' as const,
      url: courseNavigation.toSubmodule(courseSlug, nextSubmodule.slug)
    };
  }
  
  // Cek apakah ada quiz di module ini
  if (currentModule.quizzes.length > 0) {
    const nextQuiz = currentModule.quizzes[0];
    return {
      type: 'QUIZ' as const,
      url: courseNavigation.toQuiz(courseSlug, nextQuiz.module_slug)
    };
  }
  
  // Cek apakah ada task di module ini
  if (currentModule.module_tasks.length > 0) {
    return {
      type: 'TASK' as const,
      url: courseNavigation.toTask(courseSlug, currentModule.id)
    };
  }
  
  // Lanjut ke module berikutnya
  if (currentModuleIndex < modules.length - 1) {
    return {
      type: 'MODULE' as const,
      url: courseNavigation.toModule(courseSlug, currentModuleIndex + 1)
    };
  }
  
  // Final audit jika semua module selesai
  return {
    type: 'FINAL_AUDIT' as const,
    url: courseNavigation.toFinalAudit(courseSlug)
  };
};

/**
 * Helper untuk mendapatkan navigasi sebelumnya
 */
export const getPrevNavigation = (
  currentModuleIndex: number,
  currentSubModuleIndex: number,
  modules: ModuleType[],
  courseSlug: string
) => {
  if (!modules.length || currentModuleIndex === null) return null;

  const currentModule = modules[currentModuleIndex];
  
  // Cek apakah ada submodule sebelumnya di module yang sama
  if (currentSubModuleIndex !== null && currentSubModuleIndex > 0) {
    const prevSubmodule = currentModule.sub_modules[currentSubModuleIndex - 1];
    return {
      type: 'SUBMODULE' as const,
      url: courseNavigation.toSubmodule(courseSlug, prevSubmodule.slug)
    };
  }
  
  // Kembali ke module sebelumnya
  if (currentModuleIndex > 0) {
    const prevModule = modules[currentModuleIndex - 1];
    // Coba cari submodule terakhir di module sebelumnya
    if (prevModule.sub_modules.length > 0) {
      const lastSubmodule = prevModule.sub_modules[prevModule.sub_modules.length - 1];
      return {
        type: 'SUBMODULE' as const,
        url: courseNavigation.toSubmodule(courseSlug, lastSubmodule.slug)
      };
    }
  }
  
  return null;
};