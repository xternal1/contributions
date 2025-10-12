import { motion } from "framer-motion";

export default function CourseDetailSkeleton() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {/* Header Skeleton */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="h-10 bg-gray-300 rounded-lg animate-pulse w-3/4 mb-4"></div>
      </div>

      {/* Layout Utama Skeleton */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Konten Utama Skeleton */}
        <div className="lg:col-span-8 space-y-6">
          {/* Gambar Skeleton */}
          <div className="w-full aspect-[16/9] bg-gray-300 rounded-xl animate-pulse"></div>
          
          {/* Judul Skeleton */}
          <div className="h-8 bg-gray-300 rounded-lg animate-pulse w-4/5"></div>
          
          {/* Info Skeleton */}
          <div className="flex flex-wrap gap-4">
            <div className="h-6 bg-gray-300 rounded-full animate-pulse w-24"></div>
            <div className="h-6 bg-gray-300 rounded-full animate-pulse w-32"></div>
          </div>
          
          {/* Author & Info Skeleton */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-40"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-28"></div>
          </div>
          
          {/* Tabs Skeleton */}
          <div className="flex gap-3 mt-8">
            <div className="h-10 bg-gray-300 rounded-full animate-pulse w-28"></div>
            <div className="h-10 bg-gray-300 rounded-full animate-pulse w-32"></div>
            <div className="h-10 bg-gray-300 rounded-full animate-pulse w-24"></div>
          </div>
          
          {/* Content Skeleton */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 mt-6 space-y-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-2/3"></div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-4">
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-300">
            {/* Harga Skeleton */}
            <div className="bg-gray-300 border border-gray-400 rounded-xl p-4 animate-pulse">
              <div className="h-5 bg-gray-400 rounded w-1/3 mb-2"></div>
              <div className="h-8 bg-gray-400 rounded w-1/2"></div>
            </div>

            {/* Tombol Skeleton */}
            <div className="my-6 h-12 bg-gray-300 rounded-full animate-pulse"></div>

            {/* Info Kursus Skeleton */}
            <div className="pt-3 pb-3">
              <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center gap-3 border-b border-gray-300 pb-4">
                    <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metode Pembayaran Skeleton */}
            <div className="border-b border-gray-300 pb-5">
              <div className="h-5 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="w-12 h-10 bg-gray-300 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Bagikan Skeleton */}
            <div className="border-b border-gray-300 pb-5 mt-4">
              <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}