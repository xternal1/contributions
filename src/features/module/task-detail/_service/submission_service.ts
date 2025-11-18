// submission_service.ts - ALTERNATIF (LEBIH BAIK)
import api from "../../../../services/api";

// Submit file
export async function submitTaskFile(taskId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  console.log("📤 Submitting file to:", `/api/submission-tasks/${taskId}`);

  const res = await api.post(`/api/submission-tasks/${taskId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// Submit link
export async function submitTaskLink(taskId: string, link: string) {
  const payload = {
    link: link.trim()
  };

  console.log("🔗 Submitting link to:", `/api/submission-tasks/link/${taskId}`, payload);

  const res = await api.post(`/api/submission-tasks/link/${taskId}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

// Fungsi universal (backward compatibility)
export async function submitTask({
  taskId,
  file,
  link,
}: {
  taskId: string;
  file?: File | null;
  link?: string;
}) {
  if (file) {
    return await submitTaskFile(taskId, file);
  } else if (link) {
    return await submitTaskLink(taskId, link);
  } else {
    throw new Error("Either file or link must be provided");
  }
}