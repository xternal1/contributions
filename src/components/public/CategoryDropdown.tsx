import { useState, useEffect } from "react";
import { HiChevronDown, HiOutlineViewGridAdd } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategories } from "../../features/course/_service/course_service";
import type { Category } from "../../features/course/_course";

interface CategoryDropdownProps {
  setFilters: React.Dispatch<React.SetStateAction<{
    categories: string[];
    priceMin: string;
    priceMax: string;
    search: string;
  }>>;
}

const CategoryDropdown = ({ setFilters }: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleCategoryClick = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: [category]
    }));
    navigate(`/course?category=${encodeURIComponent(category)}`);
    setIsOpen(false);
  };

  return (
    <div className="relative font-sans">
      {/* Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center pl-5 pr-3 text-gray-500 cursor-pointer select-none"
      >
        <HiOutlineViewGridAdd size={20} className="text-purple-600" />
        <span className="text-xs ml-2">Pilih Kategori</span>
        <HiChevronDown
          className={`ml-1 size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 mt-5 w-40 bg-white border text-left border-gray-200 rounded-md shadow-lg z-50"
          >
            {loading ? (
              <li className="py-2 px-4 text-xs text-gray-500">Loading...</li>
            ) : (
              categories.map((category, index) => (
                <li
                  key={index}
                  className="group relative py-2 pl-4 pr-2 hover:bg-gray-100 text-xs text-gray-700 cursor-pointer whitespace-nowrap"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {category.name}

                  {/* Submenu with Animation */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.ul
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-0 left-full ml-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                      >
                        {category.sub_category.map((sub) => (
                          <li
                            key={sub.id}
                            className="py-2 pl-4 pr-2 hover:bg-purple-100 text-xs text-purple-600 whitespace-nowrap"
                            onClick={() =>
                              typeof sub === "string"
                                ? handleCategoryClick(sub)
                                : handleCategoryClick(sub.name)
                            }
                          >
                            {typeof sub === "string" ? sub : sub.name}
                          </li>
                        )
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryDropdown;
