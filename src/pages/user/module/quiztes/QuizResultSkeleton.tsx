import React from "react";

const QuizResultSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#141427] p-6 animate-pulse">
      <div className="w-full max-w-5xl space-y-6">
        {/* Header Skeleton */}
        <div className="w-3/4 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg mx-auto" />

        {/* Card Intro Skeleton */}
        <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow p-6 flex flex-col md:flex-row justify-between">
          <div className="space-y-3 w-full md:w-2/3">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
          </div>
          <div className="w-56 h-40 bg-gray-300 dark:bg-gray-600 rounded-xl mt-6 md:mt-0" />
        </div>

        {/* Kartu hasil kiri + kanan */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2fr] gap-6">
          {/* Kiri */}
          <div className="bg-white dark:bg-[#0D0D1A] dark:border dark:border-gray-700 rounded-lg p-6 space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4" />
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full" />
          </div>

          {/* Kanan */}
          <div className="space-y-6">
            {[...Array(2)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0D0D1A] dark:border dark:border-gray-700 rounded-lg p-6 space-y-4"
              >
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                <div className="space-y-2 mt-4">
                  {[...Array(4)].map((_, optIdx) => (
                    <div
                      key={optIdx}
                      className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultSkeleton;
