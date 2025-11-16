// src/pages/guest/faq/FaqPage.tsx
import { useEffect } from "react";
import FaqHeader from "@components/faq/FaqHeader";
import CategoryFilter from "@components/faq/CategoryFilter";
import FaqList from "@components/faq/FaqList";
import { useFaqStore } from "@lib/stores/guest/faq/useFaqStore";

export default function FaqPage() {
  const {
    categories,
    allFaqs,
    loading,
    useFallback,
    activeCategory,
    loadInitialData,
    setActiveCategory,
  } = useFaqStore();

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredFaqs = useFallback
    ? allFaqs.filter(
      (faq) => activeCategory === "Semua" || faq.faq_category?.name === activeCategory
    )
    : categories.flatMap((category) =>
      category.faqs.filter(
        (_faq) => activeCategory === "Semua" || category.name === activeCategory
      )
    );

  const uniqueCategories = useFallback
    ? ["Semua", ...Array.from(new Set(allFaqs.map((f) => f.faq_category?.name || "Umum")))]
    : ["Semua", ...categories.map((c) => c.name)];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <FaqHeader />

      <div className="max-w-5xl mx-auto px-6 py-12 transition-colors duration-500">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-10 transition-colors duration-500">
          Temukan Pertanyaanmu
        </h2>

        {/* Category Filter */}
        <CategoryFilter
          categories={uniqueCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* FAQ List */}
        <FaqList faqs={filteredFaqs} loading={loading} />
      </div>
    </div>
  );
}


