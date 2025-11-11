import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

interface DiscussionDropdownProps {
  modules: { id: string | number; title: string }[];
  selectedModule: string;
  onChange: (value: string) => void;
}

const DiscussionDropdown: React.FC<DiscussionDropdownProps> = ({
  modules,
  selectedModule,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: string | number | "") => {
    onChange(String(id));
    setIsOpen(false);
  };

  return (
    <div className="relative font-sans w-full">
      {/* Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm 
        shadow rounded-lg bg-white text-gray-700 cursor-pointer 
        hover:border-purple-500 transition-all duration-300
        dark:bg-[#141427] dark:border dark:border-white dark:text-white"
      >
        <span>
          {selectedModule
            ? modules.find((m) => String(m.id) === selectedModule)?.title ??
              "-- Pilih Modul --"
            : "-- Pilih Modul --"}
        </span>

        <HiChevronDown
          className={`ml-1 size-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
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
            className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg 
            shadow-lg z-50 text-sm overflow-hidden dark:bg-[#0D0D1A] dark:border-white text-start"
          >
            {/* Pilih Modul Option */}
            <li
              onClick={() => handleSelect("")}
              className={`px-4 py-2 cursor-pointer hover:bg-purple-100 text-gray-700 
              dark:text-white dark:hover:bg-purple-600 transition-colors duration-150
              ${selectedModule === "" ? "bg-purple-100 dark:bg-purple-700" : ""}`}
            >
              -- Pilih Modul --
            </li>

            {/* List Modul */}
            {modules.length > 0 ? (
              modules.map((mod) => (
                <li
                  key={mod.id}
                  onClick={() => handleSelect(mod.id)}
                  className={`px-4 py-2 cursor-pointer hover:bg-purple-100 text-gray-700 
                  dark:text-white dark:hover:bg-purple-600 transition-colors duration-150
                  ${
                    String(mod.id) === selectedModule
                      ? "bg-purple-100 dark:bg-purple-700"
                      : ""
                  }`}
                >
                  {mod.title}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 dark:text-white">
                Memuat modul...
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscussionDropdown;
