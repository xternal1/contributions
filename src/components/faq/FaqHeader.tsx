import BackgroundShapes from "../public/BackgroundShapes";
import { FiChevronRight } from "react-icons/fi";

export default function FaqHeader() {
  return (
    <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 dark:bg-[#0D0D1A] dark:bg-none overflow-hidden transition-colors duration-500">
      <BackgroundShapes />
      
      {/* Konten tengah */}
      <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-center sm:text-left relative z-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white transition-colors duration-500">
          FAQ
        </h1>
        <p className="mt-2 flex items-center text-gray-800 dark:text-white text-xs sm:text-sm transition-colors duration-500">
          <a href="/" className="text-xs dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">Beranda</a>
          <FiChevronRight className="mx-1 text-gray-500 dark:text-gray-400 transition-colors duration-500" />
          <span className="text-purple-600 dark:text-purple-400 text-xs transition-colors duration-500">FAQ</span>
        </p>
      </div>
    </div>
  );
}