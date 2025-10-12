// features/module/task-detail/_service/task_service.ts
import api from "../../../../services/api";
import type { TaskDetail } from "../_task";

interface TaskDetailResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: TaskDetail[];
  success: boolean;
}

// ✅ gunakan endpoint /api/module-task/{module_id}
export async function fetchTaskDetail(moduleId: string): Promise<TaskDetailResponse> {
  const res = await api.get(`/api/module-tasks/${moduleId}`);
  return res.data; // res.data berisi { meta, data, success }
}

