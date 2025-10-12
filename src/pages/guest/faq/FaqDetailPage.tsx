// src/pages/Faq/FaqDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFaqDetail } from "../../../features/faq/_service/faq_service";
import type { Faq } from "../../../features/faq/_faq";

/**
 * Halaman detail FAQ (lihat pertanyaan + jawaban lengkap)
 */
export default function FaqDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [faq, setFaq] = useState<Faq | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      if (!id) return;
      try {
        const data = await fetchFaqDetail(Number(id));
        setFaq(data);
      } catch (error) {
        console.error("Gagal mengambil detail FAQ:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Memuat detail FAQ...</p>
      </div>
    );
  }

  if (!faq) {
    return (
      <div className="text-center text-gray-500 mt-10">
        FAQ tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/faq" className="text-blue-600 text-sm hover:underline inline-block mb-6">
        ← Kembali ke FAQ
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">{faq.question}</h1>

      <div className="prose prose-sm text-gray-600" dangerouslySetInnerHTML={{ __html: faq.answer }} />

      {faq.faq_category && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <p className="text-sm text-gray-500">Kategori:</p>
          <p className="font-medium text-gray-700">{faq.faq_category.name}</p>
        </div>
      )}
    </div>
  );
}
