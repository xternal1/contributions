import React from "react";
import { BookOpen } from "lucide-react";

const OverviewContent: React.FC = () => {
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
};

export default OverviewContent;
