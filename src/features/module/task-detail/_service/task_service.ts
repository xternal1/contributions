import api from "../../../../services/api";
import type { TaskDetail } from "../_task";

export interface TaskDetailResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: TaskDetail;
  success: boolean;
}

// ✅ Gunakan endpoint yang benar
export async function fetchTaskDetail(taskId: string): Promise<TaskDetailResponse> {
  const res = await api.get(`/api/module-tasks-detail/${taskId}`);
  return res.data; // { meta, data, success }
}
