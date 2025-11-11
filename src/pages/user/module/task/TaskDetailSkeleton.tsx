export default function TaskDetailPageSkeleton() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Header Skeleton */}
      <div className="relative px-6 py-11 bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-hidden transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="sm:pl-4 md:pl-12 lg:pl-24 xl:pl-12">
            <div className="h-8 w-48 bg-gray-200 rounded dark:bg-gray-700 mb-3 animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-16 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-300 rounded dark:bg-gray-600 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 min-h-screen max-w-6xl mx-auto">
        {/* Detail Tugas Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6 transition-colors duration-500 animate-pulse">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
            <div className="flex-1">
              <div className="h-6 w-32 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded dark:bg-gray-700"></div>
                <div className="h-4 w-4/5 bg-gray-200 rounded dark:bg-gray-700"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded dark:bg-gray-700"></div>
                <div className="h-4 w-full bg-gray-200 rounded dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 px-5 py-3 rounded-xl text-center min-w-[140px] transition-colors duration-500">
              <div className="h-4 w-20 bg-gray-300 rounded dark:bg-gray-600 mb-3 mx-auto"></div>
              <div className="h-8 w-12 bg-gray-300 rounded dark:bg-gray-600 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex gap-3 mb-6">
          <div className="h-10 w-32 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
        </div>

        {/* Konten Upload Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transition-colors duration-500 animate-pulse">
          {/* Judul dan Deskripsi */}
          <div className="h-6 w-24 bg-gray-200 rounded dark:bg-gray-700 mb-3"></div>
          <div className="h-4 w-64 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>

          {/* Box Informasi */}
          <div className="border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 p-4 mb-5">
            <div className="flex items-center mb-2">
              <div className="w-5 h-5 bg-gray-300 rounded dark:bg-gray-600 mr-2"></div>
              <div className="h-4 w-20 bg-gray-300 rounded dark:bg-gray-600"></div>
            </div>
            <div className="space-y-2 ml-6">
              <div className="h-3 w-full bg-gray-300 rounded dark:bg-gray-600"></div>
              <div className="h-3 w-4/5 bg-gray-300 rounded dark:bg-gray-600"></div>
              <div className="h-3 w-3/4 bg-gray-300 rounded dark:bg-gray-600"></div>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center min-h-[280px] w-full max-w-3xl mx-auto px-6 bg-gray-50 dark:bg-gray-700 mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-600 mb-3"></div>
            <div className="h-4 w-48 bg-gray-300 rounded dark:bg-gray-600 mb-4"></div>
            <div className="h-10 w-32 bg-gray-300 rounded-full dark:bg-gray-600"></div>
          </div>

          {/* Input Link Skeleton (tersembunyi default) */}
          <div className="space-y-4">
            <div className="h-4 w-40 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="h-10 w-full bg-gray-200 rounded-lg dark:bg-gray-700"></div>
          </div>

          {/* Tombol Navigasi */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="h-10 w-24 bg-gray-300 rounded-full dark:bg-gray-600"></div>
            <div className="h-10 w-24 bg-gray-300 rounded-full dark:bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}