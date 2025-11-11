export default function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse font-sans">
      {/* Box Kategori */}
      <div className="bg-gray-100 rounded-lg shadow p-3 max-w-[220px] dark:bg-[#0D0D1A]">
        <div className="h-5 w-24 bg-gray-200 rounded mb-5 dark:bg-[#141427]" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded dark:bg-[#141427]" />
              <div className="w-28 h-4 bg-gray-200 rounded dark:bg-[#141427]" />
            </div>
          ))}
        </div>
      </div>

      {/* Box Harga */}
      <div className="bg-gray-100 rounded-lg shadow p-3 max-w-[220px] dark:bg-[#0D0D1A]">
        <div className="h-5 w-16 bg-gray-200 rounded mb-5 dark:bg-[#141427]" />
        <div className="flex flex-col gap-3">
          <div className="w-full h-8 bg-gray-200 rounded dark:bg-[#141427]" />
          <div className="w-full h-8 bg-gray-200 rounded dark:bg-[#141427]" />
        </div>
      </div>

      {/* Tombol Terapkan */}
      <div className="pt-2">
        <div className="w-full h-9 bg-gray-200 rounded-full dark:bg-[#0D0D1A]" />
      </div>
    </div>
  );
}
