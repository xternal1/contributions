// src/pages/guest/faq/FaqPage.tsx
import { useEffect, useState } from "react";
import { fetchFaqCategories, fetchFaq } from "../../../features/faq/_service/faq_service";
import type { FaqCategory, Faq } from "../../../features/faq/_faq";
import FaqItem from "../../../components/faq/FaqItem";
import FaqHeader from "../../../components/faq/FaqHeader";

/**
 * Halaman utama FAQ
 * - Ambil data kategori + FAQ
 * - Jika kategori kosong → fallback ambil semua FAQ
 * - Bisa filter FAQ berdasarkan kategori
 */
export default function FaqPage() {
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [allFaqs, setAllFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Ambil data FAQ dari API
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

        // Fallback ambil semua FAQ
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

  // Filter FAQ berdasarkan kategori aktif
  const filteredFaqs = useFallback
    ? allFaqs.filter(
        faq => activeCategory === "Semua" || faq.faq_category?.name === activeCategory
      )
    : categories.flatMap(category =>
        category.faqs.filter(
          () => activeCategory === "Semua" || category.name === activeCategory
        )
      );

  // Daftar kategori unik
  const uniqueCategories = useFallback
    ? ["Semua", ...Array.from(new Set(allFaqs.map(f => f.faq_category?.name || "Umum")))]
    : ["Semua", ...categories.map(c => c.name)];

  return (
    <>
      <FaqHeader />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          Temukan Pertanyaanmu
        </h2>

        {/* Filter kategori */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
                flex items-center justify-center transition-all duration-300 ease-in-out
                shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)]
                active:translate-y-0.5 border
                ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 border-yellow-600 text-black"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loader */}
        {loading && <p className="text-center py-10 text-gray-500">Memuat FAQ...</p>}

        {/* Jika kosong */}
        {!loading && filteredFaqs.length === 0 && (
          <p className="text-gray-500 text-center py-10 text-lg">
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
    </>
  );
}
