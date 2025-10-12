import { useState, useEffect, useRef } from "react";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

type Option = { label: string; value: string };

type SortDropdownProps = {
  selected: string;
  onChange: (value: string) => void;
  loading?: boolean;
};

const sortOptions: Option[] = [
  { label: "Populer", value: "terpopuler" },
  { label: "Terbaru", value: "terbaru" },
  { label: "Terlama", value: "terlama" },
];

const SortDropdown: React.FC<SortDropdownProps> = ({
  selected,
  onChange,
  loading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    sortOptions.find((opt) => opt.value === selected)?.label || "Terbaru";


  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse"></div>;
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-sm">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-3 py-1.5 border rounded-md transition-colors duration-200 ${isOpen ? "border-purple-500 text-purple-700" : "border-gray-300 text-gray-800"
          } hover:border-purple-500 hover:text-purple-700`}
      >
        <span>{selectedLabel}</span>
        <HiChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50"
          >
            <ul className="py-1" role="listbox">
              {sortOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
