import React from 'react';
import { MessageCircle } from 'lucide-react';

interface NavigationControlsProps {
  currentNavIndex: number;
  totalNavItems: number;
  currentSlug?: string | null;
  onNext: () => void;
  onPrevious: () => void;
  onDiscussion: () => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentNavIndex,
  totalNavItems,
  currentSlug,
  onNext,
  onPrevious,
  onDiscussion,
}) => {
  const canGoPrevious = currentNavIndex > 0;
  const canGoNext = currentNavIndex < totalNavItems - 1;

  const baseButton =
    'flex items-center justify-center gap-2 px-4 sm:px-5 h-10 sm:h-7 rounded-lg font-sans font-semibold text-[12px] sm:text-[13px] transition-all duration-300 ease-in-out';

  const circleBase =
    'w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center text-[16px] sm:text-[18px] font-bold transition-all duration-300 ease-in-out';

  return (
    <div className="flex flex-row justify-between items-center gap-3 sm:gap-4 transition-colors duration-500">

      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`${baseButton} ${canGoPrevious
            ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer'
            : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}
      >
        <div
          className={`${circleBase} ${canGoPrevious
              ? 'border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:border-purple-600 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              : 'border-gray-400 dark:border-gray-600 text-gray-400 dark:text-gray-600'
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
            ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer'
            : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
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
            ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer'
            : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}
      >
        <span>Selanjutnya</span>
        <div
          className={`${circleBase} ${canGoNext
              ? 'border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:border-purple-600 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              : 'border-gray-400 dark:border-gray-600 text-gray-400 dark:text-gray-600'
            }`}
        >
          →
        </div>
      </button>
    </div>
  );
};

export default NavigationControls;
