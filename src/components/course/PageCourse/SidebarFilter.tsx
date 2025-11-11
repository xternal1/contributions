import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarSkeleton from "./SidebarSkeleton";
import { fetchCategories } from "../../../features/course/_service/course_service";
import type { Category } from "../../../features/course/_course";

// 🎯 Tipe filter
interface FiltersState {
  categories: string[];
  priceMin: string;
  priceMax: string;
  search: string;
}

interface SidebarFilterProps {
  filters: FiltersState;
  setFilters: Dispatch<SetStateAction<FiltersState>>;
}

export default function SidebarFilter({ filters, setFilters }: SidebarFilterProps) {
  // State internal
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FiltersState>(filters);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Data kategori
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  // 🔄 Fetch kategori dari API
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  // 📂 Toggle buka/tutup grup kategori
  const toggleGroup = (name: string) => {
    setIsInitialRender(false);
    setOpenGroups((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    );
  };

  // ✅ Checkbox kategori
  const handleCheckbox = (category: string) => {
    setLocalFilters((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  // 🔎 Terapkan filter
  const applyFilters = () => {
    setFilters(localFilters);
    setIsOpen(false);
  };

  // 📦 Konten Sidebar
  const SidebarContent = (
    <div className="flex flex-col h-full font-sans">
      <div className="space-y-6 pb-2 overflow-y-auto scrollbar-hide text-sm flex-grow">
        {/* Kategori */}
        <div className="bg-gray-100 dark:bg-[#0D0D1A] dark:border dark:border-white rounded-lg shadow p-3 max-w-[220px]">
          <h3 className="text-[16px] font-semibold text-black dark:text-white mb-5 text-left">Kategori</h3>
          <div className="space-y-2 ml-1">
            {categories.map((group) => (
              <div key={group.id}>
                {/* Grup Kategori */}
                <button
                  className="flex items-center justify-between w-full text-left font-normal text-gray-700 dark:text-white px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#141427] focus:outline-none text-[13px]"
                  onClick={() => toggleGroup(group.name)}
                >
                  <div className="flex items-center gap-1 text-[13px]">
                    <span>{group.name}</span>
                    <span className="text-gray-400 dark:text-gray-300 text-[11px]">({group.course_item_count})</span>
                  </div>
                  {openGroups.includes(group.name) ? (
                    <ChevronUp size={12} className="text-gray-400 dark:text-white" />
                  ) : (
                    <ChevronDown size={12} className="text-gray-400 dark:text-white" />
                  )}
                </button>

                {/* Subkategori */}
                <AnimatePresence initial={!isInitialRender}>
                  {openGroups.includes(group.name) && group.sub_category.length > 0 && (
                    <motion.div
                      key="subcategories"
                      initial={isInitialRender ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pl-5 pr-3 pt-2 space-y-1">
                        {group.sub_category.map((subcategory) => (
                          <label
                            key={subcategory.id}
                            className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600 dark:text-white"
                          >
                            <input
                              type="checkbox"
                              className="accent-purple-600 w-3 h-3 rounded"
                              checked={localFilters.categories.includes(subcategory.name)}
                              onChange={() => handleCheckbox(subcategory.name)}
                              disabled={subcategory.course_count === 0}
                            />
                            <span className="flex-1 text-left">{subcategory.name}</span>
                            <span className="text-gray-400 dark:text-gray-300 text-[11px]">
                              ({subcategory.course_count})
                            </span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Harga */}
        <div className="bg-gray-100 dark:bg-[#0D0D1A] dark:border dark:border-white rounded-lg shadow p-3 max-w-[220px] mb-5">
          <h3 className="text-[16px] font-semibold text-black dark:text-white mb-5 text-left">Harga</h3>
          <div className="flex flex-col gap-2">
            {/* Harga Minimum */}
            <div className="flex items-stretch border border-gray-300 dark:border-purple-700 rounded-md overflow-hidden bg-white dark:bg-[#141427]">
              <span className="px-3 flex items-center justify-center text-gray-700 dark:text-white text-sm bg-gray-100 dark:bg-purple-700">Rp</span>
              <input
                type="number"
                placeholder="Harga Minimum"
                className="flex-1 px-2 py-2 outline-none text-xs text-gray-800 dark:text-white placeholder-gray-700 dark:placeholder-white font-normal"
                value={localFilters.priceMin}
                onChange={(e) => setLocalFilters((prev) => ({ ...prev, priceMin: e.target.value }))}
              />
            </div>

            {/* Harga Maksimum */}
            <div className="flex items-stretch border border-gray-300 dark:border-purple-700 rounded-md overflow-hidden bg-white dark:bg-[#141427]">
              <span className="px-3 flex items-center justify-center text-gray-700 dark:text-white text-sm bg-gray-100 dark:bg-purple-700">Rp</span>
              <input
                type="number"
                placeholder="Harga Maksimum"
                className="flex-1 px-2 py-2 outline-none text-xs text-gray-800 dark:text-white placeholder-gray-700 dark:placeholder-white font-normal"
                value={localFilters.priceMax}
                onChange={(e) => setLocalFilters((prev) => ({ ...prev, priceMax: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Terapkan */}
      <div className="pt-4 flex-shrink-0 mb-30">
        <button
          onClick={applyFilters}
          className="
      w-full text-center px-4 py-2 rounded-full font-semibold font-sans 
      text-black dark:text-white
      bg-[#FBBF24] dark:bg-purple-700
      border border-black dark:hover:border-purple-800
      shadow-[4px_4px_0px_0px_#0B1367] 
      dark:shadow-purple-400
      transition-all duration-300 ease-in-out
      hover:translate-y-[2px] hover:shadow-none
      active:translate-y-[3px]
      dark:hover:shadow-none
    "
        >
          Terapkan
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Tombol buka filter (mobile) */}
      <div className="md:hidden mb-3">
        <button
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 dark:bg-purple-700 dark:hover:bg-purple-600 text-black dark:text-white font-medium px-3 py-2 rounded-md text-sm"
          onClick={() => setIsOpen(true)}
        >
          <SlidersHorizontal size={16} /> Filter
        </button>
      </div>

      {/* Sidebar desktop */}
      <aside className="hidden md:block w-[220px] sticky top-25 bottom-20 h-fit p-2 text-sm">
        {loading ? <SidebarSkeleton /> : SidebarContent}
      </aside>

      {/* Drawer mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
          <div className="bg-white dark:bg-[#141427] w-64 sm:w-72 h-screen p-4 shadow-lg relative animate-slideInRight text-sm">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
            <div className="pt-8 h-full">
              {loading ? <SidebarSkeleton /> : SidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}