// src/components/faq/FaqItem.tsx
import { useState } from "react";
import type { Faq } from "../../features/faq/_faq";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  faq: Faq;
}

export default function FaqItem({ faq }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Pertanyaan */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center px-5 py-4 text-left text-[14px] font-medium text-purple-700 hover:text-purple-900 transition-colors"
      >
        <span>{faq.question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown className="text-gray-500" />
        </motion.span>
      </button>

      {/* Jawaban */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div
              className="bg-purple-100 text-gray-700 text-xs px-6 py-5 leading-relaxed prose prose-sm max-w-none text-left"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
