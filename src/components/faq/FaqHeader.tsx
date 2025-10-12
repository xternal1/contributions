import BackgroundShapes from "../public/BackgroundShapes";
import { FiChevronRight } from "react-icons/fi";

export default function FaqHeader() {
  return (
   <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 overflow-hidden">
        <BackgroundShapes />

        {/* Konten tengah */}
        <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-center sm:text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">FAQ</h1>
          <p className="mt-2 flex items-center text-gray-800 text-xs sm:text-sm">
            <a href="/" className="text-xs">Beranda</a>
            <FiChevronRight className="mx-1 text-gray-500" />
            <span className="text-purple-600 text-xs">FAQ</span>
          </p>
        </div>
      </div>
  );
}
