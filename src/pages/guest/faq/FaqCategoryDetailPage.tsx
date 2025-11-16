import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFaqStore } from "@lib/stores/guest/faq/useFaqStore";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqCategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    categoryDetail,
    loading,
    activeId,
    toggleFaq,
    loadCategoryDetail,
    clearCategoryDetail,
  } = useFaqStore();

  useEffect(() => {
    if (!id) return;
    loadCategoryDetail(Number(id));
    return () => clearCategoryDetail();
  }, [id, loadCategoryDetail, clearCategoryDetail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Memuat detail kategori FAQ...</p>
      </div>
    );
  }

  if (!categoryDetail) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Kategori tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/faq" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
        ← Kembali ke FAQ
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Kategori: {categoryDetail.name}
      </h1>

      {categoryDetail.faqs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Belum ada pertanyaan di kategori ini.</p>
      ) : (
        <div className="space-y-4">
          {categoryDetail.faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-medium"
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: activeId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
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
                  >
                    <div className="px-5 pb-4 border-t">
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



