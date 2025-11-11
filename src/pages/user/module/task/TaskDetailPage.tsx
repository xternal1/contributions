import { fetchTaskDetail } from "../../../../features/module/task-detail/_service/task_service";
import { submitTask } from "../../../../features/module/task-detail/_service/submission_service";
import type { TaskDetail } from "../../../../features/module/task-detail/_task";
import TaskDetailPageSkeleton from "./TaskDetailSkeleton";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, Info } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import TaskHeader from "./TaskHeader";

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskDetail | null>(null);
  const [activeTab, setActiveTab] = useState<"file" | "link">("file");
  const [file, setFile] = useState<File | null>(null);
  const [taskLink, setTaskLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [linkError, setLinkError] = useState<string | null>(null);

  // Button Class Standard untuk semua button
  const buttonClass = `
    font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
    flex items-center justify-center transition-all duration-300 ease-in-out
    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
    hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]
    active:translate-y-0.5 border
  `;

  // Primary Button Style
  const primaryButtonClass = `
    ${buttonClass}
    bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white 
    hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black 
    dark:from-purple-600 dark:to-purple-700 dark:border-purple-500
  `;

  // Secondary Button Style (untuk tombol Kembali)


  // Disabled Button Style
  const disabledButtonClass = `
    ${buttonClass}
    bg-gray-400 dark:bg-gray-600 border-gray-400 dark:border-gray-600 
    text-gray-200 dark:text-gray-400 cursor-not-allowed shadow-none hover:shadow-none
  `;

  const checkGithubRepoExist = async (url: string): Promise<boolean> => {
    try {
      const match = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/);
      if (!match) return false;

      const [, owner, repo] = match;
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      return response.ok;
    } catch {
      return false;
    }
  };

  // =============================
  // 🔹 Fetch Task Detail
  // =============================
  useEffect(() => {
    if (!id) {
      setError("ID tugas tidak ditemukan.");
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetchTaskDetail(id);

        if (res.data) {
          setTask(res.data);
        } else {
          setError("Tugas tidak ditemukan.");
        }
      } catch (err) {
        console.error("❌ Gagal fetch task:", err);
        setError("Terjadi kesalahan saat memuat tugas.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  // =============================
  // 🔹 Handle Submit Task
  // =============================
  const handleSubmit = async () => {
    if (!task) return;

    const isFileTab = activeTab === "file";
    const isLinkTab = activeTab === "link";

    // Validasi input
    if (isFileTab && !file) {
      Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Silakan pilih file terlebih dahulu sebelum melanjutkan.",
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    if (isLinkTab && taskLink.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Silakan masukkan link tugas terlebih dahulu.",
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    // Jika user sudah pernah upload tugas sebelumnya
    if (task.is_finish) {
      const result = await Swal.fire({
        icon: "warning",
        title: "Kirim Ulang Jawaban?",
        text: "Anda sudah mengumpulkan tugas ini sebelumnya. File/link lama akan diganti dengan yang baru.",
        showCancelButton: true,
        confirmButtonText: "Ya, kirim!",
        cancelButtonText: "Tidak, batalkan",
        confirmButtonColor: "#7c3aed",
        cancelButtonColor: "#d33",
        background: '#1f2937',
        color: '#fff',
      });

      if (!result.isConfirmed) return;
    }

    try {
      setIsSubmitting(true);

      const res = await submitTask({
        taskId: task.id,
        file: isFileTab ? file : undefined,
        link: isLinkTab ? taskLink.trim() : undefined,
      });

      console.log("✅ Respons submit:", res);

      // Notifikasi berhasil
      await Swal.fire({
        icon: "success",
        title: "Berhasil!!",
        text: "Tugas berhasil dikirim!",
        confirmButtonColor: "#7c3aed",
        background: '#1f2937',
        color: '#fff',
      });

      navigate(-1);
    } catch (err) {
      console.error("❌ Gagal mengirim tugas:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal menyimpan tugas. Silakan coba lagi.",
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: "#7c3aed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // =============================
  // 🔹 Handling States
  // =============================

  // Handle ID tidak ditemukan
  if (!id) {
    return (
      <div className="flex justify-center items-center h-80 text-red-500 dark:text-red-400 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        ID tugas tidak ditemukan.
      </div>
    );
  }

  // Handle Loading
  if (isLoading) {
    return <TaskDetailPageSkeleton />;
  }

  // Handle Error
  if (error) {
    return (
      <div className="flex justify-center items-center h-80 text-red-500 dark:text-red-400 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        {error}
      </div>
    );
  }

  // Handle Task tidak ditemukan setelah fetch
  if (!task) {
    return (
      <div className="flex justify-center items-center h-80 text-red-500 dark:text-red-400 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        Tugas tidak ditemukan.
      </div>
    );
  }

  // =============================
  // Tampilan Utama
  // =============================
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <TaskHeader
        title={task?.module?.title || "Detail Tugas"}
      />

      <div className="p-6 min-h-screen max-w-6xl mx-auto">
        {/* ===== Detail Tugas ===== */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6 transition-colors duration-500">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-3 text-left text-gray-800 dark:text-white">Detail Tugas</h2>
              <div
                className="text-gray-700 dark:text-gray-300 text-left prose prose-sm max-w-none prose-headings:text-gray-800 prose-headings:dark:text-white prose-strong:text-gray-800 prose-strong:dark:text-white prose-li:text-gray-700 prose-li:dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: task.description }}
              />
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold px-5 py-3 rounded-xl text-center min-w-[140px] transition-colors duration-500">
              <p className="text-xs mb-3">Point yang didapatkan</p>
              <p className="text-2xl">{task.point}</p>
            </div>
          </div>
        </div>

        {/* ===== Tabs Upload ===== */}
        <div className="flex gap-3 mb-6">
          {/* Tombol Upload Berkas */}
          <button
            onClick={() => setActiveTab("file")}
            className={`
      font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
      flex items-center justify-center transition-all duration-150 ease-in-out
      active:translate-y-0.5 border
      ${activeTab === "file"
                ? `
            shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] 
            dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
            bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white
            dark:from-purple-600 dark:to-purple-700 dark:border-purple-500
          `
                : `
            bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200
            hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:border-purple-700 hover:text-white
            hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]
            dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
            dark:hover:from-purple-600 dark:hover:to-purple-700 dark:hover:border-purple-500
          `
              }
    `}
          >
            Upload Berkas
          </button>

          {/* Tombol URL Link */}
          <button
            onClick={() => setActiveTab("link")}
            className={`
      font-sans font-semibold text-sm py-2.5 px-6 rounded-full 
      flex items-center justify-center transition-all duration-150 ease-in-out
      active:translate-y-0.5 border
      ${activeTab === "link"
                ? `
            shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] 
            dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
            bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white
            dark:from-purple-600 dark:to-purple-700 dark:border-purple-500
          `
                : `
            bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200
            hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:border-purple-700 hover:text-white
            hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]
            dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
            dark:hover:from-purple-600 dark:hover:to-purple-700 dark:hover:border-purple-500
          `
              }
    `}
          >
            URL Link
          </button>
        </div>


        {/* ===== Konten Upload ===== */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transition-colors duration-500">
          {activeTab === "file" ? (
            <>
              <h3 className="text-lg font-semibold mb-3 text-left text-gray-800 dark:text-white">Upload File</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-left">
                Upload file di bawah ini untuk mengumpulkan tugas
              </p>

              {/* Box Info */}
              <div className="border border-purple-400 dark:border-purple-600 rounded-xl bg-purple-50 dark:bg-purple-900/20 p-4 mb-5 transition-colors duration-500">
                <div className="flex items-center mb-2 text-purple-700 dark:text-purple-300 font-semibold">
                  <Info className="w-5 h-5 mr-2" /> Informasi
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-6 space-y-1 text-left">
                  <li>Masukkan tugas Anda dalam format ZIP</li>
                  <li>Pastikan berkas sesuai ketentuan tugas</li>
                  <li>Tugas yang tidak sesuai bisa ditolak reviewer</li>
                </ul>
              </div>

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all mb-4 
    min-h-[280px] w-full max-w-3xl mx-auto px-6
    ${file
                    ? "border-purple-500 dark:border-purple-400 bg-purple-100 dark:bg-purple-900/20"
                    : "border-green-500 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                  } transition-colors duration-500`}

                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files?.[0];
                  if (!droppedFile) return;

                  const allowedExtensions = ["zip", "rar", "jpg", "jpeg", "png"];
                  const fileExtension = droppedFile.name.split(".").pop()?.toLowerCase();

                  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
                    Swal.fire({
                      icon: "error",
                      title: "Format File Tidak Didukung",
                      text: "Silakan pilih file dengan format .zip, .rar, .jpg, .jpeg, atau .png saja.",
                      confirmButtonColor: "#7c3aed",
                      background: '#1f2937',
                      color: '#fff',
                    });
                    setFile(null);
                    return;
                  }

                  setFile(droppedFile);
                }}
              >
                <Upload className="w-10 h-10 text-purple-500 dark:text-purple-400 mb-3 " />
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 text-center">
                  Drag file ke sini atau pilih file
                </p>

                <input
                  type="file"
                  id="fileUpload"
                  accept=".zip,.rar,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (!selectedFile) return;

                    const allowedExtensions = ["zip", "rar", "jpg", "jpeg", "png"];
                    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();

                    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
                      Swal.fire({
                        icon: "error",
                        title: "Format File Tidak Didukung",
                        text: "Silakan pilih file dengan format .zip, .rar, .jpg, .jpeg, atau .png saja.",
                        confirmButtonColor: "#7c3aed",
                        background: '#1f2937',
                        color: '#fff',
                      });
                      e.target.value = "";
                      setFile(null);
                      return;
                    }

                    setFile(selectedFile);
                  }}
                />

                <label
                  htmlFor="fileUpload"
                  className={primaryButtonClass}
                >
                  Pilih File
                </label>

                {/* Preview File */}
                {file && (
                  <div className="mt-4 flex flex-col items-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(1)} KB)
                    </p>

                    {(() => {
                      const ext = (file.name.split(".").pop() || "").toLowerCase();

                      if (["jpg", "jpeg", "png"].includes(ext)) {
                        const blobUrl = URL.createObjectURL(file);
                        return (
                          <img
                            src={blobUrl}
                            alt="Preview"
                            className="w-48 h-48 object-contain rounded-xl dark:border-gray-600"
                            onLoad={() => URL.revokeObjectURL(blobUrl)}
                          />
                        );
                      } else if (["zip", "rar"].includes(ext)) {
                        const icon =
                          ext === "zip"
                            ? "https://cdn-icons-png.flaticon.com/512/888/888879.png"
                            : "https://cdn-icons-png.flaticon.com/512/888/888882.png";
                        return (
                          <div className="flex flex-col items-center mt-2">
                            <img src={icon} alt="Archive Icon" className="w-16 h-16 mb-2" />
                            <span className="text-gray-500 dark:text-gray-400 text-sm">File Arsip ({ext.toUpperCase()})</span>
                          </div>
                        );
                      } else {
                        return (
                          <div className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                            Tidak dapat menampilkan preview untuk tipe file ini.
                          </div>
                        );
                      }
                    })()}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-3 text-left text-gray-800 dark:text-white">URL Link</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-left">
                Masukkan link tugas Anda di bawah ini
              </p>

              <div className="border border-purple-400 dark:border-purple-600 rounded-xl bg-purple-50 dark:bg-purple-900/20 p-4 mb-5 text-left transition-colors duration-500">
                <div className="flex mb-2 text-purple-700 dark:text-purple-300 font-semibold">
                  <Info className="w-5 h-5 mr-2 " /> Informasi
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-6 space-y-1">
                  <li>Pastikan link dapat diakses oleh reviewer</li>
                  <li>Gunakan format yang sesuai (Google Drive, GitHub, dll)</li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Masukkan Link Tugas
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Link Repository GitHub Anda"
                  value={taskLink}
                  onChange={async (e) => {
                    const value = e.target.value.trim();
                    setTaskLink(value);

                    const githubRepoPattern =
                      /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;

                    if (value === "") {
                      setLinkError(null);
                      return;
                    }

                    if (!githubRepoPattern.test(value)) {
                      setLinkError("Link yang dimasukkan harus berupa repository GitHub.");
                      return;
                    }

                    setLinkError("🔍 Mengecek repository...");

                    setTimeout(async () => {
                      const isExist = await checkGithubRepoExist(value);
                      if (!isExist) {
                        setLinkError("❌ Repository tidak ditemukan di GitHub.");
                      } else {
                        setLinkError(null);
                      }
                    }, 500);
                  }}
                  className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-500 ${linkError
                    ? "border-red-400 dark:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 dark:focus:ring-purple-400"
                    }`}
                />
                {linkError && (
                  <p className={`text-sm mt-2 ${linkError.includes("❌") || linkError.includes("harus berupa")
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-600 dark:text-gray-400"
                    }`}>
                    {linkError}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Tombol Navigasi */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 transition-colors duration-500">
            {/* Tombol Kembali */}
            <button
              onClick={() => navigate(-1)}
              className={`
      ${primaryButtonClass}
      transition-all duration-150 ease-in-out active:translate-y-0.5 border
      hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]
      dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
      shadow-none
    `}
            >
              Kembali
            </button>

            {/* Tombol Lanjut */}
            <button
              disabled={
                isSubmitting ||
                (activeTab === "file" && !file) ||
                (activeTab === "link" && (!!linkError || taskLink.trim() === ""))
              }
              onClick={handleSubmit}
              className={`
      ${buttonClass}
      transition-all duration-150 ease-in-out active:translate-y-0.5 border
      ${isSubmitting ||
                  (activeTab === "file" && !file) ||
                  (activeTab === "link" && (!!linkError || taskLink.trim() === ""))
                  ? `
            ${disabledButtonClass}
            opacity-60 cursor-not-allowed shadow-none
          `
                  : `
            ${primaryButtonClass}
            hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]
            dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]
            shadow-none
          `
                }
    `}
            >
              {isSubmitting ? "Menyimpan..." : "Lanjut"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}