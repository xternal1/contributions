// components/course/kursus/CourseSkeleton.tsx
interface CourseSkeleton {
  viewMode?: "grid" | "list";
}

export default function CourseSkeleton({ viewMode = "grid" }: CourseSkeleton) {
  if (viewMode === "list") {
    return (
      <div className="
        flex flex-col sm:flex-row gap-4 w-full 
        bg-white dark:bg-[#1A1A2E]
        border border-gray-300 dark:border-[#2B2B40]
        p-4 rounded-xl animate-pulse
        transition-colors duration-500
      ">
        <div className="sm:w-40 sm:h-28 w-full h-40 bg-gray-300 dark:bg-[#2C2C40] rounded-lg"></div>
        <div className="flex flex-col flex-1 justify-between gap-3">
          <div className="h-4 bg-gray-300 dark:bg-[#2C2C40] rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 dark:bg-[#2C2C40] rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-[#2C2C40] rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-[#2C2C40] rounded w-2/3"></div>
          <div className="flex justify-between items-center mt-2">
            <div className="h-4 bg-gray-300 dark:bg-[#2C2C40] rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 dark:bg-[#2C2C40] rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // versi grid
  return (
    <div className="
      w-full max-w-sm mx-auto h-full flex flex-col 
      bg-white dark:bg-[#1A1A2E]
      border border-gray-400 dark:border-[#2B2B40]
      shadow-sm overflow-hidden rounded-xl animate-pulse
      transition-colors duration-500
    ">
      <div className="w-full aspect-video bg-gray-300 dark:bg-[#2C2C40]"></div>
      <div className="flex-1 px-4 py-3 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="h-6 bg-gray-300 dark:bg-[#2C2C40] rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 dark:bg-[#2C2C40] rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-gray-300 dark:bg-[#2C2C40] rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-[#2C2C40] rounded w-1/2"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="h-8 bg-gray-300 dark:bg-[#2C2C40] rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 dark:bg-[#2C2C40] rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
