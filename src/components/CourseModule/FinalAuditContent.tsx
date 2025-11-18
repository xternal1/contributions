import React from "react";
import NavigationControlsComponent from "@components/coursemodule/NavigationControls";
import type { CoursePostTest } from "@features/module/_module";

interface FinalAuditContentProps {
  data: CoursePostTest;
  error: string | null;
  currentNavIndex: number;
  totalNavItems: number;
  currentSlug?: string | null;
  onNext: () => void;
  onPrevious: () => void;
  onDiscussion: () => void;
}

const FinalAuditContent: React.FC<FinalAuditContentProps> = ({
  data,
  error,
  currentNavIndex,
  totalNavItems,
  currentSlug,
  onNext,
  onPrevious,
  onDiscussion,
}) => {
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

export default FinalAuditContent;
