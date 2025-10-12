// components/course/kursus/CourseSkeleton.tsx
interface CourseSkeleton {
  viewMode?: "grid" | "list";
}

export default function CourseSkeleton({ viewMode = "grid" }: CourseSkeleton) {
  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row gap-4 w-full bg-white rounded-xl border border-gray-300 p-4 animate-pulse">
        <div className="sm:w-40 sm:h-28 w-full h-40 bg-gray-300 rounded-lg"></div>
        <div className="flex flex-col flex-1 justify-between gap-3">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="flex justify-between items-center mt-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto h-full flex flex-col bg-white rounded-xl border border-gray-400 shadow-sm overflow-hidden animate-pulse">
      <div className="w-full aspect-video bg-gray-300"></div>
      <div className="flex-1 px-4 py-3 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}