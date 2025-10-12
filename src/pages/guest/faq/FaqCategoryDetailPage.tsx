// src/pages/Faq/FaqCategoryDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFaqCategoryDetail } from "../../../features/faq/_service/faq_service";
import type { FaqCategory } from "../../../features/faq/_faq";

/**
 * Halaman detail kategori FAQ
 * - Menampilkan semua pertanyaan di kategori tertentu
 * - Bisa expand/collapse jawaban
 */
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
        <p className="text-gray-500">Memuat detail kategori FAQ...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Kategori tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/faq" className="text-blue-600 text-sm hover:underline inline-block mb-6">
        ← Kembali ke FAQ
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Kategori: {category.name}
      </h1>

      {category.faqs.length === 0 ? (
        <p className="text-gray-500">Belum ada pertanyaan di kategori ini.</p>
      ) : (
        <div className="space-y-4">
          {category.faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-2xl shadow-sm">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-gray-700 hover:bg-gray-50 rounded-2xl transition"
              >
                <span>{faq.question}</span>
                <span
                  className={`transition-transform ${activeId === faq.id ? "rotate-180" : "rotate-0"}`}
                >
                  ▼
                </span>
              </button>

              {activeId === faq.id && (
                <div className="px-5 pb-4 text-gray-600 border-t border-gray-100">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
