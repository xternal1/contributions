import React from "react";
import NavigationControlsComponent from "@/components/coursemodule/NavigationControls";
import type { ModuleDetailType } from "@features/module/_module";

interface ModuleContentProps {
  data: ModuleDetailType;
  currentNavIndex: number;
  totalNavItems: number;
  currentSlug?: string | null;
  onNext: () => void;
  onPrevious: () => void;
  onDiscussion: () => void;
}

const ModuleContent: React.FC<ModuleContentProps> = ({
  data,
  currentNavIndex,
  totalNavItems,
  currentSlug,
  onNext,
  onPrevious,
  onDiscussion,
}) => {
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
        </div>
      </div>
    </main>
  );
};

export default ModuleContent;
