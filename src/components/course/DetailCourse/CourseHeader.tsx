import BackgroundShapes from "../../public/BackgroundShapes";

interface Props {
  title?: string;
}

export default function CourseHeader({ title = "Kursus" }: Props) {
  return (
    <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 dark:bg-[#0D0D1A] dark:bg-none overflow-hidden transition-colors duration-500">
      <BackgroundShapes />
      <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-left relative z-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
          Kursus
        </h1>
        <p className="mt-2 text-xs sm:text-xs text-gray-800 dark:text-white">
          <a href="/" className="dark:text-white">Beranda</a>
          <span className="mx-1 dark:text-white">&gt;</span>
          <a href="/course" className="dark:text-white">Kursus</a>
          <span className="mx-1 dark:text-white">&gt;</span>
          <span className="text-purple-600 dark:text-purple-400">{title}</span>
        </p>
      </div>
    </div>
  );
}