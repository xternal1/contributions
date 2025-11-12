// src/lib/stores/user/module/useTaskStore.ts
import { create } from "zustand";
import { fetchTaskDetail } from "../../../../features/module/task-detail/_service/task_service";
import { submitTask as submitTaskService } from "../../../../features/module/task-detail/_service/submission_service";
import type { TaskDetail } from "../../../../features/module/task-detail/_task";

type ActiveTab = "file" | "link";

type TaskState = {
  // data
  task: TaskDetail | null;
  loading: boolean;
  error: string | null;

  // ui / form
  activeTab: ActiveTab;
  file: File | null;
  taskLink: string;
  linkError: string | null;

  // submit
  isSubmitting: boolean;
  submitError: string | null;

  // actions
  loadTask: (id: string) => Promise<void>;
  setActiveTab: (tab: ActiveTab) => void;
  setFile: (f: File | null) => void;
  setTaskLink: (link: string) => void;
  validateGithubRepo: (url: string) => Promise<boolean>;
  submitTask: () => Promise<{ success: boolean; data?: any; error?: string }>;

  // helpers
  reset: () => void;
};

export const useTaskStore = create<TaskState>((set, get) => ({
  task: null,
  loading: false,
  error: null,

  activeTab: "file",
  file: null,
  taskLink: "",
  linkError: null,

  isSubmitting: false,
  submitError: null,

  // fetch detail
  loadTask: async (id: string) => {
    set({ loading: true, error: null, task: null });
    try {
      const res = await fetchTaskDetail(id);
      // adapt to API shape — component expects res.data or task directly
      const data = (res && (res.data ?? res)) as TaskDetail;
      if (!data) {
        set({ error: "Tugas tidak ditemukan.", task: null });
      } else {
        set({ task: data });
      }
    } catch (err) {
      console.error("useTaskStore.loadTask error", err);
      set({ error: "Terjadi kesalahan saat memuat tugas.", task: null });
    } finally {
      set({ loading: false });
    }
  },

  setActiveTab: (tab: ActiveTab) => {
    set({ activeTab: tab, linkError: null });
  },

  setFile: (f: File | null) => {
    set({ file: f });
  },

  setTaskLink: (link: string) => {
    set({ taskLink: link, linkError: null });
  },

  // validate github repo existence and set linkError accordingly
  validateGithubRepo: async (url: string) => {
    try {
      // quick format check
      const githubRepoPattern = /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
      if (!githubRepoPattern.test(url)) {
        set({ linkError: "Link yang dimasukkan harus berupa repository GitHub." });
        return false;
      }

      set({ linkError: "🔍 Mengecek repository..." });

      const match = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/);
      if (!match) {
        set({ linkError: "Link tidak valid." });
        return false;
      }
      const [, owner, repo] = match;
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!response.ok) {
        set({ linkError: "❌ Repository tidak ditemukan di GitHub." });
        return false;
      }
      set({ linkError: null });
      return true;
    } catch (err) {
      console.error("validateGithubRepo error", err);
      set({ linkError: "Terjadi kesalahan saat mengecek repository." });
      return false;
    }
  },

  // submit (wrapper untuk service submitTask)
  submitTask: async () => {
    const { task, activeTab, file, taskLink } = get();
    if (!task) return { success: false, error: "Task tidak tersedia." };

    // basic client-side validation
    if (activeTab === "file" && !file) {
      return { success: false, error: "Silakan pilih file terlebih dahulu." };
    }
    if (activeTab === "link" && !taskLink.trim()) {
      return { success: false, error: "Silakan masukkan link tugas terlebih dahulu." };
    }

    set({ isSubmitting: true, submitError: null });
    try {
      const payload: {
        taskId: number | string;
        file?: File | null;
        link?: string;
      } = { taskId: task.id };

      if (activeTab === "file") payload.file = file ?? undefined;
      if (activeTab === "link") payload.link = taskLink.trim();

      const res = await submitTaskService(payload as any); // service expects specific shape
      set({ isSubmitting: false });

      return { success: true, data: res };
    } catch (err: any) {
      console.error("useTaskStore.submitTask error", err);
      const message = (err?.message as string) || "Gagal menyimpan tugas.";
      set({ isSubmitting: false, submitError: message });
      return { success: false, error: message };
    }
  },

  reset: () =>
    set({
      task: null,
      loading: false,
      error: null,
      activeTab: "file",
      file: null,
      taskLink: "",
      linkError: null,
      isSubmitting: false,
      submitError: null,
    }),
}));
