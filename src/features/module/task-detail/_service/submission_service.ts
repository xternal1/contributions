import api from "../../../../services/api";

export async function submitTask({
  taskId,
  file,
  link,
}: {
  taskId: string;
  file?: File | null;
  link?: string;
}) {
  const formData = new FormData();

  // hanya kirim yang ada
  if (file) formData.append("file", file);
  if (link) formData.append("link", link);

  try {
    const res = await api.post(`/api/submission-tasks/${taskId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Gagal upload tugas:", error);
    throw error;
  }
}
