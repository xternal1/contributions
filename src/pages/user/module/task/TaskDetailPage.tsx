import { fetchTaskDetail } from "../../../../features/module/task-detail/_service/task_service";
import { submitTask } from "../../../../features/module/task-detail/_service/submission_service";
import type { TaskDetail } from "../../../../features/module/task-detail/_task";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, Info } from "lucide-react";

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskDetail | null>(null);
  const [activeTab, setActiveTab] = useState<"file" | "link">("file");
  const [file, setFile] = useState<File | null>(null);
  const [taskLink, setTaskLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const res = await fetchTaskDetail(id);
        if (res.data && res.data.length > 0) {
          setTask(res.data[0]);
        }
      } catch (err) {
        console.error("❌ Gagal fetch task:", err);
      }
    };

    loadData();
  }, [id]);

  // =============================
  // 🔹 Handle Submit Task
  // =============================
  const handleSubmit = async () => {
    if (!task) return;

    // Validasi input kosong
    if (activeTab === "file" && !file) {
      alert("⚠️ Silakan pilih file terlebih dahulu sebelum melanjutkan.");
      return;
    }
    if (activeTab === "link" && taskLink.trim() === "") {
      alert("⚠️ Silakan masukkan link tugas terlebih dahulu.");
      return;
    }

    // Jika user sudah pernah upload
    if (task.is_finish) {
      const confirmUpdate = confirm(
        "Anda sudah pernah mengumpulkan tugas ini.\nApakah Anda yakin ingin memperbarui tugas?"
      );
      if (!confirmUpdate) return;
    }

    try {
      setIsSubmitting(true);
      const res = await submitTask({
        taskId: task.id,
        file: activeTab === "file" ? file : undefined,
        link: activeTab === "link" ? taskLink : undefined,
      });

      console.log("✅ Respons submit:", res);
      alert("✅ Tugas berhasil disimpan!");

      navigate(-1);
    } catch (err) {
      console.error("❌ Gagal mengirim tugas:", err);
      alert("❌ Gagal menyimpan tugas. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!task) {
    return (
      <div className="flex justify-center items-center h-80 text-gray-500">
        Memuat detail tugas...
      </div>
    );
  }

  // =============================
  // Tampilan Utama
  // =============================
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ===== Detail Tugas ===== */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold mb-2">Detail Tugas</h2>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: task.description }}
          />
        </div>
        <div className="bg-purple-100 text-purple-700 font-bold px-5 py-3 rounded-xl text-center">
          <p className="text-xs">Point yang didapatkan</p>
          <p className="text-2xl">{task.point}</p>
        </div>
      </div>

      {/* ===== Tabs Upload ===== */}
      <div className="flex gap-3 mb-6">
        <button
          className={`px-5 py-2 rounded-full font-medium ${
            activeTab === "file"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("file")}
        >
          Upload Berkas
        </button>
        <button
          className={`px-5 py-2 rounded-full font-medium ${
            activeTab === "link"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("link")}
        >
          URL Link
        </button>
      </div>

      {/* ===== Konten Upload ===== */}
      <div className="bg-white rounded-2xl shadow p-6">
        {activeTab === "file" ? (
          <>
            <h3 className="text-lg font-semibold mb-3">Upload File</h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload file di bawah ini untuk mengumpulkan tugas
            </p>

            {/* Box Info */}
            <div className="border border-purple-400 rounded-xl bg-purple-50 p-4 mb-5">
              <div className="flex items-center mb-2 text-purple-700 font-semibold">
                <Info className="w-5 h-5 mr-2" /> Informasi
              </div>
              <ul className="text-sm text-gray-600 list-disc ml-6 space-y-1">
                <li>Masukkan tugas Anda dalam format ZIP</li>
                <li>Pastikan berkas sesuai ketentuan tugas</li>
                <li>Tugas yang tidak sesuai bisa ditolak reviewer</li>
              </ul>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-2xl py-10 flex flex-col items-center justify-center bg-gray-50">
              <Upload className="w-10 h-10 text-purple-500 mb-3" />
              <p className="text-gray-500 text-sm mb-4">
                Drag file ke sini atau pilih file
              </p>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="fileUpload"
                className="bg-purple-600 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-purple-700 transition"
              >
                Pilih File
              </label>
              {file && (
                <p className="mt-3 text-sm text-gray-600">
                  File: <span className="font-medium">{file.name}</span>{" "}
                  ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-3">URL Link</h3>
            <p className="text-sm text-gray-500 mb-4">
              Masukkan link tugas Anda di bawah ini
            </p>

            <div className="border border-purple-400 rounded-xl bg-purple-50 p-4 mb-5">
              <div className="flex items-center mb-2 text-purple-700 font-semibold">
                <Info className="w-5 h-5 mr-2" /> Informasi
              </div>
              <ul className="text-sm text-gray-600 list-disc ml-6 space-y-1">
                <li>Pastikan link dapat diakses oleh reviewer</li>
                <li>Gunakan format yang sesuai (Google Drive, GitHub, dll)</li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Masukkan Link Tugas
              </label>
              <input
                type="text"
                placeholder="Masukkan Link Tugas Anda"
                value={taskLink}
                onChange={(e) => setTaskLink(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </>
        )}

        {/* Tombol Navigasi */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="border border-purple-600 text-purple-600 px-5 py-2 rounded-full hover:bg-purple-50"
          >
            Kembali
          </button>
          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={`px-5 py-2 rounded-full text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isSubmitting ? "Menyimpan..." : "Lanjut"}
          </button>
        </div>
      </div>
    </div>
  );
}
