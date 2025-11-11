import { useState, useEffect, useRef } from "react";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

type Option = { label: string; value: string };

type SortDropdownProps = {
  selected: string;
  onChange: (value: string) => void;
  loading?: boolean;
  variant?: "time" | "status";
};

const sortOptionsMap: Record<"time" | "status", Option[]> = {
  time: [
    { label: "Semua", value: "all" },
    { label: "Sedang Berlangsung", value: "Sedang Berlangsung" },
    { label: "Akan Datang", value: "Akan Datang" },
    { label: "Sudah Berlalu", value: "Sudah Berlalu" },
  ],
  status: [
    { label: "Semua", value: "all" },
    { label: "Diterima", value: "accepted" },
    { label: "Ditolak", value: "rejected" },
    { label: "Dibatalkan", value: "canceled" },
  ],
};

const SortDropdownEvent: React.FC<SortDropdownProps> = ({
  selected,
  onChange,
  loading = false,
  variant = "time",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = sortOptionsMap[variant];
  const selectedLabel = options.find((opt) => opt.value === selected)?.label || "Semua";

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
        className={`flex items-center justify-between gap-2 px-2 min-w-[150px] py-1 border-2 rounded-md transition-colors duration-200 ${
          isOpen
            ? "border-purple-500 text-purple-700 dark:text-white focus-within:ring-2 focus-within:ring-purple-500"
            : "border-purple-500 text-gray-800 dark:text-white focus-within:ring-2 focus-within:ring-purple-500"
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
            className="absolute left-0 mt-1 w-auto min-w-[150px] bg-white border border-gray-200 rounded-md shadow-lg z-50 dark:bg-[#0D0D1A] dark:border-purple-500 dark:text-white"
          >
            <ul className="py-1" role="listbox">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700 dark:text-white dark:hover:bg-[#141427] dark:hover:text-purple-500"
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

export default SortDropdownEvent;
