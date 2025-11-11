// src/pages/Faq/FaqCategoryDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFaqCategoryDetail } from "../../../features/faq/_service/faq_service";
import type { FaqCategory } from "../../../features/faq/_faq";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqCategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<FaqCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    async function loadDetail() {
      if (!id) return;
      try {
        const data = await fetchFaqCategoryDetail(Number(id));
        setCategory(data);
      } catch (error) {
        console.error("Gagal mengambil detail kategori FAQ:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [id]);

  const toggleFaq = (faqId: number) => {
    setActiveId(activeId === faqId ? null : faqId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400 transition-colors duration-500">
          Memuat detail kategori FAQ...
        </p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10 transition-colors duration-500">
        Kategori tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 transition-colors duration-500">
      <Link 
        to="/faq" 
        className="text-blue-600 dark:text-blue-400 hover:underline inline-block mb-6 transition-colors duration-300"
      >
        ← Kembali ke FAQ
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-500">
        Kategori: {category.name}
      </h1>

      {category.faqs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 transition-colors duration-500">
          Belum ada pertanyaan di kategori ini.
        </p>
      ) : (
        <div className="space-y-4">
          {category.faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm bg-white dark:bg-gray-800 transition-colors duration-500"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl transition-colors duration-300"
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: activeId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500 dark:text-gray-400 transition-colors duration-500"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-4 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 transition-colors duration-500">
                      <div
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}