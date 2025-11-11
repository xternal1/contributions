import React from "react";

const QuizSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#141427] flex flex-col items-center justify-center transition-colors duration-500 px-6 py-10">
      {/* Header Skeleton */}
      <div className="w-full max-w-5xl bg-gradient-to-br from-purple-500 to-purple-700 h-20 rounded-xl animate-pulse mb-8"></div>

      {/* Main Card Skeleton */}
      <div className="w-full max-w-5xl bg-white dark:bg-[#0D0D1A] dark:border-2 dark:border-white rounded-xl shadow p-8 animate-pulse">
        {/* Question Number */}
        <div className="w-1/3 h-5 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>

        {/* Question Text */}
        <div className="space-y-3 mb-6">
          <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-32 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <div className="w-full max-w-5xl mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3"></div>
        <div className="bg-white dark:bg-[#0D0D1A] dark:border-2 dark:border-white rounded-xl p-6 animate-pulse">
          <div className="w-1/2 h-5 bg-gray-300 dark:bg-gray-700 rounded mb-5"></div>

          <div className="grid grid-cols-7 gap-3 mb-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>

          <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default QuizSkeleton;
