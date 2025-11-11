// src/pages/guest/faq/FaqPage.tsx
import { useEffect, useState } from "react";
import { fetchFaqCategories, fetchFaq } from "../../../features/faq/_service/faq_service";
import type { FaqCategory, Faq } from "../../../features/faq/_faq";
import FaqItem from "../../../components/faq/FaqItem";
import FaqHeader from "../../../components/faq/FaqHeader";

export default function FaqPage() {
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [allFaqs, setAllFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const categoryData = await fetchFaqCategories();
        const hasFaqs = categoryData.some(c => c.faqs && c.faqs.length > 0);

        if (hasFaqs) {
          setCategories(categoryData);
          setUseFallback(false);
        } else {
          const faqData = await fetchFaq();
          setAllFaqs(faqData);
          setUseFallback(true);
        }
      } catch (error) {
        console.error("Gagal ambil FAQ:", error);

        try {
          const faqData = await fetchFaq();
          setAllFaqs(faqData);
          setUseFallback(true);
        } catch (fallbackError) {
          console.error("Fallback error:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredFaqs = useFallback
    ? allFaqs.filter(
        faq => activeCategory === "Semua" || faq.faq_category?.name === activeCategory
      )
    : categories.flatMap(category =>
        category.faqs.filter(
          () => activeCategory === "Semua" || category.name === activeCategory
        )
      );

  const uniqueCategories = useFallback
    ? ["Semua", ...Array.from(new Set(allFaqs.map(f => f.faq_category?.name || "Umum")))]
    : ["Semua", ...categories.map(c => c.name)];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <FaqHeader />

      <div className="max-w-5xl mx-auto px-6 py-12 transition-colors duration-500">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-10 transition-colors duration-500">
          Temukan Pertanyaanmu
        </h2>

        {/* Filter kategori */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {uniqueCategories.map((category) => (
            <button
  key={category}
  onClick={() => setActiveCategory(category)}
  className={`font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
    flex items-center justify-center transition-all duration-150 ease-in-out
    active:translate-y-0.5 border
    ${
      activeCategory === category
        ? `
          shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] 
          dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
          bg-gradient-to-r from-yellow-400 to-yellow-500 border-yellow-600 text-black 
          dark:bg-none dark:border-purple-600 dark:text-white dark:bg-purple-600
        `
        : `
          bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white
          hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black
          hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] 
          dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
          dark:bg-none dark:border-purple-600 dark:text-white
        `
    }`}
>
  {category}
</button>

          ))}
        </div>

        {/* Loader */}
        {loading && (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400 transition-colors duration-500">
            Memuat FAQ...
          </p>
        )}

        {/* Jika kosong */}
        {!loading && filteredFaqs.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-10 text-lg transition-colors duration-500">
            Belum ada FAQ tersedia.
          </p>
        )}

        {/* Daftar FAQ */}
        {!loading && filteredFaqs.length > 0 && (
          <div className="space-y-2">
            {filteredFaqs.map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}