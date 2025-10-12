import BackgroundShapes from "../../public/BackgroundShapes";

export default function Header() {
  return (
    <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 overflow-hidden">
        <BackgroundShapes />
        <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Kursus
          </h1>
          <p className="mt-2 text-xs sm:text-xs text-gray-800">
            <a href="/">Beranda</a>
            <span className="mx-1">&gt;</span>
            <span className="text-purple-600">Kursus</span>
          </p>
        </div>
      </div>
  );
}
