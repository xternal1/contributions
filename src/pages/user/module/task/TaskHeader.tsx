import BackgroundShapes from "../../../../components/public/BackgroundShapes";

interface Props {
  title?: string;
}

export default function TaskHeader({ title = "Tugas" }: Props) {
  return (
    <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-hidden transition-colors duration-500">
      <BackgroundShapes />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
        {/* wrapper untuk mengatur seberapa jauh teks maju */}
        <div className="sm:pl-4 md:pl-12 lg:pl-24 xl:pl-12">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-800 dark:text-gray-300">
            <a href="/" className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Beranda
            </a>
            <span className="mx-1 text-gray-800 dark:text-white">&gt;</span>
            <a href="/course" className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Kursus
            </a>
            <span className="mx-1 text-gray-800 dark:text-white">&gt;</span>
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              {title}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}