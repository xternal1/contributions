import { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarSkeleton from "../../course/PageCourse/SidebarSkeleton";

import type { Eventype, EventCategory } from "../../../features/event/_event";
import { fetchEventCategories } from "../../../features/event/_services/eventService";

type EventKategoryProps = {
  loading: boolean;
  events: Eventype[];
  onFilter: (filteredEvents: Eventype[]) => void;
};

type FiltersState = {
  categories: string[];
  eventTypes: string[];
  priceMin: string;
  priceMax: string;
};

const initialFilters: FiltersState = {
  categories: [],
  eventTypes: [],
  priceMin: "",
  priceMax: "",
};

type CategoryGroup = {
  id: string;
  name: string;
  count: number;
  subcategories: { id: string; name: string; count: number }[];
};

const EventKategory: React.FC<EventKategoryProps> = ({ loading, events, onFilter }) => {
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [localFilters, setLocalFilters] = useState<FiltersState>(initialFilters);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<EventCategory[]>([]);

  useEffect(() => {
    fetchEventCategories()
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const toggleGroup = (id: string) => {
    setIsInitialRender(false);
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleCheckbox = (subId: string) => {
    setLocalFilters((prev) => {
      const categories = prev.categories.includes(subId)
        ? prev.categories.filter((c) => c !== subId)
        : [...prev.categories, subId];
      return { ...prev, categories };
    });
  };

  const handleEventType = (type: string) => {
    setLocalFilters((prev) => {
      const eventTypes = prev.eventTypes.includes(type)
        ? prev.eventTypes.filter((t) => t !== type)
        : [...prev.eventTypes, type];
      return { ...prev, eventTypes };
    });
  };

  const CATEGORY_GROUPS: CategoryGroup[] = useMemo(() => {
    return categories.map((cat) => {
      const subcategories = cat.sub_category.map((sub) => {
        const count = events.filter((e) => e.event_sub_category_id === sub.id).length;
        return { id: sub.id, name: sub.name, count };
      });
      const catCount =
        subcategories.reduce((sum, s) => sum + s.count, 0) ||
        events.filter((e) => e.event_category_id === cat.id).length;

      return {
        id: cat.id,
        name: cat.name,
        count: catCount,
        subcategories,
      };
    });
  }, [categories, events]);

  const applyFilters = useCallback(
    (allEvents: Eventype[]) => {
      let filtered = allEvents;

      if (localFilters.categories.length > 0) {
        filtered = filtered.filter((event) =>
          localFilters.categories.includes(event.event_sub_category_id || event.event_category_id)
        );
      }

      if (localFilters.eventTypes.length > 0) {
        filtered = filtered.filter((event) => {
          const type = event.has_certificate === 0 ? "Gratis" : "Berbayar";
          return localFilters.eventTypes.includes(type);
        });
      }

      const min = localFilters.priceMin ? Number(localFilters.priceMin) : 0;
      const max = localFilters.priceMax ? Number(localFilters.priceMax) : Infinity;
      filtered = filtered.filter((event) => event.price >= min && event.price <= max);

      onFilter(filtered);
    },
    [localFilters, onFilter]
  );

  useEffect(() => {
    applyFilters(events);
  }, [events, applyFilters]);

  const handleApplyClick = () => {
    applyFilters(events);
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <SidebarSkeleton />;
  }

  const freeCount = events.filter((e) => e.has_certificate === 0).length;
  const paidCount = events.filter((e) => e.has_certificate === 1).length;

  const renderSidebarContent = () => (
    <div className="flex flex-col self-start font-sans w-full 2xl:w-60 xl:w-50 lg:w-50 space-y-5">
      <div className="flex-grow overflow-y-auto space-y-6 pb-30 scrollbar-hide">
        {/* Kategori */}
        <div className="bg-gray-100 rounded-lg shadow p-5">
          <h3 className="text-[16px] font-semibold text-black mb-5 text-left">
            Kategori
          </h3>
          <div className="space-y-2 ml-1">
            {CATEGORY_GROUPS.map((cat) => (
              <div key={cat.id}>
                <button
                  className="flex items-center justify-between w-full text-left font-normal text-gray-700 px-2 py-2 rounded-lg hover:bg-gray-50 focus:outline-none text-[13px]"
                  onClick={() => toggleGroup(cat.id)}
                >
                  <div className="flex items-center gap-1 text-[13px]">
                    <span>{cat.name}</span>
                    <span className="text-gray-400 text-[11px]">({cat.count})</span>
                  </div>
                  {openGroups.includes(cat.id) ? (
                    <ChevronUp size={12} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={12} className="text-gray-400" />
                  )}
                </button>

                <AnimatePresence initial={!isInitialRender}>
                  {openGroups.includes(cat.id) && cat.subcategories.length > 0 && (
                    <motion.div
                      key="subcategories"
                      initial={isInitialRender ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pl-5 pr-3 pt-2 space-y-1">
                        {cat.subcategories.map((sub) => (
                          <label
                            key={sub.id}
                            className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600"
                          >
                            <input
                              type="checkbox"
                              className="accent-purple-600 w-3 h-3 rounded"
                              checked={localFilters.categories.includes(sub.id)}
                              onChange={() => handleCheckbox(sub.id)}
                              disabled={sub.count === 0}
                            />
                            <span className="flex-1 text-left">{sub.name}</span>
                            <span className="text-gray-400 text-[11px]">
                              ({sub.count})
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

        {/* Jenis Event */}
        <div className="bg-gray-100 rounded-lg shadow p-5">
          <h3 className="text-[16px] font-semibold text-black mb-5 text-left">
            Jenis Event
          </h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
              <input
                type="checkbox"
                className="accent-purple-600 w-3 h-3 rounded"
                checked={localFilters.eventTypes.includes("Gratis")}
                onChange={() => handleEventType("Gratis")}
              />
              <span>Gratis</span>
              <span className="text-gray-400 text-[11px]">({freeCount})</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
              <input
                type="checkbox"
                className="accent-purple-600 w-3 h-3 rounded"
                checked={localFilters.eventTypes.includes("Berbayar")}
                onChange={() => handleEventType("Berbayar")}
              />
              <span>Berbayar</span>
              <span className="text-gray-400 text-[11px]">({paidCount})</span>
            </label>
          </div>
        </div>

        {/* Harga */}
        <div className="bg-gray-100 rounded-lg shadow p-5">
          <h3 className="text-[16px] font-semibold text-black mb-5 text-left">Harga</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-stretch border border-gray-300 rounded-md overflow-hidden bg-white">
              <span className="px-3 flex items-center justify-center text-gray-700 text-sm bg-gray-100">
                Rp
              </span>
              <input
                type="number"
                placeholder="Harga Minimum"
                className="flex-1 py-2 px-2 outline-none text-xs text-gray-800 placeholder-gray-700 font-normal"
                value={localFilters.priceMin}
                onChange={(e) => setLocalFilters((prev) => ({ ...prev, priceMin: e.target.value }))}
              />
            </div>

            <div className="flex items-stretch border border-gray-300 rounded-md overflow-hidden bg-white">
              <span className="px-3 flex items-center justify-center text-gray-700 text-sm bg-gray-100">
                Rp
              </span>
              <input
                type="number"
                placeholder="Harga Maksimum"
                className="flex-1 py-2 px-2 outline-none text-xs text-gray-800 placeholder-gray-700 font-normal"
                value={localFilters.priceMax}
                onChange={(e) => setLocalFilters((prev) => ({ ...prev, priceMax: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Tombol Terapkan */}
        <div className="pt-2 flex-shrink-0 max-w-[190px] 2xl:max-w-[230px] xl:max-w-[190px] lg:max-w-[190px] md:max-w-[230px] sm:max-w-[190px] mb-2">
          <button
            onClick={handleApplyClick}
            className="px-4 py-2  rounded-full font-semibold font-sans text-black
                       transition-all duration-200 ease-out w-full text-center
                       bg-[#FBBF24] shadow-[4px_4px_0px_0px_#0B1367]
                       hover:shadow-none active:translate-y-0.5"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Tombol Filter (Mobile) */}
      <div className="flex justify-start lg:hidden mb-4 w-full">
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-medium 
               rounded-xl shadow hover:bg-purple-600 hover:text-white hover:shadow-[5px_5px_0_#D3DAD9] active:scale-95 transition"
          aria-label="Buka filter"
        >
          <SlidersHorizontal size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Sidebar Desktop */}
      <div className="hidden lg:block sticky top-25">
        {renderSidebarContent()}
      </div>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
            />
            <motion.div
              className="fixed top-20 left-0 h-full w-60 md:w-70 sm:w-60 max-h-screen bg-white shadow-2xl z-40 p-5 overflow-y-auto"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filter</h2>
                <button
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>
              {renderSidebarContent()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventKategory;
